import fs from "fs";
import AppError from "../../errors/appError";
import Categoria, { ICategoria } from "../../models/categoria-model";
import path from "path";

const EditCategoriaService = async (
    data: ICategoria,
    idCategoria: string
): Promise<ICategoria> => {
    const { clave, nombre, imagen } = data;

    try {
        if (!idCategoria)
            throw new AppError("El id de la categoria es requerido");

        if (clave == undefined || nombre == undefined || imagen == undefined)
            throw new AppError("Todos los campos son requeridos");

        const categoria = await Categoria.findById(idCategoria);

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

        categoria.clave = clave;
        categoria.nombre = nombre;
        categoria.imagen = imagen;

        await categoria.save();

        return categoria;
    } catch (error) {
        throw new AppError("Error al editar la categoria");
    }
};

export default EditCategoriaService;
