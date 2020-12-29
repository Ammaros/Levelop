const jwt         = require("jsonwebtoken"),
      User        = require("../models/user"),
      Post        = require("../models/post"),
      Comment     = require("../models/comments");

middleware = {}

// Is User Logged In
middleware.requireAuth = (req, res, next) => {
    const token = req.get("Authorization");

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

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log("Error: " + err);
                next()
            } else {
                let user = await User.findById(decodedToken.id)
                req.currentUser = user;
                next();
            }
        });
    } else {
        next();
    }
}

// Check Post Ownership
middleware.checkPostOwnership = (req, res, next) => {
    const token = req.get("Authorization");
    
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log("Error: " + err);
                res.json("Token Not Verified");
            } else {
                let post = await Post.findById(req.params.id).catch(err => console.log(err));
                if (post.author.id.equals(decodedToken.id)) {
                    next();
                } else {
                    res.json({ postOwnership: false });
                }
            }
        });
    } else {
        res.json("Invalid Token");
    }
}

// Check Comment Ownership
middleware.checkCommentOwnership = (req, res, next) => {
    const token = req.get("Authorization");

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log("Error: " + err);
                res.json("Token Not Verified");
            } else {
                let comment = await Comment.findById(req.params.id).catch(err => console.log(err));
                if (comment.author.id.equals(decodedToken.id)) {
                    next();
                } else {
                    res.json({ commentOwnership: false });
                }
            }
        });
    } else {
        res.json("Invalid Token");
    }
}

module.exports = middleware;