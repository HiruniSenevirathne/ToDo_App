const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
    maxLength: 35,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

const PostSchema = new mongoose.Schema({
  msg: {
    type: String,
    required: true,
    maxLength: 35,
  },
  category: {
    type: String,
  },
  tags: [{ type: String, maxLength: 10 }],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 2.5,
  },
  comments: [CommentSchema],
});

const PostModel = mongoose.model("Posts", PostSchema);

module.exports = {
  PostModel: PostModel,
};
