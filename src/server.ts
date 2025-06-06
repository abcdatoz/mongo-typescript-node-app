import gracefulShutdown from "http-graceful-shutdown";
import app from "./app";
import dotenv from "dotenv";

import path from "path";
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });


console.log("PORT:", process.env.PORT);
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});

gracefulShutdown(server);
