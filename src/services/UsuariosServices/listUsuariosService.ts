import Usuario, { IUsuario } from "../../models/user-model";

const ListUsuariosService = async (): Promise<IUsuario[]> => {
    const usuarios = await Usuario.find({})
        .select("nombre email profile")
        .exec();

    return usuarios;
};

export default ListUsuariosService;
