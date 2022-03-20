import mongoose from "mongoose";

const User = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model("User", User);
