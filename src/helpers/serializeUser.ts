import { IUsuario } from "../models/user-model";

interface SerializedUser {
    id: number;
    nombre: string;
    email: string;
    profile: string;
}

export const SerializeUser = (usuario: IUsuario): SerializedUser => {
    return {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        profile: usuario.profile,
    };
};
