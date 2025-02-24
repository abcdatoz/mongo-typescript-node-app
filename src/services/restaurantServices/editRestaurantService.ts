import fs from "fs";
import AppError from "../../errors/appError";
import Restaurant, { IRestaurant } from "../../models/restaurant-model";
import path from "path";

const EditRestaurantService = async (
    data: IRestaurant,
    idRestaurant: string
): Promise<IRestaurant> => {
    const { nombre, descripcion, domicilio, logo } = data;

    try {
        if (!idRestaurant)
            throw new AppError("El ID del restaurat es requerido");

        if (
            nombre == undefined ||
            descripcion == undefined ||
            domicilio == undefined
        )
            throw new AppError("No se capturaron todos los campos");

        const restaurant = await Restaurant.findById(idRestaurant);

        if (!restaurant) throw new AppError("Restaurant no encontrado");

        if (restaurant.logo) {
            let ruta: string = path.join(
                __dirname,
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

        return restaurant;
    } catch (error) {
        console.log(error);
        throw new AppError("Error al editar el restaurant");
    }
};

export default EditRestaurantService;
