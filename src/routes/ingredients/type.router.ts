import { Router } from "express";
import {
    createTypeController,
    deleteTypeController,
    getTypeController,
    getTypesController,
    updateTypeController,
} from "../../controllers/ingredients/type.controller";
import authMiddleware from "../../middleware/auth.middleware";
import { validateRequestSchema } from "../../middleware/validates/validate";
import { typeSchema } from "../schemas/ingredients.type.schema";

const path = "/ingredients/type";

const router = Router();

router.post(path, authMiddleware, typeSchema, validateRequestSchema, createTypeController);
router.get("/ingredients/types", getTypesController);
router.put(`${path}/:title`, authMiddleware, typeSchema, validateRequestSchema, updateTypeController);
router.get(`${path}/:title`, getTypeController);
router.delete(`${path}/:title`, authMiddleware, deleteTypeController);

export default router;
