import express from "express";

const frutasRoutes = express.Router();

/**
 * get all fruits
 */
frutasRoutes.get("/api/frutas", (req, res) => {
    return res.json("all fruits sent");
});

/**
 *
 */

/**
 * get a fruit by id
 */

frutasRoutes.get("/api/frutas/:id", (req, res) => {
    if (req.params.id === "f1") return res.json("kiwi");

    return res.status(404).json("fruit not found");
});

/**
 * add fruit
 */
frutasRoutes.post("/api/frutas", (req, res) => {
    const { clave, nombre, precio } = req.body;

    if (clave && nombre && precio) return res.status(201).json("fruit created");

    res.status(400).json("not all fields were sent");
});

export default frutasRoutes;
