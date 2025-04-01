import mongoose, { Model } from "mongoose";
import url from "../config/db.config";
import Restaurant, { IRestaurant } from "./restaurant-model";
import Categoria, { ICategoria } from "./categoria-model";
import Producto, { IProducto } from "./producto-model";
import Usuario, { IUsuario } from "./user-model";
import Color, { IColor } from "./color";
import Medida, { IMedida } from "./medida";
import Mesa, { IMesa } from "./mesa";

mongoose.Promise = global.Promise;

interface IDb {
    mongoose: typeof mongoose;
    url: string;
    restaurantes: Model<IRestaurant>;
    categorias: Model<ICategoria>;
    productos: Model<IProducto>;
    usuarios: Model<IUsuario>;
    colores: Model<IColor>;
    medidas: Model<IMedida>;
    mesas: Model<IMesa>;
}

const db: IDb = {
    mongoose,
    url: url,
    restaurantes: Restaurant,
    categorias: Categoria,
    productos: Producto,
    usuarios: Usuario,
    colores: Color,
    medidas: Medida,
    mesas: Mesa,
};

export default db;
