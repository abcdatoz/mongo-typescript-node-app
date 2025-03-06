import express from "express";
import multer from "multer";
import * as x from "../controllers/productoController";
import { setupStorage } from "../config/upload";

const productoRoutes = express.Router();

const storage = setupStorage("productos");
const upload = multer({ storage: storage });

productoRoutes.get("/api/productos", x.list);
productoRoutes.post("/api/productos", [upload.single("imagen")], x.add);
productoRoutes.put("/api/productos/:id", [upload.single("imagen")], x.edit);
productoRoutes.delete("/api/productos/:id", x.remove);

export default productoRoutes;
