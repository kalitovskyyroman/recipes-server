import { Types } from "mongoose";
import IIngredientsType from "../interfaces/IIngredientsType";
import IIngredientsTypeDto from "../interfaces/IIngredientsTypeDto";

interface IIngredientsTypeModel extends IIngredientsType {
    _id: Types.ObjectId;
}

const getIngredientsTypeDto = (model: IIngredientsTypeModel): IIngredientsTypeDto => ({
    title: model.title,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
});

export { getIngredientsTypeDto };
