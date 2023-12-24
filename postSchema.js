const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  text: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Post = mongoose.model("Post", postSchema);

const commentSchema = new mongoose.Schema({
  title: String,
  text: String,
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Comment, Post };
