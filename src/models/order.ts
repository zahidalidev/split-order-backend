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
          name: String,
          price: Number,
          quantity: Number,
        },
      ],
    },
  ],
});

export const Order = mongoose.model("Order", orderSchema);

interface Order {
  mainUserId: string;
  invitedUsers: [
    {
      userId: string;
      orders: [
        {
          itemId: string;
          name: string;
          price: Number;
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
            name: Joi.string().required(),
            price: Joi.number().required(),
            quantity: Joi.number().required(),
          })
        ),
      })
    ),
  });

  return schema.validate(order);
};
