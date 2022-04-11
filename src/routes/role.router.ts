import { Router } from "express";
import {
    createRoleController,
    deleteRoleController,
    getRoleController,
    getRolesController,
    updateRoleController,
} from "../controllers/role.controller";
import { validateRequestSchema } from "../middleware/validates/validate";
import { roleSchema } from "./schemas/role.schema";

const path = "/roles";

const router = Router();

// router.post(path, roleSchema, validateRequestSchema, createRoleController);
// router.put(`${path}/:name`, roleSchema, validateRequestSchema, updateRoleController);
router.post(path, roleSchema, validateRequestSchema, createRoleController);
router.get(path, getRolesController);
router.put(`${path}/:name`, updateRoleController);
router.get(`${path}/:name`, getRoleController);
router.delete(`${path}/:name`, deleteRoleController);

export default router;
