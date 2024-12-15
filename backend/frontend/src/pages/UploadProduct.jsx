import React, { useState } from "react";
import axios from "axios";

const UploadProduct = () => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    Imgname: "",
    description: "",
    price: "",
    category: "",
    addedBy: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select an image file.");
      return;
    }

    const data = new FormData();
    data.append("productImage", file);
    data.append("Imgname", formData.Imgname);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("addedBy", formData.addedBy);

    try {
      setLoading(true);
      const response = await axios.post("/api/v1/products/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product uploaded successfully");
    } catch (error) {
      console.error("Error uploading product:", error);
      alert("Error uploading product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center p-10">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md transform transition-transform">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          <span role="img" aria-label="upload">
            📦
          </span>{" "}
          Upload Product
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2  items-center gap-2">
              <span role="img" aria-label="name">
                🏷️
              </span>{" "}
              Product Name
            </label>
            <input
              type="text"
              name="Imgname"
              value={formData.Imgname}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            />
          </div>
          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2  items-center gap-2">
              <span role="img" aria-label="description">
                ✍️
              </span>{" "}
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            />
          </div>
          {/* Price */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2  items-center gap-2">
              <span role="img" aria-label="price">
                💰
              </span>{" "}
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            />
          </div>
          {/* Category */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2  items-center gap-2">
              <span role="img" aria-label="category">
                📚
              </span>{" "}
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            />
          </div>
          {/* Added By */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2  items-center gap-2">
              <span role="img" aria-label="user">
                👤
              </span>{" "}
              Added By (User ID)
            </label>
            <input
              type="text"
              name="addedBy"
              value={formData.addedBy}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            />
          </div>
          {/* File Upload */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2  items-center gap-2">
              <span role="img" aria-label="image">
                🖼️
              </span>{" "}
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {file && (
              <p className="mt-2 text-sm text-green-600">
                <span role="img" aria-label="check">
                  ✅
                </span>{" "}
                Selected File: {file.name}
              </p>
            )}
          </div>
          {/* Loading Bar */}
          {loading && (
            <div className="mb-4">
              <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-blue-500 animate-pulse"></div>
              </div>
            </div>
          )}
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white rounded-lg font-semibold transform transition-transform ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-green-400 to-blue-500 hover:scale-105"
            } focus:outline-none`}
          >
            {loading ? "Uploading..." : "🚀 Upload Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;
