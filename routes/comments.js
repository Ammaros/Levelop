// Global Requirements
const express           = require("express"),
      router            = express.Router({mergeParams: true});

// Local Requirements
const middleware        = require("../middleware/index"),
      commentController = require("../controllers/commentController");

// New Comment POST Route
router.post("/", middleware.requireAuth, middleware.checkUser, commentController.newComment);
// Edit Comment PUT Route
router.put("/:comment_id", middleware.checkCommentOwnership, commentController.editComment);
// Delete Comment DELETE Route
router.delete("/:comment_id", middleware.checkCommentOwnership, commentController.deleteComment);

module.exports = router; // Exporting routes to use in app.js