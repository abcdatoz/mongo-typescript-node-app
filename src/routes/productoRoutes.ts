import express from "express";
import multer from "multer";
import productoController from "../controllers/appControllers/productoController";
import { setupStorage } from "../config/upload";
import isAuth from "../middleware/isAuth";

const productoRoutes = express.Router();

const storage = setupStorage("productos");
const upload = multer({ storage: storage });

productoRoutes.get("/api/productos/filter", productoController.filter);
productoRoutes.get("/api/productos/search", productoController.search);
productoRoutes.get("/api/productos/listing", productoController.paginatedList);
productoRoutes.get("/api/productos/:id", productoController.read);
productoRoutes.get("/api/productos", productoController.listAll);

productoRoutes.post(
    "/api/productos",
    [isAuth, upload.single("imagen")],
    productoController.create
);

productoRoutes.put(
    "/api/productos/:id",
    [isAuth, upload.single("imagen")],
    productoController.update
);

productoRoutes.delete("/api/productos/:id", isAuth, productoController.remove);

export default productoRoutes;
