import { Document, Schema, Types, model } from "mongoose";

export interface IMedida extends Document {
    nombre: string;
    removed: boolean;
    enabled: boolean;
    updated: Date;
    created: Date;
}

const medidaSchema = new Schema<IMedida>({
    nombre: { type: String, trim: true, required: true },
    removed: { type: Boolean, default: false },
    enabled: { type: Boolean, default: true },
    updated: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },
});

const Medida = model<IMedida>("Medida", medidaSchema);

export default Medida;
