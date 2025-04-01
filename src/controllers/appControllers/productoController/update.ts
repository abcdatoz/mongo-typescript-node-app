import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import AppError from "@/errors/appError";
import Producto from "@/models/producto-model";

const update = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { clave, nombre, precio } = req.body;
    const imagen = req.file?.filename || "";

    if (!id) throw new AppError("El id del producto es requerido");

    if (clave == undefined || nombre == undefined)
        throw new AppError("La clave y el nombre son campos requeridos");

    try {
        const producto = await Producto.findById(id);

        if (!producto) throw new AppError("El producto no fue localizado");

        if (producto.imagen) {
            let ruta: string = path.join(
                __dirname,
                "..",
                "..",
                "..",
                "..",
                "public",
                "productos",
                producto.imagen
            );

            if (fs.existsSync(ruta)) fs.unlinkSync(ruta);
        }

        producto.clave = clave;
        producto.nombre = nombre;
        producto.precio = precio;
        producto.imagen = imagen;

        await producto.save();

        res.status(200).json({
            success: true,
            result: producto,
            message: "El producto fue actualizado exitosamente ",
        });
    } catch (error: any) {
        if (error.name === "ValidationError")
            throw new AppError("Campos requeridos no fueron enviados", 400);

        throw new AppError("Internal server error", 500);
    }
};

export default update;
