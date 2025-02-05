import { Document, Schema, Types, model } from "mongoose";

export interface IProducto extends Document {
  clave: string;
  nombre: string;
  precio: number;
  imagen: Buffer;
  imagenUrl: string;
  categoriaId: Types.ObjectId;
}

const productoSchema = new Schema<IProducto>({
  clave: { type: String, required: true },
  nombre: { type: String, requird: true },
  imagen: Buffer,
  imagenUrl: String,
  categoriaId: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
});

const Producto = model<IProducto>("Producto", productoSchema);

export default Producto;
