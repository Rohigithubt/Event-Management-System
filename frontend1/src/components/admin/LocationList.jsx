import React, { useEffect, useState } from "react";
import Footer from "../../components/admin/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { CreateLocation, IndexLocation, EditLocation, UpdateLocation, DeleteLocation } from "../../redux/slice/locationSlice";
import Swal from "sweetalert2";

const LocationList = () => {
    const dispatch = useDispatch();
    const { location, loading, error } = useSelector((state) => state.location);
    console.log(location, "location")

    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [locationsData, setLocationsData] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newLocation, setNewLocation] = useState({ locationName: "" });
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [editLocationData, setEditLocationData] = useState(null);
    const [editFormData, setEditFormData] = useState({ _id: "", locationName: "" });

    useEffect(() => {
        dispatch(IndexLocation());
    }, [dispatch]);

    useEffect(() => {
        if (Array.isArray(location)) {
            const formatted = location.map((l) => ({
                _id: l._id,
                locationName: l.locationName,
                createdAt: l.created_at ? new Date(l.created_at).toLocaleDateString() : "N/A",
                isDeleted: l.isDeleted || false
            }));
            setLocationsData(formatted);
        } else {
            setLocationsData([]);
        }
    }, [location]);

    useEffect(() => {
        if (error) {
            toast.error(error.message || "Error loading locations");
        }
    }, [error]);

    const handleAddLocation = async () => {
        if (!newLocation.locationName.trim()) {
            toast.error("Location name cannot be empty");
            return;
        }

        try {
            const result = await dispatch(CreateLocation(newLocation));
            if (result.payload?.status || result?.meta?.requestStatus === "fulfilled") {
                toast.success("Location added successfully");
                setShowAddForm(false);
                setNewLocation({ locationName: "" });
                dispatch(IndexLocation());
            } else {
                toast.error(result.payload?.message || "Failed to add location");
            }
        } catch (err) {
            toast.error("An error occurred while adding location");
        }
    };

    const handleEditClick = async (locationId) => {
        try {
            const res = await dispatch(EditLocation(locationId));
            setEditLocationData(res.payload);
            setEditFormData({
                _id: res.payload.data._id,
                locationName: res.payload.data.locationName
            });
        } catch (err) {
            toast.error("Failed to fetch location data");
        }
    };

    const handleUpdate = async () => {
        if (!editFormData.locationName.trim()) {
            toast.error("Location name cannot be empty");
            return;
        }

        try {
            const updatePayload = {
                locationId: editFormData._id,
                locationName: editFormData.locationName
            };

            const res = await dispatch(UpdateLocation(updatePayload));
            if (res.payload?.status || res?.meta?.requestStatus === "fulfilled") {
                toast.success("Location updated successfully");
                setEditLocationData(null);
                setEditFormData({ _id: "", locationName: "" });
                dispatch(IndexLocation());
            } else {
                toast.error(res.payload?.message || "Update failed");
            }
        } catch (err) {
            toast.error("Something went wrong during update");
        }
    };

    const handleDelete = async (locationId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This location will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {
                const res = await dispatch(DeleteLocation(locationId));
                if (res?.payload?.status || res?.meta?.requestStatus === "fulfilled") {
                    Swal.fire("Deleted!", "Location has been deleted.", "success");
                    dispatch(IndexLocation());
                } else {
                    Swal.fire("Failed!", res.payload?.message || "Failed to delete location.", "error");
                }
            } catch (error) {
                Swal.fire("Error!", "Something went wrong during deletion.", "error");
            }
        }
    };

    const filteredLocations = locationsData.filter(l =>
        l.locationName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredLocations.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedLocations = filteredLocations.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    const renderMainContent = () => {
        if (showAddForm) {
            return (
                <div className="border border-gray-300 p-5 rounded-lg">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Add New Location</h1>

                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block font-semibold text-gray-700 mb-1">Location Name:</label>
                            <input
                                type="text"
                                placeholder="Enter location name"
                                className="w-full px-4 py-2 border border-gray-300 rounded"
                                value={newLocation.locationName}
                                onChange={(e) => setNewLocation({ locationName: e.target.value })}
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleAddLocation}
                                className="bg-[#006AF2] text-white px-4 py-2 rounded"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setShowAddForm(false)}
                                className="bg-gray-200 text-black px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        if (editLocationData) {
            return (
                <div className="border border-gray-300 p-5 rounded-lg">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Edit Location</h1>
                        <button
                            onClick={() => {
                                setEditLocationData(null);
                                setEditFormData({ _id: "", locationName: "" });
                            }}
                            className="bg-gray-200 text-black px-4 py-2 rounded"
                        >
                            Back to List
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block font-semibold text-gray-700 mb-1">Location Name:</label>
                            <input
                                type="text"
                                placeholder="Enter location name"
                                className="w-full px-4 py-2 border border-gray-300 rounded"
                                value={editFormData.locationName}
                                onChange={(e) => setEditFormData({ ...editFormData, locationName: e.target.value })}
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleUpdate}
                                className="bg-[#006AF2] text-white px-4 py-2 rounded"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => {
                                    setEditLocationData(null);
                                    setEditFormData({ _id: "", locationName: "" });
                                }}
                                className="bg-gray-200 text-black px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        if (selectedLocation) {
            return (
                <div className="border border-gray-300 p-5 rounded-lg">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">View Location</h1>

                    </div>

                    <div className="space-y-4">

                        <div>
                            <p className="font-bold text-xl !mt-10 mb-8">Location Name: <span className="ml-2 font-normal">{selectedLocation.locationName}</span></p>
                            <p className="text-gray-700"></p>
                        </div>

                        <button
                            onClick={() => setSelectedLocation(null)}
                            className="bg-gray-200 text-black px-4 py-2 hover:bg-[#0A2540] hover:text-white !rounded-full"
                        >
                            Back
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
                    <h1 className="!text-2xl font-bold text-gray-800">Location List</h1>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="bg-[#006AF2] text-white !rounded-full px-6 py-2 shadow-xl w-full sm:w-auto"
                    >
                        + Add
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                        <p>Show</p>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
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
                        placeholder="Search By Location"
                        className="w-full sm:max-w-md lg:ml-auto px-4 py-2 border border-gray-300 rounded"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full divide-y divide-gray-200 text-left">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-sm font-bold text-gray-400">S.No.</th>
                                <th className="px-4 py-2 text-sm font-bold text-gray-400">Location Name</th>
                                <th className="px-4 py-2 text-sm font-bold text-gray-400">Created</th>
                                <th className="px-0 py-2 text-sm font-bold text-gray-400">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading && locationsData.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">Loading...</td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-4 text-red-500">
                                        {error.message || "Error loading data"}
                                    </td>
                                </tr>
                            ) : paginatedLocations.length > 0 ? (
                                paginatedLocations.map((location, index) => (
                                    <tr key={location._id} className="hover:bg-gray-50 border-b border-gray-300">
                                        <td className="px-4 py-2 text-sm">{startIndex + index + 1}</td>
                                        <td className="px-4 py-2 text-sm">{location.locationName}</td>
                                        <td className="px-4 py-2 text-sm">{location.createdAt}</td>
                                        <td className="px-0 py-2 text-sm flex gap-1">
                                            <button
                                                className="bg-white text-black border border-black px-2 py-0 rounded-md text-xs hover:bg-[#006AF2] hover:text-white"
                                                onClick={() => setSelectedLocation(location)}
                                            >
                                                <ion-icon name="eye-outline"></ion-icon>
                                            </button>
                                            <button
                                                className="bg-white text-black px-2 py-0 rounded-md text-xs hover:bg-[#006AF2] hover:text-white"
                                                onClick={() => handleEditClick(location._id)}
                                            >
                                                <ion-icon name="create-outline"></ion-icon>
                                            </button>
                                            <button
                                                className="bg-white text-black px-2 py-0 rounded-md text-xs hover:bg-[#006AF2] hover:text-white"
                                                onClick={() => handleDelete(location._id)}
                                            >
                                                <ion-icon name="trash-outline"></ion-icon>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">
                                        {locationsData.length === 0 ? "No locations available" : "No matching locations found"}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {filteredLocations.length > 0 && (
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <p className="text-sm">Page {currentPage} of {totalPages}</p>
                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </>
        );
    };

    return (
        <div className="p-4 sm:p-6 !space-y-5 max-w-screen-2xl">
            {renderMainContent()}
            <Footer />
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
};

export default LocationList;