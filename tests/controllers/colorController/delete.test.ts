import request from "supertest";
import app from "@/app";
import Color from "@/models/color";

/**
 * Testing DELETE from colors endpoints
 */

describe("DELETE /api/color/:id", () => {
    it("should delete an existing color", async () => {
        const newColor = new Color({ clave: "test004", nombre: "purple" });
        await newColor.save();

        const response = await request(app)
            .delete(`/api/color/${newColor._id}`)
            .set("Accept", "application/json")
            .expect(200);

        expect(response.body.message).toBe(
            `Successfully deleted the document with id: ${newColor._id}`
        );

        const deletedColor = await Color.findById(newColor._id);
        expect(deletedColor).toHaveProperty("removed", true);
    });

    it("should return 404 if color not found", async () => {
        const invalidId = "67eb19827c74c34837f7ece4";

        const response = await request(app)
            .delete(`/api/color/${invalidId}`)
            .set("Accept", "application/json")
            .expect(404);

        expect(response.body.message).toBe(
            `No document found by this id ${invalidId}`
        );
    });
});
