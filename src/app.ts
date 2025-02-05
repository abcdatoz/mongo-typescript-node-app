import express from "express";

import "./bootstrap";
import "express-async-errors";
import { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import "./database";
import AppError from "./errors/appError";
import routes from "./routes";
import path from "path";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

const publicFolder = path.resolve(__dirname, "..", "public");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(publicFolder));

app.get("/", (req, res) => {
  res.json({ messsage: "Opuz" });
});
app.use(routes);

app.use(async (err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  return res.status(500).json({ error: "Internal server error" });
});

export default app;
