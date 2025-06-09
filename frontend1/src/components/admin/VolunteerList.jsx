import React, { useState } from 'react';

const VolunteerList = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const toggleForm = () => setShowForm(!showForm);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone) {
      setVolunteers([...volunteers, formData]);
      setFormData({ name: '', email: '', phone: '' });
      setShowForm(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Volunteer List</h2>
        <button
          onClick={toggleForm}
          className="bg-blue-600 text-black font-bold px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? 'Close' : 'Add Volunteer'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-black px-4 py-2 rounded hover:bg-green-700"
          >
            Save Volunteer
          </button>
        </form>
      )}

      <div>
        {volunteers.length === 0 ? (
          <p className="text-gray-500">No volunteers added yet.</p>
        ) : (
          <ul className="space-y-4">
            {volunteers.map((volunteer, index) => (
              <li
                key={index}
                className="p-4 border bg-gray-50 rounded shadow-sm"
              >
                <p className="font-bold">{volunteer.name}</p>
                <p>{volunteer.email}</p>
                <p>{volunteer.phone}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default VolunteerList;
