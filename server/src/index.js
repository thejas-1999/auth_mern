import express from "express";
import { PORT } from "./config.js";
import { MONGO_URI } from "./config.js";
import mongoose from "mongoose";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello world" });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`database is connected to MongoDB`);
    app.listen(PORT, () => {
      console.log(`server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
