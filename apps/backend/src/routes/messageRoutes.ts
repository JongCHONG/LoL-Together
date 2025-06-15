import express, { RequestHandler } from "express";
import {
  createMessage,
  getMessageById,
  deleteMessage,
  updateMessage,
} from "../controllers/messageController";
import { checkConversationExists } from "../middlewares/checkConversationExists";

const router = express.Router();

router.post("/create", checkConversationExists, createMessage);
router.get("/:id", getMessageById as RequestHandler);
router.put("/:id", updateMessage as RequestHandler);
router.delete("/:id", deleteMessage as RequestHandler);

export default router;
