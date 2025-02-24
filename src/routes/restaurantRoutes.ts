import express from "express";
import multer from "multer";
import * as x from "../controllers/restaurantController";

import { setupStorage } from "../config/upload";

//import isAuth from '../middleware/isAuth'

const restaurantRoutes = express.Router();

const storage = setupStorage("restaurant");
const upload = multer({ storage: storage });

restaurantRoutes.get("/api/restaurantes", x.list);
restaurantRoutes.post("/api/restaurantes", [upload.single("logo")], x.add);
restaurantRoutes.put("/api/restaurantes/:id", [upload.single("logo")], x.edit);
restaurantRoutes.delete("/api/restaurantes/:id", x.remove);

export default restaurantRoutes;
