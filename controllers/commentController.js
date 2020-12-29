const Comment       = require("../models/comments");

// Create a New Comment
module.exports.newComment = async (req, res) => {
    let foundPost = await Post.findById(req.params.id).catch(err => console.log(err));
    const newComment = ({
        text: req.body.text,
        author: {
            id: req.currentUser._id,
            username: req.currentUser.username
        }
    });
    const createdComment = await Comment.create(newComment).catch(err => console.log(err));
    foundPost.comments.push(createdComment);
    foundPost.save();
    res.json(createdComment, foundPost);
}

// Edit a Comment
module.exports.editComment = async (req, res) => {
    const editedComment = await Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment).catch(err => console.log(err));
    res.json(editedComment)
}

// Delete a Comment
module.exports.deleteComment = async (req, res) => {
    let deletedComment = await Comment.findByIdAndRemove(req.params.comment_id).catch(err => console.log(err));
    res.json({ success: true });
}