import { Request, Response, NextFunction } from "express";
import User from "../models/User";

export const checkUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res
        .status(400)
        .json({ message: "Email is required." });
      return;
    }

    const query: any = { email };
    if (req.body.riot_id) {
      query.$or = [{ email }, { riot_id: req.body.riot_id }];
      delete query.email;
    }
    const existingUser = await User.findOne(query);

    if (existingUser) {
      res
        .status(409)
        .json({ message: "Email or riot_id already in use." });
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};