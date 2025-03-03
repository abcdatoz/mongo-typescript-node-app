import { Request, Response } from "express";
import AppError from "../errors/appError";
import { ICategoria } from "../models/categoria-model";

import ListCategoriaService from "../services/categoriaServices/listCategoriaService";
import CreateCategoriaService from "../services/categoriaServices/createCategoriaService";
import EditCategoriaService from "../services/categoriaServices/editCategoriaService";
import RemoveCategoriaService from "../services/categoriaServices/removeCategoriaService";

export const list = async (req: Request, res: Response): Promise<Response> => {
    const categorias = await ListCategoriaService();
    return res.status(200).json(categorias);
};

export const add = async (req: Request, res: Response): Promise<Response> => {
    const newCategoria: ICategoria = req.body;

    if (req.file?.filename) {
        newCategoria.imagen = req.file?.filename;
    }

    const categoria = await CreateCategoriaService(newCategoria);

    return res.status(200).json(categoria);
};

export const edit = async (req: Request, res: Response): Promise<Response> => {
    const categoriaData: ICategoria = req.body;
    const { id } = req.params;

    if (req.file?.filename) categoriaData.imagen = req.file?.filename;

    const categoriaUpdated = await EditCategoriaService(categoriaData, id);

    return res.status(200).json(categoriaUpdated);
};

export const remove = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { id } = req.params;

    await RemoveCategoriaService(id);
    return res.status(200).json({ message: "Categoria Eliminada" });
};
