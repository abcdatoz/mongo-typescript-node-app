import { Model, Document } from "mongoose";
import { Request, Response } from "express";

const remove = async (
    Model: Model<Document>,
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const updates = { removed: true };

        const result = await Model.findOneAndUpdate(
            { _id: req.params.id, removed: false },
            { $set: updates },
            { new: true }
        ).exec();

        if (!result) {
            res.status(404).json({
                success: false,
                result: null,
                message: "No document found by this id " + req.params.id,
            });
        } else {
            res.status(200).json({
                success: true,
                result,
                message:
                    "Successfully deleted the document with id: " +
                    req.params.id,
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            result: null,
            message: error.message,
            error: error.message,
        });
    }
};

export default remove;
