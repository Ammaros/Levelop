const User      = require("../models/user"),
      jwt       = require("jsonwebtoken");

// *REGISTER ERROR HANDLING*
const handleRegisterErrors = err => {
    // console.log(err.message, err.code);
    errors = { email: "", password: "", username: "" };

    // duplicate error code
    if (err.code === 11000) {
        errors.email = "That email is already taken!";
        return errors;
    }
        
    // validation errors
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

// *LOGIN ERROR HANDLING*
const handleLoginErrors = err => {
    errors = { email: "", password: ""}

    // incorrect email
    if (err.message === "incorrect email") {
        errors.email = "That email is not registered"
    }

    // incorrect password
    if (err.message === "incorrect password") {
        errors.password = "That password does not match the email"
    }
    return errors
}

// *CREATING JWT*
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 260000 });
}

module.exports.index = async (req, res) => {
    res.json("You have arrived at the Index Page");
} 

module.exports.register = async (req, res) => {
    const { email, password, username } = req.body;
    
    try {
        const newUser = await User.create({ email, password, username });
        const token = createToken(newUser._id);
        res.cookie("jwt", token, { maxAge: 260000000 });
        res.status(201).json(newUser);
    } catch (err) {
        const errors = handleRegisterErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, { maxAge: 260000000 });
        res.status(200).json({ user });
    } catch (err) {
        const errors = handleLoginErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.logout = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.json({ loggedOut: true });
}