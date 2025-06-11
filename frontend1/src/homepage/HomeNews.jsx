import React, { useEffect, useState } from 'react';
import bannerImg from '../assets/images/banner-bg.png';
import noImg from '../assets/images/no-image.jpg';
import Footer from '../components/admin/Footer';

const HomeNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const backendnews = [
        {
          id: 1,
          title: 'India Launches Ambitious Moon Mission',
          imageUrl: '',
          createBy: 'Anjali Mehta',
          date: '2025-09-01',
          description: 'The Indian Space Research Organisation (ISRO) has successfully launched its next lunar mission, aiming for a soft landing near the moon’s south pole.',
        },
        {
          id: 2,
          title: 'Global Markets Rally Amid Economic Optimism',
          imageUrl: '',
          createBy: 'Rajeev Khanna',
          date: '2025-09-03',
          description: 'Stock markets across the world saw a significant boost as investors welcomed positive economic indicators and central bank signals.',
        },
        {
          id: 3,
          title: 'Breakthrough in Alzheimer’s Research',
          imageUrl: '',
          createBy: 'Dr. Kavita Rao',
          date: '2025-09-04',
          description: 'Researchers have discovered a potential treatment that could slow the progression of Alzheimer’s disease, offering hope to millions.',
        },
        {
          id: 4,
          title: 'Massive Floods Hit Northern India',
          imageUrl: '',
          createBy: 'Saurabh Thakur',
          date: '2025-09-05',
          description: 'Heavy monsoon rains have led to severe flooding across several northern states, displacing thousands and damaging infrastructure.',
        },
        {
          id: 5,
          title: 'Tech Giants Face New Data Privacy Laws',
          imageUrl: '',
          createBy: 'Ritika Desai',
          date: '2025-09-06',
          description: 'A new bill passed in parliament will tighten data privacy regulations for tech companies operating in India.',
        },
        {
          id: 6,
          title: 'Major Sporting Event Announced for 2026',
          imageUrl: '',
          createBy: 'Vikram Singh',
          date: '2025-09-07',
          description: 'The Indian government has confirmed that it will host a major international multi-sport event in 2026, boosting sports infrastructure.',
        },
        {
          id: 7,
          title: 'Scientists Warn of Record-Breaking Heatwave',
          imageUrl: '',
          createBy: 'Nisha Goyal',
          date: '2025-09-08',
          description: 'Climate scientists have issued a warning for an unprecedented heatwave expected to hit parts of South Asia this summer.',
        }
      ];
      setNews(backendnews);
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

      <div className="p-6 max-w-7xl mx-auto mt-25">
        {loading ? (
          <p className="text-center text-gray-500">Loading News...</p>
        ) : news.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No NEWS available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((data) => (
              <div key={data.id} className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm flex flex-col">
                <div className="w-full h-60 overflow-hidden">
                  <img
                    src={data.imageUrl ? data.imageUrl : noImg}
                    alt={data.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <h2 className="text-xl font-semibold text-black mb-2">{data.title}</h2>

                  <div className="flex justify-items-start gap-4 items-center text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <ion-icon name="person-outline"></ion-icon>
                      <span><b>{data.createBy}</b></span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ion-icon name="calendar-outline"></ion-icon>                      <span><b>{data.date}</b></span>
                    </div>
                  </div>

                  <p className="text-gray-700 text-md flex-grow">{data.description}</p>

                  <button className="mt-4 justify-center  bg-gray-100 text-black rounded-full hover:bg-[#006AF2] hover:text-white transition">
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

export default HomeNews;
