require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const admin = require("firebase-admin");
require("dotenv").config();

// '../assets/templt.png'
const port = process.env.PORT || 3000;
function validatePassword(password) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return regex.test(password);
}

const convertImageToBase64 = (imagePath) => {
  // Pastikan jalur gambar relatif terhadap lokasi file ini
  const absolutePath = path.join(__dirname, imagePath);
  const imageAsBase64 = fs.readFileSync(absolutePath, "base64");
  const imageAsBase64_2 = fs.readFileSync(absolutePath, "base64");
  return `data:image/png;base64,${imageAsBase64}`;
  return `data:image/png;base64,${imageAsBase64_2}`;
};

// Gunakan fungsi di atas untuk mendapatkan string base64 dari gambar
const imageBase64 = convertImageToBase64("../assets/templt.png");
const imageBase64_2 = convertImageToBase64("../assets/jdl.png");
exports.register = async (req, res) => {
  try {
    const { fullName, nickName, email, avatarUser, password } = req.body;
    if (!validatePassword(password)) {
      return res
        .status(400)
        .send(
          "Password harus minimal 6 karakter dan mengandung huruf dan angka."
        );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const confirmationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const newUser = new User({
      fullName,
      nickName,
      avatarUser, // Hapus atau komentari baris ini
      email,
      password: hashedPassword,
      confirmationToken,
      tokenExpiration: Date.now() + 3600000, // 1 hour in milliseconds
    });
    await newUser.save();

    // Konfigurasi Nodemailer
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Kirim Email Verifikasi
    await transporter.sendMail({
      from: '"Register Verifikasi" <no-reply@myapp.com>',
      to: newUser.email,
      subject: "Verifikasi Email Anda",
      //   text: `Silakan klik link ini untuk verifikasi: http://localhost:${port}/confirm/${confirmationToken}`,
      html: `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* Menambahkan style yang tidak inline di sini dapat meningkatkan responsivitas
       di klien email yang mendukung media queries, seperti Apple Mail dan beberapa lainnya. */
    @media screen and (max-width: 600px) {
      .button {
        width: 100% !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td style="padding: 10px 0 30px 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border: 1px solid #cccccc;">
          <tr>
            <td align="center" bgcolor="#007bff" style="padding: 40px 0 30px 0; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Arial, sans-serif;">
              Verifikasi Akun Anda
            </td>
          </tr>
          <tr>
            <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="color: #153643; font-family: Arial, sans-serif;">
                    <h1 style="font-size: 24px; margin: 0;">Halo ${newUser.fullName},</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                    Terima kasih telah mendaftar. Silakan klik tombol di bawah ini untuk memverifikasi akun Anda.
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://ser.ramdhey.tech/temancuaca/confirm/${confirmationToken}" class="button" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Verifikasi Akun</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td bgcolor="#ee4c50" style="padding: 30px 30px 30px 30px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="color: #ffffff; font-family: Arial, sans-serif; font-size: 14px;" align="center">
                    Jika Anda tidak merasa mendaftar di layanan kami, silakan abaikan email ini.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>

  `,
    });

    res
      .status(201)
      .send("Registrasi berhasil, silakan cek email Anda untuk verifikasi.");
  } catch (error) {
    if (error.code === 11000) {
      let field = error.message.split("index: ")[1];
      field = field.split(" dup key")[0];
      field = field.substring(0, field.lastIndexOf("_"));

      return res
        .status(400)
        .send(`Email atau Nickname ${field} ini sudah ada.`);
    }
    console.error(error);
    res.status(500).send("Error saat registrasi.");
  }
};

// controllers/userController.js
exports.confirmEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      email: decoded.email,
      confirmationToken: token,
    });

    if (!user || user.tokenExpiration < Date.now()) {
      //   const fullName = user.fullName;
      const responseHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
              text-align: center;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 20px;
              padding: 20px;
              background: #fff;
              border-radius: 10px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .message {
              font-size: 1.2em;
            }
            .image {
              max-width: 100%;
              height: auto;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <img src="${imageBase64}" alt="Header Image" style="width: 100%; max-width: 600px; height: auto;">
           <div style="display: flex; align-items: flex-start;">
  <img src="${imageBase64_2}" alt="Title Image" style="width: 35%; max-width: 600px; height: auto;">
</div>

            <p class="message">Hallo Teman Cuaca,Mohon maaf token mu sudah kedaluwarsa atau Token mu salah sehingga, akun mu tidak dapat di verfikasi.</p>
          </div>
        </body>
        </html>
      `;
      res.status(400).send(responseHTML);
    } else {
      user.confirmed = true;
      user.confirmationToken = null;
      user.tokenExpiration = null;
      await user.save();
      const fullName = user.fullName;
      const responseHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
              text-align: center;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 20px;
              padding: 20px;
              background: #fff;
              border-radius: 10px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .message {
              font-size: 1.2em;
            }
            .image {
              max-width: 100%;
              height: auto;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <img src="${imageBase64}" alt="Header Image" style="width: 100%; max-width: 600px; height: auto;">
           <div style="display: flex; align-items: flex-start;">
  <img src="${imageBase64_2}" alt="Title Image" style="width: 35%; max-width: 600px; height: auto;">
</div>

            <p class="message">Hallo ${fullName},Selamat Akun mu telah berhasil di verifikasi dan kamu telah menjadi Teman Cuaca. Selalu update lokasimu ya agar hari mu seindah ucapan dikala senja.</p>
          </div>
        </body>
        </html>
      `;
      res.send(responseHTML);
    }
  } catch (error) {
    res.status(500).send("Error saat verifikasi email.");
  }
};

