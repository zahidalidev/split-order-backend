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
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

router.get("/:id", auth, async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.findById(req.params.id);
    res.send(restaurants);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
});

router.post(
  "/item",
  [validate(validateRestItems), auth],
  async (req: Request, res: Response) => {
    try {
      const item = new Item(_.pick(req.body, ["name", "price", "restId"]));
      await item.save();
      res.send("Added");
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
);

router.get("/items/:restId", auth, async (req: Request, res: Response) => {
  try {
    const items = await Item.find({ restId: req.params.restId });
    res.send(items);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

export default router;
