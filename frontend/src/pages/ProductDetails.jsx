import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const { data } = await axios.get(`/api/v1/products/${id}`);
        setProduct(data.product);
      } catch (error) {
        setError("Error fetching product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const { data } = await axios.post(
          `/api/v1/products/comment`,
          { productId: id, comment: newComment },
          { withCredentials: true }
        );
        setProduct((prev) => ({
          ...prev,
          comments: [...prev.comments, data.comment],
        }));
        setNewComment("");
      } catch (error) {
        setError("Error adding comment.");
      }
    }
  };

  const handleAddRating = async () => {
    if (newRating >= 1 && newRating <= 5) {
      try {
        const { data } = await axios.post(
          `/api/v1/products/rate`,
          { productId: id, rating: newRating },
          { withCredentials: true }
        );
        setProduct((prev) => ({
          ...prev,
          averageRating: data.averageRating,
        }));
        setNewRating(0);
      } catch (error) {
        setError("Error adding rating.");
      }
    }
  };

  const handleAddToCart = () => {
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

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <>
        {Array(fullStars)
          .fill()
          .map((_, index) => (
            <FaStar key={`full-${index}`} className="text-yellow-500" />
          ))}
        {halfStar > 0 && <FaStar key="half" className="text-yellow-500" />}
        {Array(emptyStars)
          .fill()
          .map((_, index) => (
            <FaStar key={`empty-${index}`} className="text-gray-300" />
          ))}
      </>
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto mt-10">
      {/* Display the product image */}
      <img
        src={product.imageUrl}
        alt={product.Imgname}
        className="w-full h-96 object-cover rounded-lg"
      />

      <h1 className="text-3xl font-semibold text-gray-900 mt-6">
        {product.Imgname}
      </h1>
      <p className="text-lg text-gray-700 my-4">{product.description}</p>

      <div className="flex items-center space-x-2">
        <span className="text-xl font-semibold text-gray-800">
          Average Rating:
        </span>
        <div className="flex items-center">
          {renderStars(product.averageRating)}
          <span className="ml-2 text-sm text-gray-600">
            ({product.ratings.length} reviews)
          </span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="mt-6 flex items-center space-x-4">
        <button
          onClick={handleAddToCart}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Add to Cart
        </button>
        <Link
          to="/cart"
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
        >
          Go to Cart
        </Link>
      </div>

      {/* Add a comment and rating section */}
      <div className="my-6">
        <div className="mt-6 flex items-center space-x-2">
          <select
            value={newRating}
            onChange={(e) => setNewRating(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value={0} disabled>
              Select rating
            </option>
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating} {rating === 1 ? "Star" : "Stars"}
              </option>
            ))}
          </select>
          <button
            className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
            onClick={handleAddRating}
          >
            Rate Product
          </button>
        </div>

        <div className="mt-6">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
          />
          <button
            className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            onClick={handleAddComment}
          >
            Submit Comment
          </button>
        </div>
      </div>

      {/* Comments Section - Below Add Comment Section */}
      <div className="my-6">
        <h3 className="text-lg font-medium text-gray-900">Comments:</h3>
        <div className="space-y-4 mt-4">
          {product.comments.length > 0 ? (
            product.comments.map((comment, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-sm font-semibold text-gray-800">
                  {comment.username}
                </p>
                <p className="text-gray-600 mt-2">{comment.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
