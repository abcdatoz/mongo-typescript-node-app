import { Router } from "express";

import restaurantRoutes from "./restaurantRoutes";
import categoriasRoutes from "./categoriaRoutes";
import productoRoutes from "./productoRoutes";

import colorRoutes from "./colorRoutes";
import medidaRoutes from "./medidaRoutes";
import mesaRoutes from "./mesaRoutes";

import authRoutes from "./authRoutes";
import userRoutes from "./usuarioRoutes";

const routes = Router();

routes.use(authRoutes);
routes.use(userRoutes);

routes.use(restaurantRoutes);
routes.use(categoriasRoutes);
routes.use(productoRoutes);

routes.use(colorRoutes);
routes.use(medidaRoutes);
routes.use(mesaRoutes);

export default routes;
