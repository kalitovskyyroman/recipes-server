import { createDefaultRole } from "../services/role.service.js";
import { saveToken } from "../services/token.service.js";
import { createUser, getUsers, login, logout, refresh } from "../services/user.service.js";
import { generateTokens } from "../services/utils.js";

const createUserController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        await createDefaultRole();
        const user = await createUser(name, email, password);
        const tokens = generateTokens(user);
        await saveToken(user.id, tokens.refreshToken);

        res.cookie("refreshToken", tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

        res.status(200).json({ tokens, user });
    } catch (error) {
        res.status(400).json(error.message);
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await login(email, password);
        const tokens = generateTokens(user);

        await saveToken(user.id, tokens.refreshToken);

        res.cookie("refreshToken", tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

        res.status(200).json({ tokens, user });
    } catch (error) {
        res.status(400).json(error.message);
    }
};

const logoutController = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        await logout(refreshToken);
        res.clearCookie("refreshToken");
        return res.sendStatus(200);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

const refreshTokensController = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        const userData = await refresh(refreshToken);

        res.cookie("refreshToken", userData.tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

        res.status(200).json(userData);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

const getUsersController = async (req, res) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

export { createUserController, loginController, logoutController, refreshTokensController, getUsersController };
