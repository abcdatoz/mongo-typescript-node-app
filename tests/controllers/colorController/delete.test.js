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
 * Testing DELETE from colors endpoints
 */
describe("DELETE /api/color/:id", () => {
    it("should delete an existing color", () => __awaiter(void 0, void 0, void 0, function* () {
        const newColor = new color_1.default({ clave: "test004", nombre: "purple" });
        yield newColor.save();
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete(`/api/color/${newColor._id}`)
            .set("Accept", "application/json")
            .expect(200);
        expect(response.body.message).toBe(`Successfully deleted the document with id: ${newColor._id}`);
        const deletedColor = yield color_1.default.findById(newColor._id);
        expect(deletedColor).toHaveProperty("removed", true);
    }));
    it("should return 404 if color not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidId = "67eb19827c74c34837f7ece4";
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete(`/api/color/${invalidId}`)
            .set("Accept", "application/json")
            .expect(404);
        expect(response.body.message).toBe(`No document found by this id ${invalidId}`);
    }));
});
