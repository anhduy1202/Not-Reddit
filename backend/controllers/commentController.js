const User = require("../models/User");

const fetchComments = async (comments) => {
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
};

module.exports = fetchComments;
