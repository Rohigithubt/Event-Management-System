import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditUserProfile, UpdateUserProfile } from '../../redux/slice/userSlice';
import { toast } from 'react-toastify';

const UserProfileSetting = () => {
  const dispatch = useDispatch();
  const { user, loading, error, success } = useSelector((state) => state.user);
  const userId = localStorage.getItem('_id');
  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({
    name: '',
    email: '',
    phoneno: '',
  });

  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    if (userId) {
      dispatch(EditUserProfile(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        phoneno: user.phoneno || '',
      });
      if (user.image) {
        setPreviewImage(`${VITE_API_URL}/${user.image}`);
      }
    }
  }, [user]);
  

  useEffect(() => {
    if (error) toast.error(error);
    if (success) toast.success('Profile updated successfully');
  }, [error, success]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpdate = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (passwords.newPassword && !passwords.oldPassword) {
      toast.error('Please enter your current password to change it');
      return;
    }

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('phoneno', form.phoneno);
    if (selectedImage) {
      formData.append('image', selectedImage);
    }
    if (passwords.newPassword) {
      formData.append('password', passwords.newPassword);
    }

    dispatch(UpdateUserProfile(formData));
  };

  return (
    <div className="p-4 sm:p-6 !space-y-5 ml-5 mt-4 max-w-screen-2xl border border-gray-300 rounded-2xl">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-10">
        <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg -mt-87 ml-10 border w-full md:w-1/4">
          <div className="w-40 h-40 rounded-full border-4 border-gray-300 flex items-center justify-center overflow-hidden">
            {previewImage ? (
              <img 
                src={previewImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0H4.5z" />
              </svg>
            )}
          </div>
          <label className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full cursor-pointer font-bold shadow hover:bg-blue-700 transition">
            Edit Profile Picture
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="w-full md:w-2/3 space-y-6 rounded-lg p-6">
          <h2 className="text-2xl font-bold border-b-2 border-blue-500 inline-block mb-4">Profile Details</h2>

          {['name', 'email', 'phoneno'].map((field) => (
            <div key={field} className="flex flex-col sm:flex-row items-center">
              <label className="sm:w-40 font-bold text-gray-700 capitalize">{field} :</label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                value={form[field] || ''}
                onChange={handleChange}
                className={`flex-1 w-full mt-2 sm:mt-0 ml-0 sm:ml-2 px-4 py-2 border rounded ${field === 'email' ? 'bg-gray-100' : ''}`}
                disabled={field === 'email'}
                placeholder={field}
              />
            </div>
          ))}

          <h2 className="text-xl font-semibold border-b-2 border-blue-500 inline-block text-gray-800 pt-6">Change Password</h2>

          {['oldPassword', 'newPassword', 'confirmPassword'].map((field) => (
            <div key={field} className="flex flex-col sm:flex-row items-center">
              <label className="sm:w-40 font-bold text-gray-700 capitalize">
                {field === 'oldPassword' ? 'Current Password' : field === 'newPassword' ? 'New Password' : 'Confirm Password'} :
              </label>
              <input
                type="password"
                name={field}
                value={passwords[field] || ''}
                onChange={handlePasswordChange}
                className="flex-1 w-full mt-2 sm:mt-0 ml-0 sm:ml-2 px-4 py-2 border rounded"
                placeholder={
                  field === 'oldPassword' ? 'Enter current password' : 
                  field === 'newPassword' ? 'Enter new password' : 
                  'Confirm password'
                }
              />
            </div>
          ))}

          <div className="text-right mt-6">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold shadow hover:bg-blue-700 transition"
            >
              {loading ? 'Updating...' : 'Update Details'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSetting;