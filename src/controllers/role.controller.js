import { createRole, getRoles, getRole, deleteRole, updateRole } from "../services/role.service.js";
import { getInfoMessages } from "./utils/configs.js";
import { handleMongooseErrors } from "./utils/utils.js";

const messages = getInfoMessages("role");

const createRoleController = async (req, res) => {
    try {
        const { name } = await createRole(req.body);

        res.status(201).json({ name });
    } catch (error) {
        res.status(500).json(handleMongooseErrors(error));
    }
};

const getRolesController = async (req, res) => {
    try {
        const roles = await getRoles();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json(error);
    }
};

const updateRoleController = async (req, res) => {
    try {
        const { name } = req.params;
        const newName = req.body.name;
        const isUpdated = await updateRole(name, newName);

        if (isUpdated) {
            res.status(200).json(messages.updateSuccessful);
        }

        return res.status(400).json(messages.notFound);
    } catch (error) {
        res.status(500).json(error);
    }
};

const getRoleController = async (req, res) => {
    try {
        const { name } = req.params;
        const role = await getRole(name);

        if (role) {
            res.status(200).json(role);
        }

        return res.status(404).json(messages.notFound);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteRoleController = async (req, res) => {
    try {
        const { name } = req.params;
        const isDeleted = await deleteRole(name);

        if (isDeleted) {
            return res.status(200).json(messages.deleteSuccessful);
        }

        return res.status(404).json(messages.notFound);
    } catch (error) {
        res.status(500).json(error);
    }
};

export { createRoleController, getRolesController, getRoleController, deleteRoleController, updateRoleController };
