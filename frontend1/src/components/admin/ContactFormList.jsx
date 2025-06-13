import React, { useState } from "react";
import noImg from "../../assets/images/no-image.jpg";
import Footer from "../../components/admin/Footer";
import { Link } from "react-router-dom";

const ContactFormList = () => {
  const users = [
    { id: 1, fullName: "Rohit Jain", phoneNo: "11111111111", createdAt: "22 june 2024" },
    { id: 2, fullName: "Millind Jain", phoneNo: "11111111111", createdAt: "22 june 2022" },
    { id: 3, fullName: "Prafull Jain", phoneNo: "11111111111", createdAt: "22 june 2023" },
    { id: 4, fullName: "Sahil Kumar", phoneNo: "11111111111", createdAt: "21 june 2024" },
    { id: 5, fullName: "Harsh Jain", phoneNo: "11111111111", createdAt: "25 june 2024" },
  ];

  const [itemsPerPage, setItemsPerPage] = useState(10);

  return (
    <div className="p-4 sm:p-6 !space-y-5 max-w-screen-2xl">
      <div className="border border-gray-300 p-5 rounded-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h1 className="!text-2xl font-bold text-gray-800">Contact Form List</h1>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center border border-gray-300 p-3 rounded-xl gap-4 mb-7">
          <input
            type="text"
            placeholder="select Date"
            className="w-full sm:max-w-xs ml-0 sm:ml-4 px-4 py-2 border border-gray-300 rounded"
          />
          <button className="bg-[#006AF2] text-white !rounded-full px-6 py-2 shadow-xl w-full sm:w-auto">
            Submit
          </button>
          <button className="bg-black text-white !rounded-full px-6 py-2 shadow-xl w-full sm:w-auto">
            Reset
          </button>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
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
          </div>

          <input
            type="text"
            placeholder="Search By Title, Date"
            className="w-full sm:max-w-md ml-0 lg:ml-auto px-4 py-2 border border-gray-300 rounded"
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
                  <th className="px-4 py-2 text-sm font-bold text-gray-400">Created At</th>
                  <th className="px-0 py-2 text-sm font-bold text-gray-400">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-50 border-b border-gray-300">
                    <td className="px-4 py-2 text-sm">{index + 1}</td>
                    <td className="px-4 py-2 text-sm">{user.fullName}</td>
                    <td className="px-4 py-2 text-sm">{user.phoneNo}</td>
                    <td className="px-4 py-2 text-sm">{user.createdAt}</td>
                    <td className="px-0 py-2 text-sm">
                      <button className="bg-white text-black border border-black px-2 py-0 rounded-md mr-2 text-xs hover:bg-[#006AF2] hover:text-white">
                        <ion-icon name="eye-outline"></ion-icon>
                      </button>
                      <button className="bg-white text-black px-2 py-0 rounded-md mr-2 text-xs hover:bg-[#006AF2] hover:text-white">
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
    </div>
  );
};

export default ContactFormList;
