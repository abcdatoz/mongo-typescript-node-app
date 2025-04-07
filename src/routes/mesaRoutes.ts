import express from "express";
import mesaController from "../controllers/appControllers/mesaController";

const mesaRoutes = express.Router();

mesaRoutes.get("/api/mesa/filter", mesaController.filter);
mesaRoutes.get("/api/mesa/search", mesaController.search);
mesaRoutes.get("/api/mesa/listing", mesaController.paginatedList);
mesaRoutes.get("/api/mesa/:id", mesaController.read);
mesaRoutes.get("/api/mesa", mesaController.listAll);

mesaRoutes.post("/api/mesa", mesaController.create);
mesaRoutes.put("/api/mesa/:id", mesaController.update);
mesaRoutes.delete("/api/mesa/:id", mesaController.remove);

export default mesaRoutes;
