import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoginUser } from '../redux/slice/userSlice'; 

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(LoginUser(form));
      if (LoginUser.fulfilled.match(resultAction)) {
        navigate('/'); 
      } else {
        console.error('Login failed:', resultAction.payload);
      }
    } catch (err) {
      console.error('Error during login:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl h-full max-h-2xl border-1">
          <h2 className='text-center mt-6 text-2xl font-bold mb-4'>EMSystem</h2>
          <h2 className='text-center text-3xl font-bold mb-20 mt-12'>Welcome Back!</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Email</label>
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
              <label className="block mb-1">Password</label>
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
              style={{ background: '#006AF2' }}
              className="w-full text-white font-bold py-2 mt-7 m-4 ml-0 rounded hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-4">
        <img
          src="https://trueyouclub.hipl-staging3.com/images/login-screen.svg"
          alt="Login"
          className="w-full h-auto object-contain max-h-[90vh]"
        />
      </div>
    </div>
  );
};

export default Login;
