import mongoose from "mongoose";
import { Request, Response } from "express";
import createCRUDController from "../../src/controllers/middlewaresControllers/createCRUDController";
import { IColor } from "../../src/models/color";

jest.mock("mongoose");

describe("create  function", () => {
    const mockSave = jest.fn();
    const mockModel = mongoose.model as jest.Mock;

    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = {
            body: { clave: "01", nombre: "Rojo" },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        mockModel.mockReturnValueOnce(
            jest.fn().mockImplementation(() => ({
                save: mockSave,
            }))
        );
    });

    it("should create a document succesfully", async () => {
        mockSave.mockResolvedValue({ _id: "123", ...req.body });

        const controller = createCRUDController<IColor>("Color");

        await controller.create(req as Request, res as Response);

        expect(mockSave).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            result: { _id: "123", ...req.body },
            message: "Succesfully created the document in model",
        });
    });
});
