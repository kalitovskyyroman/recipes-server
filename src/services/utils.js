import jwt from "jsonwebtoken";

const generateTokens = (payload) => ({
    accessToken: jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "30s" }),
    refreshToken: jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "20d" }),
});

const validateAccessToken = (token) => {
    try {
        const userDto = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        return userDto;
    } catch (error) {
        return null;
    }
};

const validateRefreshToken = (token) => {
    try {
        const userDto = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        return userDto;
    } catch (error) {
        return null;
    }
};

export { generateTokens, validateAccessToken, validateRefreshToken };
