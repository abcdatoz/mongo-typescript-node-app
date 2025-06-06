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
const color_1 = __importDefault(require("@models/color"));
/**
 * Testing Color Get endpoints
 */
describe("GET /api/color", () => {
    it("should return all colors", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get("/api/color")
            .set("Accept", "application/json")
            .expect(200);
        expect(response.body.result).toBeInstanceOf(Array);
    }));
});
describe("GET /api/color/:id", () => {
    it("sholud return a color by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const newcolor = new color_1.default({ clave: "test001", nombre: "blue" });
        yield newcolor.save();
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/api/color/${newcolor._id}`)
            .set("Accept", "application/json")
            .expect(200);
        expect(response.body.result).toHaveProperty("clave", "test001");
        expect(response.body.result).toHaveProperty("nombre", "blue");
    }));
    it("should return 404 if color not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get("/api/color/67eb19827c74c34837f7ece4")
            .set("Accept", "application/json")
            .expect(404);
        expect(response.body).toHaveProperty("message", "No document find by this id");
    }));
});
