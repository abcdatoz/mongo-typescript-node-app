import { Document, Schema, Types, model } from "mongoose";

export interface ICategoria extends Document {
    clave: string;
    nombre: string;
    imagen: string;
    activo: boolean;
    restaurantId: Types.ObjectId;
    removed: boolean;
    enabled: boolean;
}

const categoriaSchema = new Schema<ICategoria>({
    clave: { type: String, required: true },
    nombre: { type: String, required: true },
    imagen: String,
    activo: Boolean,
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
    },
    removed: { type: Boolean, default: false },
    enabled: { type: Boolean, default: true },
});

const Categoria = model<ICategoria>("Categoria", categoriaSchema);

export default Categoria;
