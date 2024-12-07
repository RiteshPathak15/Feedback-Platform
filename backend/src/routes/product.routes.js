import express from "express";
import {
  createProduct,
  commentOnProduct,
  rateProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { Product } from "../models/productUpload.models.js";

const router = express.Router();

router.use(verifyJWT); // Ensure users are authenticated

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

// Upload a new product (only for premium users)
router.post("/upload", upload.single("productImage"), createProduct);

// Add a comment to a product
router.post("/comment", commentOnProduct);

// Rate a product
router.post("/rate", rateProduct);

// Get product details by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("addedBy", "username")
      .populate("comments.userId", "username");

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
