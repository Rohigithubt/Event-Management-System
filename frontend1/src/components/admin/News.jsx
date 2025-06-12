import React, { useState } from "react";
import noImg from "../../assets/images/no-image.jpg";
import Footer from "../../components/admin/Footer";

const News = () => {
  const newsList = [
    {
      id: 1,
      title: "Two-day Seminar On Higher Education Commences On Monday",
      date: "18 June 2025 00:00",
      content:
        "With an aim to improve the national and international rankings of Gujarat’s higher education institutes, a two-day seminar held by the state education department will commence Monday at Tent City, Statue of Unity in Kevadia, Narmada. “About 250 dignitaries, including vice-chancellors, registrars and IQAC (Internal Quality Assurance Cell) coordinator of the government, private and sectoral universities of the state will be present at the two-day seminar,” an official statement said.",
      imageUrl: null,
    },
    {
      id: 2,
      title: "Zsdas",
      date: "18 June 2025 00:00",
      content:
        "With an aim to improve the national and international rankings of Gujarat’s higher education institutes, a two-day seminar held by the state education department will commence Monday at Tent City, Statue of Unity in Kevadia, Narmada. “About 250 dignitaries, including vice-chancellors, registrars and IQAC (Internal Quality Assurance Cell) coordinator of the government, private and sectoral universities of the state will be present at the two-day seminar,” an official statement said.",
      imageUrl: null,
    },
  ];

  const [itemsPerPage, setItemsPerPage] = useState(10);

  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-screen-2xl">
      <div className="border border-gray-300 p-5 rounded-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">News List</h1>
          <button className="bg-blue-600 text-white font-semibold px-8 py-2 rounded-full shadow-xl hover:bg-blue-700">
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
          {newsList.map((news) => (
            <div
              key={news.id}
              className="border border-gray-300 rounded-lg p-7 bg-white transition"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <img
                  src={news.imageUrl || noImg}
                  alt="News"
                  className="w-full md:w-42 h-42 object-cover rounded"
                />
                <div className="flex-1">
                  <h2 className="!text-base text-[#0A2540] font-bold">
                    {news.title}
                  </h2>
                 
                  <p className="text-sm font-semibold text-gray-700 mb-4">
                    {news.content.length > 105
                      ? `${news.content.slice(0, 105)}...`
                      : news.content}
                  </p>

                   <p className="text-sm text-[#DA7821] font-medium mb-2">
                    <ion-icon name="calendar-outline"></ion-icon> 
                     { news.date}
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

export default News;
