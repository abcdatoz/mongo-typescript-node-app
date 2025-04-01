import { Request, Response } from "express";
import Restaurant from "@/models/restaurant-model";
import AppError from "@/errors/appError";

const create = async (req: Request, res: Response): Promise<void> => {
    const { nombre, domicilio, descripcion } = req.body;

    let logo = req.file?.filename || "";

    const RestaurantModel = Restaurant;

    if (
        nombre == undefined ||
        descripcion == undefined ||
        domicilio == undefined
    )
        throw new AppError("No se capturaron todos los campos");

    const restaurant = new RestaurantModel({
        nombre: nombre,
        descripcion: descripcion,
        domicilio: domicilio,
        logo: logo,
    });

    try {
        const newRestaurant = await restaurant.save();

        res.status(200).json({
            success: true,
            result: newRestaurant,
            message: "El restaurant fue creado exitosamente ",
        });
    } catch (error: any) {
        if (error.name === "ValidationError")
            throw new AppError("Campos requeridos no fueron enviados", 400);

        throw new AppError("Internal server error", 500);
    }
};

export default create;
