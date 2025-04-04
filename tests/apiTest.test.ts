import request from "supertest";
import app from "../src/app";

/**
 * Testing endpoint healt
 */

describe("GET /health", () => {
    it("respond a json with message : Neelix", (done) => {
        request(app)
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
        request(app)
            .get("/api/frutas")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});

describe("GET /api/frutas/:id", () => {
    it("respond with json containing  a single fruit", (done) => {
        request(app)
            .get("/api/frutas/f1")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
    });

    it("respond with json 'fruit not found' when the fruit doesnt exist ", (done) => {
        request(app)
            .get("/api/frutas/f8")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(404)
            .expect('"fruit not found"')
            .end((err) => {
                if (err) return done(err);

                done();
            });
    });
});

describe("POST /api/frutas", () => {
    it("responde with 201 created", (done) => {
        const data = { clave: "f2", nombre: "banana", precio: "3" };

        request(app)
            .post("/api/frutas")
            .send(data)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(201)
            .end((err) => {
                if (err) return done(err);

                done();
            });
    });

    it("Respond with 400 bad request", () => {
        const data = {};
        request(app)
            .post("/api/frutas")
            .send(data)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .expect('"not all field were sent"');
    });
});
