import AppError from "../../errors/appError";
import Usuario from "../../models/user-model";

const DeleteUsuarioService = async (id: string): Promise<void> => {
    if (!id) throw new AppError("El ID del usuario es requerido");

    try {
        const result = await Usuario.deleteOne({ _id: id });
    } catch (error) {
        throw new AppError("Error al eliminar al usuario");
    }
};

export default DeleteUsuarioService;
