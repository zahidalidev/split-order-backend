import mongoose from "mongoose";
require("dotenv").config();

export const dbConnect = async () => {
  try {
    console.log("Waiting for db to connect...");
    const res = await mongoose.connect(process.env.DB_CONN_STRING as string);
    console.log("DB is connected on port", res.connections[0].port);
  } catch (error) {
    console.clear();
    console.error(`Some error while connection to db ${error}`);
  }
};
