import express, { Request, Response } from "express";
import { validate } from "../middleWare/validate";
import { Order, validateOrder } from "../models/order";

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

export default router;
