import React, { useEffect, useState } from "react";
import noImg from "../../assets/images/no-image.jpg";
import Footer from '../../components/admin/Footer';

const webinars = [
  {
    id: 1,
    title: "Zsdas",
    date: "18 June 2025 00:00",
    endTime: "18 June 2025 00:01",
    status: "upcoming",
    imageUrl: null,
  },
  {
    id: 2,
    title: "Technology And Innovation",
    date: "12 September 2024 14:00",
    endTime: "12 September 2024 19:00",
    status: "expired",
    imageUrl: null,
  },
  {
    id: 3,
    title: "Education And Learning",
    date: "11 September 2024 21:00",
    endTime: "11 September 2024 22:01",
    status: "expired",
    imageUrl: null,
  },
  {
    id: 4,
    title: "Creative Arts And Media",
    date: "11 September 2024 16:00",
    endTime: "11 September 2024 16:46",
    status: "expired",
    imageUrl: null,
  },
  {
    id: 5,
    title: "Efrrg",
    date: "18 June 2025 00:00",
    endTime: "18 June 2025 00:01",
    status: "upcoming",
    imageUrl: null,
  },
];

const Webinar = () => {
  const [timers, setTimers] = useState({});
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimers = {};
      webinars.forEach((webinar) => {
        if (webinar.status === "upcoming") {
          const diff = new Date(webinar.date) - new Date();
          if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);
            newTimers[webinar.id] = { days, hours, minutes, seconds };
          }
        }
      });
      setTimers(newTimers);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-screen-2xl mx-auto">
      <div className="border border-gray-300 p-5 rounded-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Webinars List</h1>
          <button className="bg-blue-600 text-white font-semibold px-8 py-2 !rounded-full shadow-xl hover:bg-blue-700 mt-2 sm:mt-0">
            + Add
          </button>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {webinars.map((webinar) => {
            const timer = timers[webinar.id];
            const isExpired = webinar.status === "expired";
            return (
              <div
                key={webinar.id}
                className={`relative border border-gray-300 rounded-lg min-h-[250px] p-4 sm:p-6 bg-white transition ${isExpired ? "opacity-50 pointer-events-none select-none" : ""
                  }`}
              >
                {isExpired && (
                  <div className="absolute top-0 left-0 bg-blue-400 text-white text-xs font-semibold px-2 py-1 rounded-tr-md rounded-bl-md">
                    Expired Webinar
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-4 h-full">
                  <div className="w-full md:w-40 flex-shrink-0">
                    <img
                      src={webinar.imageUrl || noImg}
                      alt="Webinar"
                      className="w-full h-40 object-cover rounded"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
                        {webinar.title}
                      </h2>

                      <p className="text-sm text-[#DA7821] font-medium mb-3">
                        <ion-icon name="calendar-outline" className="mr-1"></ion-icon>
                        {webinar.date} - {webinar.endTime}
                      </p>

                      {webinar.status === "upcoming" && timer && (
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
                    </div>

                    <button
                      className={`w-full md:w-48 mt-3 px-4 py-2 rounded-3xl text-sm font-medium ${
                        isExpired
                          ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      Join The Webinar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Webinar;
