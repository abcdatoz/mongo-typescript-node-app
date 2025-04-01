import express from "express";
import medidaController from "../controllers/appControllers/medidaController";

const medidaRoutes = express.Router();

medidaRoutes.get("/api/medida", medidaController.listAll);
medidaRoutes.post("/api/medida", medidaController.create);
medidaRoutes.put("/api/medida/:id", medidaController.update);
medidaRoutes.delete("/api/medida/:id", medidaController.remove);

export default medidaRoutes;
