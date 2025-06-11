import { Router, Request, Response } from "express";
import { createUser, getUsers } from "../controllers/userController";

const router = Router();

router.get("/", getUsers);

router.post("/", async (req: Request, res: Response) => {
  await createUser(req, res);
});

export default router;
