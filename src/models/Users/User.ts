import { Schema, model } from "mongoose";
import IUser from "../../interfaces/IUser";

const User = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        role: { type: Schema.Types.ObjectId, ref: "Role", required: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

export default model<IUser>("User", User);
