// backend/routes/product.routes.js
import express from "express";
import { Product } from "../models/productUpload.models.js";
import {
  createProduct,
  commentOnProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";

// Import authentication middleware if applicable
import { verifyJWT } from "../middlewares/auth.middlewares.js"; // Ensure this exists if used

const router = express.Router();

// Apply authentication middleware to all routes below if needed
router.use(verifyJWT); // Uncomment if you have authentication

// Route for uploading a product with image (only for premium users)
router.post("/upload", upload.single("productImage"), createProduct);

// Route for commenting on a product
router.post("/comment", commentOnProduct);

// Route to get products by category
router.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category }).populate(
      "addedBy",
      "username"
    );
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("addedBy", "username");
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to get product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "addedBy",
      "username"
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
