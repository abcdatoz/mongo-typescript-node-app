import mongoose, { Model, Document } from "mongoose";
import { Request, Response } from "express";
import listAll from "./listAll";
import create from "./create";
import update from "./update";
import remove from "./remove";

const createCRUDController = <T extends Document>(modelName: string) => {
    const Model = mongoose.model(modelName) as Model<Document>; // Tipo del modelo

    let crudMethods: {
        [key: string]: (req: Request, res: Response) => Promise<void>;
    } = {};

    crudMethods.listAll = async (req: Request, res: Response) => {
        await listAll(Model, req, res);
    };

    crudMethods.create = async (req: Request, res: Response) => {
        await create(Model, req, res);
    };

    crudMethods.update = async (req: Request, res: Response) => {
        await update(Model, req, res);
    };

    crudMethods.remove = async (req: Request, res: Response) => {
        await remove(Model, req, res);
    };

    return crudMethods;
};

export default createCRUDController;
