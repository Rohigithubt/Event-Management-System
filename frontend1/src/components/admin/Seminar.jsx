import React, { useEffect, useState } from "react";
import noImg from "../../assets/images/no-image.jpg";
import Footer from "../../components/admin/Footer";
import { Link } from "react-router-dom";

const Seminars = [
  {
    id: 1,
    title: "Zsdas",
    location: "ryfvryfr",
    date: "18 June 2025 00:00",
    endTime: "18 June 2025 00:01",
    status: "upcoming",
    imageUrl: null,
  },
  {
    id: 2,
    title: "Technology And Innovation",
    location: "aveegvfegf e",
    date: "12 September 2024 14:00",
    endTime: "12 September 2024 19:00",
    status: "expired",
    imageUrl: null,
  },
  {
    id: 3,
    title: "Education And Learning",
    location: "qwwdwedewfe",
    date: "11 September 2024 21:00",
    endTime: "11 September 2024 22:01",
    status: "expired",
    imageUrl: null,
  },
  {
    id: 4,
    title: "Creative Arts And Media",
    location: "ergtgtgbrtj",
    date: "11 September 2024 16:00",
    endTime: "11 September 2024 16:46",
    status: "expired",
    imageUrl: null,
  },
  {
    id: 5,
    title: "Efrrg",
    location: "aewefrfrgf",
    date: "18 June 2025 00:00",
    endTime: "18 June 2025 00:01",
    status: "upcoming",
    imageUrl: null,
  },
];

const Seminar = () => {
  const [timers, setTimers] = useState({});
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimers = {};
      Seminars.forEach((Seminar) => {
        if (Seminar.status === "upcoming") {
          const diff = new Date(Seminar.date) - new Date();
          if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);
            newTimers[Seminar.id] = { days, hours, minutes, seconds };
          }
        }
      });
      setTimers(newTimers);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-screen-2xl mx-auto">
      <div className="border border-gray-300 p-4 sm:p-6 rounded-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <h1 className="!text-3xl font-bold text-gray-800">Seminars List</h1>
          <button className="bg-blue-600 text-white font-semibold px-8 py-2 !rounded-full shadow-xl hover:bg-blue-700">
            + Add
          </button>
        </div>

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
            className="w-full sm:max-w-md ml-auto px-4 py-2 border border-gray-300 rounded"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Seminars.map((Seminar) => {
            const timer = timers[Seminar.id];
            const isExpired = Seminar.status === "expired";

            return (
              <div
                key={Seminar.id}
                className={`relative border border-gray-300 rounded-lg h-auto p-5 bg-white transition ${isExpired ? "opacity-50 pointer-events-none select-none" : ""
                  }`}
              >
                {isExpired && (
                  <div className="absolute top-0 left-0 bg-blue-400 text-white text-xs font-semibold px-2 py-1 rounded-tr-md rounded-bl-md">
                    Expired Seminar
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-42 relative">
                    <img
                      src={Seminar.imageUrl || noImg}
                      alt="Seminar"
                      className="w-full h-42 object-cover rounded"
                    />
                    <Link
                      to="#"
                      onClick={(e) => e.preventDefault()}
                      className="absolute top-[135px] left-[9px] min-w-[150px] font-semibold font-['Roboto'] hover:bg-[#0A2540] hover:text-white bg-[#f5f7f9] text-[11px] px-[7px] py-[9px] rounded-[20px] border border-[#9a9da129] shadow-none cursor-pointer inline-block text-center align-middle transition-all duration-150 no-underline"
                    >
                      <span className="m-2 border border-black rounded-full p-1 bg-[#0659c5] text-white">
                        0 / 44
                      </span>
                      Available Tickets
                    </Link>
                  </div>

                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {Seminar.title}
                    </h2>

                    <p className="text-sm text-[#DA7821] font-medium mb-2">
                      <ion-icon name="location-outline"></ion-icon> {Seminar.location}
                    </p>

                    <p className="text-sm text-black font-medium mb-2">
                      <ion-icon name="calendar-outline"></ion-icon> {Seminar.date} - {Seminar.endTime}
                    </p>

                    {Seminar.status === "upcoming" && timer && (
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
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Seminar;
