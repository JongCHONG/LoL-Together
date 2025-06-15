import { Request, Response, NextFunction } from "express";
import Conversation from "../models/Conversation";

export const checkConversationExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { users } = req.body;
    if (!users || users.length < 2) {
      res
        .status(400)
        .json({ error: "A conversation needs at least 2 users" });
      return;
    }
    const existingConversation = await Conversation.findOne({
      users: { $all: users, $size: users.length },
    });
    if (existingConversation) {
      res.status(200).json({
        message: "Conversation already exists",
        conversation: existingConversation,
      });
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};
