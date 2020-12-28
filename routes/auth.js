// Global Requirements
const express           = require("express"),
      authController    = require("../controllers/authController"),
      router            = express.Router();

// Routes
router.get("/", authController.index);
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;