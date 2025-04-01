import { Request, Response } from "express";
import Categoria from "@/models/categoria-model";
import AppError from "@/errors/appError";

const create = async (req: Request, res: Response): Promise<void> => {
    const { clave, nombre, restaurantId } = req.body;

    let imagen = req.file?.filename || "";

    const CategoriaModel = Categoria;

    if (
        clave == undefined ||
        nombre == undefined ||
        imagen == undefined ||
        restaurantId == undefined
    )
        throw new AppError("No se capturaron todos los campos");

    const categoria = new CategoriaModel({
        clave: clave,
        nombre: nombre,
        imagen: imagen,
        restaurantId: restaurantId,
        activo: true,
    });

    try {
        const newCategoria = await categoria.save();

        res.status(200).json({
            success: true,
            result: newCategoria,
            message: "La categoria fue creada exitosamente ",
        });
    } catch (error: any) {
        if (error.name === "ValidationError")
            throw new AppError("Campos requeridos no fueron enviados", 400);

        throw new AppError("Internal server error", 500);
    }
};

export default create;
