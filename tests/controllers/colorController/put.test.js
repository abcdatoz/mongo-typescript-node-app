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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("@/app"));
const color_1 = __importDefault(require("@/models/color"));
/**
 * testin POST  in colors endpoints
 */
describe("PUT /api/color/:id", () => {
    it("should update an existing color", () => __awaiter(void 0, void 0, void 0, function* () {
        const newColor = new color_1.default({ clave: "test03", nombre: "gray" });
        yield newColor.save();
        const updatedData = { nombre: "white" };
        const response = yield (0, supertest_1.default)(app_1.default)
            .put(`/api/color/${newColor._id}`)
            .send(updatedData)
            .set("Accept", "application/json")
            .expect(200);
        expect(response.body.result).toHaveProperty("nombre", "white");
        const updatedColor = yield color_1.default.findById(newColor._id);
        expect(updatedColor === null || updatedColor === void 0 ? void 0 : updatedColor.nombre).toBe("white");
    }));
});
