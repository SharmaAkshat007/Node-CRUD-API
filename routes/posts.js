const router = require("express").Router();

const Post = require("../models/Post.js");

//Requiring Post Schema
const Posts = require("../models/Post.js");

//Requiring validation function
const { postCreation, postUpdate } = require("../validation/posts.js");

// Getting all the posts from the database
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();

    if (posts.length === 0) {
      return res.status(404).send("No posts");
    }

    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Getting post with specific id
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send("No post with given id is found");
    }

    res.status(200).send(post);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Creating a new post

router.post("/create", async (req, res) => {
  const validate = postCreation(req.body);

  if (validate.error) {
    const messages = validate.error.details.map((detail) => detail.message);
    return res.status(400).send(messages);
  }

  try {
    const { author, title, body } = req.body;
    const post = await Post.findOne({ title: title });

    if (post) {
      return res
        .status(409)
        .send("A post with similar title is already existing");
    }

    const newPost = new Post({
      author,
      title,
      body,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Update a sepecific post

router.patch("/update/:id", async (req, res) => {
  const validate = postUpdate(req.body);

  if (validate.error) {
    const messages = validate.error.details.map((detail) => detail.message);
    return res.status(400).send(messages);
  }

  try {
    const { author, title, body } = req.body;

    const post = await Post.findById(req.params.id);

    const newPost = await Post.updateOne(
      { _id: post._id },
      { author, title, body }
    );

    if (!newPost) {
      return res.status(404).send("No post with given id is found");
    }

    res.status(200).json(`Updated : ${newPost.nModified}`);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Delete post with specific id

router.delete("/delete/:id", async (req, res) => {
  try {
    const post = await Post.deleteOne({ _id: req.params.id });

    if (post.n === 0) {
      return res.status(404).send("No post with similar id is found");
    }

    res.status(200).json(`Post deleted : ${post.n}`);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Delete all posts

router.delete("/delete", async (req, res) => {
  try {
    const post = await Post.deleteMany({});

    if (post.n === 0) {
      return res.status(404).send("No post is present");
    }

    res.status(200).json(`Post deleted : ${post.n}`);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
