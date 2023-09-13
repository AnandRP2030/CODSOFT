import { PORT } from "./config.js";
import express from "express";
import "dotenv/config";
import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL;

const app = express();
app.get("/", (req, res) => {
  res.send("home route");
});

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running on PORT", PORT);
    });
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Database not connected", error);
  });
