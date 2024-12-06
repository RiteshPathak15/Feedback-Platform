// controllers/order.controller.js
import Order from "../models/order.models.js";

// Create a new order
export const createOrder = async (req, res) => {
  const { customerDetails, cartItems, totalPrice, status } = req.body;

  if (!customerDetails || !cartItems || cartItems.length === 0 || !totalPrice) {
    return res.status(400).json({ message: "Missing required order data." });
  }

  try {
    const newOrder = new Order({
      user_id: req.user._id, // User from authenticated token
      customerDetails,
      cartItems,
      totalPrice,
      status: status || "pending",
    });

    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order placed successfully.", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.user._id })
      .populate("cartItems.productId") // Populate product info
      .sort({ date: -1 }); // Latest orders first

    if (!orders) {
      return res.status(404).json({ message: "No orders found." });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching order history:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
};
