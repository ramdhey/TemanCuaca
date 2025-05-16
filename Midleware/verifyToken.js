const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1]; // Bearer Token

  if (!token) {
    return res.status(403).send("Token diperlukan untuk autentikasi.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Menambahkan data pengguna ke request
  } catch (error) {
    return res.status(401).send("Token tidak valid.");
  }

  return next();
};

module.exports = verifyToken;
