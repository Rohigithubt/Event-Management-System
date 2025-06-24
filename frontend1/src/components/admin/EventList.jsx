import React, { useEffect, useState, useRef } from "react";
import noImg from "../../assets/images/no-image.jpg";
import Footer from "../../components/admin/Footer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CreateEvent, IndexEvent, DeleteEvent } from "../../redux/slice/eventSlice";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const EventList = () => {
  const dispatch = useDispatch();
  const { event = [], loading, error } = useSelector((state) => state.event);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showViewForm, setShowViewForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const initialEventState = {
    title: "",
    description: "",
    location: "",
    totalInvitation: 0,
    requiredvolunteer: 0,
    date: new Date().toISOString().split('T')[0],
    endTime: "",
    image: null,
    imagePreview: null
  };

  const [newEvent, setNewEvent] = useState(initialEventState);
  const fileInputRef = useRef();

  useEffect(() => {
    dispatch(IndexEvent());
  }, [dispatch, refreshKey]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const filteredEvents = Array.isArray(event)
    ? event.filter((item) =>
      item?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleAddEvent = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', newEvent.title);
      formData.append('description', newEvent.description);
      formData.append('location', newEvent.location);
      formData.append('totalInvitation', newEvent.totalInvitation);
      formData.append('requiredvolunteer', newEvent.requiredvolunteer);
      formData.append('date', newEvent.date);
      formData.append('endTime', newEvent.endTime);

      if (newEvent.image) {
        formData.append('image', newEvent.image);
      } else {
        formData.append('useDefaultImage', 'true');
      }

      const res = await dispatch(CreateEvent(formData));

      if (res.payload?.success || res?.meta?.requestStatus === "fulfilled") {
        toast.success("Event added successfully");
        setShowAddForm(false);
        setNewEvent(initialEventState);
        setRefreshKey(prev => prev + 1);
      } else {
        toast.error(res.payload?.message || "Failed to add event");
      }
    } catch (error) {
      toast.error("Something went wrong while adding event");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (eventId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This event will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        const res = await dispatch(DeleteEvent(eventId));
        if (res.payload?.success || res?.meta?.requestStatus === "fulfilled") {
          Swal.fire("Deleted!", "Event has been deleted.", "success");
          setRefreshKey(prev => prev + 1);
        } else {
          Swal.fire("Failed!", res.payload?.message || "Failed to delete event.", "error");
        }
      } catch (error) {
        Swal.fire("Error!", "Something went wrong during deletion.", "error");
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewEvent(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewEvent(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleClickDropZone = () => {
    fileInputRef.current.click();
  };

  const resetForm = () => {
    setNewEvent(initialEventState);
    setShowAddForm(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderMainContent = () => {
    if (showAddForm) {
      return (
        <div className="border border-gray-300 p-5 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Add New Event</h1>
            <button
              onClick={resetForm}
              className="bg-gray-200 text-black px-4 py-2 rounded"
            >
              Back to List
            </button>
          </div>

          <form onSubmit={handleAddEvent} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Title*</label>
                <input
                  type="text"
                  placeholder="Enter event title"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Location*</label>
                <input
                  type="text"
                  placeholder="Enter event location"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Start Date & Time*</label>
                <input
                  type="datetime-local"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">End Date & Time*</label>
                <input
                  type="datetime-local"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  value={newEvent.endTime}
                  onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Total Invitations</label>
                <input
                  type="number"
                  placeholder="Enter number of invitations"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  value={newEvent.totalInvitation}
                  onChange={(e) => setNewEvent({ ...newEvent, totalInvitation: e.target.value })}
                  min="0"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Required Volunteers</label>
                <input
                  type="number"
                  placeholder="Enter number of volunteers needed"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  value={newEvent.requiredvolunteer}
                  onChange={(e) => setNewEvent({ ...newEvent, requiredvolunteer: e.target.value })}
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Description*</label>
              <textarea
                placeholder="Enter event description"
                className="w-full px-4 py-2 border border-gray-300 rounded min-h-[150px]"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Image</label>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleClickDropZone}
              >
                {newEvent.imagePreview ? (
                  <div className="relative">
                    <img
                      src={newEvent.imagePreview}
                      alt="Preview"
                      className="max-h-48 mx-auto mb-4"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setNewEvent(prev => ({ ...prev, image: null, imagePreview: null }));
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
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={isSubmitting}

              >
                {isSubmitting ? 'Saving...' : 'Save'}
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
        </div>
      );
    }

    if (showViewForm) {
      return (
        <div className="border border-gray-300 p-5 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">View Event</h1>
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
                  src={selectedEvent?.image ? `${import.meta.env.VITE_API_URL}${selectedEvent.image}` : noImg}
                  alt="Event"
                  className="w-full h-auto object-cover rounded"
                  onError={(e) => {
                    e.target.src = noImg;
                  }}
                />
              </div>
              <div className="w-full md:w-2/3">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {selectedEvent?.title}
                </h2>
                <p className="text-gray-700 mb-6 whitespace-pre-line">
                  {selectedEvent?.description}
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Location:</span> {selectedEvent?.location}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Date:</span> {formatDate(selectedEvent?.date)} - {formatDate(selectedEvent?.endTime)}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Invitations:</span> {selectedEvent?.totalInvitation}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Volunteers Needed:</span> {selectedEvent?.requiredvolunteer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <h1 className="!text-3xl font-bold text-gray-800">Event List</h1>
          <button
            onClick={() => {
              setShowAddForm(true);
              setNewEvent(initialEventState);
            }}
            className="bg-blue-600 text-white !rounded-full px-6 py-2 shadow-xl hover:bg-blue-700"
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
            placeholder="Search By Title"
            className="w-full sm:max-w-md lg:ml-auto px-4 py-2 border border-gray-300 rounded"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {loading && event.length === 0 ? (
          <div className="text-center py-4">Loading...</div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">
            {error.message || "Error loading data"}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedEvents.length > 0 ? (
                paginatedEvents.map((item) => (
                  <div
                    key={item._id}
                    className="border border-gray-300 rounded-lg p-7 bg-white transition relative"
                  >
                    <div className="absolute top-50 right-4  flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedEvent(item);
                          setShowViewForm(true);
                        }}
                        className="bg-white text-black border !border-gray-300 rounded-md hover:bg-blue-600 hover:text-white"
                      >
                        <ion-icon name="eye-outline"></ion-icon>
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-white text-black border !border-gray-300 rounded-md hover:bg-red-600 hover:text-white"
                      >
                        <ion-icon name="trash-outline"></ion-icon>
                      </button>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                      <img
                        src={item.image ? `${import.meta.env.VITE_API_URL}${item.image}` : noImg}
                        alt="Event"
                        className="w-full md:w-42 h-42 object-cover rounded"
                        onError={(e) => {
                          e.target.src = noImg;
                        }}
                      />
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-800">
                          {item.title}
                        </h2>
                        <p className="text-sm text-[#DA7821] font-semibold mt-1">
                          <ion-icon name="calendar-outline"></ion-icon> {formatDate(item.date)} - {formatDate(item.endTime)}
                        </p>

                        <p className="text-sm text-gray-600 font-medium mt-1">
                          <span className="font-normal text-[#DA7821]"><ion-icon name="location-outline"></ion-icon></span> {item.location}
                        </p>

                        <p className="text-md font-medium text-gray-700 mt-1">
                          {item.description.length > 105
                            ? `${item.description.slice(0, 105)}...`
                            : item.description}
                        </p>


                        <p className="text-sm text-gray-600 mt-1">
                          <span className="font-normal">Total Invitations:</span> {item.totalInvitation}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          <span className="font-normal">Required Volunteers:</span> {item.requiredvolunteer}
                        </p>

                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-10 text-gray-500">
                  {event.length === 0 ? "No events available" : "No matching events found"}
                </div>
              )}
            </div>

            {filteredEvents.length > 0 && (
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
  };

  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-screen-2xl" key={refreshKey}>
      {renderMainContent()}
      <Footer />
    </div>
  );
};

export default EventList;