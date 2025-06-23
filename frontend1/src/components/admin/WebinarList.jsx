  import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
  import noImg from "../../assets/images/no-image.jpg";
  import Footer from "../../components/admin/Footer";
  import { useDispatch, useSelector } from "react-redux";
  import { toast } from "react-toastify";
  import {
    CreateWebinar,
    IndexWebinar,
    EditWebinar,
    UpdateWebinar,
    DeleteWebinar,
  } from "../../redux/slice/webinarSlice";
  import "react-toastify/dist/ReactToastify.css";
  import Swal from "sweetalert2";

  const WebinarList = () => {
    const dispatch = useDispatch();
    const { webinars = [], loading, error } = useSelector((state) => state.webinar);

    // State management
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [showViewForm, setShowViewForm] = useState(false);
    const [selectedWebinar, setSelectedWebinar] = useState(null);
    const [editWebinarData, setEditWebinarData] = useState(null);
    const [timers, setTimers] = useState({});

    const initialWebinarState = useMemo(() => ({
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      link: "",
      image: null,
      imagePreview: null,
    }), []);

    const [newWebinar, setNewWebinar] = useState(initialWebinarState);
    const fileInputRef = useRef();

    // Memoized filtered webinars
    const filteredWebinars = useMemo(() => {
      return Array.isArray(webinars) 
        ? webinars.filter(item => {
            const matchesSearch = item?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                item?.date?.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesSearch;
          })
        : [];
    }, [webinars, searchTerm]);

    // Pagination calculations
    const totalPages = useMemo(() => Math.ceil(filteredWebinars.length / itemsPerPage), 
      [filteredWebinars.length, itemsPerPage]);
    const startIndex = useMemo(() => (currentPage - 1) * itemsPerPage, 
      [currentPage, itemsPerPage]);
    const paginatedWebinars = useMemo(() => filteredWebinars.slice(startIndex, startIndex + itemsPerPage), 
      [filteredWebinars, startIndex, itemsPerPage]);

    // Data reloading
    const reloadData = useCallback(() => {
      dispatch(IndexWebinar());
    }, [dispatch]);

    // Timer effect
    useEffect(() => {
      const interval = setInterval(() => {
        const newTimers = {};
        webinars.forEach((webinar) => {
          if (new Date(webinar.endTime) > new Date()) {
            const diff = new Date(webinar.date) - new Date();
            if (diff > 0) {
              const days = Math.floor(diff / (1000 * 60 * 60 * 24));
              const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
              const minutes = Math.floor((diff / (1000 * 60)) % 60);
              const seconds = Math.floor((diff / 1000) % 60);
              newTimers[webinar._id] = { days, hours, minutes, seconds };
            }
          }
        });
        setTimers(newTimers);
      }, 1000);
      return () => clearInterval(interval);
    }, [webinars]);

    // Initial data load
    useEffect(() => {
      reloadData();
    }, [reloadData]);

    // Error handling
    useEffect(() => {
      if (error) toast.error(error);
    }, [error]);

    // File handling functions
    const handleFileChange = useCallback((e) => {
      const file = e.target.files[0];
      if (file && file.type.match('image.*')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setNewWebinar(prev => ({
            ...prev,
            image: file,
            imagePreview: e.target.result
          }));
        };
        reader.readAsDataURL(file);
      } else {
        toast.error("Please select a valid image file");
      }
    }, []);

    const handleDrop = useCallback((e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.match('image.*')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setNewWebinar(prev => ({
            ...prev,
            image: file,
            imagePreview: e.target.result
          }));
        };
        reader.readAsDataURL(file);
      } else {
        toast.error("Please drop a valid image file");
      }
    }, []);

    const handleDragOver = useCallback((e) => e.preventDefault(), []);
    const handleClickDropZone = useCallback(() => fileInputRef.current.click(), []);

    // CRUD operations
    const handleAddWebinar = useCallback(async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append("title", newWebinar.title);
        formData.append("date", newWebinar.date);
        formData.append("startTime", `${newWebinar.date}T${newWebinar.startTime}`);
        formData.append("endTime", `${newWebinar.date}T${newWebinar.endTime}`);
        formData.append("link", newWebinar.link);
        if (newWebinar.image) {
          formData.append("image", newWebinar.image);
        }

        const res = await dispatch(CreateWebinar(formData));

        if (res.payload?.success) {
          toast.success("Webinar added successfully");
          setShowAddForm(false);
          setNewWebinar(initialWebinarState);
          reloadData();
        } else {
          toast.error(res.payload?.message || "Failed to add webinar");
        }
      } catch (error) {
        toast.error(error.message || "Something went wrong while adding webinar");
      }
    }, [newWebinar, dispatch, initialWebinarState, reloadData]);

    const handleEditClick = useCallback(async (webinarId) => {
      try {
        const res = await dispatch(EditWebinar(webinarId));
        
        if (res.payload?.data) {
          const webinarData = res.payload.data;
          setEditWebinarData(webinarData);
          setNewWebinar({
            title: webinarData.title || "",
            date: webinarData.date ? webinarData.date.split('T')[0] : "",
            startTime: webinarData.startTime ? webinarData.startTime.split('T')[1].substring(0, 5) : "",
            endTime: webinarData.endTime ? webinarData.endTime.split('T')[1].substring(0, 5) : "",
            link: webinarData.link || "",
            image: null,
            imagePreview: webinarData.image 
              ? `${import.meta.env.VITE_API_URL}${webinarData.image}`
              : null
          });
          setShowAddForm(true);
        } else {
          toast.error("Failed to fetch webinar data");
        }
      } catch (error) {
        toast.error("Failed to fetch webinar data");
        console.error("Edit error:", error);
      }
    }, [dispatch]);

    const handleUpdateWebinar = useCallback(async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append("webinarId", editWebinarData._id);
        formData.append("title", newWebinar.title);
        formData.append("date", newWebinar.date);
        formData.append("startTime", `${newWebinar.date}T${newWebinar.startTime}`);
        formData.append("endTime", `${newWebinar.date}T${newWebinar.endTime}`);
        formData.append("link", newWebinar.link);
        if (newWebinar.image) {
          formData.append("image", newWebinar.image);
        }

        const res = await dispatch(UpdateWebinar(formData));

        if (res.payload?.success) {
          toast.success("Webinar updated successfully");
          setShowAddForm(false);
          setEditWebinarData(null);
          setNewWebinar(initialWebinarState);
          reloadData();
        } else {
          toast.error(res.payload?.message || "Failed to update webinar");
        }
      } catch (error) {
        toast.error(error.message || "Something went wrong while updating webinar");
      }
    }, [newWebinar, editWebinarData, dispatch, initialWebinarState, reloadData]);

    const handleDelete = useCallback(async (webinarId) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This webinar will be permanently deleted.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
      });

      if (result.isConfirmed) {
        try {
          const res = await dispatch(DeleteWebinar(webinarId));
          if (res.payload?.success) {
            Swal.fire("Deleted!", "Webinar has been deleted.", "success");
            reloadData();
          } else {
            Swal.fire("Failed!", res.payload?.message || "Failed to delete webinar.", "error");
          }
        } catch (error) {
          Swal.fire("Error!", "Something went wrong during deletion.", "error");
        }
      }
    }, [dispatch, reloadData]);

    // View and navigation functions
    const handleViewClick = useCallback((webinar) => {
      setSelectedWebinar(webinar);
      setShowViewForm(true);
    }, []);

    const handlePrev = useCallback(() => setCurrentPage(prev => Math.max(prev - 1, 1)), []);
    const handleNext = useCallback(() => setCurrentPage(prev => Math.min(prev + 1, totalPages)), [totalPages]);

    const resetForm = useCallback(() => {
      setNewWebinar(initialWebinarState);
      setEditWebinarData(null);
      setShowAddForm(false);
    }, [initialWebinarState]);

    // Helper functions
    const formatDateTime = useCallback((dateTimeString) => {
      if (!dateTimeString) return "";
      const date = new Date(dateTimeString);
      return date.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }, []);

    // Render functions
    const renderForm = useCallback(() => (
      <form onSubmit={editWebinarData ? handleUpdateWebinar : handleAddWebinar} className="space-y-4">
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Title:</label>
          <input
            type="text"
            placeholder="Enter webinar title"
            className="w-full px-4 py-2 border border-gray-300 rounded"
            value={newWebinar.title}
            onChange={(e) => setNewWebinar(prev => ({ ...prev, title: e.target.value }))}
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Link:</label>
          <input
            type="text"
            placeholder="Enter webinar link"
            className="w-full px-4 py-2 border border-gray-300 rounded"
            value={newWebinar.link}
            onChange={(e) => setNewWebinar(prev => ({ ...prev, link: e.target.value }))}
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Date:</label>
          <input
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded"
            value={newWebinar.date}
            onChange={(e) => setNewWebinar(prev => ({ ...prev, date: e.target.value }))}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Start Time:</label>
            <input
              type="time"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              value={newWebinar.startTime}
              onChange={(e) => setNewWebinar(prev => ({ ...prev, startTime: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">End Time:</label>
            <input
              type="time"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              value={newWebinar.endTime}
              onChange={(e) => setNewWebinar(prev => ({ ...prev, endTime: e.target.value }))}
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Image:</label>
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleClickDropZone}
          >
            {newWebinar.imagePreview ? (
              <div className="relative">
                <img
                  src={newWebinar.imagePreview}
                  alt="Preview"
                  className="max-h-48 mx-auto mb-4"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setNewWebinar(prev => ({ ...prev, image: null, imagePreview: null }));
                  }}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            ) : (
              <>
                <p className="mb-2">Drag & drop an image here or click to select</p>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-[#006AF2] text-white px-4 py-2 rounded"
          >
            {editWebinarData ? "Update" : "Save"}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-200 text-black px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    ), [newWebinar, editWebinarData, handleUpdateWebinar, handleAddWebinar, handleDragOver, handleDrop, handleClickDropZone, handleFileChange, resetForm]);

    const renderViewModal = useCallback(() => (
      <div className="border border-gray-300 p-5 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Webinar Details</h1>
          <button
            onClick={() => setShowViewForm(false)}
            className="bg-gray-200 text-black px-4 py-2 rounded"
          >
            Back to List
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <img
                src={selectedWebinar.image ? `${import.meta.env.VITE_API_URL}${selectedWebinar.image}` : noImg}
                alt="Webinar"
                className="w-full h-auto object-cover rounded"
              />
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-bold text-[#0A2540] mb-2">
                {selectedWebinar.title}
              </h2>
              
              <p className="text-sm text-[#DA7821] font-medium mb-4">
                <ion-icon name="calendar-outline" className="mr-1"></ion-icon>
                {formatDateTime(selectedWebinar.date)} - {formatDateTime(selectedWebinar.endTime)}
              </p>

              <div className="mb-4">
                <a 
                  href={selectedWebinar.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  <ion-icon name="link-outline" className="mr-1"></ion-icon>
                  Join Webinar Link
                </a>
              </div>

              {new Date(selectedWebinar.endTime) > new Date() && (
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h3 className="font-semibold text-blue-800 mb-2">Time Remaining:</h3>
                  {timers[selectedWebinar._id] ? (
                    <div className="grid grid-cols-4 gap-2 text-center">
                      {Object.entries(timers[selectedWebinar._id]).map(([label, value]) => (
                        <div key={label} className="bg-blue-100 rounded p-2">
                          <p className="font-bold text-blue-800">{value}</p>
                          <p className="text-xs text-blue-600 capitalize">{label}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-blue-600">Webinar starting soon</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    ), [selectedWebinar, timers, formatDateTime]);

    const renderWebinarCard = useCallback((webinar) => {
      const timer = timers[webinar._id];
      const isExpired = new Date(webinar.endTime) < new Date();
      
      return (
        <div
          key={webinar._id}
          className={`border border-gray-300 rounded-lg p-7 bg-white transition relative ${
            isExpired ? "opacity-50" : ""
          }`}
        >
          {isExpired && (
            <div className="absolute top-4 left-4 bg-blue-400 text-white text-xs font-semibold px-2 py-1 rounded-tr-md rounded-bl-md">
              Expired Webinar
            </div>
          )}
          
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => handleViewClick(webinar)}
              className="bg-white text-black border border-black p-1 rounded-md hover:bg-[#006AF2] hover:text-white"
            >
              <ion-icon name="eye-outline"></ion-icon>
            </button>
            <button
              onClick={() => handleEditClick(webinar._id)}
              className="bg-white text-black p-1 rounded-md hover:bg-[#006AF2] hover:text-white"
            >
              <ion-icon name="create-outline"></ion-icon>
            </button>
            <button
              onClick={() => handleDelete(webinar._id)}
              className="bg-white text-black p-1 rounded-md hover:bg-[#006AF2] hover:text-white"
            >
              <ion-icon name="trash-outline"></ion-icon>
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <img
              src={webinar.image ? `${import.meta.env.VITE_API_URL}${webinar.image}` : noImg}
              alt="Webinar"
              className="w-full md:w-42 h-42 object-cover rounded"
              onError={(e) => {
                e.target.src = noImg;
              }}
            />
            <div className="flex-1">
              <h2 className="!text-2xl text-[#0A2540] font-bold">
                {webinar.title}
              </h2>
              
              <p className="text-sm text-[#DA7821] font-medium mb-3">
                <ion-icon name="calendar-outline" className="mr-1"></ion-icon>
                {formatDateTime(webinar.date)} - {formatDateTime(webinar.endTime)}
              </p>

              {!isExpired && timer && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center mb-4">
                  {Object.entries(timer).map(([label, value]) => (
                    <div
                      key={label}
                      className="bg-[#e2e8f0] rounded p-1 text-xs"
                    >
                      <p className="font-semibold text-black text-sm">
                        {value}
                      </p>
                      <p className="text-gray-500 capitalize">{label}</p>
                    </div>
                  ))}
                </div>
              )}

              <button
                className={`w-full md:w-48 mt-3 px-4 py-2 rounded-3xl text-sm font-medium ${
                  isExpired
                    ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                onClick={() => {
                  if (!isExpired && webinar.link) {
                    window.open(webinar.link, '_blank');
                  }
                }}
              >
                {isExpired ? "Webinar Expired" : "Join The Webinar"}
              </button>
            </div>
          </div>
        </div>
      );
    }, [timers, handleViewClick, handleEditClick, handleDelete, formatDateTime]);

    const renderMainContent = useCallback(() => {
      if (showAddForm) {
        return (
          <div className="border border-gray-300 p-5 rounded-lg">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                {editWebinarData ? "Edit Webinar" : "Add New Webinar"}
              </h1>
              <button
                onClick={resetForm}
                className="bg-gray-200 text-black px-4 py-2 rounded"
              >
                Back to List
              </button>
            </div>
            {renderForm()}
          </div>
        );
      }

      if (showViewForm) {
        return renderViewModal();
      }

      return (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
            <h1 className="!text-2xl font-bold text-gray-800">Webinars List</h1>
            <button
              onClick={() => {
                setShowAddForm(true);
                setEditWebinarData(null);
                setNewWebinar(initialWebinarState);
              }}
              className="bg-[#006AF2] text-white !rounded-full px-6 py-2 shadow-xl w-full sm:w-auto"
            >
              + Add
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

          {loading && webinars.length === 0 ? (
            <div className="text-center py-4">Loading...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">
              {error.message || "Error loading data"}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paginatedWebinars.length > 0 ? (
                  paginatedWebinars.map(renderWebinarCard)
                ) : (
                  <div className="col-span-2 text-center py-10 text-gray-500">
                    {webinars.length === 0 ? "No webinars available" : "No matching webinars found"}
                  </div>
                )}
              </div>

              {filteredWebinars.length > 0 && (
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
              )}
            </>
          )}
        </>
      );
    }, [showAddForm, showViewForm, editWebinarData, loading, webinars, error, 
        paginatedWebinars, filteredWebinars, itemsPerPage, currentPage, searchTerm, 
        totalPages, renderForm, renderViewModal, renderWebinarCard, handlePrev, 
        handleNext, resetForm, initialWebinarState]);

    return (
      <div className="p-4 sm:p-6 !space-y-5 max-w-screen-2xl">
        {renderMainContent()}
        <Footer />
      </div>
    );
  };  

  export default WebinarList;