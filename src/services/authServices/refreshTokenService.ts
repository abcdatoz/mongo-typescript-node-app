import { verify } from "jsonwebtoken";
import { Response as Res } from "express";

import { IUsuario } from "../../models/user-model";
import AppError from "../../errors/appError";
import ShowUsuarioService from "../UsuariosServices/showUsuarioService";
import authConfig from "../../config/auth";
import {
    createAccessToken,
    createRefreshToken,
} from "../../helpers/createTokens";

interface RefreshTokenPayload {
    id: string;
    tokenVersion: number;
}

interface Response {
    user: IUsuario;
    newToken: string;
    refreshToken: string;
}

export const RefreshTokenService = async (
    res: Res,
    token: string
): Promise<Response> => {
    try {
        const decoded = verify(token, authConfig.refreshSecret);
        const { id, tokenVersion } = decoded as RefreshTokenPayload;

        const user = await ShowUsuarioService(id);

        if (user.tokenVersion !== tokenVersion) {
            res.clearCookie("jrt");
            throw new AppError("ERR_SESSION_EXPIRED", 401);
        }

        const newToken = createAccessToken(user);
        const refreshToken = createRefreshToken(user);

        return { user, newToken, refreshToken };
    } catch (err) {
        res.clearCookie("jrt");
        throw new AppError("ERR_SESSION_EXPIRED", 401);
    }
};
