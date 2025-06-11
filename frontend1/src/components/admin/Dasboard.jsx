import React from 'react';

const Dashboard = () => {
  const webinars = [
    { id: 1, title: 'React Basics', date: '2025-06-01' },
    { id: 2, title: 'Advanced Redux', date: '2025-06-10' },
  ];

  const seminars = [
    { id: 1, topic: 'Cybersecurity Trends', date: '2025-06-05' },
    { id: 2, topic: 'AI & Ethics', date: '2025-06-15' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-xl font-bold text-gray-800">Total Users</h2>
          <p className="text-2xl text-blue-600 mt-2">320</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-xl font-bold text-gray-800">Total Webinars</h2>
          <p className="text-2xl text-blue-600 mt-2">12</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-xl font-bold text-gray-800">Total Seminars</h2>
          <p className="text-2xl text-blue-600 mt-2">8</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-xl font-bold text-gray-800">Active Users</h2>
          <p className="text-2xl text-blue-600 mt-2">260</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Upcoming Webinars</h3>
        <ul className="space-y-3">
          {webinars.map((webinar) => (
            <li key={webinar.id} className="flex justify-between border-b pb-2">
              <span>{webinar.title}</span>
              <span className="text-sm text-gray-500">{webinar.date}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Upcoming Webinars</h3>
        <ul className="space-y-3">
          {webinars.map((webinar) => (
            <li key={webinar.id} className="flex justify-between border-b pb-2">
              <span>{webinar.title}</span>
              <span className="text-sm text-gray-500">{webinar.date}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Upcoming Webinars</h3>
        <ul className="space-y-3">
          {webinars.map((webinar) => (
            <li key={webinar.id} className="flex justify-between border-b pb-2">
              <span>{webinar.title}</span>
              <span className="text-sm text-gray-500">{webinar.date}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Upcoming Webinars</h3>
        <ul className="space-y-3">
          {webinars.map((webinar) => (
            <li key={webinar.id} className="flex justify-between border-b pb-2">
              <span>{webinar.title}</span>
              <span className="text-sm text-gray-500">{webinar.date}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Upcoming Webinars</h3>
        <ul className="space-y-3">
          {webinars.map((webinar) => (
            <li key={webinar.id} className="flex justify-between border-b pb-2">
              <span>{webinar.title}</span>
              <span className="text-sm text-gray-500">{webinar.date}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Upcoming Webinars</h3>
        <ul className="space-y-3">
          {webinars.map((webinar) => (
            <li key={webinar.id} className="flex justify-between border-b pb-2">
              <span>{webinar.title}</span>
              <span className="text-sm text-gray-500">{webinar.date}</span>
            </li>
          ))}
        </ul>
      </div>


      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Upcoming Seminars</h3>
        <ul className="space-y-3">
          {seminars.map((seminar) => (
            <li key={seminar.id} className="flex justify-between border-b pb-2">
              <span>{seminar.topic}</span>
              <span className="text-sm text-gray-500">{seminar.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
