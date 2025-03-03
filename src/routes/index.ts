import { Router } from "express";

import restaurantRoutes from "./restaurantRoutes";
import categoriasRoutes from "./categoriaRoutes";

const routes = Router();

routes.use(restaurantRoutes);
routes.use(categoriasRoutes);

export default routes;
