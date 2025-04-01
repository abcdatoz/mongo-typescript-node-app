import { Model, Document } from "mongoose";
import { Request, Response } from "express";

const create = async (
    Model: Model<Document>,
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const result = await new Model(req.body).save();

        res.status(200).json({
            success: true,
            result,
            message: "Succesfully created the document in model",
        });
    } catch (error: any) {
        if (error.name === "ValidationError") {
            res.status(400).json({
                success: false,
                result: null,
                message: "Required fields are not supplied",
                error: error.message,
            });
        } else {
            res.status(500).json({
                success: false,
                result: null,
                message: error.message,
                error: error.message,
            });
        }
    }
};

export default create;
