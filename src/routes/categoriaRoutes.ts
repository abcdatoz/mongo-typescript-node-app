import express from "express";
import multer from "multer";
import categoriaController from "../controllers/appControllers/categoriaController";
import { setupStorage } from "../config/upload";
import isAuth from "../middleware/isAuth";

const categoriaRoutes = express.Router();

const storage = setupStorage("categorias");
const upload = multer({ storage: storage });

categoriaRoutes.get("/api/categorias/filter", categoriaController.filter);
categoriaRoutes.get("/api/categorias/search", categoriaController.search);
categoriaRoutes.get(
    "/api/categorias/listing",
    categoriaController.paginatedList
);
categoriaRoutes.get("/api/categorias/:id", categoriaController.read);
categoriaRoutes.get("/api/categorias", categoriaController.listAll);

categoriaRoutes.post(
    "/api/categorias",
    [isAuth, upload.single("imagen")],
    categoriaController.create
);
categoriaRoutes.put(
    "/api/categorias/:id",
    [isAuth, upload.single("imagen")],
    categoriaController.update
);
categoriaRoutes.delete(
    "/api/categorias/:id",
    isAuth,
    categoriaController.remove
);

export default categoriaRoutes;
