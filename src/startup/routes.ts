import { Application } from "express";
import user from "../routes/user";
import auth from "../routes/auth";

module.exports = function (app: Application) {
  app.use("/api/users", user);
  app.use("/api/auth", auth);
};
