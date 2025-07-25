import { Request, Response } from "express";

import { UserService } from "../services/userService";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await UserService.getUserById(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const updateData = req.body;

  if (updateData.password) {
    return res.status(400).json({
      message: "Password cannot be updated through this endpoint.",
    });
  }

  try {
    const updatedUser = await UserService.updateUser(userId, updateData);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Update User sucesscfully", user: updatedUser });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const deletedUser = await UserService.deleteUser(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
    res
      .status(200)
      .json({ message: "User deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
