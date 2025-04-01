import Usuario from "../../models/user-model";
import AppError from "../../errors/appError";
import {
    createAccessToken,
    createRefreshToken,
} from "../../helpers/createTokens";
import { SerializeUser } from "../../helpers/serializeUser";

interface SerializedUsuario {
    id: number;
    nombre: string;
    email: string;
    profile: string;
}

interface Request {
    email: string;
    password: string;
}

interface Response {
    serializedUsuario: SerializedUsuario;
    token: string;
    refreshToken: string;
}

const AuthUsuarioService = async ({
    email,
    password,
}: Request): Promise<Response> => {
    const usuario = await Usuario.findOne({ email: email }).exec();

    if (!usuario) throw new AppError("Credenciales invalidas!", 401);

    if (!(await usuario.checkPassword(password)))
        throw new AppError("Credenciales invalidas!", 401);

    const token = createAccessToken(usuario);
    const refreshToken = createRefreshToken(usuario);
    const serializedUsuario = SerializeUser(usuario);

    return {
        serializedUsuario,
        token,
        refreshToken,
    };
};

export default AuthUsuarioService;
