const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const dbFunctions = require("./db-functions.js");

dbFunctions.connectDb();

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3200;

app.post("/createPost", async (req, res) => {
  try {
    if (!req.body.msg) {
      //req.body.msg == null OR undefined OR false
      throw "Message required!";
    }

    const createdPost = await dbFunctions.createPost(req.body);
    res.json({
      status: "OK",
      result: createdPost,
    });
  } catch (err) {
    res.status(400).json({
      status: "ERROR",
      error: err,
    });
  }
});

app.get("/getPostById", async (req, res) => {
  try {
    if (!req.query.postId) {
      throw "postId required!";
    }
    const post = await dbFunctions.findPostById(req.query.postId);
    res.json({
      status: "OK",
      result: post,
    });
  } catch (err) {
    res.status(400).json({
      status: "ERROR",
      error: err,
    });
  }
});

app.get("/paginatedList", async (req, res) => {
  try {
    const limit = +req.query.limit;
    const skip = +req.query.skip;

    if (isNaN(limit) || limit > 50) {
      throw "limit not valid";
    }
    if (isNaN(skip) || skip < 0) {
      throw "skip not valid";
    }
    const postResult = await dbFunctions.findPostWithPaginate(limit, skip);
    res.json({
      status: "OK",
      result: postResult,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: "ERROR",
      error: err,
    });
  }
});

app.get("/list", async (req, res) => {
  try {
    const postList = await dbFunctions.findPosts();
    res.json({
      status: "OK",
      result: postList,
    });
  } catch (err) {
    res.status(400).json({
      status: "ERROR",
      error: err,
    });
  }
});

app.post("/deleteById", async (req, res) => {
  try {
    const postId = req.body.post_id;
    await dbFunctions.deletePost(postId);
    return res.json({
      status: "OK",
    });
  } catch (err) {
    res.status(400).json({
      status: "ERROR",
      error: err,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
