const jwt         = require("jsonwebtoken"),
      User        = require("../models/user"),
      Post        = require("../models/post"),
      Comment     = require("../models/comments");

// Storing All Middleware
middleware = {}

// Is User Logged In
middleware.requireAuth = (req, res, next) => {
    const token = req.get("Authorization"); // Get JWT from Header

    // Check if token is not null
    if (token) {
        // Verify and check authenticity of the token 
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.json({ tokenVerified: false });
            } else {
                next(); // Continue on route
            }
        });
    } else {
        res.json({ token: false });
    }
}

// Check Current User
middleware.checkUser = (req, res, next) => {
    const token = req.get("Authorization"); // Get JWT from Header

    // Check if token is not null
    if (token) {
        // Verify and check authenticity of the token 
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log("Error: " + err);
                next() // Continue on route
            } else {
                // Find user
                let user = await User.findById(decodedToken.id);
                req.currentUser = user; // Creating a global variable for the user
                next(); // Continue on route
            }
        });
    } else {
        next(); // Continue on route
    }
}

// Check Post Ownership
middleware.checkPostOwnership = (req, res, next) => {
    const token = req.get("Authorization"); // Get JWT from Header
    
    // Check if token is not null
    if (token) {
        // Verify and check authenticity of the token 
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log("Error: " + err);
                res.json({ tokenVerified: false});
            } else {
                // Find post
                let post = await Post.findById(req.params.id).catch(err => console.log(err));
                // Check if author and user are the same
                if (post.author.id.equals(decodedToken.id)) {
                    next(); // Continue on route
                } else {
                    res.json({ postOwnership: false });
                }
            }
        });
    } else {
        res.json({ token: false});
    }
}

// Check Comment Ownership
middleware.checkCommentOwnership = (req, res, next) => {
    const token = req.get("Authorization"); // Get JWT from Header

    // Check if token is not null
    if (token) {
        // Verify and check authenticity of the token
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log("Error: " + err);
                res.json({ tokenVerified: false});
            } else {
                // Find comment
                let comment = await Comment.findById(req.params.comment_id).catch(err => console.log(err));
                // Check if author and user are the same
                if (comment.author.id.equals(decodedToken.id)) {
                    next(); // Continue on Route
                } else {
                    res.json({ commentOwnership: false });
                }
            }
        });
    } else {
        res.json({ token: false});
    }
}

// Check ownership before showing post
middleware.checkOwnership = (req, res, next) => {
    const token = req.get("Authorization"); // Get JWT from Header

    // Check if token is not null
    if (token) {
        // Verify and check authenticity of the token
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log("Error: " + err);
                next();
            } else {
                // Find comment
                let post = await Post.findById(req.params.comment_id).catch(err => console.log(err));
                // Check if author and user are the same
                if (post.author.id.equals(decodedToken.id)) {
                    res.json({ postOwnership: true });
                    next(); // Continue on Route
                } else {
                    res.json({ postOwnership: false });
                    next();
                }
            }
        });
    } else {
        res.json({ postOwnership: false });
        next();
    }
}

module.exports = middleware;