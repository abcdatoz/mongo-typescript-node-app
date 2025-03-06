import { Request, Response } from "express";
import { IProducto } from "../models/producto-model";

import ListProductoService from "../services/productServices/listProductoService";
import CreateProductoService from "../services/productServices/createProductoService";
import EditProductoService from "../services/productServices/editProductoService";
import RemoveProductoService from "../services/productServices/removeProductoService";

export const list = async (req: Request, res: Response): Promise<Response> => {
    const productos = await ListProductoService();

    return res.status(200).json(productos);
};

export const add = async (req: Request, res: Response): Promise<Response> => {
    const newProducto: IProducto = req.body;

    if (req.file?.filename) newProducto.imagen = req.file?.filename;

    const producto = await CreateProductoService(newProducto);
    return res.status(200).json(producto);
};

export const edit = async (req: Request, res: Response): Promise<Response> => {
    const productoData: IProducto = req.body;
    const { id } = req.params;

    if (req.file?.filename) productoData.imagen = req.file?.fieldname;

    const productoUpdated = await EditProductoService(productoData, id);

    return res.status(200).json();
};

export const remove = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { id } = req.params;

    await RemoveProductoService(id);

    return res.status(200).json({ messsage: "Producto elminado" });
};
