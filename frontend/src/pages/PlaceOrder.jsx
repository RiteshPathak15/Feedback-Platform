import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
  });

  const [cart, setCart] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Calculate total price of the cart
  const calculateTotalPrice = () => {
    return cart
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2); // Ensure two decimal places for price
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process order submission
    navigate("/order-success");
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold text-gray-800 mb-5">Place Your Order</h1>

      {/* Display Cart Items */}
      {cart.length > 0 ? (
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-800">Your Cart:</h2>
          {cart.map((product) => (
            <div
              key={product._id}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow-lg mb-4"
            >
              <div className="flex items-center">
                <img
                  src={product.imageUrl}
                  alt={product.Imgname}
                  className="w-20 h-20 object-contain mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product.Imgname}
                  </h3>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <p className="text-xl font-bold text-gray-800">
                    ${product.price.toFixed(2)} x {product.quantity}
                  </p>
                  <p className="text-lg text-gray-800">
                    Total: ${(product.price * product.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="text-xl font-bold text-gray-800">
            <p>Total Price: ${calculateTotalPrice()}</p>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}

      {/* Order Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 rounded py-2 px-4 w-full"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="border border-gray-300 rounded py-2 px-4 w-full"
          required
        />
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border border-gray-300 rounded py-2 px-4 w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 rounded py-2 px-4 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default PlaceOrder;
