const router = require("express").Router();
const Post = require("../models/Post");
const commentController = require("../controllers/commentController");
const middlewareController = require("../controllers/middlewareController");
const postController = require("../controllers/postController");
const upload = require("../utils/multer");

//CREATE A POST
router.post(
  "/",
  upload.single("image"),
  middlewareController.verifyToken,
  postController.createPost
);

//UPDATE A POST
router.put(
  "/:id",
  middlewareController.verifyTokenAndUserPostAuthorization,
  postController.updatePost
);

//DELETE A POST
router.delete(
  "/:id",
  middlewareController.verifyTokenAndUserPostAuthorization,
  postController.deletePost
);

//GET ALL POST FROM A USER
router.get(
  "/user/:id",
  middlewareController.verifyToken,
  postController.getPostsFromOne
);

//GET ALL POSTS
router.get(
  "/",
  middlewareController.verifyToken,
  middlewareController.paginatedResult(Post),
  postController.getAllPosts
);

//GET TIMELINE POST
router.post(
  "/timeline",
  middlewareController.verifyToken,
  postController.getFriendsPost
);

//UPVOTE A POST
router.put(
  "/:id/upvote",
  middlewareController.verifyToken,
  postController.upvotePost
);

//DOWNVOTE A POST
router.put(
  "/:id/downvote",
  middlewareController.verifyToken,
  postController.downvotePost
);

router.put(
  "/:id/favorite",
  middlewareController.verifyToken,
  postController.addFavoritePost
);
//ADD A COMMENT
router.post(
  "/comment/:id",
  middlewareController.verifyToken,
  commentController.addComment
);

//GET ALL COMMENTS
router.get(
  "/comments",
  middlewareController.verifyToken,
  commentController.getAllComments
);

//GET FAVORITE POSTS
router.get(
  "/favorites",
  middlewareController.verifyToken,
  postController.getFavoritePosts
);

//GET ALL COMMENTS IN A POST
router.get(
  "/comment/:id",
  middlewareController.verifyToken,
  commentController.getCommentsInPost
);

//DELETE A COMMENT
router.delete(
  "/comment/:id",
  middlewareController.verifyTokenAndCommentAuthorization,
  commentController.deleteComment
);
module.exports = router;
