import jwt from "jsonwebtoken";

const generateTokens = (payload) => ({
    accessToken: jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "0.5h" }),
    refreshToken: jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "20d" }),
});

export { generateTokens };
