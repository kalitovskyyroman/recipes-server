import { Router } from "express";
import {
    createRoleController,
    deleteRoleController,
    getRoleController,
    getRolesController,
    updateRoleController,
} from "../controllers/role.controller.js";
import { roleSchema } from "./schemas/role.schema.js";
import { validateRequestSchema } from "../middleware/validates/role.validate.js";

const path = "/roles";

const router = new Router();

router.post(path, roleSchema, validateRequestSchema, createRoleController);
router.get(path, getRolesController);
router.put(`${path}/:name`, roleSchema, validateRequestSchema, updateRoleController);
router.get(`${path}/:name`, getRoleController);
router.delete(`${path}/:name`, deleteRoleController);

export default router;
