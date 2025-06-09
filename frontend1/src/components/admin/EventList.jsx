import React, { useState } from 'react';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({ name: '', time: '', location: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddEvent = () => {
    if (formData.name && formData.time && formData.location) {
      setEvents([...events, formData]);
      setFormData({ name: '', time: '', location: '' });
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Event</h2>

      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
        <button
          onClick={handleAddEvent}
          className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Event
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Event List</h3>
        {events.length === 0 ? (
          <p className="text-gray-500">No events added yet.</p>
        ) : (
          <ul className="space-y-2">
            {events.map((event, index) => (
              <li
                key={index}
                className="p-4 border rounded bg-gray-50 shadow-sm flex flex-col"
              >
                <span className="font-bold">{event.name}</span>
                <span>🕒 {event.time}</span>
                <span>📍 {event.location}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EventList;
