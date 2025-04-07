import request from "supertest";
import app from "@/app";
import Color from "@models/color";

/**
 * Testing Color Get endpoints
 */

describe("GET /api/color", () => {
    it("should return all colors", async () => {
        const response = await request(app)
            .get("/api/color")
            .set("Accept", "application/json")
            .expect(200);

        expect(response.body.result).toBeInstanceOf(Array);
    });
});

describe("GET /api/color/:id", () => {
    it("sholud return a color by id", async () => {
        const newcolor = new Color({ clave: "test001", nombre: "blue" });
        await newcolor.save();

        const response = await request(app)
            .get(`/api/color/${newcolor._id}`)
            .set("Accept", "application/json")
            .expect(200);
        expect(response.body.result).toHaveProperty("clave", "test001");
        expect(response.body.result).toHaveProperty("nombre", "blue");
    });

    it("should return 404 if color not found", async () => {
        const response = await request(app)
            .get("/api/color/67eb19827c74c34837f7ece4")
            .set("Accept", "application/json")
            .expect(404);

        expect(response.body).toHaveProperty(
            "message",
            "No document find by this id"
        );
    });
});
