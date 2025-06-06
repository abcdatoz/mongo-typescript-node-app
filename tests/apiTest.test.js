"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
/**
 * Testing endpoint healt
 */
describe("GET /health", () => {
    it("respond a json with message : Neelix", (done) => {
        (0, supertest_1.default)(app_1.default)
            .get("/health")
            .set("Accept", "application/json")
            .expect(200, done);
    });
});
/**
 * testing  fruits endpoints
 */
describe("GET /api/frutas", () => {
    it("respond with json containinga list of users", (done) => {
        (0, supertest_1.default)(app_1.default)
            .get("/api/frutas")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});
describe("GET /api/frutas/:id", () => {
    it("respond with json containing  a single fruit", (done) => {
        (0, supertest_1.default)(app_1.default)
            .get("/api/frutas/f1")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
    it("respond with json 'fruit not found' when the fruit doesnt exist ", (done) => {
        (0, supertest_1.default)(app_1.default)
            .get("/api/frutas/f8")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(404)
            .expect('"fruit not found"')
            .end((err) => {
            if (err)
                return done(err);
            done();
        });
    });
});
describe("POST /api/frutas", () => {
    it("responde with 201 created", (done) => {
        const data = { clave: "f2", nombre: "banana", precio: "3" };
        (0, supertest_1.default)(app_1.default)
            .post("/api/frutas")
            .send(data)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(201)
            .end((err) => {
            if (err)
                return done(err);
            done();
        });
    });
    it("Respond with 400 bad request", () => {
        const data = {};
        (0, supertest_1.default)(app_1.default)
            .post("/api/frutas")
            .send(data)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .expect('"not all field were sent"');
    });
});
