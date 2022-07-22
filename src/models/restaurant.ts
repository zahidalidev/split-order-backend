import Joi, { string } from "joi";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: ObjectId,
    required: true,
  },
});

export const Restaurant = mongoose.model("Restaurant", restaurantSchema);

interface RestaurantDet {
  name: string;
  userId: string;
}

export const validateRestaurant = (restaurant: RestaurantDet) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(restaurant);
};
