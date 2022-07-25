import config from "config";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface IUserRequest extends Request {
  user: any;
}

interface User {
  _id: string;
  fullName: string;
  email: string;
  iat: number;
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token");
  if (!token || token === "null")
    return res
      .status(401)
      .json({ message: "Access denied. No token provided" });

  try {
    const decoded = jwt.verify(
      JSON.parse(token),
      process.env.JWT_PRIVATE_KEY as string
    );
    req.body.user = decoded as Object;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
