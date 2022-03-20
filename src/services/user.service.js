import User from "../models/Users/User.js";
import Role from "../models/Users/Role.js";
import * as bcrypt from "bcrypt";
import { DEFAULT_ROLE } from "./config.js";
import { getUserDto } from "../dtos/user.dto.js";

const createUser = async (name, email, password) => {
    const candidate = await User.findOne({ email });

    if (candidate) {
        throw new Error("User already exist.");
    }

    const role = await Role.findOne({ name: DEFAULT_ROLE });
    const passwordHash = await bcrypt.hash(password, 2);

    const user = await User.create({
        name,
        email,
        role,
        password: passwordHash,
    });

    return getUserDto(user);
};

export { createUser };
