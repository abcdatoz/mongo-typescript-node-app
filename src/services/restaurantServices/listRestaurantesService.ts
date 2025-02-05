import Restaurant, { IRestaurant } from "../../models/restaurant-model";

const ListRestauratesService = async (): Promise<IRestaurant[]> => {
  const restaurantes = await Restaurant.find().sort({ clave: 1 });

  return restaurantes;
};

export default ListRestauratesService;
