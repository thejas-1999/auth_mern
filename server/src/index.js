import express from "express";
import { PORT } from "./config.js";

const app = express();



app.get("/", (req, res) => {
  res.status(200).json({ message: "hello world" });
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
