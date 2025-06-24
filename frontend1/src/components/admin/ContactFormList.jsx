import React, { useState, useEffect } from "react";
import Footer from "../../components/admin/Footer";
import { useDispatch, useSelector } from "react-redux";
import { IndexContactUsForm, DeleteContactUsForm } from "../../redux/slice/contactusformSlice";
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactFormList = () => {
  const dispatch = useDispatch();
  const { contactusform = [], loading, error, success, message } = useSelector((state) => state.contactusform);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedForm, setSelectedForm] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    dispatch(IndexContactUsForm());
  }, [dispatch]);

  useEffect(() => {
    if (success && message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error, message]);

  const handleDelete = (contactusformId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#006AF2',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeleteContactUsForm(contactusformId));
      }
    });
  };

  const handleView = (form) => {
    setSelectedForm(form);
    setShowDetails(true);
  };

  const filteredForms = contactusform.filter(form => {
    const searchLower = searchTerm.toLowerCase();
    return (
      form.firstName?.toLowerCase().includes(searchLower) ||
      form.lastName?.toLowerCase().includes(searchLower) ||
      new Date(form.createdAt).toDateString().toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="p-4 sm:p-6 !space-y-5 max-w-screen-2xl relative">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />


      {showDetails && selectedForm && (
        <div className="border border-gray-300 p-5 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="!text-3xl font-bold text-gray-800">Contact Form Details</h1>
            <button
              onClick={() => setShowDetails(false)}
              className="bg-gray-200 text-black px-4 py-2 rounded"
            >
              Back to List
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-1">First Name</label>
                <p className="text-lg font-medium text-gray-800 p-2 bg-gray-50 rounded">
                  {selectedForm.firstName}
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-1">Last Name</label>
                <p className="text-lg font-medium text-gray-800 p-2 bg-gray-50 rounded">
                  {selectedForm.lastName}
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-1">Email</label>
                <p className="text-lg font-medium text-gray-800 p-2 bg-gray-50 rounded">
                  {selectedForm.email}
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-1">Phone Number</label>
                <p className="text-lg font-medium text-gray-800 p-2 bg-gray-50 rounded">
                  {selectedForm.phoneno}
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-1">Created At</label>
                <p className="text-lg font-medium text-gray-800 p-2 bg-gray-50 rounded">
                  {new Date(selectedForm.created_at).toLocaleString()}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-500 mb-1">Message</label>
              <div className="p-4 bg-gray-50 rounded whitespace-pre-wrap text-gray-800">
                {selectedForm.message}
              </div>
            </div>
          </div>
        </div>
      )}


      {!showDetails && (
        <>
          <div className="border border-gray-300 p-5 rounded-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <h1 className="!text-2xl font-bold text-gray-800">Contact Form List</h1>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center border border-gray-300 p-3 rounded-xl gap-4 mb-7">
              <input
                type="text"
                placeholder="Select Date"
                className="w-full sm:max-w-xs ml-0 sm:ml-4 px-4 py-2 border border-gray-300 rounded"
              />
              <button className="bg-[#006AF2] text-white !rounded-full px-6 py-2 shadow-xl w-full sm:w-auto">
                Submit
              </button>
              <button className="bg-black text-white !rounded-full px-6 py-2 shadow-xl w-full sm:w-auto">
                Reset
              </button>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <p>Show</p>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="px-4 py-2 border border-gray-300 rounded"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                </select>
                <p>entries</p>
              </div>

              <input
                type="text"
                placeholder="Search By Name, Date"
                className="w-full sm:max-w-md ml-0 lg:ml-auto px-4 py-2 border border-gray-300 rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {loading && <div className="text-center py-4">Loading...</div>}
            {error && <div className="text-red-500 text-center py-4">{error}</div>}

            <div className="grid grid-cols-1 gap-6">
              <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200 text-left">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-sm font-bold text-gray-400">S.No.</th>
                      <th className="px-4 py-2 text-sm font-bold text-gray-400">Full Name</th>
                      <th className="px-4 py-2 text-sm font-bold text-gray-400">Phone No</th>
                      <th className="px-4 py-2 text-sm font-bold text-gray-400">Created At</th>
                      <th className="px-0 py-2 text-sm font-bold text-gray-400">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredForms.length > 0 ? (
                      filteredForms.map((form, index) => (
                        <tr key={form._id} className="hover:bg-gray-50 border-b border-gray-300">
                          <td className="px-4 py-2 text-sm">{index + 1}</td>
                          <td className="px-4 py-2 text-sm">{`${form.firstName} ${form.lastName}`}</td>
                          <td className="px-4 py-2 text-sm">{form.phoneno}</td>
                          <td className="px-4 py-2 text-sm">
                            {new Date(form.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-0 py-2 text-sm">
                            <button
                              onClick={() => handleView(form)}
                              className="bg-white text-black border !border-gray-300 py-0 rounded-md mr-2 text-xs hover:bg-[#006AF2] hover:text-white"
                            >
                              <ion-icon name="eye-outline"></ion-icon>
                            </button>
                            <button
                              onClick={() => handleDelete(form._id)}
                              className="bg-white text-black px-2 border !border-gray-300 py-0 rounded-md mr-2 text-xs hover:bg-[#006AF2] hover:text-white"
                            >
                              <ion-icon name="trash-outline"></ion-icon>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-4">
                          No contact forms found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default ContactFormList;