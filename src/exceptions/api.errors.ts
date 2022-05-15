import { ValidationError } from "express-validator";
import ApiErrorEnum from "../enums/ApiErrorEnum";

class ApiError extends Error {
    public status: number;
    public errors: ValidationError[];

    constructor(status: number, message: string, errors: ValidationError[] = []) {
        super(message);

        this.status = status;
        this.errors = errors;
    }

    static BadRequest(message: string = "Something went wrong", errors: ValidationError[] = []) {
        return new ApiError(ApiErrorEnum.BadRequest, message, errors);
    }

    static NotFound(message: string = "Not found", errors: ValidationError[] = []) {
        return new ApiError(ApiErrorEnum.NotFound, message, errors);
    }

    static UnauthorizedError(message: string = "Unauthorized", errors: ValidationError[] = []) {
        return new ApiError(ApiErrorEnum.UnauthorizedError, message, errors);
    }

    static AccessDenied(message: string = "Access denied", errors: ValidationError[] = []) {
        return new ApiError(ApiErrorEnum.AccessDenied, message, errors)
    }
}

export default ApiError;
