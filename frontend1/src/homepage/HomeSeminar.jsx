import React, { useEffect, useState } from 'react';
import Footer from '../components/admin/Footer';
import img from '../assets/images/image.png'; 

const HomeSeminar = () => {
  const [seminars, setSeminars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const mockSeminars = [
        {
          id: 1,
          title: 'Future of Quantum Tech',
          imageUrl: '/assets/images/quantum.jpg',
          location: 'Delhi Convention Center',
          date: '2025-07-20',
          time: '10:00 AM - 1:00 PM',
        },
        {
          id: 2,
          title: 'Cybersecurity in AI',
          imageUrl: '/assets/images/cyber.jpg',
          location: 'Bangalore Expo Hall',
          date: '2025-07-25',
          time: '2:00 PM - 5:00 PM',
        },
      ];

      setSeminars(mockSeminars);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen ml-0 bg-gray-50 mt-14">
      <div className="relative h-[300px] md:h-[400px] w-full mb-10">
        <img
          src={img}
          alt="Seminar Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h1
            className="text-[40px] md:text-[60px] font-extrabold bg-clip-text  text-center leading-tight"
          >
            Explore Upcoming Seminars & Secure Your Spot!
          </h1>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading seminars...</p>
        ) : seminars.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            Stay tuned! Exciting seminars will be announced soon.
          </p>
        ) : (
          <div className="space-y-6 max-w-5xl mx-auto">
            {seminars.map((seminar) => (
              <div
                key={seminar.id}
                className="bg-white shadow-md rounded-lg flex flex-col md:flex-row items-center md:items-start p-4"
              >
                <img
                  src={seminar.imageUrl}
                  alt={seminar.title}
                  className="w-full md:w-48 h-40 object-cover rounded mb-4 md:mb-0 md:mr-6"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-blue-700">{seminar.title}</h2>
                  <p className="text-gray-600">📍 {seminar.location}</p>
                  <p className="text-gray-600">🕒 {seminar.date} | {seminar.time}</p>
                </div>
                <button
                  onClick={() => alert(`Booking ticket for ${seminar.title}`)}
                  className="mt-4 md:mt-0 md:ml-6 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
                >
                  Book Ticket
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default HomeSeminar;
