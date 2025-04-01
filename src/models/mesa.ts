import { Document, Schema, Types, model } from "mongoose";

export interface IMesa extends Document {
    nombre: string;
    removed: boolean;
    enabled: boolean;
    updated: Date;
    created: Date;
}

const mesaSchema = new Schema<IMesa>({
    nombre: { type: String, trim: true, required: true },
    removed: { type: Boolean, default: false },
    enabled: { type: Boolean, default: true },
    updated: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },
});

const Mesa = model<IMesa>("Mesa", mesaSchema);

export default Mesa;
