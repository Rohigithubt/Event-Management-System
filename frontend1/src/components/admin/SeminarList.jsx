import React, { useState, useEffect } from "react";
import Footer from "../../components/admin/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  IndexSeminar,
  CreateSeminar,
  EditSeminar,
  UpdateSeminar,
  DeleteSeminar,
} from "../../redux/slice/seminarSlice";
import noImg from "../../assets/images/no-image.jpg";
import { Link } from "react-router-dom";

const SeminarList = () => {
  const dispatch = useDispatch();
  const { seminar, loading, error } = useSelector((state) => state.seminar);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeminar, setSelectedSeminar] = useState(null);
  const [editSeminar, setEditSeminar] = useState(null);
  const [editData, setEditData] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [newSeminar, setNewSeminar] = useState({
    title: "",
    ticketPrice: "",
    totalTicket: "",
    date: "",
    startTime: "",
    endTime: "",
    venue: "",
    image: null,
  });
  const [timers, setTimers] = useState({});

  useEffect(() => {
    dispatch(IndexSeminar());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimers = {};
      seminar.forEach((seminarItem) => {
        const seminarDate = new Date(seminarItem.date);
        const now = new Date();
        if (seminarDate > now) {
          const diff = seminarDate - now;
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((diff / (1000 * 60)) % 60);
          const seconds = Math.floor((diff / 1000) % 60);
          newTimers[seminarItem._id] = { days, hours, minutes, seconds };
        }
      });
      setTimers(newTimers);
    }, 1000);
    return () => clearInterval(interval);
  }, [seminar]);

 const filteredSeminars = Array.isArray(seminar) 
  ? seminar.filter((item) => 
      item?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.venue?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];

  const totalPages = Math.ceil(filteredSeminars.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSeminars = filteredSeminars.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleEditClick = async (seminarId) => {
    try {
      const res = await dispatch(EditSeminar(seminarId));
      setEditSeminar(res.payload?.data);
      setEditData({
        ...res.payload?.data,
        date: new Date(res.payload.data?.date).toISOString().split('T')[0],
        startTime: new Date(res.payload.data?.startTime).toTimeString().substring(0, 5),
        endTime: new Date(res.payload.data?.endTime).toTimeString().substring(0, 5),
        imageUrl: res.payload.data?.image 
          ? `${import.meta.env.VITE_API_URL}${res.payload?.data.image}`
          : null
      });
    } catch (err) {
      toast.error("Failed to fetch seminar data.");
    }
  };

  const handleUpdate = async () => {
    try {
      const startDateTime = `${editData.date}T${editData.startTime}`;
      const endDateTime = `${editData.date}T${editData.endTime}`;

      const formData = new FormData();
      formData.append("title", editData.title);
      formData.append("ticketPrice", editData.ticketPrice);
      formData.append("totalTicket", editData.totalTicket);
      formData.append("date", editData.date);
      formData.append("startTime", startDateTime);
      formData.append("endTime", endDateTime);
      formData.append("venue", editData.venue);
      if (editData.imageFile) {
        formData.append("image", editData.imageFile);
      }
      formData.append("seminarId", editData._id);

      const res = await dispatch(UpdateSeminar(formData));
      if (res.payload?.status || res?.meta?.requestStatus === "fulfilled") {
        toast.success("Seminar updated successfully.");
        setEditSeminar(null);
        dispatch(IndexSeminar());
      } else {
        toast.error(res.payload?.message || "Update failed.");
      }
    } catch (err) {
      toast.error("Something went wrong during update.");
    }
  };

  const handleAddSeminar = async () => {
    try {
      if (!newSeminar.title || !newSeminar.ticketPrice || !newSeminar.totalTicket || 
          !newSeminar.date || !newSeminar.startTime || !newSeminar.endTime || !newSeminar.venue) {
        toast.error("All fields are required");
        return;
      }

      const startDateTime = `${newSeminar.date}T${newSeminar.startTime}`;
      const endDateTime = `${newSeminar.date}T${newSeminar.endTime}`;

      const formData = new FormData();
      formData.append("title", newSeminar.title);
      formData.append("ticketPrice", newSeminar.ticketPrice);
      formData.append("totalTicket", newSeminar.totalTicket);
      formData.append("date", newSeminar.date);
      formData.append("startTime", startDateTime);
      formData.append("endTime", endDateTime);
      formData.append("venue", newSeminar.venue);
      
      if (newSeminar.image) {
        formData.append("image", newSeminar.image);
      }

      const res = await dispatch(CreateSeminar(formData));
      
      if (res.payload?.status || res?.meta?.requestStatus === "fulfilled") {
        toast.success("Seminar added successfully");
        setShowAddForm(false);
        setNewSeminar({
          title: "",
          ticketPrice: "",
          totalTicket: "",
          date: "",
          startTime: "",
          endTime: "",
          venue: "",
          image: null,
        });
        dispatch(IndexSeminar());
      } else {
        toast.error(res.payload?.message || "Failed to add seminar");
      }
    } catch (err) {
      console.error("Error creating seminar:", err);
      toast.error(err.response?.data?.message || "Something went wrong while adding seminar");
    }
  };

  const handleDelete = async (seminarId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This seminar will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await dispatch(DeleteSeminar(seminarId));
        if (res?.payload?.status || res?.meta?.requestStatus === "fulfilled") {
          Swal.fire("Deleted!", "Seminar has been deleted.", "success");
          dispatch(IndexSeminar());
        } else {
          Swal.fire(
            "Failed!",
            res.payload?.message || "Failed to delete seminar.",
            "error"
          );
        }
      } catch (error) {
        Swal.fire("Error!", "Something went wrong during deletion.", "error");
      }
    }
  };

  const handleImageChange = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      if (isEdit) {
        setEditData({
          ...editData,
          imageFile: file,
          imageUrl: URL.createObjectURL(file),
        });
      } else {
        setNewSeminar({
          ...newSeminar,
          image: file,
          imageUrl: URL.createObjectURL(file),
        });
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
    <div className="p-4 sm:p-6 space-y-6 max-w-screen-4xl ">
      <div className="border border-gray-300 p-4 sm:p-6 rounded-lg">
        {editSeminar ? (
          <div className="space-y-4 p-4 border rounded-md bg-white">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Seminar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Title:</label>
                <input
                  type="text"
                  value={editData.title || ""}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Venue:</label>
                <input
                  type="text"
                  value={editData.venue || ""}
                  onChange={(e) => setEditData({ ...editData, venue: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Ticket Price:</label>
                <input
                  type="number"
                  value={editData.ticketPrice || ""}
                  onChange={(e) => setEditData({ ...editData, ticketPrice: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Total Tickets:</label>
                <input
                  type="number"
                  value={editData.totalTicket || ""}
                  onChange={(e) => setEditData({ ...editData, totalTicket: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Date:</label>
                <input
                  type="date"
                  value={editData.date ? new Date(editData.date).toISOString().split('T')[0] : ""}
                  onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Start Time:</label>
                <input
                  type="time"
                  value={editData.startTime ? new Date(editData.startTime).toTimeString().substring(0, 5) : ""}
                  onChange={(e) => setEditData({ ...editData, startTime: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">End Time:</label>
                <input
                  type="time"
                  value={editData.endTime ? new Date(editData.endTime).toTimeString().substring(0, 5) : ""}
                  onChange={(e) => setEditData({ ...editData, endTime: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, true)}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
                {editData.imageUrl && (
                  <img
                    src={editData.imageUrl}
                    alt="Preview"
                    className="mt-2 h-20 object-cover rounded"
                  />
                )}
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded-full"
              >
                Update
              </button>
              <button
                onClick={() => setEditSeminar(null)}
                className="bg-gray-200 text-black px-4 py-2 rounded-full"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : showViewModal ? (
          <div className="space-y-4 p-4 border rounded-md bg-white">
            <div className="flex justify-between items-center mb-6">
              <h1 className="!text-2xl font-bold text-gray-800">View Seminar</h1>
             
            </div>
            
            <div className="flex flex-col md:flex-column gap-6">
              <div className="w-80 h-80 ml-100 mb-9">
                <img
                  src={selectedSeminar.image 
                    ? `${import.meta.env.VITE_API_URL}${selectedSeminar.image}`
                    : noImg}
                  alt="Seminar"
                  className="w-full h-auto object-cover rounded"
                />
              </div>
              <div className="w-full md:w-2/3 space-y-4 ml-60">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedSeminar.title}
                </h2>
                
                <div className="space-y-2">
                  <p className="text-sm text-[#DA7821] font-medium">
                    <ion-icon name="location-outline" className="mr-1"></ion-icon>
                    {selectedSeminar.venue}
                  </p>
                  
                  <p className="text-sm text-black font-medium">
                    <ion-icon name="calendar-outline" className="mr-1"></ion-icon>
                    {new Date(selectedSeminar.date).toLocaleDateString()} |{" "}
                    {new Date(selectedSeminar.startTime).toLocaleTimeString()} -{" "}
                    {new Date(selectedSeminar.endTime).toLocaleTimeString()}
                  </p>
                  
                  <p className="text-sm font-medium">
                    <span className="font-semibold">Ticket Price:</span> ${selectedSeminar.ticketPrice}
                  </p>
                  
                  <p className="text-sm font-medium">
                    <span className="font-semibold">Total Tickets:</span> {selectedSeminar.totalTicket}
                  </p>
                  
                  <p className="text-sm font-medium">
                    <span className="font-semibold">Available Tickets:</span> {selectedSeminar.totalTicket}
                  </p>
                </div>
              </div>
            </div>
             <button
                onClick={() => setShowViewModal(false)}
                className="bg-gray-200 text-black px-4 py-2 ml-120 !rounded-full"
              >
                Back
              </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <h1 className="!text-3xl font-bold text-gray-800">Seminars List</h1>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 text-white font-semibold px-8 py-2 !rounded-full shadow-xl hover:bg-blue-700"
              >
                + Add
              </button>
            </div>

            {showAddForm && (
              <div className="space-y-4 p-4 border rounded-md bg-white mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Seminar</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Title:</label>
                    <input
                      type="text"
                      value={newSeminar.title}
                      onChange={(e) => setNewSeminar({...newSeminar, title: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Venue:</label>
                    <input
                      type="text"
                      value={newSeminar.venue}
                      onChange={(e) => setNewSeminar({...newSeminar, venue: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Ticket Price:</label>
                    <input
                      type="number"
                      value={newSeminar.ticketPrice}
                      onChange={(e) => setNewSeminar({...newSeminar, ticketPrice: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Total Tickets:</label>
                    <input
                      type="number"
                      value={newSeminar.totalTicket}
                      onChange={(e) => setNewSeminar({...newSeminar, totalTicket: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Date:</label>
                    <input
                      type="date"
                      value={newSeminar.date}
                      onChange={(e) => setNewSeminar({...newSeminar, date: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Start Time:</label>
                    <input
                      type="time"
                      value={newSeminar.startTime}
                      onChange={(e) => setNewSeminar({...newSeminar, startTime: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">End Time:</label>
                    <input
                      type="time"
                      value={newSeminar.endTime}
                      onChange={(e) => setNewSeminar({...newSeminar, endTime: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Image:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e)}
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                    />
                    {newSeminar.imageUrl && (
                      <img
                        src={newSeminar.imageUrl}
                        alt="Preview"
                        className="mt-2 h-20 object-cover rounded"
                      />
                    )}
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleAddSeminar}
                    className="bg-blue-600 text-white px-4 py-2 !rounded-full"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="bg-gray-200 text-black px-4 py-2 !rounded-full"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center border border-gray-300 p-3 rounded-xl gap-4 mb-6">
              <input
                type="text"
                placeholder="Select Date"
                className="w-full lg:w-auto flex-grow px-4 py-2 border border-gray-300 rounded"
              />
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 w-full sm:w-auto">
                <button className="bg-[#006AF2] text-white !rounded-full px-6 py-2 shadow-xl w-full sm:w-auto">
                  Submit
                </button>
                <button className="bg-black text-white !rounded-full px-6 py-2 shadow-xl w-full sm:w-auto">
                  Reset
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
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
                placeholder="Search By Title, Venue"
                className="w-full sm:max-w-md ml-auto px-4 py-2 border border-gray-300 rounded"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedSeminars.length > 0 ? (
                paginatedSeminars.map((seminarItem) => {
                  const seminarDate = new Date(seminarItem.date);
                  const now = new Date();
                  const isExpired = seminarDate < now;
                  const timer = timers[seminarItem._id];

                  return (
                    <div
                      key={seminarItem._id}
                      className={`relative border border-gray-300 rounded-lg h-auto p-5 bg-white transition ${
                        isExpired ? "opacity-50" : ""
                      }`}
                    >
                      <div className="absolute -bottom-3 right-3 flex gap-1">
                        {!isExpired && (
                          <>
                            <button
                              onClick={() => {
                                setSelectedSeminar(seminarItem);
                                setShowViewModal(true);
                              }}
                              className="bg-white text-gray-600 border border-gray-300 p-1.5 rounded-full hover:bg-[#006AF2] hover:text-white shadow-md"
                              title="View"
                            >
                              <ion-icon name="eye-outline" class="text-sm"></ion-icon>
                            </button>
                            <button
                              onClick={() => handleEditClick(seminarItem._id)}
                              className="bg-white text-gray-600 !border border-gray-300 p-1.5 rounded-full hover:bg-[#006AF2] hover:text-white shadow-md"
                              title="Edit"
                            >
                              <ion-icon name="create-outline" class="text-sm"></ion-icon>
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDelete(seminarItem._id)}
                          className={`bg-white ${
                            isExpired ? "text-red-600" : "text-gray-600"
                          } border border-gray-300 p-1.5 rounded-full hover:bg-[#006AF2] hover:text-white shadow-md`}
                          title="Delete"
                        >
                          <ion-icon name="trash-outline" class="text-sm"></ion-icon>
                        </button>
                      </div>

                      {isExpired && (
                        <div className="absolute top-0 left-0 bg-blue-400 text-white text-xs font-semibold px-2 py-1 rounded-tr-md rounded-bl-md">
                          Expired Seminar
                        </div>
                      )}

                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-42 relative">
                          <img
                            src={
                              seminarItem.image
                                ? `${import.meta.env.VITE_API_URL}${seminarItem.image}`
                                : noImg
                            }
                            alt="Seminar"
                            className="w-full h-42 object-cover rounded"
                          />
                          <Link
                            to="#"
                            onClick={(e) => e.preventDefault()}
                            className="absolute top-[135px] left-[9px] min-w-[150px] font-semibold font-['Roboto'] hover:bg-[#0A2540] hover:text-white bg-[#f5f7f9] text-[11px] px-[7px] py-[9px] rounded-[20px] border border-[#9a9da129] shadow-none cursor-pointer inline-block text-center align-middle transition-all duration-150 no-underline"
                          >
                            <span className="m-2 border border-black rounded-full p-1 bg-[#0659c5] text-white">
                              0 / {seminarItem.totalTicket || 0}
                            </span>
                            Available Tickets
                          </Link>
                        </div>

                        <div className="flex-1">
                          <h2 className="text-xl font-semibold text-gray-800">
                            {seminarItem.title}
                          </h2>

                          <p className="text-sm text-[#DA7821] font-medium mb-2">
                            <ion-icon name="location-outline"></ion-icon> {seminarItem.venue}
                          </p>

                          <p className="text-sm text-black font-medium mb-2">
                            <ion-icon name="calendar-outline"></ion-icon>{" "}
                            {new Date(seminarItem.date).toLocaleString()} -{" "}
                            {new Date(seminarItem.endTime).toLocaleTimeString()}
                          </p>

                          {!isExpired && timer && (
                            <div className="grid grid-cols-4 gap-2 text-center mb-2">
                              {Object.entries(timer).map(([label, value]) => (
                                <div key={label} className="bg-[#e2e8f0] rounded p-1 text-xs">
                                  <p className="font-semibold text-black text-sm">{value}</p>
                                  <p className="text-gray-500 capitalize">{label}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-2 text-center py-8 text-gray-500">
                  No seminars found
                </div>
              )}
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

export default SeminarList;