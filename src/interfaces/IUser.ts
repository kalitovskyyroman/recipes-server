import ITimestamps from "./ITimestamps";
import { Types } from "mongoose";

interface IUser extends ITimestamps {
    name: string;
    email: string;
    role: Types.ObjectId;
    password: string;
}

export default IUser;
