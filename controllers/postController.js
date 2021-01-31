// Global Requirements
const Post          = require("../models/post");

// Show All Posts
module.exports.allPosts = async (req, res) => {
    const allPosts = await Post.find({}).select("title author _id").catch(err => console.log(err));
    res.json(allPosts);
}

// Create a New Post
module.exports.createPost = async (req, res) => {
    // Making an object with data from frontend
    let newPost = ({
        title: req.body.title,
        content: req.body.content,
        author: {
            id: req.currentUser._id,
            username: req.currentUser.username
        }
    });

    // Creating a new Post
    const createdPost = await Post.create(newPost).catch(err => console.log(err));
    res.json(createdPost);
}

// Show Specific Post
module.exports.showPost = async (req, res) => {
    // Finding a Post, populating it with comments and passing it
    let user = req.currentUser || "";
    const foundPost = await Post.findById(req.params.id)
                    .populate("comments")
                    .exec().catch(err => console.log(err));
    
    if (user) {
        res.json({ foundPost, user });
    } else {
        res.json({ foundPost });
    }
}

// Edit a Post
module.exports.editPost = async (req, res) => {
    // Getting post id and changed data to update the post 
    let updatedPost = req.body.post;
    const editedPost = await Post.findByIdAndUpdate(req.params.id, updatedPost)
                    .populate("comments")
                    .exec().catch(err => console.log(err));
    res.json({ editedPost });
}

// Delete a Post
module.exports.deletePost = async (req, res) => {
    // Finding a post by id and removing from DB
    const deletedPost = await Post.findByIdAndRemove(req.params.id).catch(err => console.log(err));
    res.json({ success: true });
}