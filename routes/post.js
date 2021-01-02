// Global Requirements
const express         = require("express"),
      router          = express.Router({mergeParams: true});

// Local Requirements
const middleware      = require("../middleware/index"),
      postController  = require("../controllers/postController");

// All Posts GET Route
router.get("/", postController.allPosts);
// New Post POST Route
router.post("/", middleware.requireAuth, middleware.checkUser, postController.createPost);
// Show Post GET Route
router.get("/:id", postController.showPost);
// Edit Post PUT Route
router.put("/:id", middleware.checkPostOwnership, postController.editPost);
// Delete Post DELETE Route
router.delete("/:id", middleware.checkPostOwnership, postController.deletePost);

module.exports = router; // Exporting routes to use in app.js