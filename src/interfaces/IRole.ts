import ITimestamps from "./ITimestamps";
import { Types } from "mongoose";

interface IRole extends ITimestamps {
    name: string;
    _id: Types.ObjectId;
}

export default IRole;
