const jwt         = require("jsonwebtoken");
      User        = require("../models/user");

middleware = {}

// Is User Logged In?
middleware.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    
    // check jwt exists and && is verified
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err);
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
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.locals.user = null;
                next()
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
}


module.exports = middleware;