const Post = require("../models/Post");
const User = require("../models/User");

const commentController = {
  //ADD A COMMENT
  addComment: async (req, res) => {
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
  },

  //FETCH COMMENTS
  fetchComments: async (comments) => {
    const commentArr = [];
    for (const comment of comments) {
      try {
        const username = await User.findById(comment.ownerId);
        const newComment = {
          content: comment.content,
          owner: username.displayName,
        };
        commentArr.push(newComment);
      } catch (err) {
        console.log(err);
      }
    }
    return commentArr;
  },

  //GET ALL COMMENTS IN A POST
  getCommentsInPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments = post.comments;
      const commentArr = await commentController.fetchComments(comments);
      res.status(200).json(commentArr);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = commentController;
