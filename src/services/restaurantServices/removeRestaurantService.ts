import fs from "fs";
import path from "path";
import AppError from "../../errors/appError";
import Restaurant from "../../models/restaurant-model";
import Categoria from "../../models/categoria-model";

const RemoveRestaurantService = async (id: string): Promise<void> => {
    if (!id) throw new AppError("El ID del restaurant es requerido");

    try {
        const restaurant = await Restaurant.findById(id);

        if (!restaurant) throw new AppError("El  restaurant no fue localizado");

        const categorias = await Categoria.find({ restaurantId: id });

        if (categorias && categorias.length > 0)
            throw new AppError(
                "EL restaurant no puede ser eliminado porque ya fue utlizado en categorias"
            );

        if (restaurant.logo) {
            let ruta = path.join(
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

        const result = await Restaurant.deleteOne({ _id: id });
    } catch (error) {
        console.log(error);
        throw new AppError("Error al eliminar el restaurant");
    }
};

export default RemoveRestaurantService;
