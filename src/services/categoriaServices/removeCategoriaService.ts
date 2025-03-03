import fs from "fs";
import path from "path";
import AppError from "../../errors/appError";
import Categoria from "../../models/categoria-model";

const RemoveCategoriaService = async (id: string): Promise<void> => {
    if (!id) throw new AppError("el ID de la categoria es requerido");

    try {
        const categoria = await Categoria.findById(id);

        if (!categoria) throw new AppError("La categoria no fue localizada");

        if (categoria.imagen) {
            let ruta: string = path.join(
                __dirname,
                "..",
                "..",
                "..",
                "public",
                "categorias",
                categoria.imagen
            );
            if (fs.existsSync(ruta)) fs.unlinkSync(ruta);
        }

        const result = await Categoria.deleteOne({ _id: id });
    } catch (error) {
        console.log(error);
        throw new AppError("Error al eliminar la categoria");
    }
};

export default RemoveCategoriaService;
