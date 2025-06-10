import React, { useEffect, useState } from 'react';
import bannerImg from '../assets/images/banner-bg.png';
import noImg from '../assets/images/no-image.jpg';
import Footer from '../components/admin/Footer';

const MainHome = () => {
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
         </div>
  )
}

export default MainHome
