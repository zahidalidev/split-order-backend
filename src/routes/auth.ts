import express from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import { validate } from "../middleWare/validate";

const { User } = require("../models/user");

const router = express.Router();

router.post("/", validate(validateAuth), async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({ message: "Invalid email or password" });

  const validUser = await bcrypt.compare(req.body.password, user.password);
  if (!validUser)
    return res.status(400).json({ message: "Invalid email or password" });

  const token = user.generateAuthToken();
  res.send(token);
});

function validateAuth(req: Request) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(req);
}

export default router;
