import { Router } from "express";
import {
    createUserController,
    loginController,
    logoutController,
    refreshTokensController,
    getUsersController,
} from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { validateRequestSchema } from "../middleware/validates/validate.js";
import { registerSchema, loginSchema } from "./schemas/user.schema.js";

const path = "/users";

const router = new Router();

router.post(path, registerSchema, validateRequestSchema, createUserController);
router.post("/login", loginSchema, validateRequestSchema, loginController);
router.get("/logout", logoutController);
router.get("/refresh", refreshTokensController);
router.get("/users", authMiddleware, getUsersController);

export default router;
