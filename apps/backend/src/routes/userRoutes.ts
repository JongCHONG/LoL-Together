import { Router, RequestHandler } from "express";

import {
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController";

const router = Router();

router.get("/list", getAllUsers);
router.get("/:userId", getUserById as RequestHandler);
router.put("/:userId", updateUser as RequestHandler);
router.delete("/:userId", deleteUser as RequestHandler);

export default router;
