import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import AppError from "@/errors/appError";
import Categoria from "@/models/categoria-model";
import Producto from "@/models/producto-model";

const remove = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        /*_________________validations__________________*/

        if (!id) throw new AppError("El id de la categoria es requerido");

        const categoria = await Categoria.findById(id);

        if (!categoria) throw new AppError("La categoria no fue localizada");

        const productos = await Producto.find({ categoriaId: id });

        if (productos && productos.length > 0)
            throw new AppError(
                "La categoria no puede ser eliminada porque ya fue utlizado en productos"
            );
        /*_________________end_validations__________________*/

        if (categoria.imagen) {
            let ruta = path.join(
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

        categoria.removed = true;

        await categoria.save();

        res.status(200).json({
            success: true,
            result: categoria,
            message: "La categoria fue eliminada satisfactoriamente",
        });
    } catch (error: any) {
        if (error.name === "ValidationError")
            throw new AppError("Campos requeridos no fueron enviados", 400);

        throw new AppError("Internal server error", 500);
    }
};

export default remove;
