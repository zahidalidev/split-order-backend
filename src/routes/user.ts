import express, { Request, Response } from "express";
import * as _ from "lodash";
import bcrypt from "bcrypt";

import { User, validateUser } from "../models/user";
import { validate } from "../middleWare/validate";
import { auth } from "../middleWare/auth";

const router = express.Router();

router.post(
  "/",
  validate(validateUser),
  async (req: Request, res: Response) => {
    try {
      const user = new User(
        _.pick(req.body, ["fullName", "email", "number", "address", "password"])
      );
      const salt = await bcrypt.genSalt(7);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
      return res.send("Added");
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
);

router.get("/me", auth, async (req: Request, res: Response) => {
  const user = await User.findById(req.body.user._id).select("-password");
  res.send(user);
});

export default router;
