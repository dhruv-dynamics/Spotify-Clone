import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import "./db.js";
import userRoutes from "./Routes/user.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "Spotify Clone Backend API is running",
    author: "Dhruv",
    version: "1.0.0"
  });
});

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});