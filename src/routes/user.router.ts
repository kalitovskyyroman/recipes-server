import { Router } from "express";
import { getUsersController } from "../controllers/user.controller";
import authMiddleware from "../middleware/auth.middleware";

const path = "/users";

const router = Router();

router.get(path, authMiddleware, getUsersController);

export default router;
