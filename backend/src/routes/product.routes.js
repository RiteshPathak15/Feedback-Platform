import express from "express";
import { createProduct, commentOnProduct } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = express.Router();

// Route for uploading a product with image
// router.post("/upload", upload.single("avatar"), createProduct);
router.post("/upload", upload.single("productImage"), createProduct);

// Route for commenting on a product
router.post("/comment", commentOnProduct);

export default router;
 