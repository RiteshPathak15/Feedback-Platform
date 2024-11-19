import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the route

  // Mock data for the product (replace with API calls or props as needed)
  const product = {
    id: 1,
    image: "https://via.placeholder.com/300",
    brand: "eos",
    name: "EOS strawberry sorbet lip balm",
    description: "A moisturizing lip balm with a delightful strawberry flavor.",
    category: "Lip Care",
    rating: 4.2,
    reviews: 158883,
    price: "$5.99",
  };

  // Mock reviews (you can fetch these from a database or API)
  const initialReviews = [
    {
      id: 1,
      user: "Jane Doe",
      comment: "Love this product! It keeps my lips super soft.",
      rating: 5,
    },
    {
      id: 2,
      user: "John Smith",
      comment: "Good quality but a bit pricey.",
      rating: 4,
    },
  ];

  const [reviews, setReviews] = useState(initialReviews); // State for reviews
  const [newComment, setNewComment] = useState(""); // State for new comment
  const [newRating, setNewRating] = useState(5); // State for new rating

  const handleAddReview = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    const newReview = {
      id: reviews.length + 1,
      user: "Anonymous", // Replace with logged-in user's name if available
      comment: newComment,
      rating: newRating,
    };

    setReviews([newReview, ...reviews]); // Add the new review to the list
    setNewComment(""); // Clear the comment field
    setNewRating(5); // Reset the rating field
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Product Information */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-64 h-64 object-contain mx-auto md:mx-0"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {product.name}
          </h1>
          <p className="text-gray-500 mb-4">{product.description}</p>
          <p className="text-lg font-semibold text-gray-800">
            Price: {product.price}
          </p>
          <p className="text-sm text-gray-500">Category: {product.category}</p>
          <p className="text-sm text-gray-500">
            Rating: {product.rating} ★ ({product.reviews.toLocaleString()} reviews)
          </p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Reviews</h2>
        {/* Add Review Form */}
        <form onSubmit={handleAddReview} className="mb-6">
          <textarea
            className="w-full p-4 border border-gray-300 rounded-md mb-2"
            rows="4"
            placeholder="Write your review..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="flex items-center gap-4">
            <label className="text-gray-600">Rating:</label>
            <select
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
              className="border border-gray-300 rounded-md p-2"
            >
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} ★
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md mt-4 hover:bg-blue-600"
          >
            Submit Review
          </button>
        </form>

        {/* Display Reviews */}
        <div>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.id}
                className="border-b border-gray-200 pb-4 mb-4"
              >
                <h3 className="text-sm font-bold text-gray-800">
                  {review.user}
                </h3>
                <p className="text-sm text-gray-600">{review.comment}</p>
                <p className="text-sm text-yellow-500">{review.rating} ★</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
