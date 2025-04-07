import { Request, Response } from "express";
import { Model, Document } from "mongoose";

interface IResponse {
    success: boolean;
    result: any;
    message: string;
    error?: any;
}

const read = async <T extends Document>(
    Model: Model<T>,
    req: Request,
    res: Response<IResponse>
): Promise<Response<IResponse>> => {
    try {
        const result = await Model.findOne({
            _id: req.params.id,
            removed: false,
        });

        if (!result) {
            return res.status(404).json({
                success: false,
                result: null,
                message: "No document find by this id",
            });
        } else {
            return res.status(200).json({
                success: true,
                result,
                message: "we found this documnt by this id: " + req.params.id,
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

export default read;
