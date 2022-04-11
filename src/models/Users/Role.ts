import { Schema, model } from "mongoose";
import IRole from "../../interfaces/IRole";

const Role = new Schema<IRole>(
    {
        name: { type: String, unique: true, required: true },
    },
    { timestamps: true }
);

export default model<IRole>("Role", Role);
