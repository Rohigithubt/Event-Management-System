import React, { useState } from 'react';

const Webinar = () => {
  const [webinars, setWebinars] = useState([
    { id: 1, title: 'React Basics', date: '2025-06-01' },
    { id: 2, title: 'Advanced Redux', date: '2025-06-10' },
    { id: 3, title: 'Next.js Deep Dive', date: '2025-06-20' },
    { id: 4, title: 'Tailwind Tips', date: '2025-05-30' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');

  const today = new Date();

  const isExpired = (dateString) => {
    const webinarDate = new Date(dateString);
    return webinarDate < today;
  };

  const handleAddWebinar = () => {
    if (!newTitle || !newDate) return;

    const newWebinar = {
      id: webinars.length + 1,
      title: newTitle,
      date: newDate,
    };

    setWebinars([...webinars, newWebinar]);
    setNewTitle('');
    setNewDate('');
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Webinar List</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-black px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : 'Add Webinar'}
        </button>
      </div>

      {showForm && (
        <div className="mb-4 bg-gray-100 p-4 rounded-lg space-y-2">
          <input
            type="text"
            placeholder="Webinar Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
          <button
            onClick={handleAddWebinar}
            className="bg-green-600 text-black px-4 py-2 rounded-md hover:bg-green-700"
          >
            Add
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl shadow p-4 space-y-4">
        {webinars.map((webinar) => {
          const expired = isExpired(webinar.date);
          return (
            <div
              key={webinar.id}
              className={`flex justify-between items-center p-3 rounded-lg ${
                expired ? 'bg-red-50' : 'bg-green-50'
              }`}
            >
              <div>
                <h2 className="text-lg font-semibold">{webinar.title}</h2>
                <p
                  className={`text-sm ${
                    expired ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {expired ? 'Expired' : 'Upcoming'} on {webinar.date}
                </p>
              </div>
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  expired
                    ? 'bg-red-200 text-red-800'
                    : 'bg-green-200 text-green-800'
                }`}
              >
                {expired ? 'Expired' : 'Upcoming'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Webinar;
