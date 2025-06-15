import e, { Request, Response } from "express";
import { MessageService } from "../services/messageService";

export const createMessage = async (req: Request, res: Response) => {
  try {
    const message = await MessageService.createMessage(req.body);
    res.status(201).json(message);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getMessageById = async (req: Request, res: Response) => {
  try {
    const message = await MessageService.getMessageById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json(message);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateMessage = async (req: Request, res: Response) => {
  try {
    const message = await MessageService.updateMessage(
      req.params.id,
      req.body
    );
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json(message);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const message = await MessageService.deleteMessage(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json({ message: "Message deleted." });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
