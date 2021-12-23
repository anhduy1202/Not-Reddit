const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const bcrypt = require("bcrypt");
const authController = require("./authController");

const userController = {
  //GET A USER
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE A USER
  deleteUser: async (req, res) => {
    if (req.body.userId === req.params.id) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can only delete your account");
    }
  },

  //UPDATE A USER
  updateUser: async (req, res) => {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id.trim(),
        {
          $set: req.body,
        },
        { returnDocument: "after" }
      );
      const accessToken = await authController.generateAccessToken(user);
      if (req.body.profilePicture || req.body.theme) {
        try {
          await Post.updateMany(
            { userId: req.params.id },
            {
              $set: { avaUrl: req.body.profilePicture, theme: req.body.theme },
            }
          );
          await Comment.updateMany(
            { ownerId: req.params.id },
            {
              $set: { avaUrl: req.body.profilePicture, theme: req.body.theme },
            }
          );
        } catch (err) {
          return res.status(500).json(err);
        }
      }
      const { password, ...others } = user._doc;
      res.status(200).json({ ...others, accessToken });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //FOLLOW A USER
  followUser: async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        //If user not follow yet
        if (!user.followers.includes(req.body.userId)) {
          await user.updateOne({ $push: { followers: req.body.userId } });
          await currentUser.updateOne({ $push: { followings: req.params.id } });
          res.status(200).json("user is followed");
        } else {
          res.status(200).json("You already follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can't follow yourself");
    }
  },

  //UNFOLLOW A USER
  unfollowUser: async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        //If user followed
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).json("user is unfollowed");
        } else {
          res.status(200).json("You already unfollow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can't unfollow yourself");
    }
  },
};

module.exports = userController;
