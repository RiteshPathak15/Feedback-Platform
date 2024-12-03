import { Product } from "../models/productUpload.models.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createProduct = async (req, res) => {
  try {
    const { Imgname, description, price, category, addedBy } = req.body;

    // Validate required fields
    if (!Imgname || !description || !price || !category || !req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user is premium
    const user = await User.findById(addedBy);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.isPremium) {
      return res
        .status(403)
        .json({ message: "Only premium users can upload products" });
    }

    // Upload image to Cloudinary
    const productImg = await uploadOnCloudinary(req.file.path);
    if (!productImg || !productImg.url) {
      return res.status(500).json({ message: "Error uploading product image" });
    }

    // Create and save the product
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

const commentOnProduct = async (req, res) => {
  try {
    const { productId, userId, comment } = req.body;

    // Validate inputs
    if (!productId || !userId || !comment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Calculate points based on comment length
    const points = comment.length > 50 ? 10 : 5;

    // Update the pointsEarned for the product
    product.pointsEarned += points;
    product.comments = product.comments || [];
    product.comments.push({ userId, username: req.user.username, comment });

    await product.save();

    // Recalculate total reward points for the user
    const totalPoints = await Product.aggregate([
      { $match: { "comments.userId": userId } },
      { $group: { _id: null, totalPoints: { $sum: "$pointsEarned" } } },
    ]);

    const rewardPoints =
      totalPoints.length > 0 ? totalPoints[0].totalPoints : 0;

    // Update the user's rewardPoints
    await User.findByIdAndUpdate(userId, { rewardpoints: rewardPoints });

    res.status(200).json({
      message: "Comment added successfully",
      updatedRewardPoints: rewardPoints,
      product,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export { createProduct, commentOnProduct };
