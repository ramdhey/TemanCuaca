const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../Midleware/verifyToken");

router.post("/register", userController.register);
router.get("/confirm/:token", userController.confirmEmail);
router.post("/login", userController.login);
router.get("/getProfile", verifyToken, userController.getProfile);
router.put("/profile", verifyToken, userController.editProfile);
router.post(
  "/request-reset-password",
  verifyToken,
  userController.requestResetPassword
);
router.post("/change-password", verifyToken, userController.changePassword);
router.post("/reset-password", userController.resetPassword);
router.post("/forgot-password", userController.forgotPassword);
// Di routes/users.js
router.get("/weather", verifyToken, userController.getWeatherData);
router.get("/user-loc", verifyToken, userController.getWeatherByLatLon);
router.get(
  "/detail-cuaca-user",
  verifyToken,
  userController.getThreeDayForecastUser
);
router.get("/search-loc", verifyToken, userController.getWeatherSuggestions);
router.get(
  "/detail-cuaca-loc",
  verifyToken,
  userController.getThreeDayForecast
);
router.get("/rute-cuaca", verifyToken, userController.getWeatherForRoute);
router.post("/save-location", verifyToken, userController.saveLocation);
router.delete(
  "/removeSavedLocation",
  verifyToken,
  userController.removeSavedLocation
);
router.get("/saved-locations", verifyToken, userController.getSavedLocations);
router.get(
  "/weather-saved-locations",
  verifyToken,
  userController.getWeatherForSavedLocations
);
// Tambahkan route untuk cuaca di titik awal
router.get(
  "/weather/start",
  verifyToken,
  userController.getWeatherAtStartPoint
);

// Tambahkan route untuk cuaca di titik tujuan
router.get(
  "/weather/destination",
  verifyToken,
  userController.getWeatherAtDestination
);
router.post(
  "/send-notification",
  verifyToken,
  userController.sendPushNotification
);

module.exports = router;
