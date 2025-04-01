import { Request, Response } from "express";
import Producto from "@/models/producto-model";
import AppError from "@/errors/appError";

const create = async (req: Request, res: Response): Promise<void> => {
    const { clave, nombre, precio, categoriaId } = req.body;

    let imagen = req.file?.filename || "";

    const ProductoModel = Producto;

    if (
        clave == undefined ||
        nombre == undefined ||
        precio == undefined ||
        imagen == undefined ||
        categoriaId == undefined
    ) {
        throw new AppError("No se capturaron todos los campos");
    }

    const producto = new ProductoModel({
        clave: clave,
        nombre: nombre,
        precio: precio,
        imagen: imagen,
        categoriaId: categoriaId,
    });

    try {
        const newProducto = await producto.save();

        res.status(200).json({
            success: true,
            result: newProducto,
            message: "El Producto fue creado exitosamente ",
        });
    } catch (error: any) {
        if (error.name === "ValidationError")
            throw new AppError("Campos requeridos no fueron enviados", 400);

        throw new AppError("Internal server error", 500);
    }
};

export default create;
