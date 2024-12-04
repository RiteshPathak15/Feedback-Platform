import express from "express";
import {
  createProduct,
  commentOnProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { Product } from "../models/productUpload.models.js";

const router = express.Router();

// Route for uploading a product with image
router.post("/upload", upload.single("productImage"), createProduct);

// Route for commenting on a product
router.post("/comment", commentOnProduct);

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();  // Fetch all products from DB
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
