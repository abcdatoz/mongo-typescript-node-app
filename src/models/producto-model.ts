import { Document, Schema, Types, model } from "mongoose";

export interface IProducto extends Document {
    clave: string;
    nombre: string;
    precio: number;
    imagen: string;
    activo: boolean;
    categoriaId: Types.ObjectId;
    removed: boolean;
    enabled: boolean;
}

const productoSchema = new Schema<IProducto>({
    clave: { type: String, required: true },
    nombre: { type: String, requird: true },
    imagen: String,
    activo: Boolean,
    categoriaId: {
        type: Schema.Types.ObjectId,
        ref: "Categoria",
        required: true,
    },
    removed: { type: Boolean, default: false },
    enabled: { type: Boolean, default: true },
});

const Producto = model<IProducto>("Producto", productoSchema);

export default Producto;