// update Login and getProfile
exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body; // 'identifier' dapat berupa email atau nickName

    // Cari pengguna berdasarkan email atau nickName
    const user = await User.findOne({
      $or: [{ email: identifier }, { nickName: identifier }],
    });

    if (!user) {
      return res.status(400).send("Pengguna tidak ditemukan.");
    }

    // Membandingkan password yang diberikan dengan yang ada di database
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).send("Password salah.");
    }

    const authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "31d",
    });
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "60d" }
    );

    res.json({
      authToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saat login.");
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // Assumed you have a middleware to extract user ID from token

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("Pengguna tidak ditemukan.");
    }

    res.status(200).json({
      user: {
        fullName: user.fullName,
        nickName: user.nickName,
        email: user.email,
        avatarUser: user.avatarUser,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saat mengambil data profil.");
  }
};

exports.editProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // ID pengguna dari token
    const { fullName, nickName, avatarUser } = req.body; // Data yang ingin diubah

    // Update profil pengguna
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fullName, nickName, avatarUser },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send("Pengguna tidak ditemukan.");
    }

    res.status(200).json({
      message: "Profil diperbarui.",
      user: {
        fullName: updatedUser.fullName,
        nickName: updatedUser.nickName,
        avatarUser: updatedUser.avatarUser,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saat mengedit profil.");
  }
};

exports.requestResetPassword = async (req, res) => {
  try {
    const { email, fullName } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .send("Pengguna dengan email tersebut tidak ditemukan.");
    }

    const resetToken = crypto.randomBytes(3).toString("hex");
    const resetTokenExpires = Date.now() + 120000; // 2 menit

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpires;
    await user.save();

    // Konfigurasi Nodemailer
    // Pastikan Anda mengonfigurasi ini sesuai dengan pengaturan SMTP Anda
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      to: email,
      from: '"Reset Password Request" <no-reply@example.com>',
      subject: "Permintaan Reset Password",
      text:
        `Kode untuk reset password Anda adalah: ${resetToken}\n\n` +
        `Kode ini hanya berlaku selama 2 menit.`,
      html: `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* Menambahkan style yang tidak inline di sini dapat meningkatkan responsivitas
       di klien email yang mendukung media queries, seperti Apple Mail dan beberapa lainnya. */
    @media screen and (max-width: 600px) {
      .button {
        width: 100% !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td style="padding: 10px 0 30px 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border: 1px solid #cccccc;">
          <tr>
            <td align="center" bgcolor="#007bff" style="padding: 40px 0 30px 0; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Arial, sans-serif;">
            Request Reset Password
            </td>
          </tr>
          <tr>
            <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="color: #153643; font-family: Arial, sans-serif;">
                    <h3 style="font-size: 18; margin: 0;">Halo ${user.fullName} Teman Cuaca ,telah kami kirimkan kode token untuk menindak lanjuti Reset Password yang kamu minta</h3>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                    Untuk melakukan Reset Password silahkan ambil kode token sebagai verifikasi untuk dapat melakukan Reset Password , hanya berlaku selama 2 Menit ya.
                  </td>
                </tr>
                <tr>
                  <td>
                  Kode Token Kamu Ini Ya
                    <h4 style="font-size: 24px; margin: 0;">${resetToken}\n\n </h4>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td bgcolor="#ee4c50" style="padding: 30px 30px 30px 30px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="color: #ffffff; font-family: Arial, sans-serif; font-size: 14px;" align="center">
                    Jika Anda tidak merasa mendaftar di layanan kami, silakan abaikan email ini.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>

  `,
    };

    await transporter.sendMail(mailOptions);
    const timeLeft = Math.floor((resetTokenExpires - Date.now()) / 1000);

    res.json({
      message: "Token Dikirim ke Email Anda",
      waktuTersisa: `${timeLeft} detik`,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Terjadi kesalahan saat memproses permintaan reset password.");
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      console.error("Token reset password tidak valid atau telah kedaluwarsa.");
      return res
        .status(400)
        .send("Token reset password tidak valid atau telah kedaluwarsa.");
    }

    if (!validatePassword(newPassword)) {
      return res
        .status(400)
        .send(
          "Password harus minimal 6 karakter dan mengandung huruf dan angka."
        );
    }
    const isSameAsOldPassword = await bcrypt.compare(
      newPassword,
      user.password
    );
    if (isSameAsOldPassword) {
      return res
        .status(400)
        .send("Password baru tidak boleh sama dengan password lama.");
    }

    // Jika pengguna ditemukan dan token valid, set password baru
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.send("Password telah berhasil di Perbarui.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan saat mereset password.");
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { nickName, oldPassword, newPassword } = req.body;

    // Temukan pengguna berdasarkan userId
    const user = await User.findOne({ nickName: nickName });
    if (!user) {
      return res.status(404).send("Pengguna tidak ditemukan.");
    }
    if (!validatePassword(newPassword)) {
      return res
        .status(400)
        .send(
          "Password harus minimal 6 karakter dan mengandung huruf dan angka."
        );
    }
    const isSameAsOldPassword = await bcrypt.compare(
      newPassword,
      user.password
    );
    if (isSameAsOldPassword) {
      return res
        .status(400)
        .send("Password baru tidak boleh sama dengan password lama.");
    }

    // Hash password baru dan simpan
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.send("Password berhasil diganti.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan saat mengganti password.");
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .send("Pengguna dengan email tersebut tidak ditemukan.");
    }

    // Membuat token reset password
    const resetToken = crypto.randomBytes(3).toString("hex"); // 6 karakter

    // Simpan token dan waktu kedaluwarsa di database
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 120000; // 2 menit kedaluwarsa
    await user.save();

    // Konfigurasi nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail", // Ganti dengan layanan email Anda
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Opsi email
    const mailOptions = {
      to: user.email,
      from: '"Forgot Password" <no-reply@example.com>', // Ganti dengan email pengirim Anda
      subject: "Reset Password Request",
      html: `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* Menambahkan style yang tidak inline di sini dapat meningkatkan responsivitas
       di klien email yang mendukung media queries, seperti Apple Mail dan beberapa lainnya. */
    @media screen and (max-width: 600px) {
      .button {
        width: 100% !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td style="padding: 10px 0 30px 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border: 1px solid #cccccc;">
          <tr>
            <td align="center" bgcolor="#007bff" style="padding: 40px 0 30px 0; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Arial, sans-serif;">
             Forgot Password
            </td>
          </tr>
          <tr>
            <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="color: #153643; font-family: Arial, sans-serif;">
                    <h3 style="font-size: 18; margin: 0;">Halo Teman Cuaca ,email mu ${user.email} telah kami kirimkan kode token untuk menindak lanjuti forgot password kamu</h3>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                    Untuk melakukan forgot password silahkan ambil kode token sebagai verifikasi untuk reset password , hanya berlaku selama 2 Menit ya.
                  </td>
                </tr>
                <tr>
                  <td>
                  Kode Token Kamu Ini Ya
                    <h4 style="font-size: 24px; margin: 0;">${resetToken}\n\n </h4>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td bgcolor="#ee4c50" style="padding: 30px 30px 30px 30px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="color: #ffffff; font-family: Arial, sans-serif; font-size: 14px;" align="center">
                    Jika Anda tidak merasa mendaftar di layanan kami, silakan abaikan email ini.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>

  `,
    };

    // Mengirim email
    await transporter.sendMail(mailOptions);
    res.send("Email untuk reset password telah dikirim.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan saat memproses lupa password.");
  }
};

