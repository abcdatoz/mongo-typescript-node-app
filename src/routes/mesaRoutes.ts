import express from "express";
import mesaController from "../controllers/appControllers/mesaController";

const mesaRoutes = express.Router();

mesaRoutes.get("/api/mesa", mesaController.listAll);
mesaRoutes.post("/api/mesa", mesaController.create);
mesaRoutes.put("/api/mesa/:id", mesaController.update);
mesaRoutes.delete("/api/mesa/:id", mesaController.remove);

export default mesaRoutes;
