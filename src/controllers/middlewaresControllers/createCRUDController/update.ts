import { Model, Document } from "mongoose";
import { Request, Response } from "express";

const update = async (
    Model: Model<Document>,
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const result = await Model.findByIdAndUpdate(
            { _id: req.params.id, removed: false },
            req.body,
            {
                new: true,
                runValidators: true,
            }
        ).exec();

        if (!result) {
            res.status(400).json({
                success: false,
                result: null,
                message: "No document found by this id: " + req.params.id,
            });
        } else {
            res.status(200).json({
                success: true,
                result,
                message: "Updated the document with this id: " + req.params.id,
            });
        }
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

export default update;
