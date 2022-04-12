import { Request } from "express";
import IUserDto from "./IUserDto";

interface IGetUserAuthInfoRequest extends Request {
    user: IUserDto;
}

export default IGetUserAuthInfoRequest;
