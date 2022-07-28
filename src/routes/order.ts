import express, { Request, Response } from "express";
import { auth } from "../middleWare/auth";
require("dotenv").config();

import { validate } from "../middleWare/validate";
import { Order, validateOrder } from "../models/order";
import { sendEmail } from "../utils/sendEmail";

const router = express.Router();

router.post(
  "/",
  validate(validateOrder),
  async (req: Request, res: Response) => {
    try {
      const order = new Order({
        mainUserId: req.body.mainUserId,
        invitedUsers: req.body.invitedUsers,
      });

      await order.save();
      return res.send("Added");
    } catch (error: any) {
      return res.status(400).json({ message: error });
    }
  }
);

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const order = await Order.find({ mainUserId: req.params.id });
    return res.send(order);
  } catch (error: any) {
    return res.status(400).json({ message: error });
  }
});

router.post("/email", auth, async (req: Request, res: Response) => {
  sendEmail(req.body);
});

export default router;
