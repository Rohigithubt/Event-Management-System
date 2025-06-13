import React, { useState } from "react";
import noImg from "../../assets/images/no-image.jpg";
import Footer from '../../components/admin/Footer';

const Seminars = [
  {
    id: 1,
    title: "Zsdas",
    location: "Learn the latest strategies in SEO, social media, and online advertising in this hands-on workshop.",
    date: "18 June 2025 00:00",
    endTime: "18 June 2025 00:01",
    imageUrl: null,
    totalinvitaion: "12",
    requiredvolunteer: "0"
  },
  {
    id: 2,
    title: "Technology And Innovation",
    location: "Laracon 2024 exceeded all expectations, building on the vibrant atmosphere and engagement of last year’s",
    date: "12 September 2024 14:00",
    endTime: "12 September 2024 19:00",
    imageUrl: null,
    totalinvitaion: "12",
    requiredvolunteer: "0"
  },
  {
    id: 3,
    title: "Education And Learning",
    location: "Learn the latest strategies in SEO, social media, and online advertising in this hands-on workshop.",
    date: "11 September 2024 21:00",
    endTime: "11 September 2024 22:01",
    imageUrl: null,
    totalinvitaion: "12",
    requiredvolunteer: "0"
  },
  {
    id: 4,
    title: "Creative Arts And Media",
    location: "Learn the latest strategies in SEO, social media, and online advertising in this hands-on workshop.",
    date: "11 September 2024 16:00",
    endTime: "11 September 2024 16:46",
    imageUrl: null,
    totalinvitaion: "12",
    requiredvolunteer: "0"
  },
  {
    id: 5,
    title: "Efrrg",
    location: "Learn the latest strategies in SEO, social media, and online advertising in this hands-on workshop.",
    date: "18 June 2025 00:00",
    endTime: "18 June 2025 00:01",
    imageUrl: null,
    totalinvitaion: "12",
    requiredvolunteer: "0"
  },
];

const EventList = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10);

  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-screen-2xl">
      <div className="border border-gray-300 p-5 rounded-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Event List</h1>
          <button className="bg-blue-600 text-white font-semibold px-8 py-2 !rounded-full shadow-xl hover:bg-blue-700">
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
          {Seminars.map((seminar) => (
            <div
              key={seminar.id}
              className="border border-gray-300 rounded-lg p-5 bg-white hover:shadow-lg transition"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-40">
                  <img
                    src={seminar.imageUrl || noImg}
                    alt="Seminar"
                    className="w-full h-40 object-cover rounded"
                  />
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{seminar.title}</h2>

                  <p className="text-sm text-[#DA7821] font-semibold mb-2">
                    <ion-icon name="calendar-outline"></ion-icon> {seminar.date} - {seminar.endTime}
                  </p>

                  <p className="text-sm text-black font-medium mb-2">
                    <ion-icon name="location-outline" className="text-sm text-[#DA7821] mr-1"></ion-icon>
                    {seminar.location.length > 114
                      ? `${seminar.location.slice(0, 114)}...`
                      : seminar.location}
                  </p>

                  <p className="text-sm text-gray-500 font-semibold mb-1">
                    Total Invitations: {seminar.totalinvitaion}
                  </p>

                  <p className="text-sm text-gray-500 font-semibold">
                    Required Volunteers: {seminar.requiredvolunteer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventList;
