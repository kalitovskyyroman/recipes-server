import { validateAccessToken } from "../services/utils.js";

const authMiddleware = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next("error");
        }

        const accessToken = authorizationHeader.split(" ")[1];
        if (!accessToken) {
            return next("error");
        }

        const userData = validateAccessToken(accessToken);
        console.log("userData: ", userData);
        if (!userData) {
            return next("error");
        }

        req.user = userData;
        next();
    } catch (error) {
        return next("error");
    }
};

export default authMiddleware;
