import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);

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

  // Handle removing product from cart
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product._id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart); // Update state after removal
  };

  // Handle updating product quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) return; // Prevent quantity from being zero or negative

    const updatedCart = cart.map((product) =>
      product._id === productId
        ? { ...product, quantity: newQuantity }
        : product
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart); // Update state after quantity change
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty. Go back to shopping!</p>
        ) : (
          <div>
            <div className="space-y-4">
              {cart.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg"
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
                      <p className="text-sm text-gray-600">
                        {product.description}
                      </p>
                      <p className="text-xl  text-gray-800 mb-3">
                        <span className="">Fixed Price : </span> $
                        {product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            product._id,
                            Math.max(product.quantity - 1, 1)
                          )
                        }
                        className="px-3 py-1 bg-gray-300 rounded"
                      >
                        -
                      </button>
                      <span>{product.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(product._id, product.quantity + 1)
                        }
                        className="px-3 py-1 bg-gray-300 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-800 mb-3">
                      Total: ${(product.price * product.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
              <Link
                to="/Products"
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Continue Shopping
              </Link>

              <div className="text-xl font-bold text-gray-800">
                <p>Total Price: ${calculateTotalPrice()}</p>
              </div>

              <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                <Link to="/place-order"> Proceed to Checkout</Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
