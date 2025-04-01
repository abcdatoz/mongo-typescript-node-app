import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import AppError from "../errors/appError";
import authConfig from "../config/auth";

interface TokenPayload {
    id: number;
    username: string;
    profile: string;
    iat: number;
    expt: number;
}

const isAuth = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) throw new AppError("ERR_SESSION_EXPIRED", 401);

    const [, token] = authHeader.split(" ");

    if (!token) return next(new AppError("Token no proporcionado", 401));

    try {
        const decoded = verify(token, authConfig.secret);
        const { id, profile } = decoded as TokenPayload;

        req.user = { id, profile };
    } catch (err) {
        throw new AppError(
            "Token invalido, trataremos de asignarle uno nuevo en la siguiente peticion",
            403
        );
    }

    return next();
};

export default isAuth;
