// models/order.models.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  customerDetails: {
    name: String,
    phone: String,
    address: String,
    email: String,
  },
  cartItems: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
      price: Number,
      imageUrl: String,
      description: String,
      Imgname: String,
    },
  ],
  totalPrice: Number,
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
