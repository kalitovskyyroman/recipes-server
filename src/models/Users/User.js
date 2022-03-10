import mongoose from "mongoose";

const User = new mongoose.Schema({
    data: {
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
        password: { type: String, required: true },
    },
    logs: {
        created_at: { type: Date, required: true },
        last_update: { type: Date, required: true },
    },
});

export default mongoose.model("User", User);
