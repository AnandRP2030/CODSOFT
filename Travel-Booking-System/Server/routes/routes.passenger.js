import express from "express";
import { PassengerModel } from "../models/model.passengers.js";
const router = express.Router();

router.post("/apply", async (req, res) => {
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

router.get("/passengers", async (req, res) => {
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

router.get("/passenger/:id", async (req, res) => {
  try {
    const { id } = req.params;
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

router.put("/update/:id", async (req, res) => {
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

router.delete("/delete/:id", async (req, res) => {
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

export default router;