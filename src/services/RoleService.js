import Role from "../models/Users/Role.js";

const createRole = async (role) => {
    const createdRole = await Role.create(role);
    return createdRole;
};

export { createRole };
