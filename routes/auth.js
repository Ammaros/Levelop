// Global Requirements
const express           = require("express"),
      authController    = require("../controllers/authController"),
      router            = express.Router();

// Index GET Route
router.get("/", authController.index);
// Register POST Route
router.post("/register", authController.register);
// Login POST Route
router.post("/login", authController.login);

module.exports = router; // Exporting routes to use in app.js