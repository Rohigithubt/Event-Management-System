import React, { useEffect, useState } from 'react';

const ProfileDetails = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  // Simulate API call for profile fetch
  useEffect(() => {
    // Replace this with actual API call
    const fetchProfile = async () => {
      const data = {
        firstName: 'Super',
        lastName: 'Admin',
        email: 'dev@gmail.com',
        phone: '',
      };
      setForm(data);
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    console.log('Submit to API:', form);
    // Use fetch or axios to submit `form` to backend
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-6xl mx-auto mt-6">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-10">
        {/* Avatar */}
        <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg border w-full md:w-1/3">
          <div className="w-40 h-40 rounded-full border-4 border-gray-300 flex items-center justify-center">
            <svg
              className="w-20 h-20 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0H4.5z"
              />
            </svg>
          </div>
          <button className="mt-6 bg-blue-600 text-black font-bold px-5 py-2 rounded-full shadow hover:bg-blue-700 transition">
            Edit Profile Picture
          </button>
        </div>

        {/* Profile Details Form */}
        <div className="w-full md:w-2/3 space-y-4 border rounded-lg p-6">
          <h2 className="text-2xl font-semibold border-b-2 border-blue-500 inline-block mb-4">
            Profile Details
          </h2>

          {[
            { label: 'First Name', name: 'firstName' },
            { label: 'Last Name', name: 'lastName' },
            { label: 'Email', name: 'email' },
            { label: 'Phone Number', name: 'phone' },
          ].map(({ label, name }) => (
            <div key={name} className="flex flex-col sm:flex-row items-center">
              <label className="sm:w-40 font-medium text-gray-700">{label} :</label>
              <input
                type={name === 'email' ? 'email' : 'text'}
                name={name}
                value={form[name]}
                onChange={handleChange}
                className={`flex-1 w-full mt-2 sm:mt-0 ml-0 sm:ml-2 px-4 py-2 border rounded ${
                  name === 'email' ? 'bg-gray-100' : ''
                }`}
                disabled={name === 'email'}
                placeholder={label}
              />
            </div>
          ))}

          <div className="text-right mt-6">
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-black px-6 py-2 rounded-full font-bold shadow hover:bg-blue-700 transition"
            >
              Update Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
