import Producto, { IProducto } from "../../models/producto-model";

const ListProductoService = async (): Promise<IProducto[]> => {
    const productos = await Producto.find().sort({ clave: 1 });

    return productos;
};

export default ListProductoService;
