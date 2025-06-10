import React, { useState } from 'react';
import bannerImg from '../assets/images/banner-bg.png';
import noImg from '../assets/images/no-image.jpg';
import Footer from '../components/admin/Footer';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeContactus = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: 'success',
      title: 'Message Sent!',
      text: 'We will get back to you soon.',
    });
    toast.success('Your message has been submitted!');
    setForm({ firstName: '', lastName: '', phone: '', email: '', message: '' });
  };

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
      <div className="px-4 sm:px-6 md:px-16 py-10 max-w-6xl mx-auto ml-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 w-2xl">
            <h1 className="text-xl sm:text-xl font-semibold text-[#011638] mb-17">Get In Touch</h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col w-full">
                <label className="font-semibold text-sm text-[#011638] mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Enter Your First Name"
                  required
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="font-semibold text-sm text-[#011638] mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Enter Your Last Name"
                  required
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col w-full">
                <label className="font-semibold text-sm text-[#011638] mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter Your Phone Number"
                  required
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="font-semibold text-sm text-[#011638] mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email Address"
                  required
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label className="font-semibold text-sm text-[#011638] mb-1">Message Here</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Enter Your Message"
                rows="5"
                required
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#006af2] text-white text-lg font-semibold w-full sm:w-48 py-3 rounded-full hover:bg-white hover:text-blue-500 transition"
            >
              Submit
            </button>
          </form>

          <div className="bg-[#f9fef6] p-6 sm:p-8 rounded-lg h-full ml-40">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#011638] mb-6 ml-2">Contact Info</h2>
            <div className="space-y-6 text-[#011638]">
              <div className="flex items-start gap-4">
                <div className="bg-[#c9e7c2] p-3 sm:p-4 rounded-xl flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#011638]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 5h2l3.6 7.59-1.35 2.45C7.16 15.37 7 15.69 7 16a1 1 0 001 1h12v-2H9.42c.06-.17.13-.33.22-.48L10.1 14h7.45c.75 0 1.41-.41 1.75-1.03l3.24-5.88A1 1 0 0022 6H6"></path>
                  </svg>
                </div>
                <span className="text-base sm:text-lg">0293752235</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-[#c9e7c2] p-3 sm:p-4 rounded-xl flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#011638]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M16 12H8m8 0c0 4-4 8-8 8S0 16 0 12s4-8 8-8 8 4 8 8zm0 0H8"></path>
                  </svg>
                </div>
                <span className="text-base sm:text-lg">admin@trueyou.club</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-[#c9e7c2] p-3 sm:p-4 rounded-xl flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#011638]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 4.84 7 13 7 13s7-8.16 7-13c0-3.87-3.13-7-7-7z"></path>
                    <circle cx="12" cy="9" r="2.5"></circle>
                  </svg>
                </div>
                <span className="text-base sm:text-lg">Level 29 Chifley Tower, 2 Chifley Square, Sydney, NSW, Australia 2000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default HomeContactus;