import { Request, Response, NextFunction } from "express";
import MessagesEnum from "../enums/MessagesEnum";
import { createRole, deleteRole, getRole, getRoles, updateRole } from "../services/role.service";

const createRoleController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = await createRole(req.body);
        return res.status(201).json({ name });
    } catch (error) {
        next(error);
    }
};

const getRolesController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = await getRoles();
        res.status(200).json(roles);
    } catch (error) {
        next(error);
    }
};

const updateRoleController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.params;

        const newName = req.body.name;
        await updateRole(name, newName);

        return res.status(200).json(MessagesEnum.Updated);
    } catch (error) {
        next(error);
    }
};

const getRoleController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.params;
        console.log(name);

        const role = await getRole(name);
        return res.status(200).json(role);
    } catch (error) {
        next(error);
    }
};

const deleteRoleController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.params;
        await deleteRole(name);

        return res.status(200).json(MessagesEnum.Deleted);
    } catch (error) {
        next(error);
    }
};

export { createRoleController, getRolesController, getRoleController, deleteRoleController, updateRoleController };
