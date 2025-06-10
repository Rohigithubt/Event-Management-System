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
          imageUrl: ""
        },
        {
          id: 3,
          name: 'Meera Joshi',
          story: 'Empowered over 500 village women through education and entrepreneurship training.',
          imageUrl: ""
        },
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
          imageUrl: ""
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

      <div className="p-6 ml-29 mt-20 max-w-7xl mx">
        {loading ? (
          <p className="text-center text-gray-500">Loading heroes...</p>
        ) : heros.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No heroes available at the moment.
          </p>
        ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 hover:btn-bg-blue">
  {heros.map((hero) => (
    <div
      key={hero.id}
      className="bg-white border border-gray-300 rounded-lg p-12 flex flex-col h-full transition duration-300 group"
    >
      <div className="flex  pt-0 pb-8">
        <img
          src={hero.imageUrl ? hero.imageUrl : noImg}
          alt={hero.name}
          className="w-25 h-25 object-cover rounded-full mr-4"
        />
        <h2 className="text-xl font-bold mt-8 text-black">{hero.name}</h2>
      </div>
      <div className='flex w-45 h-6 rounded-md mb-7 bg-[#e5f5e5]'>
           <Link to="#" className='flex ml-4'><b>Stories of the heros</b></Link>
      </div>

      <p className="text-gray-700 mb-4">{hero.story}</p>

      <button className="mt-auto px-4 py-2 bg-gray-300 text-black rounded-full hover:bg-blue-600 group-hover:text-black" style={{hover:'background:blue'}}>
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
