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


// import mongoose from 'mongoose';

// // mongoose.set('useNewUrlParser', true);
// // mongoose.set('useUnifiedTopology', true);
// // mongoose.set('useCreateIndex', true);
// // mongoose.set('useFindAndModify', false);

// module.exports = () => {
//     mongoose.connect("mongodb+srv://zahidali123:zahidali123@cluster0.b5iky.mongodb.net/splitorder")
//         .then(() => console.log('connected to mongodb'))
//         .catch((err: any) => console.log('could not connect to mongodb', err))
// }