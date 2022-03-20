import { createDefaultRole } from "../services/role.service.js";
import { saveToken } from "../services/token.service.js";
import { createUser } from "../services/user.service.js";
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

export { createUserController };