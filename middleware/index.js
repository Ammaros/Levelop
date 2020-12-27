const jwt         = require("jsonwebtoken");
      User        = require("../models/user");

middleware = {}

// Is User Logged In?
middleware.requireAuth = (req, res, next) => {
    const token = req.get("Authorization");
    
    // check jwt exists and && is verified
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.json({ tokenVerified: false });
            } else {
                next();
            }
        });
    } else {
        res.json({ authenticated: false });
    }
}

// Check Current User
middleware.checkUser = (req, res, next) => {
    const token = req.get("Authorization");
    console.log(token);

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log("Error: " + err);
                console.log(decodedToken._id);
                // res.locals.user = null;
                next()
            } else {
                let user = await User.findById(decodedToken.id);
                // res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
}


module.exports = middleware;