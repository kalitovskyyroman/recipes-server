import { Router } from "express";
import { createRole } from "../controllers/RoleController.js";

const path = "/roles";

const router = new Router();

router.post(path, createRole);
router.put(`${path}/:name`);
router.get(`${path}/:name`);
router.delete(`${path}/:name`);

export default router;
