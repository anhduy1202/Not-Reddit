const router = require("express").Router();
const commentController = require("../controllers/commentController");
const postController = require("../controllers/postController");

//CREATE A POST
router.post("/", postController.createPost);

//UPDATE A POST
router.put("/:id", postController.updatePost);

//DELETE A POST
router.delete("/:id", postController.deletePost);

//GET ALL POST FROM A USER
router.get("/user/:id", postController.getPostsFromOne);

//GET ALL POSTS
router.get("/", postController.getAllPosts);

//UPVOTE A POST
router.put("/:id/upvote", postController.upvotePost);

//DOWNVOTE A POST
router.put("/:id/downvote", postController.downvotePost);

//ADD A COMMENT
router.post("/comment/:id",commentController.addComment);

//GET ALL COMMENTS IN A POST
router.get("/comment/:id",commentController.getCommentsInPost);

module.exports = router;
