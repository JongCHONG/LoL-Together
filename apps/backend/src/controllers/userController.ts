import { Request, Response } from "express";
import User from "../models/User";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { username, password, email, summoner_name } = req.body;
    if (!username || !password || !email || !summoner_name) {
      return res
        .status(400)
        .json({ message: "Champs obligatoires manquants." });
    }

    const user = new User(req.body);
    await user.save();

    res.status(201).json(user);
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Utilisateur déjà existant." });
    }
    res.status(500).json({ message: error.message });
  }
};
