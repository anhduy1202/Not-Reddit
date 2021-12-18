const Post = require("../models/Post");
const User = require("../models/User");

const postController = {
  //CREATE A POST
  createPost: async (req, res) => {
    const users = await User.findById(req.body.userId);
    const makePost = {
      ...req.body,
      username: users.username,
      avaUrl: users.profilePicture,
      theme: users.theme,
    };
    const newPost = new Post(makePost);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE A POST
  updatePost: async (req, res) => {
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
  },

  //DELETE A POST
  deletePost: async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (req.body.userId === post.userId) {
      try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json("Delete post succesfully");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can't delete other people post");
    }
  },

  //GET ALL POST FROM A USER
  getPostsFromOne: async (req, res) => {
    try {
      const post = await Post.find({ userId: req.params.id });
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET ALL POSTS
  getAllPosts: async (req, res) => {
    const byVotes = req.query.hot;
    let posts;
    try {
      if (byVotes) {
        posts = await Post.find().sort({ upvotes: -1});
      } else {
        posts = await Post.find().sort({ createdAt: -1 });
      }
      res.status(200).json(posts);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //UPVOTE A POST
  upvotePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id.trim());
      if (!post.upvotes.includes(req.body.userId)) {
        await post.updateOne({ $push: { upvotes: req.body.userId } });
        await User.findOneAndUpdate(
          { _id: post.userId },
          { $inc: { karmas: 10 } }
        );
        res.status(200).json("Post is upvoted!");
      } else if (post.upvotes.includes(req.body.userId)) {
        await post.updateOne({ $pull: { upvotes: req.body.userId } });
        await User.findOneAndUpdate(
          { _id: post.userId },
          { $inc: { karmas: -10 } }
        );
        res.status(200).json("Post is no longer upvoted!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DOWNVOTE POST
  downvotePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id.trim());
      if (!post.downvotes.includes(req.body.userId)) {
        await post.updateOne({ $push: { downvotes: req.body.userId } });
        //POST OWNER LOSES KARMAS FROM THE DOWNVOTES
        await User.findOneAndUpdate(
          { _id: post.userId },
          { $inc: { karmas: -10 } }
        );
        res.status(200).json("Post is downvoted!");
      } else if (post.downvotes.includes(req.body.userId)) {
        await post.updateOne({ $pull: { downvotes: req.body.userId } });
        await User.findOneAndUpdate(
          { _id: post.userId },
          { $inc: { karmas: 10 } }
        );
        res.status(200).json("Post is no longer downvoted!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = postController;
