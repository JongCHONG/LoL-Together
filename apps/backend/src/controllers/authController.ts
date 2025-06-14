import { Request, Response } from "express";
import * as authService from "../services/authService";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { password, email, riot_id, tagline } = req.body;
    const { token, user } = await authService.signUp(
      email,
      password,
      riot_id,
      tagline
    );

    console.info("User created:", user);
    res.status(201).json({ message: "User created", token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token } = await authService.login(email, password);

    res.status(200).json({ message: "Login success", token });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};