exports.getWeatherData = async (req, res) => {
  try {
    const { city } = req.query; // Misalnya, gunakan query parameter untuk menentukan kota

    const apiKey = process.env.WEATHER_API_KEY; // Pastikan Anda telah menambahkan kunci API di .env
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    const response = await axios.get(url);
    const weatherData = response.data;

    res.json({
      message: "Data cuaca berhasil diperoleh.",
      data: weatherData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan saat mengambil data cuaca.");
  }
};

exports.getWeatherByLatLon = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;

    const response = await axios.get(url);
    const weatherData = response.data;

    res.json({
      message:
        "Data cuaca berdasarkan latitude dan longitude berhasil diperoleh.",
      data: weatherData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan saat mengambil data cuaca.");
  }
};
// 3 Hari Ke depan berdasarkan LatitudeLong
exports.getThreeDayForecastUser = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=3`;

    const response = await axios.get(url);
    const forecastData = response.data;

    res.json({
      message: "Data prakiraan cuaca untuk 3 hari berhasil diperoleh.",
      data: forecastData,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Terjadi kesalahan saat mengambil data prakiraan cuaca.");
  }
};

exports.getWeatherSuggestions = async (req, res) => {
  try {
    const userId = req.user.userId; // Asumsikan middleware autentikasi menetapkan ini
    const { query } = req.query; // Ubah 'city' menjadi 'query' untuk pencarian lebih luas
    const apiKey = process.env.WEATHER_API_KEY;
    // Gunakan endpoint yang mendukung pencarian luas, misal 'search.json'
    const url = `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${query}`;

    const response = await axios.get(url);
    const locations = response.data; // Data berisi array lokasi

    // Mencari pengguna dan mengecek lokasi favorit
    const user = await User.findById(userId);

    let uniqueLocations = {};

    locations.forEach((location) => {
      const uniqueKey = `${location.name}-${location.region}`;
      if (!uniqueLocations[uniqueKey]) {
        const isFavorite = user.savedLocations.some(
          (savedLocation) =>
            savedLocation.name === location.name && savedLocation.isFavorite
        );

        uniqueLocations[uniqueKey] = {
          name: location.name,
          region: location.region,
          country: location.country,
          latitude: location.lat,
          longitude: location.lon,
          isFavorite: isFavorite,
        };
      }
    });

    // Mengkonversi objek kembali ke array
    const filteredData = Object.values(uniqueLocations);

    const customResponse = {
      message: "Data cuaca berdasarkan nama lokasi berhasil diperoleh.",
      data: filteredData, // Array dari lokasi yang sudah difilter
    };

    res.json(customResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan saat mengambil data cuaca.");
  }
};

// 3 Hari Ke depan berdasarkan Location
exports.getThreeDayForecast = async (req, res) => {
  try {
    const { city } = req.query;
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;

    const response = await axios.get(url);
    const forecastData = response.data;

    res.json({
      message: "Data prakiraan cuaca untuk 3 hari berhasil diperoleh.",
      data: forecastData,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Terjadi kesalahan saat mengambil data prakiraan cuaca.");
  }
};

// Trip Cuaca
// Endpoint untuk mendapatkan cuaca sepanjang rute
exports.getWeatherForRoute = async (req, res) => {
  try {
    // Misalnya, Anda mendapatkan array koordinat dari frontend
    const routeCoordinates = req.body.routeCoordinates;

    const weatherDataAlongRoute = [];

    for (const coordinate of routeCoordinates) {
      const url = `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${coordinate.lat},${coordinate.lon}`;
      const response = await axios.get(url);
      weatherDataAlongRoute.push(response.data);
    }

    res.json({
      message: "Data cuaca sepanjang rute berhasil diperoleh.",
      data: weatherDataAlongRoute,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Terjadi kesalahan saat mengambil data cuaca untuk rute.");
  }
};

// Di dalam controllers/userController.js

exports.saveLocation = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, lat, lon } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("Pengguna tidak ditemukan.");
    }

    // Mencari lokasi yang sama dalam savedLocations
    const existingLocation = user.savedLocations.find(
      (location) =>
        location.name === name && location.lat === lat && location.lon === lon
    );

    // Jika lokasi sudah ada dan isFavorite true, kirim respons tidak bisa menyimpan
    if (existingLocation && existingLocation.isFavorite) {
      return res.status(400).send("Lokasi sudah disimpan");
    } else if (existingLocation) {
      // Jika lokasi ada tetapi belum favorit, set sebagai favorit
      existingLocation.isFavorite = true;
    } else {
      // Jika lokasi belum ada, tambahkan sebagai lokasi baru dengan isFavorite true
      user.savedLocations.push({ name, lat, lon, isFavorite: true });
    }

    await user.save();
    res.status(200).send("Lokasi telah disimpan sebagai favorit.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan saat menyimpan lokasi.");
  }
};

exports.getSavedLocations = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).select("savedLocations");
    if (!user) {
      return res.status(404).send("Pengguna tidak ditemukan.");
    }

    res.status(200).json(user.savedLocations);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Terjadi kesalahan saat mengambil lokasi yang disimpan.");
  }
};

exports.getWeatherForSavedLocations = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).select("savedLocations");
    if (!user) {
      return res.status(404).send("Pengguna tidak ditemukan.");
    }

    let weatherDataForLocations = [];

    for (const location of user.savedLocations) {
      const urlCurrent = `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${location.lat},${location.lon}`;
      const urlForecast = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${location.lat},${location.lon}&days=3`;

      const responseCurrent = await axios.get(urlCurrent);
      const responseForecast = await axios.get(urlForecast);

      weatherDataForLocations.push({
        name: location.name,
        isFavorite: true, // Menambahkan informasi isFavorite ke dalam data
        currentWeather: responseCurrent.data,
        forecastWeather: responseForecast.data,
      });
    }

    res.json({
      message: "Data cuaca untuk lokasi yang disimpan berhasil diperoleh.",
      weatherData: weatherDataForLocations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan saat mengambil data cuaca.");
  }
};
exports.removeSavedLocation = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, lat, lon } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("Pengguna tidak ditemukan.");
    }

    // Filter out the location to be removed
    const filteredLocations = user.savedLocations.filter(
      (location) =>
        !(
          location.name === name &&
          location.lat === lat &&
          location.lon === lon
        )
    );

    // Update the user's saved locations
    user.savedLocations = filteredLocations;

    await user.save();
    res.status(200).send("Lokasi telah berhasil dihapus dari daftar.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan saat menghapus lokasi.");
  }
};

