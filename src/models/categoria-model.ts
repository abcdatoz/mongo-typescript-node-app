import { Document, Schema, Types, model } from "mongoose";

export interface ICategoria extends Document {
  clave: string;
  nombre: string;
  imagen?: Buffer;
  imagenUrl?: string;
  activo?: boolean;
  restaurantId: Types.ObjectId;
}

const categoriaSchema = new Schema<ICategoria>({
  clave: { type: String, required: true },
  nombre: { type: String, required: true },
  imagen: Buffer,
  imagenUrl: String,
  activo: Boolean,
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
});

const Categoria = model<ICategoria>("Categeoria", categoriaSchema);

export default Categoria;
