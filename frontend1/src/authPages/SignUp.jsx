import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RegisterUser } from "../redux/slice/userSlice" 

const SignUp = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const resultAction = await dispatch(RegisterUser(form));
    if (RegisterUser.fulfilled.match(resultAction)) {
      navigate('/login');
    } else {
      console.error('Signup Failed:', resultAction.payload);
    }
  } catch (error) {
    console.error('Error during signup:', error);
  }
};


  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl h-full max-h-2xl border-1">
          <h2 className='text-center mt-6 text-2xl font-bold mb-4'>EMSystem</h2>
          <h2 className='text-center text-3xl font-bold mb-10 mt-8'>Create your account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 mt-7 m-4 ml-0 rounded hover:bg-blue-700 transition"
              style={{ background: '#006AF2' }}
            >
              Register
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-4">
        <img
          src="https://trueyouclub.hipl-staging3.com/images/login-screen.svg"
          alt="Signup"
          className="w-full h-auto object-contain max-h-[90vh]"
        />
      </div>
    </div>
  );
};

export default SignUp;
