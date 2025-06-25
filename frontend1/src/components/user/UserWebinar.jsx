import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IndexWebinar } from "../../redux/slice/webinarSlice";
import { toast } from "react-toastify";
import noImg from "../../assets/images/no-image.jpg";
import Footer from "../../components/admin/Footer";

const UserWebinar = () => {
  const dispatch = useDispatch();
  const { webinars = [], loading, error } = useSelector((state) => state.webinar);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [timers, setTimers] = useState({});

  useEffect(() => {
    dispatch(IndexWebinar());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

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

  const filteredWebinars = useMemo(() => {
    return webinars.filter(item =>
      item?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.date?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [webinars, searchTerm]);

  const totalPages = useMemo(() => Math.ceil(filteredWebinars.length / itemsPerPage), [filteredWebinars, itemsPerPage]);
  const startIndex = useMemo(() => (currentPage - 1) * itemsPerPage, [currentPage, itemsPerPage]);
  const paginatedWebinars = useMemo(() => filteredWebinars.slice(startIndex, startIndex + itemsPerPage), [filteredWebinars, startIndex, itemsPerPage]);

  const formatDateTime = useCallback((dateTimeString) => {
    if (!dateTimeString) return "";
    const date = new Date(dateTimeString);
    return date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  return (
    <div className="p-4 sm:p-6 !space-y-5 max-w-screen-2xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
        <h1 className="!text-2xl font-bold text-gray-800">Our Webinars</h1>
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
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paginatedWebinars.length > 0 ? (
              paginatedWebinars.map((webinar) => {
                const timer = timers[webinar._id];
                const isExpired = new Date(webinar.endTime) < new Date();
                return (
                  <div key={webinar._id} className={`border border-gray-300 rounded-lg p-7 bg-white transition relative ${isExpired ? "opacity-50" : ""}`}>
                    {isExpired && (
                      <div className="absolute top-4 left-4 bg-blue-400 text-white text-xs font-semibold px-2 py-1 rounded-tr-md rounded-bl-md">
                        Expired Webinar
                      </div>
                    )}
                    <div className="flex flex-col md:flex-row gap-4">
                      <img
                        src={webinar.image ? `${import.meta.env.VITE_API_URL}${webinar.image}` : noImg}
                        alt="Webinar"
                        className="w-full md:w-42 h-42 object-cover rounded"
                        onError={(e) => (e.target.src = noImg)}
                      />
                      <div className="flex-1">
                        <h2 className="!text-2xl text-[#0A2540] font-bold">
                          {webinar.title}
                        </h2>
                        <p className="text-sm text-[#DA7821] font-medium mb-3">
                          <ion-icon name="calendar-outline"></ion-icon> {formatDateTime(webinar.date)} - {formatDateTime(webinar.endTime)}
                        </p>

                        {!isExpired && timer && (
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center mb-4">
                            {Object.entries(timer).map(([label, value]) => (
                              <div key={label} className="bg-[#e2e8f0] rounded p-1 text-xs">
                                <p className="font-semibold text-black text-sm">{value}</p>
                                <p className="text-gray-500 capitalize">{label}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        <button
                          className={`w-full md:w-48 mt-3 px-4 py-2 rounded-3xl text-sm font-medium ${isExpired ? "bg-gray-200 text-gray-600 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                          onClick={() => {
                            if (!isExpired && webinar.link) {
                              window.open(webinar.link, "_blank");
                            }
                          }}
                        >
                          {isExpired ? "Webinar Expired" : "Join The Webinar"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-2 text-center py-10 text-gray-500">
                No matching webinars found
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
      <Footer />
    </div>
  );
};

export default UserWebinar;
