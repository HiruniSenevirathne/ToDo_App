const mongoose = require("mongoose");
const mongodb = require("mongodb");
const dbModels = require("./post-model");

const DBUrl = "mongodb://localhost:27017/postsdb";

const initMongoConnection = async () => {
  try {
    console.log("db url:", DBUrl);
    await mongoose.connect(DBUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(err);
  }
};

const createPost = async (post) => {
  const createdPost = await dbModels.PostModel.create(post);
  return createdPost;
};

const findPostById = async (postId) => {
  const item = await dbModels.PostModel.findOne({
    _id: postId,
  });
  if (item) {
    return item;
  } else {
    throw "Item not found!";
  }
};

const findPosts = async () => {
  const postList = await dbModels.PostModel.find({});
  console.log(postList);
  return postList;
};

const findPostWithPaginate = async (limit, skip) => {
  const [postList, totalItems] = await Promise.all([
    dbModels.PostModel.find({}).limit(limit).skip(skip),
    dbModels.PostModel.countDocuments({}),
  ]);
  return { items: postList, count: totalItems };
};

const deletePost = async (postId) => {
  const foundPost = await findPostById(postId);
  if (foundPost == null) {
    throw "Post not found !";
  }
  await dbModels.PostModel.deleteOne({ _id: mongodb.ObjectId(postId) });
};
module.exports = {
  connectDb: initMongoConnection,
  createPost: createPost,
  findPostById: findPostById,
  findPosts: findPosts,
  deletePost: deletePost,
  findPostWithPaginate: findPostWithPaginate,
};
