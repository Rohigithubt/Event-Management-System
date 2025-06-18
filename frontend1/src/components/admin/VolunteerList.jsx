import React, { useState, useEffect } from "react";
import Footer from "../../components/admin/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  Index,
  EditUserProfile,
  UpdateUserProfile,
  RegisterUser,
  DestroyUserData,
} from "../../redux/slice/userSlice";

const VolunteerList = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [editVolunteer, setEditVolunteer] = useState(null);
  const [editData, setEditData] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newVolunteer, setNewVolunteer] = useState({
    name: "",
    email: "",
    phoneno: "",
    password: "",
    confirmPassword: "",
    location: "",
    role: "volunteer"
  });

  useEffect(() => {
    dispatch(Index());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const volunteers = Array.isArray(user)
    ? user.filter((vol) => vol.role === "volunteer")
    : [];

  const filteredVolunteers = volunteers.filter((volunteer) =>
    volunteer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    volunteer.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredVolunteers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVolunteers = filteredVolunteers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleEditClick = async (_id) => {
    try {
      const res = await dispatch(EditUserProfile(_id));
      setEditVolunteer(res.payload);
      setEditData(res.payload.data);
    } catch (err) {
      toast.error("Failed to fetch volunteer data.");
    }
  };

  const handleUpdate = async () => {
    try {
      const updatePayload = {
        userId: editData._id,
        email: editData.email,
        location: editData.location,
        name: editData.name,
        phoneno: editData.phoneno,
      };

      const res = await dispatch(UpdateUserProfile(updatePayload));
      if (res.payload?.status || res?.meta?.requestStatus === "fulfilled") {
        toast.success("Volunteer updated successfully.");
        setEditVolunteer(null);
        dispatch(Index());
      } else {
        toast.error(res.payload?.message || "Update failed.");
      }
    } catch (err) {
      toast.error("Something went wrong during update.");
    }
  };

  const handleAddVolunteer = async () => {
    try {
      if (newVolunteer.password !== newVolunteer.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(newVolunteer.password)) {
        toast.error("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character");
        return;
      }

      const registerData = {
        name: newVolunteer.name,
        email: newVolunteer.email,
        phoneno: newVolunteer.phoneno,
        password: newVolunteer.password,
        location: newVolunteer.location,
        role: "volunteer",
        type: "full"
      };

      const res = await dispatch(RegisterUser(registerData));
      
      if (res.payload?.success || res?.meta?.requestStatus === "fulfilled") {
        toast.success("Volunteer added successfully");
        setShowAddForm(false);
        setNewVolunteer({
          name: "",
          email: "",
          phoneno: "",
          password: "",
          confirmPassword: "",
          location: "",
          role: "volunteer"
        });
        dispatch(Index());
      } else {
        toast.error(res.payload?.message || "Failed to add volunteer");
      }
    } catch (err) {
      toast.error("Something went wrong while adding volunteer");
    }
  };

  const handleDelete = async (_id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This volunteer's data will be permanently deleted.",
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
          Swal.fire("Deleted!", "Volunteer has been deleted.", "success");
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-screen-2xl">
      <div className="border border-gray-100 rounded-lg">
        {selectedVolunteer ? (
          <div className="space-y-4 p-4 border rounded-md bg-white">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">View Volunteer</h2>
            <p><strong>Full Name:</strong> {selectedVolunteer.name}</p>
            <p><strong>Phone Number:</strong> {selectedVolunteer.phoneno}</p>
            <p><strong>Email:</strong> {selectedVolunteer.email}</p>
            <p><strong>Location:</strong> {selectedVolunteer.location}</p>
            <button
              onClick={() => setSelectedVolunteer(null)}
              className="bg-[#F5F7F9] text-black hover:bg-[#212529] hover:text-white px-4 py-2 rounded-full mt-6"
            >
              ← Back
            </button>
          </div>
        ) : editVolunteer ? (
          <div className="space-y-4 p-4 border rounded-md bg-white">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Volunteer</h2>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Full Name:</label>
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Phone Number:</label>
              <input
                type="text"
                value={editData.phoneno}
                onChange={(e) => setEditData({ ...editData, phoneno: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Email:</label>
              <input
                type="email"
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Location:</label>
              <input
                type="text"
                value={editData.location}
                onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded-full"
              >
                Update
              </button>
              <button
                onClick={() => setEditVolunteer(null)}
                className="bg-gray-200 text-black px-4 py-2 rounded-full"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 mb-4">
              <h1 className="text-2xl font-bold text-gray-800">Volunteer List</h1>
              <button 
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 text-white font-semibold px-8 py-4 !rounded-full shadow-xl hover:bg-blue-700"
              >
                + Add
              </button>
            </div>

            {showAddForm && (
              <div className="space-y-4 p-4 border rounded-md bg-white mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Volunteer</h2>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Full Name:</label>
                  <input
                    type="text"
                    value={newVolunteer.name}
                    onChange={(e) => setNewVolunteer({...newVolunteer, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Email:</label>
                  <input
                    type="email"
                    value={newVolunteer.email}
                    onChange={(e) => setNewVolunteer({...newVolunteer, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Phone Number:</label>
                  <input
                    type="text"
                    value={newVolunteer.phoneno}
                    onChange={(e) => setNewVolunteer({...newVolunteer, phoneno: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Password:</label>
                  <input
                    type="password"
                    value={newVolunteer.password}
                    onChange={(e) => setNewVolunteer({...newVolunteer, password: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Confirm Password:</label>
                  <input
                    type="password"
                    value={newVolunteer.confirmPassword}
                    onChange={(e) => setNewVolunteer({...newVolunteer, confirmPassword: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Location:</label>
                  <input
                    type="text"
                    value={newVolunteer.location}
                    onChange={(e) => setNewVolunteer({...newVolunteer, location: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleAddVolunteer}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full"
                  >
                    Create Volunteer
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="bg-gray-200 text-black px-4 py-2 rounded-full"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

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
                        <td className="px-0 py-2 text-sm flex gap-2">
                          <button
                            className="bg-white text-black border border-black px-2 py-0 rounded-md text-xs hover:bg-[#006AF2] hover:text-white"
                            onClick={() => setSelectedVolunteer(volunteer)}
                          >
                            <ion-icon name="eye-outline"></ion-icon>
                          </button>
                          <button
                            className="bg-white text-black px-2 py-0 rounded-md text-xs hover:bg-[#006AF2] hover:text-white"
                            onClick={() => handleEditClick(volunteer._id)}
                          >
                            <ion-icon name="create-outline"></ion-icon>
                          </button>
                          <button
                            className="bg-white text-black px-2 py-0 rounded-md text-xs hover:bg-[#006AF2] hover:text-white"
                            onClick={() => handleDelete(volunteer._id)}
                          >
                            <ion-icon name="trash-outline"></ion-icon>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-4 py-4 text-center text-sm text-gray-500">
                        No volunteers found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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

export default VolunteerList;



/*

import React, { useState, useEffect } from "react";
import Footer from "../../components/admin/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  Index,
  EditUserProfile,
  UpdateUserProfile,
  DestroyUserData,
} from "../../redux/user/userSlice";

const VolunteerList = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [editVolunteer, setEditVolunteer] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    dispatch(Index());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const volunteers = Array.isArray(user)
    ? user.filter((vol) => vol.role === "volunteer")
    : [];

  const filteredVolunteers = volunteers.filter((volunteer) =>
    volunteer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    volunteer.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredVolunteers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVolunteers = filteredVolunteers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleEditClick = async (_id) => {
    try {
      const res = await dispatch(EditUserProfile(_id));
      setEditVolunteer(res.payload);
      setEditData(res.payload.data);
    } catch (err) {
      toast.error("Failed to fetch volunteer data.");
    }
  };

  const handleUpdate = async () => {
    try {
      const updatePayload = {
        userId: editData._id,
        email: editData.email,
        location: editData.location,
        name: editData.name,
        phoneno: editData.phoneno,
      };

      const res = await dispatch(UpdateUserProfile(updatePayload));
      if (res.payload?.status || res?.meta?.requestStatus === "fulfilled") {
        toast.success("Volunteer updated successfully.");
        setEditVolunteer(null);
        dispatch(Index());
      } else {
        toast.error(res.payload?.message || "Update failed.");
      }
    } catch (err) {
      toast.error("Something went wrong during update.");
    }
  };

  const handleDelete = async (_id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This volunteer's data will be permanently deleted.",
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
          Swal.fire("Deleted!", "Volunteer has been deleted.", "success");
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-screen-2xl">
      <div className="border border-gray-100 rounded-lg">
        {selectedVolunteer ? (
          <div className="space-y-4 p-4 border rounded-md bg-white">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              View Volunteer
            </h2>
            <p>
              <strong>Full Name:</strong> {selectedVolunteer.name}
            </p>
            <p>
              <strong>Phone Number:</strong> {selectedVolunteer.phoneno}
            </p>
            <p>
              <strong>Email:</strong> {selectedVolunteer.email}
            </p>
            <p>
              <strong>Location:</strong> {selectedVolunteer.location}
            </p>
            <button
              onClick={() => setSelectedVolunteer(null)}
              className="bg-[#F5F7F9] text-black hover:bg-[#212529] hover:text-white px-4 py-2 rounded-full mt-6"
            >
              ← Back
            </button>
          </div>
        ) : editVolunteer ? (
          <div className="space-y-4 p-4 border rounded-md bg-white">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Edit Volunteer
            </h2>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Full Name:
              </label>
              <input
                type="text"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Phone Number:
              </label>
              <input
                type="text"
                value={editData.phoneno}
                onChange={(e) =>
                  setEditData({ ...editData, phoneno: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Email:
              </label>
              <input
                type="email"
                value={editData.email}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Location:
              </label>
              <input
                type="text"
                value={editData.location}
                onChange={(e) =>
                  setEditData({ ...editData, location: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded-full"
              >
                Update
              </button>
              <button
                onClick={() => setEditVolunteer(null)}
                className="bg-gray-200 text-black px-4 py-2 rounded-full"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 mb-4">
              <h1 className="text-2xl font-bold text-gray-800">
                Volunteer List
              </h1>
              <button className="bg-blue-600 text-white font-semibold px-8 py-4 !rounded-full shadow-xl hover:bg-blue-700">
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
              <button className="bg-[#006AF2] text-white px-4 py-2 rounded-full shadow-xl">
                Submit
              </button>
              <button className="bg-black text-white px-4 py-2 rounded-full shadow-xl">
                Reset
              </button>
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

            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-gray-200 text-left">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-sm font-bold text-gray-400">
                      S.No.
                    </th>
                    <th className="px-4 py-2 text-sm font-bold text-gray-400">
                      Full Name
                    </th>
                    <th className="px-4 py-2 text-sm font-bold text-gray-400">
                      Phone No
                    </th>
                    <th className="px-4 py-2 text-sm font-bold text-gray-400">
                      Location
                    </th>
                    <th className="px-4 py-2 text-sm font-bold text-gray-400">
                      Created
                    </th>
                    <th className="px-0 py-2 text-sm font-bold text-gray-400">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedVolunteers.length > 0 ? (
                    paginatedVolunteers.map((volunteer, index) => (
                      <tr
                        key={volunteer._id || index}
                        className="hover:bg-gray-50 border-b border-gray-300"
                      >
                        <td className="px-4 py-2 text-sm">
                          {startIndex + index + 1}
                        </td>
                        <td className="px-4 py-2 text-sm">{volunteer.name}</td>
                        <td className="px-4 py-2 text-sm">
                          {volunteer.phoneno}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          {volunteer.location}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          {volunteer.created_at}
                        </td>
                        <td className="px-0 py-2 text-sm flex gap-2">
                          <button
                            className="bg-white text-black border border-black px-2 py-0 rounded-md text-xs hover:bg-[#006AF2] hover:text-white"
                            onClick={() => setSelectedVolunteer(volunteer)}
                          >
                            <ion-icon name="eye-outline"></ion-icon>
                          </button>
                          <button
                            className="bg-white text-black px-2 py-0 rounded-md text-xs hover:bg-[#006AF2] hover:text-white"
                            onClick={() => handleEditClick(volunteer._id)}
                          >
                            <ion-icon name="create-outline"></ion-icon>
                          </button>
                          <button
                            className="bg-white text-black px-2 py-0 rounded-md text-xs hover:bg-[#006AF2] hover:text-white"
                            onClick={() => handleDelete(volunteer._id)}
                          >
                            <ion-icon name="trash-outline"></ion-icon>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-4 py-4 text-center text-sm text-gray-500"
                      >
                        No volunteers found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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
          </>
        )}
      </div>

      <Footer />
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default VolunteerList;

*/