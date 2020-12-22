const Post        = require("../models/post");

var middlewareObj = {}

// Is User Logged In?
middlewareObj.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    // Redirect
}

// Does The User Own The Post Or It's Children
middlewareObj.checkPostOwnership = (req, res, next) => {
    return;
}

module.exports = middlewareObj;