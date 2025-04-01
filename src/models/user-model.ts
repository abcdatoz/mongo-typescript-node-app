import { Document, Schema, model } from "mongoose";
import { hash, compare } from "bcrypt";

export interface IUsuario extends Document {
    nombre: string;
    email: string;
    password?: string;
    passwordHash: string;
    tokenVersion: number;
    profile: string;
    checkPassword(password: string): Promise<boolean>;
}

const usuarioSchema: Schema<IUsuario> = new Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false },
    passwordHash: { type: String },
    tokenVersion: { type: Number, default: 0 },
    profile: { type: String, default: "admin" },
});

usuarioSchema.pre<IUsuario>("save", async function (next) {
    if (this.password) {
        this.passwordHash = await hash(this.password, 8);
    }
    next();
});

usuarioSchema.methods.checkPassword = async function (
    password: string
): Promise<boolean> {
    return compare(password, this.passwordHash);
};

const Usuario = model<IUsuario>("Usuario", usuarioSchema);

export default Usuario;
