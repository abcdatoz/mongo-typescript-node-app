import express from "express";
import multer from "multer";
import * as x from "../controllers/categoriaController";
import { setupStorage } from "../config/upload";

const categoriaRoutes = express.Router();

const storage = setupStorage("categorias");
const upload = multer({ storage: storage });

categoriaRoutes.get("/api/categorias", x.list);
categoriaRoutes.post("/api/categorias", [upload.single("imagen")], x.add);
categoriaRoutes.put("/api/categorias/:id", [upload.single("imagen")], x.edit);
categoriaRoutes.delete("/api/categorias/:id", x.remove);

export default categoriaRoutes;
