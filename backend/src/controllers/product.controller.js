import { Product } from "../models/productUpload.models.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { Imgname, description, price, category, addedBy } = req.body;

    // Check if all required fields are provided
    if (!Imgname || !description || !price || !category || !req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(addedBy);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.isPremium) {
      return res
        .status(403)
        .json({ message: "Only premium users can upload products" });
    }

    // Upload the product image to Cloudinary
    const productImg = await uploadOnCloudinary(req.file.path);
    if (!productImg || !productImg.url) {
      return res.status(500).json({ message: "Error uploading product image" });
    }

    // Create a new product
    const newProduct = new Product({
      Imgname,
      description,
      price,
      category,
      imageUrl: productImg.url,
      addedBy: user._id,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product uploaded successfully", product: newProduct });
  } catch (error) {
    console.error("Error uploading product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Comment on a product
const commentOnProduct = async (req, res) => {
  try {
    const { productId, comment } = req.body;
    const userId = req.user.id;

    // Ensure comment and productId are provided
    if (!productId || !comment) {
      return res
        .status(400)
        .json({ message: "Product ID and comment are required" });
    }

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Push the new comment into the comments array
    product.comments.push({ userId, username: req.user.username, comment });
    await product.save();

    res.status(200).json({
      message: "Comment added successfully",
      comment: { userId, username: req.user.username, comment },
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Rate a product
const rateProduct = async (req, res) => {
  try {
    const { productId, rating } = req.body;
    const userId = req.user.id;

    // Validate rating
    if (!productId || !rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Invalid rating" });
    }

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the user has already rated the product
    const existingRating = product.ratings.find(
      (r) => r.userId.toString() === userId
    );
    if (existingRating) {
      return res
        .status(400)
        .json({ message: "You have already rated this product" });
    }

    // Add the new rating
    product.ratings.push({ userId, rating });

    // Calculate the new average rating
    const totalRatings = product.ratings.length;
    const sumRatings = product.ratings.reduce(
      (acc, curr) => acc + curr.rating,
      0
    );
    product.averageRating = sumRatings / totalRatings;

    await product.save();

    res.status(200).json({
      message: "Rating added successfully",
      averageRating: product.averageRating,
    });
  } catch (error) {
    console.error("Error adding rating:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export { createProduct, commentOnProduct, rateProduct };
