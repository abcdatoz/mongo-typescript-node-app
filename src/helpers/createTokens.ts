import { sign, SignOptions } from "jsonwebtoken";
import authConfig from "../config/auth";
import { IUsuario } from "../models/user-model";

export const createAccessToken = (usuario: IUsuario): string => {
    const { secret, expiresIn } = authConfig;

    //const options: SignOptions = { expiresIn: expiresIn };

    return sign(
        { username: usuario.nombre, profile: usuario.profile, id: usuario.id },
        secret,
        {}
    );
};

export const createRefreshToken = (usuario: IUsuario): string => {
    const { refreshSecret, refreshExpiresIn } = authConfig;

    //const options: SignOptions = { expiresIn: refreshExpiresIn };

    return sign(
        { id: usuario.id, tokenVersion: usuario.tokenVersion },
        refreshSecret,
        {}
    );
};
