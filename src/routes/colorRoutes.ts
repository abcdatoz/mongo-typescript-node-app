import express from "express";
import colorController from "../controllers/appControllers/colorController";
import isAuth from "../middleware/isAuth";

const colorRoutes = express.Router();

colorRoutes.get("/api/color/filter", colorController.filter);
colorRoutes.get("/api/color/search", colorController.search);
colorRoutes.get("/api/color/listing", colorController.paginatedList);
colorRoutes.get("/api/color/:id", colorController.read);
colorRoutes.get("/api/color", colorController.listAll);

colorRoutes.post("/api/color", isAuth, colorController.create);
colorRoutes.put("/api/color/:id", colorController.update);
colorRoutes.delete("/api/color/:id", colorController.remove);

export default colorRoutes;
