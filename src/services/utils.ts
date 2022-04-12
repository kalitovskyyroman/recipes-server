import jwt from "jsonwebtoken";
import IUserDto from "../interfaces/IUserDto";

const generateTokens = (payload: any) => ({
    accessToken: jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, { expiresIn: "30s" }),
    refreshToken: jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, { expiresIn: "20d" }),
});

const validateAccessToken = (token: string) => {
    try {
        const userDto = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
        return userDto as IUserDto;
    } catch (error) {
        return null;
    }
};

const validateRefreshToken = (token: string) => {
    try {
        const userDto = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
        return userDto as IUserDto;
    } catch (error) {
        return null;
    }
};

export { generateTokens, validateAccessToken, validateRefreshToken };
