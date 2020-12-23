// Global Requirements
const express   = require("express"),
      passport  = require("passport"),
      router    = express.Router();

// Local Requirements
const User      = require("../models/user");

// Index Route
router.get("/", async (req, res) => {
    res.send("Levelop");
});

// Handling User Register
router.post("/register", async (req, res) => {
    let user = new User({
        username: req.body.username,
        email: req.body.email,
        fullName: req.body.fullName
    });
    let password = req.body.password;

    const newUser = await User.register(user, password).catch(err => console.log(err));
    res.json(newUser);
});

// Handling User Login
router.post("/login", passport.authenticate("local"), async (req, res) => {
    const foundUser = await User.find({email: req.body.email}).catch(err => console.log(err));
    res.json(foundUser);
});

// Logging Out User
router.get("/logout", async (req, res) => {
    req.logout();
    res.json("User Logged Out!");
});

module.exports = router;