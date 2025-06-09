import React, { useState } from 'react';

const Seminar = () => {
  const [seminars, setSeminars] = useState([
    { id: 1, topic: 'AI in Education', date: '2025-06-15', location: 'Delhi' },
    { id: 2, topic: 'Cybersecurity Trends', date: '2025-07-01', location: 'Mumbai' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newTopic, setNewTopic] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newLocation, setNewLocation] = useState('');

  const handleAddSeminar = () => {
    if (!newTopic || !newDate || !newLocation) return;

    const newSeminar = {
      id: Date.now(),
      topic: newTopic,
      date: newDate,
      location: newLocation,
    };

    setSeminars((prev) => [...prev, newSeminar]);
    setNewTopic('');
    setNewDate('');
    setNewLocation('');
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-base font-bold">Seminar List</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-black px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : 'Add Seminar'}
        </button>
      </div>

      {showForm && (
        <div className="mb-4 bg-gray-100 p-4 rounded-lg space-y-3">
          <input
            type="text"
            placeholder="Seminar Topic"
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Location"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
          <button
            onClick={handleAddSeminar}
            className="bg-green-600 text-black px-4 py-2 rounded-md hover:bg-green-700"
          >
            Add Seminar
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl shadow p-4 space-y-4">
        {seminars.length === 0 ? (
          <p className="text-gray-500">No seminars available.</p>
        ) : (
          seminars.map((seminar) => (
            <div
              key={seminar.id}
              className="border border-gray-200 rounded-md p-4 hover:shadow"
            >
              <h2 className="text-lg font-semibold">{seminar.topic}</h2>
              <p className="text-sm text-gray-600">📍 {seminar.location}</p>
              <p className="text-sm text-gray-500">📅 {seminar.date}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Seminar;
