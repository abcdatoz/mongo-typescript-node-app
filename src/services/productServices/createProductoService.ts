import AppError from "../../errors/appError";
import Producto, { IProducto } from "../../models/producto-model";

const CreateProductoService = async (data: IProducto): Promise<IProducto> => {
    const { clave, nombre, precio, imagen, categoriaId } = data;
    const productoModel = Producto;

    if (
        clave == undefined ||
        nombre == undefined ||
        precio == undefined ||
        imagen == undefined ||
        categoriaId == undefined
    ) {
        throw new AppError("No se capturaron todos los campos");
    }

    const producto = new productoModel({
        clave: clave,
        nombre: nombre,
        precio: precio,
        imagen: imagen,
        categoriaId: categoriaId,
    });

    try {
        const newProducto = await producto.save();
        return newProducto;
    } catch (err) {
        throw new AppError("Error al crear el producto");
    }
};

export default CreateProductoService;
