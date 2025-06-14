import { Request, Response, NextFunction } from "express";
import User from "../models/User";

export const checkUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, riot_id, tagline } = req.body;

    if (!email || !riot_id || !tagline) {
      res
        .status(400)
        .json({ message: "Email, tagline and riot_id are required." });
      return;
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { riot_id }],
    });

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