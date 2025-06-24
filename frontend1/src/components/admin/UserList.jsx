import React, { useEffect, useState } from "react";
import noImg from "../../assets/images/no-image.jpg";
import Footer from "../../components/admin/Footer";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
// import { Index, DestroyUserData } from "../../redux/slice/userSlice";
import { Index, DestroyUserData } from "../../redux/slice/userSlice";

const UserList = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(Index());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(user)) {
      const formatted = user.filter((u) => u.role === "user").map((u) => ({
        id: u._id,
        fullName: u.name || "N/A",
        phoneNo: u.phoneno || "N/A",
        email: u.email || "N/A",
        createdAt: u.created_at || "N/A",
        break: false,
      }));
      setUsersData(formatted);
    }
  }, [user]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleToggleBreak = (id) => {
    setUsersData((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, break: !user.break } : user
      )
    );
    const updatedUser = usersData.find((user) => user.id === id);
    toast.success(!updatedUser?.break ? "Break Activated" : "Break Deactivated");
  };

  const filteredUsers = usersData.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.createdAt?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (_id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user's data will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await dispatch(DestroyUserData(_id));
        if (res?.payload?.status || res?.meta?.requestStatus === "fulfilled") {
          Swal.fire("Deleted!", "user has been deleted.", "success");
          dispatch(Index());
        } else {
          Swal.fire(
            "Failed!",
            res.payload?.message || "Failed to delete volunteer.",
            "error"
          );
        }
      } catch (error) {
        Swal.fire("Error!", "Something went wrong during deletion.", "error");
      }
    }
  };

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="p-4 sm:p-6 !space-y-5 max-w-screen-2xl">
      <div className="border border-gray-300 p-5 rounded-lg">
        {selectedUser ? (
          <div className="space-y-4 p-4 border rounded-md bg-white">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              View User
            </h2>
            <p>
              <strong>Full Name:</strong> {selectedUser.fullName}
            </p>
            <p>
              <strong>Phone Number:</strong> {selectedUser.phoneNo}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <button
              onClick={() => setSelectedUser(null)}
              className="bg-[#F5F7F9] text-black hover:bg-[#212529] hover:text-white px-4 py-2 rounded-full mt-6"
            >
              ← Back
            </button>
          </div>
        ) : (
          <>
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
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
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
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
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
                      <th className="px-4 py-2 text-sm font-bold text-gray-400">Want A Break?</th>
                      <th className="px-0 py-2 text-sm font-bold text-gray-400">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedUsers.map((user, index) => (
                      <tr key={user.id} className="hover:bg-gray-50 border-b border-gray-300">
                        <td className="px-4 py-2 text-sm">{startIndex + index + 1}</td>
                        <td className="px-4 py-2 text-sm">{user.fullName}</td>
                        <td className="px-4 py-2 text-sm">{user.phoneNo}</td>
                        <td className="px-4 py-2 text-sm">{user.createdAt}</td>
                        <td className="px-4 py-2 text-sm">
                          <button
                            onClick={() => handleToggleBreak(user.id)}
                            className="flex items-center gap-2 pl-4 pr-2 border border-gray-300 w-fit h-9 !rounded-full bg-gray-100 transition-colors duration-300"
                          >
                            <span className="text-blue-800 font-semibold">Break</span>
                            <div
                              className={`relative w-12 h-6 flex items-center rounded-full p-1 ${user.break ? "bg-green-500" : "bg-gray-300"
                                }`}
                            >
                              <div
                                className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${user.break ? "translate-x-6" : "translate-x-0"
                                  }`}
                              ></div>
                            </div>
                          </button>
                        </td>
                        <td className="px-0 py-2 text-sm">
                          <button
                            className="bg-white text-black border border-black px-2 py-0 rounded-md mr-2 text-xs hover:bg-[#006AF2] hover:text-white"
                            onClick={() => setSelectedUser(user)}
                          >
                            <ion-icon name="eye-outline"></ion-icon>
                          </button>
                          <button className="bg-white text-black px-2 py-0 rounded-md mr-2 text-xs hover:bg-[#006AF2] hover:text-white"
                            onClick={() => handleDelete(user.id)}>
                            <ion-icon name="trash-outline"></ion-icon>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
              <p className="text-sm">Page {currentPage} of {totalPages}</p>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default UserList;
