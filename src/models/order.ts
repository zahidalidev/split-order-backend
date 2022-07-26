import Joi from "joi";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  mainUserId: {
    type: ObjectId,
    required: true,
  },
  invitedUsers: [
    {
      userId: ObjectId,
      orders: [
        {
          itemId: ObjectId,
          quantity: Number,
        },
      ],
    },
  ],
});

export const order = mongoose.model("Order", orderSchema);

interface Order {
  mainUserId: string;
  invitedUsers: [
    {
      userId: string;
      orders: [
        {
          itemId: ObjectId;
          quantity: Number;
        }
      ];
    }
  ];
}

export const validateOrder = (order: Order) => {
  const schema = Joi.object({
    mainUserId: Joi.string().required(),
    invitedUsers: Joi.array().items(
      Joi.object({
        userId: Joi.string().required(),
        orders: Joi.array().items(
          Joi.object({
            itemId: Joi.string().required(),
            quantity: Joi.number().required(),
          })
        ),
      })
    ),
  });

  schema.validate(order);
};
