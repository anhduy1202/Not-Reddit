const router = require("express").Router();
const fetchComments = require("../controllers/commentController");
const Post = require("../models/Post");

//CREATE A POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE A POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id.trim());
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post has been updated");
    } else {
      res.status(403).json("You can only update your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE A POST
router.delete("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (req.body.userId === post.userId) {
    try {
      await post.findByIdAndDelete(req.params.id);
      res.send(200).json("Delete post succesfully");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.send(403).json("You can't delete other people post");
  }
});

//GET ALL POST FROM A USER
router.get("/user/:id", async (req, res) => {
  try {
    const post = await Post.find({ userId: req.params.id });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPVOTE A POST
router.put("/upvote/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id.trim());
    if (!post.upvotes.includes(req.body.userId)) {
      await post.updateOne({ $push: { upvotes: req.body.userId } });
      res.status(200).json("Post is upvoted!");
    } else if (post.upvotes.includes(req.body.userId)) {
      await post.updateOne({ $pull: { upvotes: req.body.userId } });
      res.status(200).json("Post is no longer upvoted!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DOWNVOTE A POST
router.put("/downvote/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id.trim());
    if (!post.downvotes.includes(req.body.userId)) {
      await post.updateOne({ $push: { downvotes: req.body.userId } });
      res.status(200).json("Post is downvoted!");
    } else if (post.downvotes.includes(req.body.userId)) {
      await post.updateOne({ $pull: { downvotes: req.body.userId } });
      res.status(200).json("Post is no longer downvoted!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//ADD A COMMENT
router.post("/comment/:id", async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, {
      $push: {
        comments: { content: req.body.content, ownerId: req.body.ownerId },
      },
    });
    res.status(200).json("A comment is added");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL COMMENTS IN A POST
router.get("/comment/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comments = post.comments;
    const commentArr = await fetchComments(comments);
    console.log(commentArr);
    res.status(200).json(commentArr);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE COMMENT IN A POST

//EDIT COMMENT IN A POST

module.exports = router;
