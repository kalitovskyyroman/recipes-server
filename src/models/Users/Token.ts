import { Schema, model } from "mongoose";
import IToken from "../../interfaces/IToken";

const Token = new Schema<IToken>({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    refreshToken: { type: String, required: true },
});

export default model<IToken>("Token", Token);
