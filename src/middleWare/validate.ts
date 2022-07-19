import { Request, Response, NextFunction } from "express";

export const validate =
  (validator: Function) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = validator(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    next();
  };
