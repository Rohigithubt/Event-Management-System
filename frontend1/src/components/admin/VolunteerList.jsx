import React, { useState } from "react";
import Footer from '../../components/admin/Footer';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const VolunteerList = () => {
  const initialVolunteers = [
    { id: 1, fullName: "Rohit Jain", phoneNo: "11111111111", createdAt: "22 June 2024", location: "GC, QLD" },
    { id: 2, fullName: "Millind Jain", phoneNo: "11111111111", createdAt: "22 June 2022", location: "Sydney, AU" },
    { id: 3, fullName: "Prafull Jain", phoneNo: "11111111111", createdAt: "22 June 2023", location: "Sydney, AU" },
    { id: 4, fullName: "Sahil Kumar", phoneNo: "11111111111", createdAt: "21 June 2024", location: "GC, QLD" },
    { id: 5, fullName: "Harsh Jain", phoneNo: "11111111111", createdAt: "25 June 2024", location: "Sydney, AU" },
  ];

  const [volunteers, setVolunteers] = useState(initialVolunteers);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  return (
    <div className="p-4 sm:p-6 !space-y-5 max-w-screen-2xl">
      <div className="border border-gray-300 p-5 rounded-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h1 className="!text-2xl font-bold text-gray-800">Volunteer List</h1>
          <button className="bg-blue-600 text-white font-semibold !px-8 py-2 !rounded-full shadow-xl hover:bg-blue-700">
            + Add
          </button>
        </div>

        <div className="h-20 w-full rounded-lg mb-7 border border-gray-300 flex items-center px-4 space-x-4">
          <input
            type="text"
            placeholder="Select Date"
            className="w-full sm:max-w-xs px-4 py-2 border border-gray-300 rounded"
          />
          <button className="bg-[#006AF2] text-white px-4 py-2 rounded-full shadow-xl">Submit</button>
          <button className="bg-black text-white px-4 py-2 rounded-full shadow-xl">Reset</button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <p>Show</p>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
          <p>entries</p>
          <input
            type="text"
            placeholder="Search By Title, Date"
            className="w-full sm:max-w-md ml-auto px-4 py-2 border border-gray-300 rounded"
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200 text-left">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-sm font-bold text-gray-400">S.No.</th>
                  <th className="px-4 py-2 text-sm font-bold text-gray-400">Full Name</th>
                  <th className="px-4 py-2 text-sm font-bold text-gray-400">Phone No</th>
                  <th className="px-4 py-2 text-sm font-bold text-gray-400">Location</th>
                  <th className="px-4 py-2 text-sm font-bold text-gray-400">Created At</th>
                  <th className="px-0 py-2 text-sm font-bold text-gray-400">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {volunteers.map((volunteer, index) => (
                  <tr key={volunteer.id} className="hover:bg-gray-50 border-b border-gray-300">
                    <td className="px-4 py-2 text-sm">{index + 1}</td>
                    <td className="px-4 py-2 text-sm">{volunteer.fullName}</td>
                    <td className="px-4 py-2 text-sm">{volunteer.phoneNo}</td>
                    <td className="px-4 py-2 text-sm">{volunteer.location}</td>
                    <td className="px-4 py-2 text-sm">{volunteer.createdAt}</td>
                    <td className="px-0 py-2 text-sm">
                      <button className="bg-white text-black border border-black px-2 py-0 rounded-md mr-2 text-xs hover:bg-[#006AF2] hover:text-white">
                        <ion-icon name="eye-outline"></ion-icon>
                      </button>
                      <button className="bg-white text-black px-2 py-0 rounded-md mr-2 text-xs hover:bg-[#006AF2] hover:text-white">
                        <ion-icon name="create-outline"></ion-icon>
                      </button>
                      <button className="bg-white text-black px-2 py-0 rounded-md text-xs hover:bg-[#006AF2] hover:text-white">
                        <ion-icon name="trash-outline"></ion-icon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default VolunteerList;
