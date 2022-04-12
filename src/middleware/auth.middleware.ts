import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/api.errors.js";
import IGetUserAuthInfoRequest from "../interfaces/IGetUserAuthInfoRequest.js";
import { validateAccessToken } from "../services/utils.js";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const accessToken = authorizationHeader?.split(" ")[1];

        if (!authorizationHeader || !accessToken) {
            return next(ApiError.UnauthorizedError());
        }

        // if (!accessToken) {
        //     return next(ApiError.UnauthorizedError());
        // }

        const userData = validateAccessToken(accessToken);
        console.log("userData: ", userData);
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }

        (req as IGetUserAuthInfoRequest).user = userData;
        next();
    } catch (error) {
        return next("error");
    }
};

export default authMiddleware;
