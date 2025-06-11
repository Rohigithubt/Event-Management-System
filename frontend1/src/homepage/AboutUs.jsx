import React from 'react';
import noImg from '../assets/images/no-image.jpg';

const AboutUs = () => {
    return (
        <div className="min-h-screen px-4 sm:px-6 md:px-16 py-12 bg-gray-50">
            <h1 className="text-3xl md:text-4xl font-bold text-left text-[#0a2540] mt-30 mb-10">About Us</h1>

            <p className="text-md text-gray-700 text-left mx-auto mb-16">
                At EMSystem, our mission is grounded in a strong belief in the limitless potential within every individual. We are committed to empowering people from all backgrounds to explore their abilities, pursue their aspirations, and achieve meaningful personal and professional growth.

                EMSystem was created with the understanding that many face challenges that hinder their development—be it limited access, lack of support, or systemic barriers. Our goal is to eliminate these obstacles by providing inclusive opportunities, intuitive event experiences, and the tools needed to learn, connect, and grow through every seminar, workshop, or gathering.
            </p>

            <div className="flex flex-col md:flex-row items-center mb-60 mt-50 gap-10">
                <div className="w-full md:w-60 md:ml-20">
                    <img
                        src={noImg}
                        alt="Mission"
                        className="w-full h-auto rounded-lg shadow-md"
                    />
                </div>
                <div className="w-full md:w-200 md:ml-80">
                    <h2 className="text-2xl md:text-4xl font-bold text-[#0a2540] mb-4">EMSystem-pursue your dreams</h2>
                    <p className="text-gray-700 text-md md:text-lg">
                        We firmly believe that every dream—no matter how big or small—deserves the chance to flourish. EMSystem acts as a catalyst for transformation, offering a diverse range of programs, events, and mentorship opportunities tailored to ignite passion and empower individuals to take bold strides toward their goals. With personalized support and thoughtful guidance, we help people build the skills, mindset, and resilience required to overcome obstacles and realize their full potential.

                        At EMSystem, we recognize that true growth isn't just personal—it's communal. Fulfilling one’s potential means becoming a force for good in the lives of others and the communities around us. That’s why we foster a spirit of collaboration, where people from all walks of life come together to share experiences, wisdom, and support. By nurturing this dynamic ecosystem, we amplify every individual's journey and create lasting, positive impact across society.
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center mb-16 gap-10">
                <div className="w-full md:w-1/2 order-2 md:order-1">
                    <p className="text-gray-700 text-md md:text-lg">
                        We are driven by a vision of a world where every individual is empowered to explore their passions, unlock their creativity, and contribute meaningfully to society. At EMSystem, our journey is guided by purpose and a steadfast commitment to building an inclusive, equitable, and uplifting environment for all. We celebrate the diverse talents, backgrounds, and dreams of those we serve—because we believe that true potential knows no boundaries.

                        Together, let’s embark on a transformative journey of self-discovery, growth, and empowerment. Join us in shaping a future where aspirations are nurtured, abilities are unleashed, and individuals are inspired to leave a lasting impact on the world.
                    </p>
                </div>
                <div className="w-full md:w-60 order-1 md:order-2">
                    <img
                        src={noImg}
                        alt="Innovation"
                        className="w-full h-auto rounded-lg shadow-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
