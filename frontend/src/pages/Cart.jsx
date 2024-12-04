import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Load cart items from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  // Fetch all products to allow adding more from Cart page
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/v1/products");
        console.log(data.products); // Log the fetched products to ensure they're being fetched
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Update cart in localStorage whenever cart changes
  useEffect(() => {
    if (cart.length) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // Handle adding product to the cart
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item._id === product._id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Handle decreasing the quantity of a product in the cart
  const decreaseQuantity = (productId) => {
    const updatedCart = cart
      .map((item) =>
        item._id === productId
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
  };

  // Handle removing a product from the cart
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
  };

  // Handle search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.Imgname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate total cart value
  const totalValue = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold text-gray-800">Cart</h1>
        <Link
          to="/Products"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Back to Products
        </Link>
      </div>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center text-lg mt-10">
          Your cart is empty. Explore products to add to your cart.
        </p>
      ) : (
        <>
          <div className="space-y-4 mb-10">
            {cart.map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between bg-gray-100 p-4 rounded-lg"
              >
                <div className="flex items-center">
                  <img
                    src={product.imageUrl || "default-image.jpg"} // Default fallback image if not found
                    alt={product.Imgname || "Product image"}
                    className="w-16 h-16 object-cover mr-4 rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {product.Imgname}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {product.description}
                    </p>
                    <p className="font-bold text-gray-800">
                      ${product.price} x {product.quantity}
                    </p>
                    <p className="font-bold text-gray-800">
                      Total: ${product.price * product.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => decreaseQuantity(product._id)}
                    className="text-gray-600 bg-gray-200 py-1 px-3 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="font-bold text-gray-800">
                    {product.quantity}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="text-gray-600 bg-gray-200 py-1 px-3 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              Cart Summary
            </h2>
            <p className="text-lg text-gray-700">
              Total Items: {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </p>
            <p className="text-lg text-gray-700">Total Price: ${totalValue}</p>
          </div>
        </>
      )}

      <h2 className="text-xl font-bold text-gray-800 my-5">
        Add More Products
      </h2>
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded py-2 px-4 w-full"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white p-4 rounded-lg shadow-lg transition hover:shadow-xl"
          >
            <img
              src={product.imageUrl || "default-image.jpg"} // Fallback image
              alt={product.Imgname || "Product image"}
              className="w-full h-40 object-contain mb-4 rounded-lg"
            />
            <h2 className="text-lg font-semibold text-gray-900">
              {product.Imgname}
            </h2>
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
    </div>
  );
};

export default Cart;
