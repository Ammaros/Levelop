// Global Requirements
const express           = require("express"),
      router            = express.Router({mergeParams: true});

// Local Requirements
const middleware        = require("../middleware/index"),
      commentController = require("../controllers/commentController");

router.post("/", middleware.requireAuth, middleware.checkUser, commentController.newComment);
router.put("/:comment_id", middleware.checkCommentOwnership, commentController.editComment);
router.delete("/:comment_id", middleware.checkCommentOwnership, commentController.deleteComment);

module.exports = router;