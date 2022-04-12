import Token from "../models/Users/Token.js";
import { Types } from "mongoose";

const saveToken = async (userId: Types.ObjectId, refreshToken: string) => {
    const tokenData = await Token.findOne({ user: userId });

    if (tokenData) {
        tokenData.refreshToken = refreshToken;
        return tokenData.save();
    }

    const token = await Token.create({ user: userId, refreshToken });
    return token;
};

const removeToken = async (token: string) => {
    await Token.deleteOne({ refreshToken: token });
};

const findToken = async (refreshToken: string) => {
    const token = await Token.findOne({ refreshToken });
    return token;
};

export { saveToken, removeToken, findToken };
