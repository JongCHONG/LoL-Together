import { Request, Response } from "express";

import { ConversationService } from "../services/conversationService";

export const createConversation = async (req: Request, res: Response) => {
  try {
    const conversation = await ConversationService.createConversation(req.body);
    res.status(201).json(conversation);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getConversationById = async (req: Request, res: Response) => {
  try {
    const conversation = await ConversationService.getConversationById(
      req.params.id
    );
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    res.status(200).json(conversation);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getConversationListByUserId = async (
  req: Request,
  res: Response
) => {
  try {
    const conversations = await ConversationService.getConversationListByUserId(
      req.params.userId
    );
    res.status(200).json(conversations);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateConversation = async (req: Request, res: Response) => {
  try {
    const conversation = await ConversationService.updateConversation(
      req.params.id,
      req.body
    );
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    res.status(200).json(conversation);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteConversation = async (req: Request, res: Response) => {
  try {
    const conversation = await ConversationService.deleteConversation(
      req.params.id
    );
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found." });
    }
    res.status(200).json({ message: "Conversation deleted." });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
