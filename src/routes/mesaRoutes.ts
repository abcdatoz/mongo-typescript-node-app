import express from "express";
import mesaController from "../controllers/appControllers/mesaController";
import isAuth from "../middleware/isAuth";

const mesaRoutes = express.Router();

mesaRoutes.get("/api/mesa/filter", isAuth, mesaController.filter);
mesaRoutes.get("/api/mesa/search", isAuth, mesaController.search);
mesaRoutes.get("/api/mesa/listing", isAuth, mesaController.paginatedList);
mesaRoutes.get("/api/mesa/:id", isAuth, mesaController.read);
mesaRoutes.get("/api/mesa", isAuth, mesaController.listAll);

mesaRoutes.post("/api/mesa", isAuth, mesaController.create);
mesaRoutes.put("/api/mesa/:id", isAuth, mesaController.update);
mesaRoutes.delete("/api/mesa/:id", isAuth, mesaController.remove);

export default mesaRoutes;
