import mongoose from "mongoose";
import Joi from "joi";
import jwt from "jsonwebtoken";
require("dotenv").config();

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  number: {
    type: Number,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  address: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      fullName: this.fullName,
      email: this.email,
    },
    process.env.JWT_PRIVATE_KEY as string
  );
};

export const User = mongoose.model("User", userSchema);

export const validateUser = (user: Object) => {
  const schema = Joi.object({
    fullName: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    number: Joi.number().min(0).required(),
    address: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(user);
};
