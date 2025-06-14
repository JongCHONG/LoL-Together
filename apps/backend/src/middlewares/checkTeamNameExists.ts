import { Request, Response, NextFunction } from "express";
import Team from "../models/Team";

export const checkTeamNameExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: "Name is required" });
      return;
    }

    const existingTeam = await Team.findOne({ name });

    if (existingTeam) {
      res.status(409).json({ message: "Name already in use." });
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};
