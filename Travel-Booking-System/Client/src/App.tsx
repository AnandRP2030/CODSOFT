import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./Components/Spinner";
// import "dotenv/config";
import "./App.css";
import PassengerTable from "./Components/passengerTable";
import BookTicket from "./Components/BookTicket";

function App() {
  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [change, setChange] = useState(false);
  // const BASE_URL = import.meta.env.VITE_BASE_URL;
  const BASE_URL = 'http://localhost:3000';

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/passengers`)
      .then((response) => {
        setPassengers(response.data.passengers);
        console.log("response", response.data.passengers);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [change]);
  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <h1 className="text-2xl text-sky-400 font-bold"> Travel Booking System</h1>
      </div>
      
      <div className="flex justify-between items-center">
        <BookTicket change={change} setChange={setChange}/>
      </div>
        <h1 className="text-3xl my-8">Passenger List</h1>
      {loading ? <Spinner /> : <PassengerTable passengers={passengers} change={change} setChange={setChange} />}
    </div>
  );
}

export default App;
