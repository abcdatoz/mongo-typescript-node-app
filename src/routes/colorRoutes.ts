import express from "express";
import colorController from "../controllers/appControllers/colorController";

const colorRoutes = express.Router();

colorRoutes.get("/api/color", colorController.listAll);
colorRoutes.post("/api/color", colorController.create);
colorRoutes.put("/api/color/:id", colorController.update);
colorRoutes.delete("/api/color/:id", colorController.remove);

export default colorRoutes;
