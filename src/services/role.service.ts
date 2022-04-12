import ApiError from "../exceptions/api.errors";
import IRole from "../interfaces/IRole";
import Role from "../models/Users/Role";
import { DEFAULT_ROLE } from "./config";

const createRole = async (role: IRole) => {
    try {
        const createdRole = await Role.create(role);
        return createdRole;
    } catch (error) {
        throw ApiError.BadRequest("Role already exist");
    }
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

const getRole = async (name: string) => {
    const role = await Role.findOne({ name });
    if (role) {
        return role;
    }
    throw ApiError.BadRequest("Role not found");
};

const deleteRole = async (name: string) => {
    const role = await Role.deleteOne({ name });
    if (!role.deletedCount) {
        throw ApiError.BadRequest("Role not found");
    }
};

const updateRole = async (name: string, newName: string) => {
    try {
        const role = await Role.updateOne({ name }, { name: newName });
        if (!!role.modifiedCount) {
            return !!role.modifiedCount;
        }
        throw ApiError.BadRequest("Role not found");
    } catch (error) {
        throw ApiError.BadRequest("Role already exist");
    }
};

export { createRole, getRoles, getRole, createDefaultRole, deleteRole, updateRole };
