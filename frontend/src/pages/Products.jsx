import React, { useState, useEffect } from "react";
import axios from "axios";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/v1/products");
        setProducts(data.products); // Adjust if the structure is different
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle adding product to the cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Handle removing product from the cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold text-gray-800 mb-5">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white p-4 rounded-lg shadow-lg transition hover:shadow-xl"
          >
            <img
              src={product.imageUrl}
              alt={product.Imgname}
              className="w-full h-40 object-contain mb-4 rounded-lg"
            />
            <h2 className="text-lg font-semibold text-gray-900">
              {product.Imgname}
            </h2>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-xl font-bold text-gray-800 my-3">
              ${product.price}
            </p>
            <div className="flex justify-between items-center">
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Add to Cart
              </button>
              <button
                onClick={() => removeFromCart(product._id)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Remove from Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-gray-800">Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cart.map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between bg-gray-100 p-4 rounded-lg"
              >
                <div className="flex items-center">
                  <img
                    src={product.imageUrl}
                    alt={product.Imgname}
                    className="w-16 h-16 object-cover mr-4 rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {product.Imgname}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {product.description}
                    </p>
                    <p className="font-bold text-gray-800">${product.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
