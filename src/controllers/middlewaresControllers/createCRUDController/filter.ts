import { Request, Response } from "express";
import { Model, Document } from "mongoose";

interface FilterQuery {
    filter?: string;
    equal?: string;
}

interface IResponse {
    success: boolean;
    result: any[];
    message: string;
    error?: any;
}

const filter = async <T extends Document>(
    Model: Model<T>,
    req: Request,
    res: Response
): Promise<Response<IResponse>> => {
    try {
        const { filter, equal } = req.query as FilterQuery;

        if (filter === undefined || equal === undefined) {
            return res.status(403).json({
                success: false,
                result: null,
                message: "filter not provided correctly",
            });
        }

        const result = await Model.find({ removed: false })
            .where(filter)
            .equals(equal);

        return res.status(200).json({
            success: true,
            result,
            message: `Successfully found all documents where equal to ${equal}`,
        });
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

export default filter;
