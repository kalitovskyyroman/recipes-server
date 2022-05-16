import { Schema, model } from "mongoose";
import IIngredientsType from "../../interfaces/IIngredientsType";

const IngredientsType = new Schema<IIngredientsType>(
    {
        title: { type: String, unique: true, required: true },
    },
    { timestamps: true }
);

export default model<IIngredientsType>("IngredientsType", IngredientsType);
