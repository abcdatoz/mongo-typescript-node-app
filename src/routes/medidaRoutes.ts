import express from "express";
import medidaController from "../controllers/appControllers/medidaController";

const medidaRoutes = express.Router();

medidaRoutes.get("/api/medida/filter", medidaController.filter);
medidaRoutes.get("/api/medida/search", medidaController.search);
medidaRoutes.get("/api/medida/listing", medidaController.paginatedList);
medidaRoutes.get("/api/medida/:id", medidaController.read);
medidaRoutes.get("/api/medida", medidaController.listAll);

medidaRoutes.post("/api/medida", medidaController.create);
medidaRoutes.put("/api/medida/:id", medidaController.update);
medidaRoutes.delete("/api/medida/:id", medidaController.remove);

export default medidaRoutes;
