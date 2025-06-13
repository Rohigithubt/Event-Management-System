import React from 'react';
import Footer from './Footer';

const Dashboard = () => {
  const users = [
    { id: '1', name: 'Rohit Jain', registerd: true, status: 'Active', VIPmember: true },
    { id: '2', name: 'Millind Jain', registerd: false, status: 'Inactive', VIPmember: false },
    { id: '3', name: 'Harsh Jain', registerd: true, status: 'Active', VIPmember: true },
    { id: '4', name: 'Prafull Jain', registerd: true, status: 'Inactive', VIPmember: true },
  ];

  const webinars = [
    { id: 'w1', title: 'React Basics', date: '2025-06-20' },
    { id: 'w2', title: 'Advanced Tailwind', date: '2025-06-25' },
  ];

  const seminars = [
    { id: 's1', topic: 'AI in Education', date: '2025-07-01' },
    { id: 's2', topic: 'Cybersecurity Trends', date: '2025-07-05' },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-screen-2xl mx-auto">
      <div className="border border-gray-100 rounded-lg p-4 sm:p-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div className="bg-[#FCF6E4] shadow rounded-xl p-4 flex items-center space-x-4">
            <div className="bg-white rounded-lg p-3">
              <div className="overview-icon-box">
                <svg width="32" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.4" d="M9 2C6.38 2 4.25 4.13 4.25 6.75C4.25 9.32 6.26 11.4 8.88 11.49C8.96 11.48 9.04 11.48 9.1 11.49C9.12 11.49 9.13 11.49 9.15 11.49C9.16 11.49 9.16 11.49 9.17 11.49C11.73 11.4 13.74 9.32 13.75 6.75C13.75 4.13 11.62 2 9 2Z" fill="#FFD75F" />
                  <path d="M14.0809 14.1499C11.2909 12.2899 6.74094 12.2899 3.93094 14.1499C2.66094 14.9999 1.96094 16.1499 1.96094 17.3799C1.96094 18.6099 2.66094 19.7499 3.92094 20.5899C5.32094 21.5299 7.16094 21.9999 9.00094 21.9999C10.8409 21.9999 12.6809 21.5299 14.0809 20.5899C15.3409 19.7399 16.0409 18.5999 16.0409 17.3599C16.0309 16.1299 15.3409 14.9899 14.0809 14.1499Z" fill="#FFD75F" />
                  <path opacity="0.4" d="M19.9894 7.3401C20.1494 9.2801 18.7694 10.9801 16.8594 11.2101C16.8494 11.2101 16.8494 11.2101 16.8394 11.2101H16.8094C16.7494 11.2101 16.6894 11.2101 16.6394 11.2301C15.6694 11.2801 14.7794 10.9701 14.1094 10.4001C15.1394 9.4801 15.7294 8.1001 15.6094 6.6001C15.5394 5.7901 15.2594 5.0501 14.8394 4.4201C15.2194 4.2301 15.6594 4.1101 16.1094 4.0701C18.0694 3.9001 19.8194 5.3601 19.9894 7.3401Z" fill="#FFD75F" />
                  <path d="M21.9902 16.5899C21.9102 17.5599 21.2902 18.3999 20.2502 18.9699C19.2502 19.5199 17.9902 19.7799 16.7402 19.7499C17.4602 19.0999 17.8802 18.2899 17.9602 17.4299C18.0602 16.1899 17.4702 14.9999 16.2902 14.0499C15.6202 13.5199 14.8402 13.0999 13.9902 12.7899C16.2002 12.1499 18.9802 12.5799 20.6902 13.9599C21.6102 14.6999 22.0802 15.6299 21.9902 16.5899Z" fill="#FFD75F" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-700">Registered users</h3>
              <p className="text-lg font-bold text-blue-600">{users.filter((prev) => prev.registerd === true).length}</p>
            </div>
          </div>

          <div className="bg-[#EEEFFF] shadow rounded-xl p-4 flex items-center space-x-4">
            <div className="bg-white rounded-lg p-3">
              <div className="overview-icon-box">
                <svg width="32" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.4" d="M17.5291 7.77C17.4591 7.76 17.3891 7.76 17.3191 7.77C15.7691 7.72 14.5391 6.45 14.5391 4.89C14.5391 3.3 15.8291 2 17.4291 2C19.0191 2 20.3191 3.29 20.3191 4.89C20.3091 6.45 19.0791 7.72 17.5291 7.77Z" fill="#BEC2FF" />
                  <path opacity="0.4" d="M20.7896 14.6999C19.6696 15.4499 18.0996 15.7299 16.6496 15.5399C17.0296 14.7199 17.2296 13.8099 17.2396 12.8499C17.2396 11.8499 17.0196 10.8999 16.5996 10.0699C18.0796 9.86993 19.6496 10.1499 20.7796 10.8999C22.3596 11.9399 22.3596 13.6499 20.7896 14.6999Z" fill="#BEC2FF" />
                  <path opacity="0.4" d="M6.44039 7.77C6.51039 7.76 6.58039 7.76 6.65039 7.77C8.20039 7.72 9.43039 6.45 9.43039 4.89C9.43039 3.3 8.14039 2 6.54039 2C4.95039 2 3.65039 3.29 3.65039 4.89C3.66039 6.45 4.89039 7.72 6.44039 7.77Z" fill="#BEC2FF" />
                  <path opacity="0.4" d="M6.54914 12.8501C6.54914 13.8201 6.75914 14.7401 7.13914 15.5701C5.72914 15.7201 4.25914 15.4201 3.17914 14.7101C1.59914 13.6601 1.59914 11.9501 3.17914 10.9001C4.24914 10.1801 5.75914 9.8901 7.17914 10.0501C6.76914 10.8901 6.54914 11.8401 6.54914 12.8501Z" fill="#BEC2FF" />
                  <path d="M12.1208 15.87C12.0408 15.86 11.9508 15.86 11.8608 15.87C10.0208 15.81 8.55078 14.3 8.55078 12.44C8.55078 10.54 10.0808 9 11.9908 9C13.8908 9 15.4308 10.54 15.4308 12.44C15.4308 14.3 13.9708 15.81 12.1208 15.87Z" fill="#BEC2FF" />
                  <path d="M8.87078 17.9399C7.36078 18.9499 7.36078 20.6099 8.87078 21.6099C10.5908 22.7599 13.4108 22.7599 15.1308 21.6099C16.6408 20.5999 16.6408 18.9399 15.1308 17.9399C13.4208 16.7899 10.6008 16.7899 8.87078 17.9399Z" fill="#BEC2FF" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-700">Number of Active Users</h3>
              <p className="text-lg font-bold text-blue-600">{users.filter((prev) => prev.status === "Active").length}</p>
            </div>
          </div>

          <div className="bg-[#FFEEEF] shadow rounded-xl p-4 flex items-center space-x-4">
            <div className="bg-white rounded-lg p-3">
              <div className="overview-icon-box">
                <svg width="32" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.4" d="M16.7702 18.98H7.23024C6.81024 18.98 6.43024 18.71 6.29024 18.32L2.13024 6.67004C1.80024 5.74004 2.86024 4.95004 3.65024 5.52004L7.65024 8.38004C8.18024 8.76004 8.94024 8.53004 9.17024 7.92004L11.0602 2.88004C11.3802 2.01004 12.6102 2.01004 12.9302 2.88004L14.8202 7.92004C15.0502 8.54004 15.8002 8.76004 16.3402 8.38004L20.3402 5.52004C21.1402 4.95004 22.1902 5.75004 21.8602 6.67004L17.7002 18.32C17.5702 18.71 17.1902 18.98 16.7702 18.98Z" fill="#FF9EA4" />
                  <path d="M17 22H7C6.59 22 6.25 21.66 6.25 21.25C6.25 20.84 6.59 20.5 7 20.5H17C17.41 20.5 17.75 20.84 17.75 21.25C17.75 21.66 17.41 22 17 22Z" fill="#FF9EA4" />
                  <path d="M14.5 14.75H9.5C9.09 14.75 8.75 14.41 8.75 14C8.75 13.59 9.09 13.25 9.5 13.25H14.5C14.91 13.25 15.25 13.59 15.25 14C15.25 14.41 14.91 14.75 14.5 14.75Z" fill="#FF9EA4" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-700">VIP Board Members</h3>
              <p className="text-lg font-bold text-blue-600">
                {users.filter((prev) => prev.VIPmember === true).length}
              </p>
            </div>
          </div>

          <div className="bg-[#E6FAFE] shadow rounded-xl p-4 flex items-center space-x-4">
            <div className="bg-white rounded-lg p-3">
              <div className="overview-icon-box">
                <svg width="32" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.4" d="M22.0009 9.20986V14.7899C22.0009 18.8899 20.7509 20.1399 16.6509 20.1399H9.91094V17.1199C9.91094 16.7399 9.59094 16.4199 9.21094 16.4199V7.57986C9.59094 7.57986 9.91094 7.25986 9.91094 6.87986V3.85986H16.6509C20.7509 3.85986 22.0009 5.10986 22.0009 9.20986Z" fill="#97E3FD" />
                  <path d="M18.4692 11.9001C18.6392 11.7401 18.6992 11.4901 18.6292 11.2701C18.5592 11.0401 18.3692 10.8801 18.1292 10.8501L16.8492 10.6601C16.7992 10.6501 16.7592 10.6201 16.7392 10.5801L16.1692 9.42008C16.0692 9.21008 15.8492 9.08008 15.6192 9.08008C15.3792 9.08008 15.1692 9.21008 15.0592 9.42008L14.4892 10.5801C14.4692 10.6301 14.4192 10.6601 14.3692 10.6601L13.0892 10.8501C12.8592 10.8801 12.6592 11.0501 12.5892 11.2701C12.5192 11.5001 12.5792 11.7401 12.7492 11.9001L13.6792 12.8001C13.7192 12.8301 13.7292 12.8901 13.7192 12.9401L13.4992 14.2101C13.4592 14.4401 13.5492 14.6801 13.7492 14.8101C13.8592 14.8901 13.9792 14.9301 14.1092 14.9301C14.2092 14.9301 14.3092 14.9101 14.3992 14.8601L15.5492 14.2601C15.5892 14.2401 15.6492 14.2401 15.6892 14.2601L16.8392 14.8601C17.0492 14.9701 17.2992 14.9501 17.4892 14.8101C17.6792 14.6701 17.7792 14.4401 17.7392 14.2001L17.5192 12.9301C17.5092 12.8801 17.5292 12.8301 17.5592 12.7901L18.4692 11.9001Z" fill="#97E3FD" />
                  <path d="M9.21061 7.57986V16.4199C8.83061 16.4199 8.51061 16.7399 8.51061 17.1199V20.1399H7.35061C3.40061 20.1399 2.10061 18.9599 2.01061 15.2799C2.00061 15.0899 2.08061 14.9099 2.21061 14.7799C2.34061 14.6399 2.53061 14.5699 2.71061 14.5699C4.11061 14.5699 5.26061 13.4199 5.26061 12.0099C5.26061 10.5999 4.11061 9.43986 2.71061 9.43986C2.51061 9.43986 2.34061 9.36986 2.21061 9.22986C2.08061 9.09986 2.00061 8.90986 2.01061 8.72986C2.10061 5.03986 3.40061 3.85986 7.35061 3.85986H8.51061V6.87986C8.51061 7.26986 8.83061 7.57986 9.21061 7.57986Z" fill="#97E3FD" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-700">Total Seminar Tickets Purchased</h3>
              <p className="text-lg font-bold text-blue-600">0</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Upcoming Webinars</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
          </div>
          <ul className="space-y-3">
            {webinars.map((webinar) => (
              <li key={webinar.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="font-medium">{webinar.title}</span>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{webinar.date}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Upcoming Seminars</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
          </div>
          <ul className="space-y-3">
            {seminars.map((seminar) => (
              <li key={seminar.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="font-medium">{seminar.topic}</span>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{seminar.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
        <Footer />
    </div>
  );
};

export default Dashboard;