import IUser from "../interfaces/IUser";
import { Types } from "mongoose";
import IUserDto from "../interfaces/IUserDto";

interface IUserModel extends IUser {
    _id: Types.ObjectId;
}

const getUserDto = (model: IUserModel): IUserDto => ({
    id: model._id,
    name: model.name,
    email: model.email,
    role: {
        name: model.role.name,
    },
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
});

export { getUserDto, IUserModel };
