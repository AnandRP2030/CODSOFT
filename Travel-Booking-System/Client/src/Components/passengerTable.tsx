import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";

const PassengerTable = ({ passengers , change, setChange}) => {
  const deleteItem = (_id) => {
    // const BASE_URL = import.meta.env.VITE_BASE_URL;
    const BASE_URL = "http://localhost:3000";

    console.log(_id);
    axios
      .delete(`${BASE_URL}/delete/${_id}`)
      .then((res) => {
        console.log(res);
        setChange(!change);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md">No</th>
          <th className="border border-slate-600 rounded-md">Name</th>
          <th className="border border-slate-600 rounded-md">Age</th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            From
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            To
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Ticket Price
          </th>
          <th className="border border-slate-600 rounded-md">Operations</th>
        </tr>
      </thead>
      <tbody>
        {passengers.map((passenger, index) => (
          <tr key={passenger._id} className="h-8">
            <td className="border border-slate-700 rounded-md text-center">
              {index + 1}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {passenger.name}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {passenger.age}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {passenger.entry}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {passenger.exit}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {passenger.price}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              <div className="flex justify-center gap-x-4">
                <BsInfoCircle className="text-2xl text-green-800" />

                <AiOutlineEdit className="text-2xl text-yellow-600" />

                <div
                  onClick={() => {
                    deleteItem(passenger._id);
                  }}
                >
                  <MdOutlineDelete className="text-2xl text-red-600" />
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PassengerTable;
