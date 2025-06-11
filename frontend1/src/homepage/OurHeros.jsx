import React, { useEffect, useState } from 'react';
import Footer from '../components/admin/Footer';
import bannerImg from '../assets/images/banner-bg.png';
import noImg from '../assets/images/no-image.jpg';
import { Link } from 'react-router-dom';

const OurHeros = () => {
  const [heros, setHeros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const backendHeros = [
        {
          id: 1,
          name: 'Dr. Ananya Roy',
          story: 'Led a rural healthcare mission saving thousands of lives with limited resources.',
          imageUrl: '',
        },
        {
          id: 2,
          name: 'Captain Vikram Mehra',
          story: 'Rescued civilians during a natural disaster while risking his own life.',
          imageUrl: ''
        },
        {
          id: 3,
          name: 'Meera Joshi',
          story: 'Empowered over 500 village women through education and entrepreneurship training.',
          imageUrl: ''
        },
        {
          id: 4,
          name: 'Dr. Ananya Roy',
          story: 'Led a rural healthcare mission saving thousands of lives with limited resources.',
          imageUrl: '',
        },
        {
          id: 5,
          name: 'Captain Vikram Mehra',
          story: 'Rescued civilians during a natural disaster while risking his own life.',
          imageUrl: ''
        },
      ];
      setHeros(backendHeros);
      setLoading(false);
    }, 1000);
  }, []);

  return (
        <div className="min-h-screen bg-gray-50 mt-18">
      <div className="relative h-[300px] md:h-[400px] w-full mb-10">
              <img
                src={bannerImg}
                alt="News Banner"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-6 md:px-16">
                <h1
                  className="w-full md:w-1/2 text-[28px] md:text-[40px] font-semibold bg-clip-text text-transparent leading-tight"
                  style={{
                    backgroundImage: `url(${bannerImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'black',
                  }}
                >
                  EMSystem: Empowering you to realize your potential through seamless event experiences.
                </h1>
                <div className="bg-[#e4f3dd] border-[11px] border-[#e4f3dd] border-b-0 rounded-t-[348px] border-t-[14px] h-[290px] mt-27 ml-auto max-w-[310px] overflow-hidden">
                  <img src={noImg} alt="Event Illustration" />
                </div>
              </div>
            </div>

      <div className="max-w-7xl mx-auto mb-16">
        {loading ? (
          <p className="text-center text-gray-500 text-lg sm:text-xl">Loading heroes...</p>
        ) : heros.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No heroes available at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-9">
            {heros.map((hero) => (
              <div
                key={hero.id}
                className="bg-white border border-gray-300 rounded-lg p-6 sm:p-8 flex flex-col h-full transition duration-300 group"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={hero.imageUrl || noImg}
                    alt={hero.name}
                    className="w-20 h-20 object-cover rounded-full mr-4"
                  />
                  <h2 className="text-lg sm:text-xl font-bold text-black">{hero.name}</h2>
                </div>

                <div className="flex items-center w-fit px-3 py-1 rounded-md mb-5 bg-[#e5f5e5]">
                  <Link to="#" className="text-sm sm:text-base font-medium text-black">
                    <b>Stories of the heroes</b>
                  </Link>
                </div>

                <p className="text-gray-700 mb-6 text-sm sm:text-base">{hero.story}</p>

                <button className="mt-auto px-4 py-2 bg-gray-100 text-black rounded-full hover:bg-[#006AF2] hover:text-white transition">
                  Read More
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

export default OurHeros;
