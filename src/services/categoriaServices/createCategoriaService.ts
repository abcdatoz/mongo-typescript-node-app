import AppError from "../../errors/appError";
import Categoria, { ICategoria } from "../../models/categoria-model";
import CreateRestaurantService from "../restaurantServices/createRestaurantService";

const CreateCategoriaService = async (
    data: ICategoria
): Promise<ICategoria> => {
    const { clave, nombre, imagen, restaurantId } = data;

    const categoriaModel = Categoria;

    if (
        nombre == undefined ||
        nombre == undefined ||
        imagen == undefined ||
        restaurantId == undefined
    )
        throw new AppError("No se capturaron todos los campos");

    const categoria = new categoriaModel({
        clave: clave,
        nombre: nombre,
        imagen: imagen,
        restaurantId: restaurantId,
        activo: true,
    });

    try {
        const newCateagoria = await categoria.save();

        return newCateagoria;
    } catch (err) {
        throw new AppError("Error al crear la categoria");
    }
};

export default CreateCategoriaService;
