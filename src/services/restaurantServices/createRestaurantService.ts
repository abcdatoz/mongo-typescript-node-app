import AppError from "../../errors/appError";
import Restaurant, { IRestaurant } from "../../models/restaurant-model";

const CreateRestaurantService = async (
  data: IRestaurant
): Promise<IRestaurant> => {
  const { nombre, descripcion, domicilio, logo } = data;

  const RestaurantModel = Restaurant;

  if (nombre == undefined || descripcion == undefined || domicilio == undefined)
    throw new AppError("No se capturaron todos los campos");

  const restaurant = new RestaurantModel({
    nombre: nombre,
    descripcion: descripcion,
    domicilio: domicilio,
    logo: logo,
  });

  try {
    const newRestaurant = await restaurant.save();
    return newRestaurant;
  } catch (error) {
    throw new AppError("Error al crear restaurant");
  }
};

export default CreateRestaurantService;
