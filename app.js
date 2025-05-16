require("dotenv").config();
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var helmet = require("helmet");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var admin = require("firebase-admin");
var serviceAccount = require("./temancuaca-4bb33-firebase-adminsdk-g2bmj-bdf524ba6b.json");
// var bodyParser = require("body-parser");

var app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Database terkoneksi dengan sukses."))
  .catch((err) => console.error("Gagal terkoneksi ke database:", err));

var server = app.listen(port, () => {
  console.log(`Server berjalan pada http://localhost:${port}`);
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Untuk URL-encoded payload
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // Sesuaikan '50mb' sesuai kebutuhan

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(helmet());
app.use("/", indexRouter);
app.use("/users", usersRouter);

// Menambahkan rutin pembersihan
setInterval(async () => {
  try {
    await User.deleteMany({
      confirmed: false,
      tokenExpiration: { $lt: Date.now() },
    });
    console.log("Rutin pembersihan akun tidak terverifikasi telah dijalankan");
  } catch (error) {
    console.error("Error saat menjalankan rutin pembersihan:", error);
  }
}, 3600000); // Setiap 1 jam

module.exports = app;
