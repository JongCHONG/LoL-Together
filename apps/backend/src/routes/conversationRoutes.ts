import express, { RequestHandler } from "express";
import {
  createConversation,
  getConversationById,
  getConversationListByUserId,
  updateConversation,
  deleteConversation,
} from "../controllers/conversationController";
import { checkConversationExists } from "../middlewares/checkConversationExists";

const router = express.Router();

router.post(
  "/create",
  checkConversationExists,
  createConversation as RequestHandler
);
router.get("/list/:userId", getConversationListByUserId);
router.get("/:id", getConversationById as RequestHandler);
router.put("/:id", updateConversation as RequestHandler);
router.delete("/:id", deleteConversation as RequestHandler);

export default router;
