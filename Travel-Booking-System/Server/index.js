import { PORT } from "./config.js";
import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import { PassengerModel } from "./models/model.passengers.js";

const DATABASE_URL = process.env.DATABASE_URL;

const app = express();
app.use(express.json());

// routes
app.post("/apply", async (req, res) => {
  try {
    const { name, age, price, entry, exit } = req.body;
    if (!name || !age || !price || !exit) {
      return res.status(401).send({ message: "All the details are mandatory" });
    }
    const passenter = {
      name,
      age,
      price,
      entry,
      exit,
    };
    const newPassenger = await PassengerModel.create(passenter);
    return res
      .status(201)
      .send({ message: "Ticket successfully approved", newPassenger });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error", error: error });
  }
});

app.get("/passengers", async (req, res) => {
  try {
    const passengers = await PassengerModel.find({});
    res.status(200).send({
      count: passengers.length,
      passengers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error", error: error });
  }
});

app.get("/passenger/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(":id", id);
    const passenger = await PassengerModel.findById(id);
    if (!passenger) {
      return res.status(404).send({ message: "Passenger not found" });
    }

    return res.status(200).send({ message: "Found", passenger });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error", error: error });
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const { name, age, price, entry, exit } = req.body;
    const { id } = req.params;
    if (!name || !age || !price || !exit) {
      return res.status(401).send({ message: "All the details are mandatory" });
    }
    const passenter = {
      name,
      age,
      price,
      entry,
      exit,
    };
    const newPassenger = await PassengerModel.findByIdAndUpdate(id, req.body);
    if (!newPassenger) {
      return res.status(404).send({ message: "User not foud" });
    }
    return res
      .status(201)
      .send({ message: "Ticket successfully updated", newPassenger });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error", error: error });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const passenger = await PassengerModel.findByIdAndDelete(id);
    if (!passenger) {
      return res.status(404).send({ message: "user not found" });
    }
    return res.status(200).send({ message: "passenger deleted", passenger });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error", error: error });
  }
  const { id } = req.params;
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
