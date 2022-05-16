import { getIngredientsTypeDto } from "../../dtos/ingredients-type.dto";
import ApiError from "../../exceptions/api.errors";
import IIngredientsType from "../../interfaces/IIngredientsType";
import Type from "../../models/Ingredients/Type";

const createType = async (type: IIngredientsType) => {
    try {
        const createdType = await Type.create(type);
        return getIngredientsTypeDto(createdType);
    } catch (error) {
        throw ApiError.BadRequest("Type already exist");
    }
};

const getTypes = async () => {
    const types = await Type.find().sort({ title: 1 });
    return types.map((type) => getIngredientsTypeDto(type));
};

const getType = async (title: string) => {
    const type = await Type.findOne({ title });
    if (type) {
        return getIngredientsTypeDto(type);
    }
    throw ApiError.NotFound("Role not found");
};

const updateType = async (title: string, newTitle: string) => {
    try {
        const type = await Type.findOneAndUpdate({ title }, { title: newTitle }, { returnDocument: "after" });

        if (type) {
            return getIngredientsTypeDto(type);
        }

        throw ApiError.NotFound("Type not found");
    } catch (error) {
        if (error instanceof ApiError) {
            throw error
        }
        throw ApiError.BadRequest("Type already exist");
    }
};

const deleteType = async (title: string) => {
    const type = await Type.deleteOne({ title });
    if (!type.deletedCount) {
        throw ApiError.NotFound("Type not found");
    }
};

export { createType, getTypes, updateType, deleteType, getType };
