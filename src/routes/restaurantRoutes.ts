import express from "express";
import * as RestaurantController from "../controllers/restaurantController";

//import isAuth from '../middleware/isAuth'

const restaurantRoutes = express.Router();

restaurantRoutes.get("/api/restaurantes", RestaurantController.list);

export default restaurantRoutes;
