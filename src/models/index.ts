import mongoose, { Model } from "mongoose";
import url from "../config/db.config";
import Restaurant, { IRestaurant } from "./restaurant-model";
import Categoria, { ICategoria } from "./categoria-model";
import Producto, { IProducto } from "./producto-model";

mongoose.Promise = global.Promise;

interface IDb {
  mongoose: typeof mongoose;
  url: string;
  restaurantes: Model<IRestaurant>;
  categorias: Model<ICategoria>;
  productos: Model<IProducto>;
}

const db: IDb = {
  mongoose,
  url: url,
  restaurantes: Restaurant,
  categorias: Categoria,
  productos: Producto,
};

export default db;
