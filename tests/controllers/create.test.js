"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const createCRUDController_1 = __importDefault(require("../../src/controllers/middlewaresControllers/createCRUDController"));
jest.mock("mongoose");
describe("create  function", () => {
    const mockSave = jest.fn();
    const mockModel = mongoose_1.default.model;
    let req;
    let res;
    beforeEach(() => {
        req = {
            body: { clave: "01", nombre: "Rojo" },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockModel.mockReturnValueOnce(jest.fn().mockImplementation(() => ({
            save: mockSave,
        })));
    });
    it("should create a document succesfully", () => __awaiter(void 0, void 0, void 0, function* () {
        mockSave.mockResolvedValue(Object.assign({ _id: "123" }, req.body));
        const controller = (0, createCRUDController_1.default)("Color");
        yield controller.create(req, res);
        expect(mockSave).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            result: Object.assign({ _id: "123" }, req.body),
            message: "Succesfully created the document in model",
        });
    }));
});
