import mongoose from "mongoose";

const Role = new mongoose.Schema(
    {
        name: { type: String, unique: true, required: true },
    },
    { timestamps: true }
);

export default mongoose.model("Role", Role);
