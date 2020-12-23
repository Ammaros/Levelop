const mongoose              = require("mongoose"),
      passportLocalMongoose = require("passport-local-mongoose");

// Schema Setup
let userSchema = new mongoose.Schema({
    fullName: String,
    username: String,
    email: String,
    password: String,
    imageURL: String
});

userSchema.plugin(passportLocalMongoose, { usernameField : 'email' });
module.exports = mongoose.model("User", userSchema);