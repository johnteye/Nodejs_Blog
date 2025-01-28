const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Get all posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single post by ID
router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;