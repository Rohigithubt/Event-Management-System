import React, { useState, useEffect } from "react";
import Footer from "../../components/admin/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Index } from "../../redux/user/userSlice";

const VolunteerList = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(Index());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const volunteers = Array.isArray(user)
    ? user.filter((vol) => vol.role === "volunteer")
    : [];

  console.log(volunteers, "userrrrs")

  const filteredVolunteers = volunteers.filter((volunteer) =>
    volunteer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    volunteer.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(filteredVolunteers, "filteredVolunteers")

  const totalPages = Math.ceil(filteredVolunteers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVolunteers = filteredVolunteers.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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
            placeholder="Filter by date (disabled)"
            disabled
            className="w-full sm:max-w-xs px-4 py-2 border border-gray-300 rounded bg-gray-100"
          />
          <button className="bg-[#006AF2] text-white px-4 py-2 rounded-full shadow-xl">Submit</button>
          <button className="bg-black text-white px-4 py-2 rounded-full shadow-xl">Reset</button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
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
          <input
            type="text"
            placeholder="Search by name or location"
            className="w-full sm:max-w-md ml-auto px-4 py-2 border border-gray-300 rounded"
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
                  <th className="px-4 py-2 text-sm font-bold text-gray-400">Location</th>
                  <th className="px-4 py-2 text-sm font-bold text-gray-400">Created</th>
                  <th className="px-0 py-2 text-sm font-bold text-gray-400">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedVolunteers.length > 0 ? (
                  paginatedVolunteers.map((volunteer, index) => (
                    <tr key={volunteer._id || index} className="hover:bg-gray-50 border-b border-gray-300">
                      <td className="px-4 py-2 text-sm">{startIndex + index + 1}</td>
                      <td className="px-4 py-2 text-sm">{volunteer.name}</td>
                      <td className="px-4 py-2 text-sm">{volunteer.phoneno}</td>
                      <td className="px-4 py-2 text-sm">{volunteer.location}</td>
                      <td className="px-4 py-2 text-sm">{volunteer.created_at}</td>
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-4 text-center text-sm text-gray-500">
                      No volunteers found
                    </td>
                  </tr>
                )}
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
          <p className="text-sm">
            Page {currentPage} of {totalPages}
          </p>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <Footer />
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default VolunteerList;
