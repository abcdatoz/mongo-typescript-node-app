import request from "supertest";
import app from "@/app";
import Color from "@/models/color";

/**
 * Testing POST color endpoint
 */

describe("POST /api/color", () => {
    it("should create a new color", async () => {
        const data = { clave: "test002", nombre: "yellow" };
        const token =
            "token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJleSIsInByb2ZpbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWQiOiI2N2U1N2UwYTM4ZmVjYzAwZjE4MjgxNzQiLCJpYXQiOjE3NDQwNTMyMDd9.sABcTCK80faqXE1tlTHB1r4ViUZcVfbfjyEjVzaA4pQ";

        const response = await request(app)
            .post("/api/color")
            .send(data)
            .set("Accept", "application/json")
            .set("Authorization", token)
            .expect(201);

        expect(response.body.result).toHaveProperty("clave", "test002");
        expect(response.body.result).toHaveProperty("nombre", "yellow");

        const color = await Color.findById(response.body.result._id);
        expect(color).not.toBeNull();
        expect(color?.nombre).toBe("yellow");
    });

    it("should responf with 400 if data is missing", async () => {
        const data = {};
        const token =
            "token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJleSIsInByb2ZpbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWQiOiI2N2U1N2UwYTM4ZmVjYzAwZjE4MjgxNzQiLCJpYXQiOjE3NDQwNTMyMDd9.sABcTCK80faqXE1tlTHB1r4ViUZcVfbfjyEjVzaA4pQ";

        const response = await request(app)
            .post("/api/color")
            .send(data)
            .set("Accept", "application/json")
            .set("Authorization", token)
            .expect(400);

        expect(response.body.message).toBe("Required fields are not supplied");
    });
});
