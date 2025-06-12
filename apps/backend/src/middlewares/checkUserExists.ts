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
        .json({ message: "Email et summoner_name sont requis." });
      return;
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { summoner_name }],
    });

    if (existingUser) {
      res
        .status(409)
        .json({ message: "Email ou summoner_name déjà utilisé." });
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};