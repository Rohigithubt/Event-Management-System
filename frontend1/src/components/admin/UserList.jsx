import React, { useState } from "react";
import noImg from "../../assets/images/no-image.jpg";
import Footer from "../../components/admin/Footer";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserList = () => {
  const initialUsers = [
    { id: 1, fullName: "Rohit Jain", rating: 5, phoneNo: "11111111111", createdAt: "22 june 2024", break: false },
    { id: 2, fullName: "Millind Jain", rating: 4, phoneNo: "11111111111", createdAt: "22 june 2022", break: true },
    { id: 3, fullName: "Prafull Jain", rating: 3, phoneNo: "11111111111", createdAt: "22 june 2023", break: true },
    { id: 4, fullName: "Sahil Kumar", rating: 5, phoneNo: "11111111111", createdAt: "21 june 2024", break: false },
    { id: 5, fullName: "Harsh Jain", rating: 5, phoneNo: "11111111111", createdAt: "25 june 2024", break: true },
  ];

  const [usersData, setUsersData] = useState(initialUsers);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleToggleBreak = (id) => {
    setUsersData((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, break: !user.break } : user
      )
    );

    const updatedUser = usersData.find((user) => user.id === id);
    toast.success(!updatedUser?.break ? "Break Activated" : "Break Deactivated");
  };

  return (
    <div className="p-4 sm:p-6 !space-y-5 max-w-screen-2xl">
      <div className="border border-gray-300 p-5 rounded-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h1 className="!text-2xl font-bold text-gray-800">User List</h1>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-7 border border-gray-300 rounded-lg p-4">
          <input
            type="text"
            placeholder="select Date"
            className="w-full sm:max-w-xs px-4 py-2 border border-gray-300 rounded"
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
            className="w-full sm:max-w-md lg:ml-auto px-4 py-2 border border-gray-300 rounded"
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200 text-left">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-sm font-bold text-gray-400">S.No.</th>
                  <th className="px-4 py-2 text-sm font-bold text-gray-400">Full Name</th>
                  <th className="px-4 py-2 text-sm font-bold text-gray-400">Rating</th>
                  <th className="px-4 py-2 text-sm font-bold text-gray-400">Phone No</th>
                  <th className="px-4 py-2 text-sm font-bold text-gray-400">Created At</th>
                  <th className="px-4 py-2 text-sm font-bold text-gray-400">Want A Break?</th>
                  <th className="px-0 py-2 text-sm font-bold text-gray-400">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {usersData.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-50 border-b border-gray-300">
                    <td className="px-4 py-2 text-sm">{index + 1}</td>
                    <td className="px-4 py-2 text-sm">{user.fullName}</td>
                    <td className="px-4 py-2 text-md flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < user.rating ? "text-[#40658b]" : "text-gray-300"}>
                          ★
                        </span>
                      ))}
                    </td>
                    <td className="px-4 py-2 text-sm">{user.phoneNo}</td>
                    <td className="px-4 py-2 text-sm">{user.createdAt}</td>
                    <td className="px-4 py-2 text-sm">
                      <button
                        onClick={() => handleToggleBreak(user.id)}
                        className="flex items-center gap-2 pl-4 pr-2 border border-gray-300 w-fit h-9 !rounded-full bg-gray-100 transition-colors duration-300"
                      >
                        <span className="text-blue-800 font-semibold">Break</span>
                        <div
                          className={`relative w-12 h-6 flex items-center rounded-full p-1 ${
                            user.break ? "bg-green-500" : "bg-gray-300"
                          }`}
                        >
                          <div
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                              user.break ? "translate-x-6" : "translate-x-0"
                            }`}
                          ></div>
                        </div>
                      </button>
                    </td>
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
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default UserList;
