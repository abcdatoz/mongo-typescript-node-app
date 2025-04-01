import { Request, Response } from "express";
import AppError from "../../errors/appError";

import AuthUsuarioService from "../../services/UsuariosServices/authUsuarioService";
import { SendRefreshToken } from "../../helpers/sendRefreshToken";
import { RefreshTokenService } from "../../services/authServices/refreshTokenService";

export const store = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const { token, serializedUsuario, refreshToken } = await AuthUsuarioService(
        { email, password }
    );

    SendRefreshToken(res, refreshToken);

    return res.status(200).json({
        token,
        user: serializedUsuario,
    });
};

export const update = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const token: string = req.cookies.jrt;

    if (!token) throw new AppError("ERR_SESSION_EXPIRED", 401);

    const { user, newToken, refreshToken } = await RefreshTokenService(
        res,
        token
    );

    SendRefreshToken(res, refreshToken);

    return res.json({ token: newToken, user });
};

export const remove = async (
    req: Request,
    res: Response
): Promise<Response> => {
    res.clearCookie("jrt");
    return res.send();
};
