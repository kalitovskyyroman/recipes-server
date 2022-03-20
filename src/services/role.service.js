import Role from "../models/Users/Role.js";
import { DEFAULT_ROLE } from "./config.js";

const createRole = async (role) => {
    const createdRole = await Role.create(role);
    return createdRole;
};

const createDefaultRole = async () => {
    const isExist = await Role.findOne({ name: DEFAULT_ROLE });

    if (!isExist) {
        await Role.create({ name: DEFAULT_ROLE });
    }
};

const getRoles = async () => {
    const roles = await Role.find({});
    return roles.map((role) => ({
        name: role.name,
    }));
};

const getRole = async (name) => {
    const role = await Role.findOne({ name });
    return role;
};

const deleteRole = async (name) => {
    const role = await Role.deleteOne({ name });
    return !!role.deletedCount;
};

const updateRole = async (name, newName) => {
    const role = await Role.updateOne({ name }, { name: newName });
    return !!role.modifiedCount;
};

export { createRole, getRoles, getRole, deleteRole, updateRole, createDefaultRole };
