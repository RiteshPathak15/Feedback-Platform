import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/v1/orders/order-history", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Replace with actual token
          },
        });
        setOrders(response.data);
      } catch (err) {
        setError("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center py-5 text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-xl text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Your Order History</h1>

      {orders.length === 0 ? (
        <p className="text-lg text-gray-600 text-center">You have no orders yet.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Order #{order._id}
              </h3>
              <p className="text-sm text-gray-600">
                Date: {new Date(order.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">Status: {order.status}</p>
              <p className="text-lg font-bold text-gray-800 mt-2">
                Total Price: ${order.totalPrice.toFixed(2)}
              </p>

              <div className="mt-4 space-y-4">
                {order.cartItems.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-100"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.imageUrl || "/path/to/default-image.jpg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h4 className="text-lg font-semibold text-gray-700">{item.name}</h4>
                        <p className="text-sm text-gray-500">Price: ${item.price}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
