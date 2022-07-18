import express, { Request, Response } from "express";
const { User } = require("../models/user")
import * as _ from "lodash"

const router = express.Router();

router.post("/", async(req: Request, res: Response) => {
  const user = new User(_.pick(req.body, ['fullName', 'email', 'contactNumber', 'fullAddress', 'password']))
  console.log(user)
  await user.save()
  res.send("hello")
});

export default router
