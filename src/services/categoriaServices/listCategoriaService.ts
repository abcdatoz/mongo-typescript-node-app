import Categoria, { ICategoria } from "../../models/categoria-model";

const ListCategoriaService = async (): Promise<ICategoria[]> => {
    const categorias = await Categoria.find().sort({ clave: 1 });

    return categorias;
};

export default ListCategoriaService;
