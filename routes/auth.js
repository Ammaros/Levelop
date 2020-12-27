// Global Requirements
const express           = require("express"),
      authController    = require("../controllers/authController"),
      router            = express.Router();

// Local Requirements
const User              = require("../models/user");

// Routes
router.get("/", authController.index);
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;