import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PlaceOrder = () => {
  const [formData, setFormData] = useState({
    name: "",
    user_id: "",
    phone: "",
    address: "",
    email: "",
  });

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userProfile, setUserProfile] = useState(null);

  const navigate = useNavigate();

  // Fetch cart items from localStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    // Fetch user profile data
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/api/v1/users/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Use the stored access token
          },
        });

        if (response.status === 200) {
          setUserProfile(response.data); // Set user profile data
          setFormData({
            ...formData,
            name: response.data.name || "",
            user_id: response.data.user_id || "",
            phone: response.data.phone || "",
            address: response.data.address || "",
            email: response.data.email || "",
          });
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Unable to fetch user profile.");
      }
    };

    fetchUserProfile();
  }, []);

  // Calculate total price of the cart
  const calculateTotalPrice = () => {
    return cart
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2); // Ensure two decimal places for price
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Ensure form validation
    if (!formData.name || !formData.phone || !formData.address || !formData.email) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    // Prepare the order data
    const orderData = {
      customerDetails: formData,
      cartItems: cart.map((product) => ({
        productId: product._id,  // Ensure this field contains the product ID
        price: product.price,
        quantity: product.quantity,
        imageUrl: product.imageUrl || "",  // Include image URL
        description: product.description || "",  // Include product description
        Imgname: product.Imgname || "",  // Include product name
      })),
      totalPrice: calculateTotalPrice(),
      date: new Date(),
      status: "pending",  // Set initial order status to 'pending'
    };

    console.log("Order Data to be sent:", orderData);  // Debug the order data being sent

    try {
      // Replace with your backend API endpoint
      const response = await axios.post(
        "/api/v1/orders/create-order",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Use the stored access token
          },
        }
      );

      if (response.status === 201) {
        // Order placed successfully, redirect to order success page
        navigate("/order-success");
        localStorage.removeItem("cart"); // Clear the cart from local storage
        setCart([]); // Clear cart state
      }
    } catch (err) {
      // Handle error during order placement
      const errorMessage =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
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
                  src={product.imageUrl || "/path/to/default/image.jpg"}
                  alt={product.Imgname || "Product Image"}
                  className="w-20 h-20 object-contain mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{product.Imgname}</h3>
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
        <p className="text-gray-600">Your cart is empty.</p>
      )}

      {/* Order Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-3">
            {error}
          </div>
        )}
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
          name="user_id"
          placeholder="user_id"
          value={formData.user_id}
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
          disabled={loading}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default PlaceOrder;
