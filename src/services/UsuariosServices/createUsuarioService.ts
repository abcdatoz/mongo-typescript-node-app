import AppError from "../../errors/appError";
import { SerializeUser } from "../../helpers/serializeUser";
import Usuario, { IUsuario } from "../../models/user-model";

interface Request {
    email: string;
    password: string;
    nombre: string;
    profile: string;
}

interface Response {
    email: string;
    nombre: string;
    id: number;
    profile: string;
}

const CreateUsuarioService = async (data: Request): Promise<Response> => {
    const { email, password, nombre, profile } = data;

    if (
        email == null ||
        nombre == null ||
        password == null ||
        email == undefined ||
        nombre == undefined ||
        password == undefined
    )
        throw new AppError("No capturo todos los datos solicitados");

    const UsuarioModel = Usuario;

    const usuario = new UsuarioModel({
        email: email,
        nombre: nombre,
        password: password,
        profile: profile,
    });

    try {
        const newUsuario = await usuario.save();

        let nuevoUsuario: Response = {
            email,
            nombre,
            profile,
            id: newUsuario.id,
        };

        return nuevoUsuario;
    } catch (error) {
        throw new AppError("Error al crear el usuario: " + error);
    }
};

export default CreateUsuarioService;
