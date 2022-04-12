import { NextFunction, Request, Response } from "express";
import { getUsers } from "../services/user.service";

const getUsersController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export { getUsersController };
