// models/User.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: String,
  nickName: { type: String, unique: true, required: true },
  avatarUser: String,
  email: { type: String, unique: true, required: true },
  password: String,
  confirmed: { type: Boolean, default: false },
  confirmationToken: String,
  tokenExpiration: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  savedLocations: [
    {
      name: String,
      lat: Number,
      lon: Number,
      isFavorite: { type: Boolean, default: false },
    },
  ],
  fcmToken: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);
