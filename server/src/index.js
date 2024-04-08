import express from "express";
import { PORT } from "./config.js";
import { MONGO_URI } from "./config.js";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";

const app = express();

app.use('/api/user',userRoutes)

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`database is connected to MongoDB`);
    app.listen(PORT, () => {
      console.log(`server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
