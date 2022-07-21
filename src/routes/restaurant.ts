import express, { Request, Response } from "express";
import _ from "lodash";
import { auth } from "../middleWare/auth";
import { validate } from "../middleWare/validate";

import { Restaurant, validateRestaurant } from "../models/restaurant";

const router = express.Router();

router.post(
  "/",
  [validate(validateRestaurant), auth],
  async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const rest = new Restaurant({
        name: req.body.name,
        userId: req.body.user._id,
      });
      await rest.save();
      res.send("Added");
    } catch (error: any) {
      console.log("add rest error: ", error);

      return res.status(400).json({ message: error.message });
    }
  }
);

export default router;
