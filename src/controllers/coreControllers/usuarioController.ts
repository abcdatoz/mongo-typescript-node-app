import { Request, Response } from "express";
import AppError from "../../errors/appError";

import ListUsuariosService from "../../services/UsuariosServices/listUsuariosService";
import ShowUsuarioService from "../../services/UsuariosServices/showUsuarioService";
import CreateUsuarioService from "../../services/UsuariosServices/createUsuarioService";
import UpdateUsuarioService from "../../services/UsuariosServices/updateUsuarioService";
import DeleteUsuarioService from "../../services/UsuariosServices/deleteUsuarioService";

export const list = async (req: Request, res: Response): Promise<Response> => {
    const usuarios = await ListUsuariosService();

    return res.status(200).json(usuarios);
};

export const add = async (req: Request, res: Response): Promise<Response> => {
    const { email, password, nombre, profile } = req.body;

    const usuario = await CreateUsuarioService({
        email,
        password,
        profile,
        nombre,
    });

    return res.status(200).json(usuario);
};

export const show = async (req: Request, res: Response): Promise<Response> => {
    const { usuarioId } = req.params;
    const usuario = await ShowUsuarioService(usuarioId);
    return res.status(200).json(usuario);
};

export const edit = async (req: Request, res: Response): Promise<Response> => {
    const { usuarioId } = req.params;
    const usuarioData = req.body;

    const usuario = await UpdateUsuarioService(usuarioData, usuarioId);

    return res.status(200).json(usuario);
};

export const remove = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { usuarioId } = req.params;

    if (req.user?.profile !== "administrator")
        throw new AppError("ERR_NO_PERMISSION", 401);

    await DeleteUsuarioService(usuarioId);

    return res.status(200).json({ message: "usuario eliminado" });
};
