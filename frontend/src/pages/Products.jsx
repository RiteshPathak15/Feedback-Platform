import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const [categories] = useState([
    "All Products",
    "Lip Care",
    "Makeup",
    "Skincare",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null); // assuming user data will be fetched here

  const navigate = useNavigate();

  // Fetch user info (you can replace this with your actual user fetch logic)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/v1/users/profile"); // Assuming your backend is returning user profile here
        setUser(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUser();
  }, []);

  const fetchProducts = async (category) => {
    try {
      const { data } = await axios.get(`/api/v1/products`, {
        params: { category }, // Sending category as query param
      });
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 bg-white p-6 border-r border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Filter by Category
          </h2>
          <ul className="space-y-4">
            {categories.map((category, index) => (
              <li
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`cursor-pointer text-gray-600 hover:text-gray-900 transition ${
                  selectedCategory === category ? "font-bold text-gray-900" : ""
                }`}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Products Grid */}
        <div className="w-3/4 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Products</h2>
            <p className="text-gray-500">{products.length} result(s)</p>
          </div>

          {user && user.isPremium && (
            <div className="mb-6">
              <button
                onClick={() => navigate("/UploadProduct")}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Upload Product
              </button>
            </div>
          )}

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link to={`/Products/${product.id}`} key={product.id}>
                  <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-contain mb-4"
                    />
                    <h3 className="text-sm text-gray-500">{product.brand}</h3>
                    <p className="text-md font-medium text-gray-800 truncate mb-3">
                      {product.name}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-2 text-yellow-500 font-bold">
                        {product.rating} ★
                      </span>
                      <span>({product.reviews.toLocaleString()} reviews)</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No products found in this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
