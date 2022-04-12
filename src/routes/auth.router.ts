import { Router } from "express";
import {
    loginController,
    logoutController,
    refreshTokensController,
    registerController,
} from "../controllers/auth.controller";
import { validateRequestSchema } from "../middleware/validates/validate";
import { loginSchema, registerSchema } from "./schemas/user.schema";

const router = Router();

router.post("/registration", registerSchema, validateRequestSchema, registerController);
router.post("/login", loginSchema, validateRequestSchema, loginController);
router.get("/logout", logoutController);
router.get("/refresh", refreshTokensController);

export default router;
