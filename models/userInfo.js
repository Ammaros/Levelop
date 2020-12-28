const mongoose = require("mongoose");

// Schema Setup
let userInfoSchema = new mongoose.Schema({
    image: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        imageURL: String
    },
    nibbles: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        count: Number
    }
});

module.exports = mongoose.model("UserInfo", userInfoSchema);