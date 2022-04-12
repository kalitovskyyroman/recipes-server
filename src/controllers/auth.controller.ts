import { NextFunction, Request, Response } from "express";
import { login, logout, refresh, register } from "../services/auth.service";
import { createDefaultRole } from "../services/role.service";
import { saveToken } from "../services/token.service";
import { generateTokens } from "../services/utils";

const registerController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;

        await createDefaultRole();
        const user = await register(name, email, password);
        const tokens = generateTokens(user);

        await saveToken(user.id, tokens.refreshToken);

        res.cookie("refreshToken", tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

        return res.status(200).json({ tokens, user });
    } catch (error) {
        next(error);
    }
};

const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user = await login(email, password);
        const tokens = generateTokens(user);

        await saveToken(user.id, tokens.refreshToken);

        res.cookie("refreshToken", tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

        res.status(200).json({ tokens, user });
    } catch (error) {
        next(error);
    }
};

const logoutController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken } = req.cookies;
        await logout(refreshToken);
        res.clearCookie("refreshToken");
        return res.sendStatus(200);
    } catch (error) {
        next(error);
    }
};

const refreshTokensController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken } = req.cookies;
        const userData = await refresh(refreshToken);

        res.cookie("refreshToken", userData.tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

        return res.status(200).json(userData);
    } catch (error) {
        next(error);
    }
};

export { registerController, loginController, logoutController, refreshTokensController };
