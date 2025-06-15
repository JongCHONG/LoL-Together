import { Request, Response, NextFunction } from "express";
import Conversation from "../models/Conversation";

export const checkConversationExistsByUserIds = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { users } = req.body;
    if (!users || users.length < 2) {
      res.status(400).json({ error: "A conversation needs at least 2 users" });
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

export const checkConversationExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const conversationId = req.params.conversationId || req.body.conversationId;

    if (!conversationId) {
      res.status(400).json({ error: "conversationId is required." });
      return;
    }

    const exists = await Conversation.exists({ _id: conversationId });

    if (!exists) {
      res.status(404).json({ error: "Conversation not found." });
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};
