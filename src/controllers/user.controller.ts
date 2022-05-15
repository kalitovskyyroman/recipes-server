import { NextFunction, Response, Request } from 'express';
import ApiError from '../exceptions/api.errors';
import { getUsers } from '../services/user.service';

const getUsersController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { role } = req.user;

        if (role.name !== 'admin') {
            throw ApiError.AccessDenied();
        }

        const users = await getUsers();
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export { getUsersController };
