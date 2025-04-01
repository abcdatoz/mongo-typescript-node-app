import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import AppError from "@/errors/appError";
import Producto from "@/models/producto-model";

const remove = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        /*_________________validations__________________*/

        if (!id) throw new AppError("El id del producto es requerido");

        const producto = await Producto.findById(id);

        if (!producto) throw new AppError("El producto no fue localizado");

        // const productos = await Producto.find({ categoriaId: id });
        // if (productos && productos.length > 0)
        //     throw new AppError(
        //         "La categoria no puede ser eliminada porque ya fue utlizado en productos"
        //     );

        /*_________________end_validations__________________*/

        if (producto.imagen) {
            let ruta = path.join(
                __dirname,
                "..",
                "..",
                "..",
                "..",
                "public",
                "productos",
                producto.imagen
            );
            console.log("ruta a eliminar");
            console.log(ruta);

            if (fs.existsSync(ruta)) fs.unlinkSync(ruta);
        }

        producto.removed = true;

        await producto.save();

        res.status(200).json({
            success: true,
            result: producto,
            message: "El producto fue eliminado satisfactoriamente",
        });
    } catch (error: any) {
        if (error.name === "ValidationError")
            throw new AppError("Campos requeridos no fueron enviados", 400);

        throw new AppError("Internal server error", 500);
    }
};

export default remove;
