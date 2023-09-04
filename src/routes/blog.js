const express = require("express");
const auth = require("../middleware/auth");
const {
  BlogPost,
  validateBlogPost,
  validateUpdateBlogPost,
} = require("../models/blog");
const { User } = require("../models/user");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { error } = validateBlogPost(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const blog = new BlogPost({
    title: req.body.title,
    content: req.body.content,
    user: req.user._id,
    tags: req.body.tags,
    featuredImage: req.body.featuredImage,
    status: req.body.status,
  });

  await blog.save();

  res.send(blog);
});

router.get("/", auth, async (req, res) => {
  const blogs = await BlogPost.find().catch((err) => console.log(err.message));

  res.send(blogs);
});

router.get("/:id", auth, async (req, res) => {
  const blog = await BlogPost.findById(req.params.id).catch((err) =>
    console.log(err.message)
  );

  if (!blog)
    return res.status(404).json({ error: "No blog with the given id" });

  res.send(blog);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateUpdateBlogPost(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const blog = await BlogPost.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      status: req.body.status,
      featuredImage: req.body.featuredImage,
    },
    { new: true }
  ).catch((err) => console.log(err.message));

  if (!blog)
    return res.status(404).json({ error: "No blog with the given id" });

  res.send(blog);
});

router.delete("/:id", auth, async (req, res) => {
  const blog = await BlogPost.findByIdAndRemove(req.params.id).catch((err) =>
    console.log(err.message)
  );

  if (!blog)
    return res
      .status(404)
      .json({ error: "No blog with the given Id or Can't delete the bblog" });

  res.status(201).send("Deleted Successfully");
});

module.exports = router;
