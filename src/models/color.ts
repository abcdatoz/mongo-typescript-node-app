import { Document, Schema, Types, model } from "mongoose";

export interface IColor extends Document {
    clave: string;
    nombre: string;
    removed: boolean;
    enabled: boolean;
    updated: Date;
    created: Date;
}

const colorSchema = new Schema<IColor>({
    clave: { type: String, trim: true, required: true },
    nombre: { type: String, trim: true, required: true },
    removed: { type: Boolean, default: false },
    enabled: { type: Boolean, default: true },
    updated: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },
});

const Color = model<IColor>("Color", colorSchema);

export default Color;
