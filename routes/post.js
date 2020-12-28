// Global Requirements
const express       = require("express"),
      router        = express.Router({mergeParams: true});

// Local Requirements
const Post          = require("../models/post"),
      middleware    = require("../middleware/index");

// Checking Current User on All Routes
// router.get("*", middleware.checkUser);
// router.post("*", middleware.checkUser);

// Showing All Posts
router.get("/", async (req, res) => {
    const allPosts = await Post.find({}).select("title author _id").catch(err => console.log(err));
    res.json(allPosts);
});

// Creating A New Post
router.post("/", middleware.requireAuth, middleware.checkUser, async (req, res) => {
    let newPost = ({
        title: req.body.title,
        content: req.body.content,
        author: {
            id: req.currentUser._id,
            username: req.currentUser.username
        }
    });
    console.log("posts: " + req.currentUser._id);

    const createdPost = await Post.create(newPost).catch(err => console.log(err));
    console.log(createdPost);
    res.json(createdPost);
});

// Show A Specific Post
router.get("/:id", async (req, res) => {
    await Post.findById(req.params.id, (err, foundPost) => {
        if (err) {
            console.log(err);
        } else {
            res.json(foundPost);
        }
    });
});

// Editing A Specific Post
router.put("/:id", async (req, res) => {
    return;
});

// Deleting A Specific Post
router.delete("/:id", async (req, res) => {
    return;
});

module.exports = router;