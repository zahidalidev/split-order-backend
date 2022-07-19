import config from "config";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

module.exports = function (req: Request, res: Response, next: NextFunction) {
  const token = req.header("x-auth-token");
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided" });

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded as string;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
