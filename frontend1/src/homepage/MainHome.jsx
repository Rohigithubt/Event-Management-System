import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaRegClock, FaUserAlt, FaCalendarAlt } from 'react-icons/fa';
import bannerImg from '../assets/images/banner-bg.png';
import noImg from '../assets/images/no-image.jpg';
import Footer from '../components/admin/Footer';
import AboutUs from './AboutUs';

const MainHome = () => {
  const [seminars, setSeminars] = useState([]);
  const [news, setNews] = useState([]);
  const [heros, setHeros] = useState([]);

  useEffect(() => {
    setSeminars([
      { id: 1, title: 'Tech Trends 2025', location: 'Online', date: 'July 20, 2025', time: '10:00 AM', imageUrl: '' },
      { id: 2, title: 'AI in Healthcare', location: 'Delhi', date: 'August 2, 2025', time: '3:00 PM', imageUrl: '' },
      { id: 3, title: 'Future of Robotics', location: 'Mumbai', date: 'September 10, 2025', time: '1:00 PM', imageUrl: '' },
    ]);
    setNews([
      { id: 1, title: 'Event Platform Launches New UI', createBy: 'Admin', date: 'June 5, 2025', description: 'We have updated the UI to enhance your experience.', imageUrl: '' },
      { id: 2, title: 'Partnership with EduCon 2025', createBy: 'Rohit Jain', date: 'June 7, 2025', description: 'Our team has partnered with EduCon for upcoming seminars.', imageUrl: '' },
      { id: 3, title: 'Event Platform Launches New UI', createBy: 'Admin', date: 'June 5, 2025', description: 'We have updated the UI to enhance your experience.', imageUrl: '' },
      { id: 4, title: 'Partnership with EduCon 2025', createBy: 'Rohit Jain', date: 'June 7, 2025', description: 'Our team has partnered with EduCon for upcoming seminars.', imageUrl: '' },
    ]);
    setHeros([
      { id: 1, name: 'Dr. Ananya Roy', story: 'Led a rural healthcare mission saving thousands of lives with limited resources.', imageUrl: '' },
      { id: 2, name: 'Captain Vikram Mehra', story: 'Rescued civilians during a natural disaster while risking his own life.', imageUrl: '' },
      { id: 3, name: 'Meera Joshi', story: 'Empowered over 500 village women through education and entrepreneurship training.', imageUrl: '' },
      { id: 4, name: 'Ravi Sharma', story: 'Built a sustainable water harvesting system in a drought-prone region.', imageUrl: '' },
      { id: 5, name: 'Sunita Verma', story: 'Started a tech school for underprivileged kids in urban slums.', imageUrl: '' },
      { id: 6, name: 'Major Arvind Singh', story: 'Rescued 200+ people during a border flash flood operation.', imageUrl: '' },
      { id: 7, name: 'Asha Patel', story: 'Transformed her village into an eco-friendly model.', imageUrl: '' },
      { id: 8, name: 'Iqbal Khan', story: 'Organized the largest blood donation drive in the region.', imageUrl: '' },
      { id: 9, name: 'Nina Desai', story: 'Digitized school curriculum for 50 rural schools.', imageUrl: '' },
      { id: 10, name: 'Nina Desai', story: 'Digitized school curriculum for 50 rural schools.', imageUrl: '' },
    ]);
  }, []);

  return (
        <div className="min-h-screen bg-gray-50 mt-18">
      <div className="relative h-[300px] md:h-[400px] w-full mb-10">
        <img src={bannerImg} alt="Education Banner" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-4 md:px-16 py-4 md:py-0">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <h1 className="text-[24px] sm:text-[28px] md:text-[40px] font-semibold leading-tight mb-4 text-black">
              EMSystem: Empowering you to realize your potential through seamless event experiences.
            </h1>
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#006AF2] text-white px-6 py-2 rounded-full hover:bg-white hover:text-[#006AF2] transition">
                See All Seminars
              </button>
              <button className="bg-[#006AF2] text-white px-6 py-2 rounded-full hover:bg-white hover:text-[#006AF2] transition">
                Contact Us Now
              </button>
            </div>
          </div>
          <div className="bg-[#e4f3dd] border-[11px] border-[#e4f3dd] border-b-0 rounded-t-[348px] border-t-[14px] h-[290px] mt-6 md:mt-0 ml-auto max-w-[310px] overflow-hidden">
            <img src={noImg} alt="Event Illustration" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>


      <div className="px-4 md:px-18 mb-16 mt-26">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          <div className="md:border-r border-gray-300 px-3 py-0 h-140">
            <h2 className="text-3xl md:text-4xl font-semibold mb-20 text-[#0a2540] text-center">Upcoming Seminars</h2>
            <div className="space-y-6">
              {seminars.slice(0, 2).map((seminar) => (
                <div key={seminar.id} className="bg-white border border-gray-300 rounded-lg shadow-sm w-full flex flex-col md:flex-row items-center md:items-start p-4">
                  <img src={seminar.imageUrl || noImg} alt={seminar.title} className="w-full md:w-48 h-28 object-cover rounded mb-3 md:mb-0 md:mr-6" />
                  <div className="flex-1 space-y-2 text-center md:text-left">
                    <h2 className="text-md font-bold text-black">{seminar.title}</h2>
                    <p className="text-gray-600 text-sm flex items-center justify-center md:justify-start gap-2">
                      <FaMapMarkerAlt /> {seminar.location}
                    </p>
                    <p className="text-gray-600 text-sm flex items-center justify-center md:justify-start gap-2">
                      <FaCalendarAlt /> {seminar.date}
                    </p>
                    <p className="text-gray-600 text-sm flex items-center justify-center md:justify-start gap-2">
                      <FaRegClock /> {seminar.time}
                    </p>
                  </div>
                  <div className="w-full md:w-auto mt-4 md:mt-0 flex justify-center">
                    <button onClick={() => alert(`Booking ticket for ${seminar.title}`)} className="text-black bg-gray-100 px-5 py-2 rounded-full hover:bg-[#006AF2] hover:text-white transition">
                      Book Seats
                    </button>
                  </div>
                </div>
              ))}
              {seminars.length > 2 && (
                <div className="text-center mt-4">
                  <Link to="/home-seminar" className="text-black bg-gray-200 px-5 py-2 rounded-full hover:bg-[#006AF2] hover:text-white transition">View More</Link>
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#0a2540] text-center mb-20">News & Blogs</h2>
            <div className="space-y-6">
              {news.slice(0, 2).map((item) => (
                <div key={item.id} className="bg-white border border-gray-300 rounded-lg shadow-sm w-full flex flex-col md:flex-row items-center md:items-start p-4">
                  <img src={item.imageUrl || noImg} alt={item.title} className="w-full md:w-48 h-28 object-cover rounded mb-3 md:mb-0 md:mr-6" />
                  <div className="flex-1 space-y-2 text-center md:text-left">
                    <h2 className="text-md font-semibold text-black">{item.title}</h2>
                    <div className="flex justify-center md:justify-start gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1"><FaUserAlt /> {item.createBy}</span>
                      <span className="flex items-center gap-1"><FaCalendarAlt /> {item.date}</span>
                    </div>
                    <p className="text-gray-700 text-sm">{item.description}</p>
                  </div>
                  <div className="w-full md:w-auto mt-4 md:mt-0 flex justify-center">
                    <button className="text-black bg-gray-100 px-5 py-2 rounded-full hover:bg-[#006AF2] hover:text-white transition">
                      Read More
                    </button>
                  </div>
                </div>
              ))}
              {news.length > 2 && (
                <div className="text-center mt-4">
                  <Link to="/home-news" className="text-black bg-gray-200 px-5 py-2 rounded-full hover:bg-[#006AF2] hover:text-white transition">View More</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 mt-20 mb-10">
        <h2 className="text-3xl md:text-5xl font-bold text-[#0a2540] text-center mb-10">Our Heroes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {heros.slice(0, 9).map((hero) => (
            <div key={hero.id} className="bg-white border border-gray-300 rounded-lg p-6 flex flex-col h-full">
              <div className="flex items-center mb-4">
                <img src={hero.imageUrl || noImg} alt={hero.name} className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full mr-4" />
                <h2 className="text-lg font-bold text-black">{hero.name}</h2>
              </div>
              <div className="flex w-fit px-3 py-1 rounded-md mb-3 bg-[#e5f5e5]">
                <Link to="#" className="text-sm font-medium text-green-800">Stories of the heroes</Link>
              </div>
              <p className="text-gray-700 mb-4 text-sm">{hero.story}</p>
              <button className="mt-auto px-4 py-2 bg-gray-100 text-black rounded-full hover:bg-[#006AF2] hover:text-white">
                Read More
              </button>
            </div>
          ))}
        </div>
        {heros.length > 9 && (
          <div className="text-center mt-8">
            <Link to="/our-heros" className="text-black bg-gray-200 px-5 py-2 rounded-full hover:bg-[#006AF2] hover:text-white transition">View More</Link>
          </div>
        )}
      </div>

      <AboutUs />
      <Footer />
    </div>
  );
};

export default MainHome;
