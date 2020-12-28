// Global Requirements
const express         = require("express"),
      router          = express.Router({mergeParams: true});

// Local Requirements
const middleware      = require("../middleware/index"),
      postController  = require("../controllers/postController");

router.get("/", postController.allPosts);
router.post("/", middleware.requireAuth, middleware.checkUser, postController.createPost);
router.get("/:id", postController.showPost);
router.put("/:id", middleware.checkPostOwnership, postController.editPost);
router.delete("/:id", middleware.checkPostOwnership, postController.deletePost);

module.exports = router;