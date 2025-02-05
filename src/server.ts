import gracefulShutdown from "http-graceful-shutdown";
import app from "./app";

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});

gracefulShutdown(server);
