import React, { useEffect, useState, useRef } from "react";
import noImg from "../../assets/images/no-image.jpg";
import Footer from "../../components/admin/Footer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CreateNews, IndexNews, EditNews, UpdateNews, DeleteNews } from "../../redux/slice/newsSlice";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const NewsList = () => {
  const dispatch = useDispatch();
  const { news = [], loading, error } = useSelector((state) => state.news);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showViewForm, setShowViewForm] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [editNewsData, setEditNewsData] = useState(null);

  const initialNewsState = {
    title: "",
    content: "",
    date: new Date().toISOString().split('T')[0],
    image: null,
    imagePreview: null
  };

  const [newNews, setNewNews] = useState(initialNewsState);

  const fileInputRef = useRef();

  useEffect(() => {
    dispatch(IndexNews());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const filteredNews = Array.isArray(news)
    ? news.filter((item) =>
      item?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNews = filteredNews.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleAddNews = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', newNews.title);
      formData.append('content', newNews.content);
      formData.append('created_at', newNews.date);
      if (newNews.image) {
        formData.append('image', newNews.image);
      }

      const res = await dispatch(CreateNews(formData));

      if (res.payload?.success || res?.meta?.requestStatus === "fulfilled") {
        toast.success("News added successfully");
        setShowAddForm(false);
        setNewNews(initialNewsState);
        dispatch(IndexNews());
      } else {
        toast.error(res.payload?.message || "Failed to add news");
      }
    } catch (error) {
      toast.error("Something went wrong while adding news");
    }
  };

  const handleEditClick = async (newsId) => {
    try {
      const res = await dispatch(EditNews(newsId));

      if (res.payload?.data) {
        const newsData = res.payload.data;
        setEditNewsData(newsData);
        setNewNews({
          title: newsData.title || "",
          content: newsData.content || "",
          date: newsData.created_at ? newsData.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
          image: null,
          imagePreview: newsData.image
            ? `${import.meta.env.VITE_API_URL}${newsData.image}`
            : null
        });
        setShowAddForm(true);
      } else {
        toast.error("Failed to fetch news data");
      }
    } catch (error) {
      toast.error("Failed to fetch news data");
      console.error("Edit error:", error);
    }
  };

  const handleUpdateNews = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', newNews.title);
      formData.append('content', newNews.content);
      formData.append('created_at', newNews.created_at);
      if (newNews.image) {
        formData.append('image', newNews.image);
      }

      const res = await dispatch(UpdateNews({
        id: editNewsData._id,
        data: formData
      }));
      console.log(res, "resaaa")

      if (res.payload?.success || res?.meta?.requestStatus === "fulfilled") {
        toast.success("News updated successfully");
        setShowAddForm(false);
        setEditNewsData(null);
        setNewNews(initialNewsState);
        dispatch(IndexNews());
      } else {
        toast.error(res.payload?.message || "Failed to update news");
      }
    } catch (error) {
      toast.error("Something went wrong while updating news");
    }
  };

  const handleDelete = async (newsId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This news will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        const res = await dispatch(DeleteNews(newsId));
        if (res.payload?.success || res?.meta?.requestStatus === "fulfilled") {
          Swal.fire("Deleted!", "News has been deleted.", "success");
          dispatch(IndexNews());
        } else {
          Swal.fire("Failed!", res.payload?.message || "Failed to delete news.", "error");
        }
      } catch (error) {
        Swal.fire("Error!", "Something went wrong during deletion.", "error");
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewNews(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewNews(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleClickDropZone = () => {
    fileInputRef.current.click();
  };

  const resetForm = () => {
    setNewNews(initialNewsState);
    setEditNewsData(null);
    setShowAddForm(false);
  };

  const renderMainContent = () => {
    if (showAddForm) {
      return (
        <div className="border border-gray-300 p-5 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {editNewsData ? "Edit News" : "Add New News"}
            </h1>
            <button
              onClick={resetForm}
              className="bg-gray-200 text-black px-4 py-2 rounded"
            >
              Back to List
            </button>
          </div>

          <form onSubmit={editNewsData ? handleUpdateNews : handleAddNews} className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Title:</label>
              <input
                type="text"
                placeholder="Enter news title"
                className="w-full px-4 py-2 border border-gray-300 rounded"
                value={newNews.title}
                onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Content:</label>
              <textarea
                placeholder="Enter news content"
                className="w-full px-4 py-2 border border-gray-300 rounded min-h-[150px]"
                value={newNews.content}
                onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Publish Date:</label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded"
                value={newNews.date}
                onChange={(e) => setNewNews({ ...newNews, date: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Image:</label>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleClickDropZone}
              >
                {newNews.imagePreview ? (
                  <div className="relative">
                    <img
                      src={newNews.imagePreview}
                      alt="Preview"
                      className="max-h-48 mx-auto mb-4"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setNewNews(prev => ({ ...prev, image: null, imagePreview: null }));
                      }}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="mb-2">Drag & drop an image here or click to select</p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-[#006AF2] text-white px-4 py-2 rounded"
              >
                {editNewsData ? "Update" : "Save"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-200 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      );
    }

    if (showViewForm) {
      return (
        <div className="border border-gray-300 p-5 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">View News</h1>
            <button
              onClick={() => setShowViewForm(false)}
              className="bg-gray-200 text-black px-4 py-2 rounded"
            >
              Back to List
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3">
                <img
                  src={selectedNews.image ? `${import.meta.env.VITE_API_URL}${selectedNews.image}` : noImg}
                  alt="News"
                  className="w-full h-auto object-cover rounded"
                />
              </div>
              <div className="w-full md:w-2/3">
                <h2 className="text-2xl font-bold text-[#0A2540] mb-4">
                  {selectedNews.title}
                </h2>
                <p className="text-gray-700 mb-6 whitespace-pre-line">
                  {selectedNews.content}
                </p>
                <p className="text-sm text-[#0f1531] font-medium">
                  <span className="mr-1"><ion-icon name="calendar-outline"></ion-icon></span>
                  {new Date(selectedNews.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <h1 className="!text-2xl font-bold text-gray-800">News List</h1>
          <button
            onClick={() => {
              setShowAddForm(true);
              setEditNewsData(null);
              setNewNews(initialNewsState);
            }}
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
            placeholder="Search By Title"
            className="w-full sm:max-w-md lg:ml-auto px-4 py-2 border border-gray-300 rounded"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {loading && news.length === 0 ? (
          <div className="text-center py-4">Loading...</div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">
            {error.message || "Error loading data"}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedNews.length > 0 ? (
                paginatedNews.map((item) => (
                  <div
                    key={item._id}
                    className="border border-gray-300 rounded-lg p-7 bg-white transition relative"
                  >
                    <div className="absolute top-50 right-4 flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedNews(item);
                          setShowViewForm(true);
                        }}
                        className="bg-white text-black border !border-gray-300 rounded-md hover:bg-[#006AF2] hover:text-white"
                      >
                        <ion-icon name="eye-outline"></ion-icon>
                      </button>
                      <button
                        onClick={() => handleEditClick(item._id)}
                        className="bg-white text-black p-1 border !border-gray-300 rounded-md hover:bg-[#006AF2] hover:text-white"
                      >
                        <ion-icon name="create-outline"></ion-icon>
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-white text-black p-1 border !border-gray-300 rounded-md hover:bg-[#006AF2] hover:text-white"
                      >
                        <ion-icon name="trash-outline"></ion-icon>
                      </button>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                      <img
                        src={item.image ? `${import.meta.env.VITE_API_URL}${item.image}` : noImg}
                        alt="News"
                        className="w-full md:w-42 h-42 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h2 className="!text-2xl text-[#0A2540] font-bold">
                          {item.title}
                        </h2>
                        <p className="text-sm font-normal text-gray-700 mb-4">
                          {item.content.length > 105
                            ? `${item.content.slice(0, 105)}...`
                            : item.content}
                        </p>
                        <p className="text-sm text-[#0f1531] font-medium mb-0">
                          <span className="mr-1"><ion-icon name="calendar-outline"></ion-icon></span>
                          {new Date(item.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-10 text-gray-500">
                  {news.length === 0 ? "No news available" : "No matching news found"}
                </div>
              )}
            </div>

            {filteredNews.length > 0 && (
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
        )}
      </>
    );
  };

  return (
    <div className="p-4 sm:p-6 !space-y-5 max-w-screen-2xl">
      {renderMainContent()}
      <Footer />
    </div>
  );
};

export default NewsList;