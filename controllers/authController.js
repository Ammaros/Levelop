const User          = require("../models/user"),
      jwt           = require("jsonwebtoken"),
      authErrors    = require("./authErrors");

// *CREATING JWT*
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 260000 });
}

// Index Page
module.exports.index = async (req, res) => {
    res.json("You have arrived at the Index Page");
} 

// Register Page
module.exports.register = async (req, res) => {
    const { email, password, username } = req.body;
    
    try {
        const newUser = await User.create({ email, password, username });
        const token = createToken(newUser._id);
        res.status(201).json({ newUser, token });
    } catch (err) {
        const errors = authErrors.handleRegisterErrors(err);
        res.status(400).json({ errors });
    }
}

// Login Page
module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({ user, token });
    } catch (err) {
        const errors = authErrors.handleLoginErrors(err);
        res.status(400).json({ errors });
    }
}