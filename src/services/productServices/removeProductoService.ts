import fs from "fs";
import path from "path";
import AppError from "../../errors/appError";
import Producto from "../../models/producto-model";

const RemoveProductoService = async (id: string): Promise<void> => {
    if (!id) throw new AppError("El ID del producto es requerido");

    try {
        const producto = await Producto.findById(id);

        if (!producto) throw new AppError("El producto no fue localizado");

        if (producto.imagen) {
            let ruta: string = path.join(
                __dirname,
                "..",
                "..",
                "..",
                "public",
                "productos",
                producto.imagen
            );
            if (fs.existsSync(ruta)) fs.unlinkSync(ruta);
        }

        const result = await Producto.deleteOne({ _id: id });
    } catch (error) {
        throw new AppError("Error al eliminar el producto");
    }
};

export default RemoveProductoService;
