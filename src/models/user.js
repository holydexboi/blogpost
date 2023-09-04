const mongoose = require("mongoose");
const Joi = require("joi");

// Define the Mongoose schema for the User collection
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  // Add other user-related fields such as name, profile picture, etc.
});

// Create a Mongoose model for the User collection
const User = mongoose.model("User", userSchema);

// Define Joi validation schema for user registration
const validateUserRegistration = (user) => {
  const schema = Joi.object({
    username: Joi.string().min(5).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  return schema.validate(user);
};

// Define Joi validation schema for user login
const validateUserLogin = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  return schema.validate(user);
};

module.exports.User = User;
module.exports.validateUserRegistration = validateUserRegistration;
module.exports.validateUserLogin = validateUserLogin;
