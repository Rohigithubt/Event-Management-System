import React, { useEffect, useState } from 'react';
import bannerImg from '../assets/images/banner-bg.png';
import noImg from '../assets/images/no-image.jpg';
import Footer from '../components/admin/Footer';

const Education = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const backendeducation = [
        {
          id: 1,
          title: 'Innovations in Renewable Energy',
          imageUrl: '',
          createBy: 'Rohit Jain',
          date: '2025-08-12',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        },
        {
          id: 2,
          title: 'AI-Powered Healthcare',
          imageUrl: '',
          createBy: 'Prafull Jain',
          date: '2025-08-20',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        },
        {
          id: 3,
          title: 'Smart City Revolution',
          imageUrl: '',
          createBy: 'Millind Jain',
          date: '2025-08-22',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        },
        {
          id: 4,
          title: 'Green Transportation',
          imageUrl: '',
          createBy: 'Harsh Jain',
          date: '2025-08-25',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        },
      ];
      setEducation(backendeducation);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 mt-18">
      <div className="relative h-[300px] md:h-[400px] w-full mb-10">
        <img
          src={bannerImg}
          alt="Education Banner"
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

      <div className="p-6 max-w-7xl mx-auto mt-25">
        {loading ? (
          <p className="text-center text-gray-500">Loading Education...</p>
        ) : education.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No Education content available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {education.map((edu) => (
              <div key={edu.id} className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm flex flex-col">
                <div className="w-full h-60 overflow-hidden">
                  <img
                    src={edu.imageUrl ? edu.imageUrl : noImg}
                    alt={edu.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <h2 className="text-xl font-semibold text-black mb-2">{edu.title}</h2>

                  <div className="flex justify-items-start gap-4 items-center text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                               <ion-icon name="person-outline"></ion-icon>

                      <span><b>{edu.createBy}</b></span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ion-icon name="calendar-outline"></ion-icon>
                      <span><b>{edu.date}</b></span>
                    </div>
                  </div>

                  <p className="text-gray-700 text-md flex-grow">{edu.description}</p>

                  <button className="mt-4 justify-center  bg-[#006af2]-300 text-black rounded-full hover:bg-blue-600 hover:text-black transition">
                    Read More
                  </button>
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

export default Education;
