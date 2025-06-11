import React, { useEffect, useState } from 'react';
import Footer from '../components/admin/Footer';
import bannerImg from '../assets/images/banner-bg.png';
import noImg from '../assets/images/no-image.jpg'
const HomeSeminar = () => {
  const [seminars, setSeminars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const backendSeminars = [
        {
          id: 1,
          title: 'Innovations in Renewable Energy',
          imageUrl: '/assets/images/seminar1.jpg',
          location: 'GreenTech Hall, Mumbai',
          date: '2025-08-12',
          time: '9:00 AM - 12:00 PM',
        },
        {
          id: 2,
          title: 'AI-Powered Healthcare',
          imageUrl: '/assets/images/seminar2.jpg',
          location: 'MedTech Auditorium, Pune',
          date: '2025-08-20',
          time: '11:00 AM - 2:00 PM',
        },
      ];
      setSeminars(backendSeminars);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 mt-18">
      <div className="relative h-[300px] md:h-[400px] w-full mb-10">
        <img
          src={bannerImg}
          alt="Seminar Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-6 md:px-16">
          <h1
            className="w-full md:w-1/2 text-[28px] md:text-[40px] font-semibold bg-clip-text text-transparent leading-tight"
            style={{
              backgroundImage: `url(${bannerImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: 'black'
            }}
          >
            EMSystem: Empowering you to realize your potential through seamless event experiences.
          </h1>

          <div className="bg-[#e4f3dd] border-[11px] border-[#e4f3dd] border-b-0 rounded-t-[348px] border-t-[14px] h-[290px] mt-27 ml-auto max-w-[310px] overflow-hidden">
            <img
              src={noImg}
              alt="Event Illustration"
            />
          </div>

        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-500">Loading seminars...</p>
        ) : seminars.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No seminars available at the moment.
          </p>
        ) : (
          <div className="space-y-6">
            {seminars.map((seminar) => (
              <div
                key={seminar.id}
                className="bg-white border border-gray-300 rounded-lg flex flex-col md:flex-row items-center md:items-start p-4"
              >
                <div className="flex flex-col md:flex-row md:items-center w-full">
                  <img
                    src={seminar.imageUrl}
                    alt={seminar.title}
                    className="w-full md:w-48 h-40 object-cover rounded mb-4 md:mb-0 md:mr-6"
                  />
                  <div className="flex-1 space-y-1">
                    <h2 className="text-xl font-bold text-black-700">{seminar.title}</h2>
                    <p className="text-gray-600">📍 {seminar.location}</p>
                    <p className="text-gray-600">🗓 {seminar.date}</p>
                    <p className="text-gray-600">🕒 {seminar.time}</p>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-auto">
                    <button
                      onClick={() => alert(`Booking ticket for ${seminar.title}`)}
                      className="text-black bg-gray-100 px-5 py-2 rounded-full hover:bg-[#006AF2] hover:text-white transition"
                    >
                      Book Seats
                    </button>
                  </div>
                </div>
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
