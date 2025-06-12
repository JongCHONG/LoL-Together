import { Request, Response, NextFunction } from "express";
import User from "../models/User";

export const checkUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, summoner_name } = req.body;

    if (!email || !summoner_name) {
      res
        .status(400)
        .json({ message: "Email and summoner_name are required." });
      return;
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { summoner_name }],
    });

    if (existingUser) {
      res
        .status(409)
        .json({ message: "Email or summoner_name already in use." });
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};