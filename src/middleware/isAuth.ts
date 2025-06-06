import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import AppError from "../errors/appError";
import authConfig from "../config/auth";

interface TokenPayload {
    id: number;
    username: string;
    profile: string;
    iat: number;
    exp: number;  // corregido de 'expt'
}

const isAuth = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    console.log("isAuth - Authorization header:", authHeader);

    if (!authHeader) {
        console.error("No Authorization header");
        return next(new AppError("ERR_SESSION_EXPIRED", 401));
    }

    const [, token] = authHeader.split(" ");

    if (!token) {
        console.error("No token provided in Authorization header");
        return next(new AppError("Token no proporcionado", 401));
    }

    try {
        const decoded = verify(token, authConfig.secret);
        console.log("Token decoded:", decoded);
        const { id, profile } = decoded as TokenPayload;

        // Añadí validación extra por si no vienen id o profile
        if (!id || !profile) {
            console.error("Token decoded pero sin id o profile");
            return next(new AppError("Token inválido", 403));
        }

        // Agrego user a req para usarlo en controladores
        (req as any).user = { id, profile };

        next();
    } catch (err) {
        console.error("Error en verificación de token:", err);
        return next(new AppError(
            "Token inválido, trataremos de asignarle uno nuevo en la siguiente petición",
            403
        ));
    }
};

export default isAuth;

// import { verify } from "jsonwebtoken";
// import { Request, Response, NextFunction } from "express";

// import AppError from "../errors/appError";
// import authConfig from "../config/auth";

// interface TokenPayload {
//     id: number;
//     username: string;
//     profile: string;
//     iat: number;
//     expt: number;
// }

// const isAuth = (req: Request, res: Response, next: NextFunction): void => {
//     const authHeader = req.headers.authorization;

//     if (!authHeader) throw new AppError("ERR_SESSION_EXPIRED", 401);

//     const [, token] = authHeader.split(" ");

//     if (!token) return next(new AppError("Token no proporcionado", 401));

//     try {
//         const decoded = verify(token, authConfig.secret);
//         const { id, profile } = decoded as TokenPayload;

//         req.user = { id, profile };
//     } catch (err) {
//         throw new AppError(
//             "Token invalido, trataremos de asignarle uno nuevo en la siguiente peticion",
//             403
//         );
//     }

//     return next();
// };

// export default isAuth;
