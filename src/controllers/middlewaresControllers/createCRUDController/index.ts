import mongoose, { Model, Document } from "mongoose";
import { Request, Response } from "express";
import listAll from "./listAll";
import read from "./read";
import filter from "./filter";
import search from "./search";
import paginationList from "./paginatedList";
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

    crudMethods.read = async (req: Request, res: Response) => {
        await read(Model, req, res);
    };

    crudMethods.filter = async (req: Request, res: Response) => {
        await filter(Model, req, res);
    };

    crudMethods.search = async (req: Request, res: Response) => {
        await search(Model, req, res);
    };

    crudMethods.paginatedList = async (req: Request, res: Response) => {
        await paginationList(Model, req, res);
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
