const router = require("express").Router();
const commentController = require("../controllers/commentController");
const postController = require("../controllers/postController");
const {
  verifyToken,
  verifyTokenAndUserPostAuthorization,
} = require("../controllers/verifyToken");

//CREATE A POST
router.post("/", verifyToken, postController.createPost);

//UPDATE A POST
router.put(
  "/:id",
  verifyTokenAndUserPostAuthorization,
  postController.updatePost
);

//DELETE A POST
router.delete(
  "/:id",
  verifyTokenAndUserPostAuthorization,
  postController.deletePost
);

//GET ALL POST FROM A USER
router.get("/user/:id", verifyToken, postController.getPostsFromOne);

//GET ALL POSTS
router.get("/", verifyToken, postController.getAllPosts);

//UPVOTE A POST
router.put("/:id/upvote", verifyToken, postController.upvotePost);

//DOWNVOTE A POST
router.put("/:id/downvote", verifyToken, postController.downvotePost);

//ADD A COMMENT
router.post("/comment/:id", verifyToken, commentController.addComment);

//GET ALL COMMENTS IN A POST
router.get("/comment/:id", verifyToken, commentController.getCommentsInPost);

module.exports = router;
