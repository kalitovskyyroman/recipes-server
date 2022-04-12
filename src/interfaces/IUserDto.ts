import { Types } from "mongoose";

interface IUserDto {
    id: Types.ObjectId;
    name: string;
    email: string;
    role: {
        name: string;
    };
    createdAt: string;
    updatedAt: string;
}

export default IUserDto;