// MAP
exports.getWeatherAtStartPoint = async (req, res) => {
  try {
    const { startLat, startLon } = req.query;
    const apiKey = process.env.WEATHER_API_KEY; // Pastikan Anda telah menambahkan API Key WeatherAPI.com di .env
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${startLat},${startLon}`;

    const response = await axios.get(url);
    const weatherData = response.data;

    res.json({
      message: "Data cuaca di titik awal berhasil diperoleh.",
      data: weatherData,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Terjadi kesalahan saat mengambil data cuaca di titik awal.");
  }
};

// Fungsi untuk mendapatkan cuaca di titik tujuan
exports.getWeatherAtDestination = async (req, res) => {
  try {
    const { destLat, destLon } = req.query;
    const apiKey = process.env.WEATHER_API_KEY; // Pastikan Anda telah menambahkan API Key WeatherAPI.com di .env
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${destLat},${destLon}`;

    const response = await axios.get(url);
    const weatherData = response.data;

    res.json({
      message: "Data cuaca di titik tujuan berhasil diperoleh.",
      data: weatherData,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Terjadi kesalahan saat mengambil data cuaca di titik tujuan.");
  }
};
// END Map

// Notif
exports.sendPushNotification = async (req, res) => {
  try {
    const { userId, title, body } = req.body; // Asumsikan userId, judul, dan isi notifikasi dikirim dari klien

    const user = await User.findById(userId);
    if (!user || !user.fcmToken) {
      return res.status(404).send("Pengguna atau FCM token tidak ditemukan.");
    }

    const message = {
      notification: {
        title: title,
        body: body,
      },
      token: user.fcmToken,
    };

    // Kirim notifikasi menggunakan Firebase Admin
    admin
      .messaging()
      .send(message)
      .then((response) => {
        res.status(200).send({ success: true, messageId: response });
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        res.status(500).send({ success: false, error: error });
      });
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan saat mengirim push notification.");
  }
};
// End Notif
