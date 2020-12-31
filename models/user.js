const mongoose                = require("mongoose"),
      { isEmail }             = require("validator"),
      bcrypt                  = require("bcrypt");

// Schema Setup
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter a email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Minimum length is 6 characters"]
    },
    username: {
        type: String,
        required: [true, "Please enter a username"],
        unique: true
    },
    fullname: {
        type: String,
        required: [true, "Please enter your full name"]
    }
});

// Encrypting Password Before Adding User To Database
userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Static Method To Login User
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("incorrect password");
    }
    throw Error("incorrect email");
}

const User = mongoose.model("User", userSchema);
module.exports = User;