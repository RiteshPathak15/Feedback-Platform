import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [error, setError] = useState(null);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/v1/products/${id}`);
        setProduct(data.product);
        setComments(data.product.comments || []);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Failed to load product details.");
      }
    };

    fetchProduct();
  }, [id]);

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const userId = localStorage.getItem("userId") || "guest"; // Use actual user ID

    try {
      const { data } = await axios.post("/api/v1/products/comment", {
        productId: id,
        userId,
        comment: commentInput,
      });
      setComments(data.product.comments);
      setCommentInput("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!product) return <p className="text-gray-500">Loading product...</p>;

  return (
    <div className="p-5">
      <Link
        to="/Products"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        &larr; Back to Products
      </Link>
      <div className="flex flex-col md:flex-row bg-white p-6 rounded-lg shadow-lg">
        <img
          src={product.imageUrl}
          alt={product.Imgname}
          className="w-full md:w-1/2 h-auto object-contain mb-4 md:mb-0"
        />
        <div className="md:ml-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {product.Imgname}
          </h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-xl font-semibold text-gray-800 mt-4">
            ${product.price}
          </p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Comments</h2>
        {error && <p className="text-red-600">{error}</p>}
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((comment) => (
              <li key={comment._id} className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600">By: {comment.username}</p>
                <p className="text-gray-800 mt-2">{comment.comment}</p>
              </li>
            ))}
          </ul>
        )}

        {/* Add Comment Form */}
        <form onSubmit={handleCommentSubmit} className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Add a Comment
          </h3>
          <textarea
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            rows="4"
            placeholder="Write your comment here..."
            required
          ></textarea>
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetails;
