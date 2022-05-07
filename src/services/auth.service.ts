import ApiError from "../exceptions/api.errors";
import Role from "../models/Users/Role";
import User from "../models/Users/User";
import bcrypt from "bcrypt";
import { DEFAULT_ROLE } from "./config";
import { getUserDto } from "../dtos/user.dto";
import { findToken, removeToken, saveToken } from "./token.service";
import { generateTokens, validateRefreshToken } from "./utils";

const register = async (name: string, email: string, password: string) => {
    const candidate = await User.findOne({ email });

    if (candidate) {
        throw ApiError.BadRequest("User already exist");
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

const login = async (email: string, password: string) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw ApiError.BadRequest("Incorrect email");
    }

    const role = await Role.findById(user.role._id);

    if (!role) {
        throw ApiError.NotFound("Role not found");
    }

    user.role = role;
    const isEqualsPasswords = await bcrypt.compare(password, user.password);

    if (!isEqualsPasswords) {
        throw ApiError.BadRequest("Password incorrect");
    }

    return getUserDto(user);
};

const logout = async (token: string) => {
    await removeToken(token);
};

const refresh = async (refreshToken: string) => {
    if (!refreshToken) {
        throw ApiError.UnauthorizedError();
    }

    const userData = validateRefreshToken(refreshToken);
    const tokenFromDB = await findToken(refreshToken);

    if (!userData || !tokenFromDB) {
        throw ApiError.UnauthorizedError();
    }

    const user = await User.findById(userData.id);

    if (!user) {
        throw ApiError.NotFound("User not found");
    }

    const userDto = getUserDto(user);
    const tokens = generateTokens(userDto);

    await saveToken(userDto.id, tokens.refreshToken);

    return { tokens, user: userDto };
};

export { register, login, logout, refresh };
