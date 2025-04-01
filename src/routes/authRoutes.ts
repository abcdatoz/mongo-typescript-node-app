import { Router } from "express";
import * as SessionController from "../controllers/coreControllers/sessionController";
import * as UserController from "../controllers/coreControllers/usuarioController";
import isAuth from "../middleware/isAuth";

const authRoutes = Router();

authRoutes.post("/api/signup", UserController.add);
authRoutes.post("/api/login", SessionController.store);
authRoutes.post("/api/refresh_token", SessionController.update);
authRoutes.delete("/api/logout", isAuth, SessionController.remove);

export default authRoutes;
