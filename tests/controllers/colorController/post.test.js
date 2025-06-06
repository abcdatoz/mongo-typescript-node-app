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
 * Testing POST color endpoint
 */
describe("POST /api/color", () => {
    it("should create a new color", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { clave: "test002", nombre: "yellow" };
        const token = "token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJleSIsInByb2ZpbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWQiOiI2N2U1N2UwYTM4ZmVjYzAwZjE4MjgxNzQiLCJpYXQiOjE3NDQwNTMyMDd9.sABcTCK80faqXE1tlTHB1r4ViUZcVfbfjyEjVzaA4pQ";
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/api/color")
            .send(data)
            .set("Accept", "application/json")
            .set("Authorization", token)
            .expect(201);
        expect(response.body.result).toHaveProperty("clave", "test002");
        expect(response.body.result).toHaveProperty("nombre", "yellow");
        const color = yield color_1.default.findById(response.body.result._id);
        expect(color).not.toBeNull();
        expect(color === null || color === void 0 ? void 0 : color.nombre).toBe("yellow");
    }));
    it("should responf with 400 if data is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {};
        const token = "token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJleSIsInByb2ZpbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWQiOiI2N2U1N2UwYTM4ZmVjYzAwZjE4MjgxNzQiLCJpYXQiOjE3NDQwNTMyMDd9.sABcTCK80faqXE1tlTHB1r4ViUZcVfbfjyEjVzaA4pQ";
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/api/color")
            .send(data)
            .set("Accept", "application/json")
            .set("Authorization", token)
            .expect(400);
        expect(response.body.message).toBe("Required fields are not supplied");
    }));
});
