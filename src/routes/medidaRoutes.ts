import express from "express";
import medidaController from "../controllers/appControllers/medidaController";
import isAuth from "../middleware/isAuth";

const medidaRoutes = express.Router();

medidaRoutes.get("/api/medida/filter", isAuth ,medidaController.filter);
medidaRoutes.get("/api/medida/search", isAuth, medidaController.search);
medidaRoutes.get("/api/medida/listing", isAuth, medidaController.paginatedList);
medidaRoutes.get("/api/medida/:id", isAuth, medidaController.read);
medidaRoutes.get("/api/medida", isAuth, medidaController.listAll);

medidaRoutes.post("/api/medida", isAuth, medidaController.create);
medidaRoutes.put("/api/medida/:id", isAuth, medidaController.update);
medidaRoutes.delete("/api/medida/:id", isAuth, medidaController.remove);

export default medidaRoutes;
