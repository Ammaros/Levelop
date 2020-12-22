// Global Requirements
const express   = require("express"),
      passport  = require("passport"),
      router    = express.Router();

// Local Requirements
const User      = require("../models/user");

// Index Route
router.get("/", async (req, res) => {
    res.send("Lamo");
});

// Handling User Register
router.post("/register", async (req, res) => {
    let user = new User({
        username: req.body.username,
        email: req.body.email,
        fullName: req.body.fullName
    });
    let password = req.body.password;

    await User.register(user, password, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            console.log("User Created!");
            res.send(user);
        }
    }).catch(e => { res.send(e + "WOW") });
});

// Handling User Login
router.post("/login", passport.authenticate("local", {
    successRedirect: "/posts",
    failureRedirect: "/login"
}), (req, res) => { res.send("Logged in") });

// Logging Out User
router.get("/logout", async (req, res) => {
    req.logout();
    res.redirect("/login");
});

module.exports = router;