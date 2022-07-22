import express, { Request, Response } from "express";
import _ from "lodash";
import { auth } from "../middleWare/auth";
import { validate } from "../middleWare/validate";

import { Restaurant, validateRestaurant } from "../models/restaurant";
import { Item, validateRestItems } from "../models/restaurentItem";

const router = express.Router();

router.post(
  "/",
  [validate(validateRestaurant), auth],
  async (req: Request, res: Response) => {
    try {
      const rest = new Restaurant({
        name: req.body.name,
        userId: req.body.user._id,
      });
      await rest.save();
      res.send("Added");
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
);

router.get("/", auth, async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.find({ userId: req.body.user._id });
    res.send(restaurants);
    console.log(restaurants);
  } catch (error) {}
});

router.post(
  "/item",
  validate(validateRestItems),
  async (req: Request, res: Response) => {
    console.log(req.body);
    try {
      const item = new Item(_.pick(req.body, ["name", "price", "restId"]));
      await item.save();
      res.send("Added");
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
);

export default router;
