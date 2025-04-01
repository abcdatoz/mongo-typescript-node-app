import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import AppError from "@/errors/appError";
import Categoria from "@/models/categoria-model";

const update = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { clave, nombre } = req.body;
    const imagen = req.file?.filename || "";

    if (!id) throw new AppError("El id de la categoria es requerido");

    if (clave == undefined || nombre == undefined || imagen == undefined)
        throw new AppError("Todos los campos son requeridos");

    try {
        const categoria = await Categoria.findById(id);

        if (!categoria) throw new AppError("La categoria no fue localizada");

        if (categoria.imagen) {
            let ruta: string = path.join(
                __dirname,
                "..",
                "..",
                "..",
                "..",
                "public",
                "categorias",
                categoria.imagen
            );

            if (fs.existsSync(ruta)) fs.unlinkSync(ruta);
        }

        categoria.clave = clave;
        categoria.nombre = nombre;
        categoria.imagen = imagen;

        await categoria.save();

        res.status(200).json({
            success: true,
            result: categoria,
            message: "La Categoria fue actualizada exitosamente ",
        });
    } catch (error: any) {
        if (error.name === "ValidationError")
            throw new AppError("Campos requeridos no fueron enviados", 400);

        throw new AppError("Internal server error", 500);
    }
};

export default update;
