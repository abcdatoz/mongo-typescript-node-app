import { Router } from "express";

import restaurantRoutes from "./restaurantRoutes";

const routes = Router();

routes.use(restaurantRoutes);

export default routes;
