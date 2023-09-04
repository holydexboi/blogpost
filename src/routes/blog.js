const express = require("express");
const auth = require("../middleware/auth");
const { BlogPost, validateBlogPost } = require("../models/blog");

const router = express.Router();

router.post("/", auth, async(req, res) => {
  const { error } = validateBlogPost(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const blog = new BlogPost({
    title: req.body.title,
    content: req.body.content,
    user: req.user._id,
    tags: req.body.tags,
    featuredImage: req.body.featuredImage,
  });

  await blog.save()

  res.send(blog);
});

router.get('/', auth, async(req, res) => {

    const blogs = await BlogPost.find().catch(err => console.log(err.message))

    res.send(blogs)
})

module.exports = router