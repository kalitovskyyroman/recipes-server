import Token from "../models/Users/Token.js";

const saveToken = async (userId, refreshToken) => {
    const tokenData = await Token.findOne({ user: userId });

    if (tokenData) {
        tokenData.refreshToken = refreshToken;
        return tokenData.save();
    }

    const token = await Token.create({ user: userId, refreshToken });
    return token;
};

const removeToken = async (token) => {
    await Token.deleteOne({ refreshToken: token });
};

const findToken = async (refreshToken) => {
    const token = await Token.findOne({ refreshToken });
    return token;
};

export { saveToken, removeToken, findToken };
