import AppError from "../../errors/appError";
import { SerializeUser } from "../../helpers/serializeUser";
import Usuario, { IUsuario } from "../../models/user-model";

interface Request {
    nombre: string;
    password: string;
    profile: string;
}

interface SerializedUsuario {
    id: number;
    nombre: string;
    email: string;
    profile: string;
}

const UpdateUsuarioService = async (
    data: Request,
    id: string
): Promise<SerializedUsuario> => {
    const { nombre, password, profile } = data;

    if (nombre == null || password == null || password == undefined)
        throw new AppError("No capturo todos los datos solicitados");

    const usuario = await Usuario.findById(id);

    if (!usuario) throw new AppError("El usuario no fue localizado con ese Id");

    usuario.nombre = nombre;
    usuario.profile = profile;
    usuario.password = password;

    await usuario.save();

    const serializedUsuario = SerializeUser(usuario);

    return serializedUsuario;
};

export default UpdateUsuarioService;
