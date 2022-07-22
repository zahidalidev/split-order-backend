import Joi from "joi";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  restId: {
    type: ObjectId,
    required: true,
  },
});

export const Item = mongoose.model("Item", itemSchema);

interface ItemDet {
  name: string;
  price: number;
  restId: string;
}

export const validateRestItems = (itemDet: ItemDet) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    restId: Joi.string().required(),
  });

  return schema.validate(itemDet);
};
