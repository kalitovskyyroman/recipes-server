import { Router } from "express";
import { createUserController } from "../controllers/user.controller.js";
import { validateRequestSchema } from "../middleware/validates/validate.js";
import { userSchema } from "./schemas/user.schema.js";

const path = "/users";

const router = new Router();

router.post(path, userSchema, validateRequestSchema, createUserController);

export default router;
