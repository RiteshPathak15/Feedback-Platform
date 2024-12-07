import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/v1/users/profile", {
          withCredentials: true,
        });
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user info:", error);
        setError("Error fetching user data.");
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/v1/products");
        setProducts(data.products);
        const uniqueCategories = [
          "All Products",
          ...new Set(data.products.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts =
    selectedCategory === "All Products"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const addToCart = (product) => {
    try {
      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingProduct = existingCart.find(
        (item) => item._id === product._id
      );

      let updatedCart;
      if (existingProduct) {
        updatedCart = existingCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...existingCart, { ...product, quantity: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      alert(`${product.Imgname} added to cart`);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("An error occurred while adding the product to the cart.");
    }
  };

  if (loadingUser) {
    return <p>Loading user info...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

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
                onClick={() => handleCategoryChange(category)}
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
            <div className="flex space-x-4">
              <Link
                to="/Cart"
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Go to Cart
              </Link>
              {user?.isPremium && (
                <Link
                  to="/UploadProduct"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Upload Product
                </Link>
              )}
            </div>
          </div>

          {loading ? (
            <p className="text-gray-500">Loading products...</p>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white p-4 rounded-lg shadow-lg transition hover:shadow-xl"
                >
                  <Link to={`/ProductDetails/${product._id}`}>
                    <img
                      src={product.imageUrl}
                      alt={product.Imgname}
                      className="w-full h-40 object-contain mb-4 rounded-lg"
                    />
                    <h2 className="text-lg font-semibold text-gray-900">
                      {product.Imgname}
                    </h2>
                  </Link>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <p className="text-xl font-bold text-gray-800 my-3">
                    ${product.price}
                  </p>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Add to Cart
                  </button>
                </div>
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
