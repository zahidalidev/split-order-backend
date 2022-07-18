import mongoose from 'mongoose';
import Joi from 'joi';
// import jwt from 'jsonwebtoken';
// import config from 'config';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    contactNumber: {
        type: Number,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    fullAddress: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
})

const User = mongoose.model('User', userSchema)

const validateUser = (user: Object) => {
  const schema = Joi.object({
      fullName: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(255).required().email(),
      contactNumber: Joi.number().min(0).required(),
      fullAddress: Joi.string().min(5).max(255).required(),
      password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(user);
}

module.exports.User = User
module.exports.validateUser = validateUser