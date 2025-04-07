import { Request, Response } from "express";
import { Model, Document } from "mongoose";

const paginationList = async <T extends Document>(
    Model: Model<T>,
    req: Request,
    res: Response
): Promise<Response> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.items as string) || 10;
    const skip = (page - 1) * limit;

    try {
        const resultPromise = Model.find({ removed: false })
            .skip(skip)
            .limit(limit)
            .sort({ created: "desc" })
            .populate("");

        const countPromise = Model.countDocuments({ removed: false });

        const [results, count] = await Promise.all([
            resultPromise,
            countPromise,
        ]);

        const pages = Math.ceil(count / limit);

        const pagination = { page, pages, count };

        if (count > 0) {
            return res.status(200).json({
                success: true,
                result: results,
                pagination,
                message: "Successfully found all documents",
            });
        } else {
            return res.status(200).json({
                success: true,
                result: [],
                pagination,
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

export default paginationList;
