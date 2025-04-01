import { Request, Response } from "express";
import { Model, Document } from "mongoose";

interface IResponse {
    success: boolean;
    result: any[];
    message: string;
    error?: any;
}

const listAll = async <T extends Document>(
    Model: Model<T>,
    req: Request,
    res: Response<IResponse>
): Promise<Response<IResponse>> => {
    const sort: number =
        req.query.sort === "asc" ? 1 : req.query.sort === "desc" ? -1 : -1; // Default to -1 (desc)

    try {
        const result = await Model.find({ removed: false })
            .sort({ created: sort as any })
            .populate("");

        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                result,
                message: "Succesfully found all documents",
            });
        } else {
            return res.status(203).json({
                success: true,
                result: [],
                message: "Collection is empty",
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

export default listAll;
