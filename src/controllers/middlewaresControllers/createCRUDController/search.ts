import { Request, Response } from "express";
import { Model, Document } from "mongoose";

interface SearchQuery {
    q?: string;
    fields?: string;
}

interface IResponse {
    success: boolean;
    result: any[];
    message: string;
    error?: any;
}

const search = async <T extends Document>(
    Model: Model<T>,
    req: Request,
    res: Response
): Promise<Response<IResponse>> => {
    try {
        const q = req.query.q as string;

        if (!q || q.trim() === "") {
            return res.status(202).json({
                success: false,
                result: [],
                message: "No document found by this request",
            });
        }

        // Obtenemos los campos del query, si no están, usamos los predeterminados
        const fieldsArray: string[] = req.query.fields
            ? (req.query.fields as string).split(",")
            : ["clave", "nombre"];

        const fields: { $or: object[] } = { $or: [] };

        // Creamos la consulta con los campos especificados
        for (const field of fieldsArray) {
            fields.$or.push({ [field]: { $regex: new RegExp(q, "i") } });
        }

        const result = await Model.find(fields)
            .where("removed", false)
            .limit(10);

        if (result.length >= 1) {
            return res.status(200).json({
                success: true,
                result,
                message: "Successfully found all documents",
            });
        } else {
            return res.status(202).json({
                success: false,
                result: [],
                message: "Not document found by this request",
            });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({
                success: false,
                result: [],
                message: error.message, // Acceder de forma segura a `message`
                error: error.stack, // Acceder de forma segura a `stack`
            });
        } else {
            return res.status(500).json({
                success: false,
                result: [],
                message: "An unknown error occurred",
                error: error, // Si el error no es una instancia de `Error`, lo devolvemos tal cual
            });
        }
    }
};

export default search;
