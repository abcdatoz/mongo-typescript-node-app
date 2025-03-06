import { Router } from "express";

import restaurantRoutes from "./restaurantRoutes";
import categoriasRoutes from "./categoriaRoutes";
import productoRoutes from "./productoRoutes";

const routes = Router();

routes.use(restaurantRoutes);
routes.use(categoriasRoutes);
routes.use(productoRoutes);

export default routes;
