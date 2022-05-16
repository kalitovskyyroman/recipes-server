import ITimestamps from "./ITimestamps";
import { Types } from "mongoose";

interface IIngredientsType extends ITimestamps {
    title: string;
    _id: Types.ObjectId;
}

export default IIngredientsType;
