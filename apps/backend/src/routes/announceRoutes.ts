import express, { RequestHandler } from "express";
import {
  createAnnounce,
  getAnnounceById,
  getAllAnnounces,
  updateAnnounce,
  deleteAnnounce,
} from "../controllers/announceController";

const router = express.Router();

router.post("/", createAnnounce);
router.get("/list", getAllAnnounces);
router.get("/:id", getAnnounceById as RequestHandler);
router.put("/:id", updateAnnounce as RequestHandler);
router.delete("/:id", deleteAnnounce as RequestHandler);

export default router;
