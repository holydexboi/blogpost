const mongoose = require("mongoose");
const Joi = require("joi");

// Define the Mongoose schema for the BlogPost collection
const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  tags: {
    type: [String],
    required: true,
    validate: {
      validator: (tags) => tags.length > 0,
      message: "At least one tag is required.",
    },
  },
  datePublished: {
    type: Date,
    default: Date.now,
  },
  dateUpdated: {
    type: Date,
    default: Date.now,
  },

  featuredImage: String,
  status: {
    type: String,
    enum: ["draft", "published", "archived"],
    default: "draft",
  },
});

// Create a Mongoose model for the BlogPost collection
const BlogPost = mongoose.model("BlogPost", blogPostSchema);

// Define Joi validation schema for creating or updating a blog post
const validateBlogPost = (blogPost) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    content: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).min(1).required(),
    featuredImage: Joi.string(),
    status: Joi.string()
      .valid("draft", "published", "archived")
      .default("draft"),
  });

  return schema.validate(blogPost);
};

const validateUpdateBlogPost = (blogPost) => {
    const schema = Joi.object({
      title: Joi.string().min(5).max(255),
      content: Joi.string(),
      tags: Joi.array().items(Joi.string()).min(1),
      featuredImage: Joi.string(),
      status: Joi.string()
        .valid("draft", "published", "archived")
        .default("draft"),
    });
  
    return schema.validate(blogPost);
  };

module.exports.BlogPost = BlogPost;
module.exports.validateBlogPost = validateBlogPost;
module.exports.validateUpdateBlogPost = validateUpdateBlogPost;
