// Global Requirements
const Post          = require("../models/post");

// Show All Posts
module.exports.allPosts = async (req, res) => {
    const allPosts = await Post.find({}).select("title author _id").catch(err => console.log(err));
    res.json(allPosts);
}

// Create a New Post
module.exports.createPost = async (req, res) => {
    let newPost = ({
        title: req.body.title,
        content: req.body.content,
        author: {
            id: req.currentUser._id,
            username: req.currentUser.username
        }
    });

    const createdPost = await Post.create(newPost).catch(err => console.log(err));
    res.json(createdPost);
}

// Show Specific Post
module.exports.showPost = async (req, res) => {
    const foundPost = await Post.findById(req.params.id).catch(err => console.log(err));
    res.json(foundPost);
}

// Edit a Post
module.exports.editPost = async (req, res) => {
    updatedPost = req.body.post;
    const editedPost = await Post.findByIdAndUpdate(req.params.id, updatedPost).catch(err => console.log(err));
    res.json({ editedPost, updatedPost });
}

// Delete a Post
module.exports.deletePost = async (req, res) => {
    const deletedPost = await Post.findByIdAndRemove(req.params.id).catch(err => console.log(err));
    res.json({ success: true });
}