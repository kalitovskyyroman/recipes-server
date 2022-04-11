import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import ApiError from "../../exceptions/api.errors";

export const validateRequestSchema = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw ApiError.BadRequest("Validation error", errors.array());
    }

    next();
};
