import { Request, Response, NextFunction } from "express";
import MessagesEnum from "../../enums/MessagesEnum";
import { createType, deleteType, getType, getTypes, updateType } from "../../services/ingredients/type.service";

const createTypeController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const type = await createType(req.body);
        return res.status(201).json(type);
    } catch (error) {
        next(error);
    }
};

const getTypesController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const types = await getTypes();
        return res.status(200).json(types);
    } catch (error) {
        next(error);
    }
};

const updateTypeController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title } = req.params;

        const newTitle = req.body.title;
        const updatedType = await updateType(title, newTitle);

        return res.status(200).json(updatedType);
    } catch (error) {
        next(error);
    }
};

const deleteTypeController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title } = req.params;
        await deleteType(title);

        return res.status(200).json(MessagesEnum.Deleted);
    } catch (error) {
        next(error);
    }
};

const getTypeController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title } = req.params;

        const type = await getType(title);
        return res.status(200).json(type);
    } catch (error) {
        next(error);
    }
};

export { createTypeController, getTypesController, updateTypeController, deleteTypeController, getTypeController };
