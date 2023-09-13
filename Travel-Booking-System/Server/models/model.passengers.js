import mongoose from "mongoose";

const passengerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    entry: {
      type: String,
      default: "Trivandrum",
    },
    exit: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PassengerModel = mongoose.model("PassengerModel", passengerSchema);
