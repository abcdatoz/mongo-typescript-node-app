import { Router } from "express";

import isAuth from "../middleware/isAuth";
import * as UserController from "../controllers/coreControllers/usuarioController";

const userRoutes = Router();

userRoutes.get("/api/users", UserController.list);
userRoutes.post("/api/users", UserController.add);
userRoutes.put("/api/users/:usuarioId", isAuth, UserController.edit);
userRoutes.get("api/users/:usuarioId", isAuth, UserController.show);
userRoutes.delete("/api/users/:usuarioId", isAuth, UserController.remove);

export default userRoutes;
