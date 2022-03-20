const express = require("express");
const mongoose = require("mongoose");
const Post = require("./postModel");
const app = express();

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://siva:sivaram262@cluster0.jeugg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(console.log("Mongo connect"))
  .catch((err) => console.log(err));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.get("/", async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json(err);
  }
});

app.post("/", async (req, res) => {
  try {
    const savePost = new Post({
      title: req.body.title,
      desc: req.body.desc,
    });
    const post = await savePost.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json(err);
  }
});

app.put("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json(err);
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const deletePost = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ "Post deleted successfully": deletePost });
  } catch (err) {
    res.status(404).json(err);
  }
});

app.options("/", (req, res) => {
  res.status(200).json("Request Method");
});

app.listen(5000, () => console.log("server running"));
