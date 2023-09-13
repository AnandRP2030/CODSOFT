import mongoose from "mongoose";

const passengerSchema = new mongoose.Schema(
  {
    passengerName: {
      type: String,
      required: true,
    },
    passengerAge: {
      type: Number,
      required: true,
    },
    entryPlace: {
      type: String,
      default: "Trivandrum",
    },
    exitPlace: {
      type: String,
      required: true,
    },
    ticketPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PassengerModel = mongoose.model("PassengerModel", passengerSchema);
