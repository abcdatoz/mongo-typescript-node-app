import db from "../models";

const { mongoose, url } = db;

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to the mongo database ;P");
  })
  .catch((err) => {
    console.log("Something went wrong!!!", err);
    process.exit();
  });
