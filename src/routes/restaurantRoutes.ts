import express from "express";
import multer from "multer";
import restaurantController from "../controllers/appControllers/restaurantController";
import isAuth from "../middleware/isAuth";
import { setupStorage } from "../config/upload";

const restaurantRoutes = express.Router();

const storage = setupStorage("restaurant");
const upload = multer({ storage: storage });

restaurantRoutes.get("/api/restaurantes/filter", restaurantController.filter);
restaurantRoutes.get("/api/restaurantes/search", restaurantController.search);
restaurantRoutes.get("/api/restaurantes/:id", restaurantController.read);
restaurantRoutes.get("/api/restaurantes", restaurantController.listAll);

restaurantRoutes.post(
    "/api/restaurantes",
    [isAuth, upload.single("logo")],
    restaurantController.create
);
restaurantRoutes.put(
    "/api/restaurantes/:id",
    [isAuth, upload.single("logo")],
    restaurantController.update
);
restaurantRoutes.delete(
    "/api/restaurantes/:id",
    isAuth,
    restaurantController.remove
);

export default restaurantRoutes;
