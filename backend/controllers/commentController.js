const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

const commentController = {
  //ADD A COMMENT
  addComment: async (req, res) => {
    try {
      const user = await User.findById(req.body.ownerId);
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        { $inc: { comments: 1 } }
      );
      const makeComment = {
        ...req.body,
        postId: req.params.id,
        username: user.username,
        avaUrl: user.profilePicture,
        theme: user.theme,
      };
      const newComment = new Comment(makeComment);
      const savedComment = await newComment.save();
      res.status(200).json(savedComment);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET ALL COMMENTS
  getAllComments: async (req, res) => {
    try {
      const comments = await Comment.find();
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //GET ALL COMMENTS IN A POST
  getCommentsInPost: async (req, res) => {
    try {
      const comments = await Comment.find({ postId: req.params.id });
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE COMMENT
  deleteComment: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      await Comment.findByIdAndDelete(req.params.id);
      await Post.findOneAndUpdate(
        { _id: comment.postId},
        { $inc: { comments: -1 } }
      );
      res.status(200).json("Delete comment succesfully");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = commentController;
