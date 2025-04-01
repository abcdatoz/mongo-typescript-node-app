import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import AppError from "@/errors/appError";
import Restaurant from "@/models/restaurant-model";

const update = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { nombre, descripcion, domicilio } = req.body;
    const logo = req.file?.filename || "";

    if (!id) throw new AppError("El ID del restaurat es requerido");

    if (
        nombre == undefined ||
        descripcion == undefined ||
        domicilio == undefined
    )
        throw new AppError("No se capturaron todos los campos");

    try {
        const restaurant = await Restaurant.findById(id);

        if (!restaurant) throw new AppError("Restaurant no encontrado");

        if (restaurant.logo) {
            let ruta: string = path.join(
                __dirname,
                "..",
                "..",
                "..",
                "..",
                "public",
                "restaurant",
                restaurant.logo
            );

            if (fs.existsSync(ruta)) fs.unlinkSync(ruta);
        }

        restaurant.nombre = nombre;
        restaurant.descripcion = descripcion;
        restaurant.domicilio = domicilio;
        restaurant.logo = logo;

        await restaurant.save();

        res.status(200).json({
            success: true,
            result: restaurant,
            message: "El restaurant fue actualizado exitosamente ",
        });
    } catch (error: any) {
        if (error.name === "ValidationError")
            throw new AppError("Campos requeridos no fueron enviados", 400);

        throw new AppError("Internal server error", 500);
    }
};

export default update;
