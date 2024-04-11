import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import { MONGO_URI } from "./config.js";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
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
