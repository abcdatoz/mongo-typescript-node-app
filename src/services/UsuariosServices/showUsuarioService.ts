import Usuario, { IUsuario } from "../../models/user-model";
import AppError from "../../errors/appError";

const ShowUsuarioService = async (id: string): Promise<IUsuario> => {
    const usuario = await Usuario.findById(id).select("nombre email profile");

    if (!usuario) throw new AppError("Usuario no localizado");

    return usuario;
};

export default ShowUsuarioService;
