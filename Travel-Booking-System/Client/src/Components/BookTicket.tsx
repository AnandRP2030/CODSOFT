import React, { useState } from "react";
import Spinner from "./Spinner";
import axios from "axios";

const BookTicket = ({ change, setChange }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [entry, setEntry] = useState("");
  const [exit, setExit] = useState("");
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const bookTicket = () => {
    // const BASE_URL = import.meta.env.VITE_BASE_URL;
    const BASE_URL = "http://localhost:3000";
    const data = {
      name,
      age,
      price,
      entry,
      exit,
    };
    console.log("data", data);
    setLoading(true);
    axios
      .post(`${BASE_URL}/apply`, data)
      .then((res) => {
        setLoading(false);
        setChange(!change);
        console.log(res);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="p-4 w-96">
      <h1 className="text-3xl my-4">Book Your Ticket</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl  p-4 mx-auto">
        <div className="my-2">
          <label className="text-xl mr-4 text-gray-500">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <div className="my-2">
          <label className="text-xl mr-4 text-gray-500">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value, 10))}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">From</label>
          <input
            type="text"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">To</label>
          <input
            type="text"
            value={exit}
            onChange={(e) => setExit(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Ticket Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value, 10))}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={bookTicket}>
          Save
        </button>
      </div>
    </div>
  );
};

export default BookTicket;
