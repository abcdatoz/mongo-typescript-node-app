import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import AppError from "@/errors/appError";
import Restaurant from "@/models/restaurant-model";
import Categoria from "@/models/categoria-model";

const remove = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        /*_________________validations__________________*/

        if (!id) throw new AppError("El id del restaurant es requerido");

        const restaurant = await Restaurant.findById(id);

        if (!restaurant) throw new AppError("El  restaurant no fue localizado");

        const categorias = await Categoria.find({ restaurantId: id });

        if (categorias && categorias.length > 0)
            throw new AppError(
                "EL restaurant no puede ser eliminado porque ya fue utlizado en categorias"
            );
        /*_________________end_validations__________________*/

        if (restaurant.logo) {
            let ruta = path.join(
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

        restaurant.removed = true;

        await restaurant.save();

        res.status(200).json({
            success: true,
            result: restaurant,
            message: "El restaurant fue eliminado satisfactoriamente",
        });
    } catch (error: any) {
        if (error.name === "ValidationError")
            throw new AppError("Campos requeridos no fueron enviados", 400);

        throw new AppError("Internal server error", 500);
    }
};

export default remove;
