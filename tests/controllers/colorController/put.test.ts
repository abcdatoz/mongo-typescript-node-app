import request from "supertest";
import app from "@/app";
import Color from "@/models/color";

/**
 * testin POST  in colors endpoints
 */

describe("PUT /api/color/:id", () => {
    it("should update an existing color", async () => {
        const newColor = new Color({ clave: "test03", nombre: "gray" });
        await newColor.save();

        const updatedData = { nombre: "white" };

        const response = await request(app)
            .put(`/api/color/${newColor._id}`)
            .send(updatedData)
            .set("Accept", "application/json")
            .expect(200);
        expect(response.body.result).toHaveProperty("nombre", "white");

        const updatedColor = await Color.findById(newColor._id);
        expect(updatedColor?.nombre).toBe("white");
    });
});
