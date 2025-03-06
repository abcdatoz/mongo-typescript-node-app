import fs from "fs";
import path from "path";
import AppError from "../../errors/appError";
import Producto, { IProducto } from "../../models/producto-model";
import Categoria from "../../models/categoria-model";

const EditProductoService = async (
    data: IProducto,
    idProducto: string
): Promise<IProducto> => {
    const { clave, nombre, precio, imagen } = data;

    try {
        if (!idProducto) throw new AppError("El id del producto es requerido");

        const producto = await Producto.findById(idProducto);

        if (!producto)
            throw new AppError("El producto no fue localizado en la BD");

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

        producto.clave = clave;
        producto.nombre = nombre;
        producto.precio = precio;
        producto.imagen = imagen;

        await producto.save();
        return producto;
    } catch (error) {
        throw new AppError("Error al editar el producto");
    }
};

export default EditProductoService;
