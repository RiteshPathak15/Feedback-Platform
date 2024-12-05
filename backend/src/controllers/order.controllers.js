import { Order } from "../models/order.models";

const vieworder = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate(
      "products.productId"
    );
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

export { vieworder };
