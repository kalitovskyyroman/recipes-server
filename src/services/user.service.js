import User from "../models/Users/User.js";
import Role from "../models/Users/Role.js";
import * as bcrypt from "bcrypt";
import { DEFAULT_ROLE } from "./config.js";
import { getUserDto } from "../dtos/user.dto.js";
import { findToken, removeToken, saveToken } from "./token.service.js";
import { generateTokens, validateRefreshToken } from "./utils.js";

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

const login = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("User not found.");
    }

    const role = await Role.findById(user.role._id);
    user.role = role;

    const isEqualsPasswords = await bcrypt.compare(password, user.password);

    if (!isEqualsPasswords) {
        throw new Error("Password incorrect");
    }

    return getUserDto(user);
};

const logout = async (token) => {
    await removeToken(token);
};

const refresh = async (refreshToken) => {
    if (!refreshToken) {
        throw new Error("Unauthorized error");
    }

    const userData = validateRefreshToken(refreshToken);
    const tokenFromDB = await findToken(refreshToken);

    if (!userData || !tokenFromDB) {
        throw new Error("Unauthorized error");
    }

    const user = await User.findById(userData.id);
    const userDto = getUserDto(user);
    const tokens = generateTokens(userDto);

    await saveToken(userDto.id, tokens.refreshToken);

    return { tokens, user: userDto };
};

const getUsers = async () => {
    const users = await User.find();
    return users;
};

export { createUser, login, logout, refresh, getUsers };
