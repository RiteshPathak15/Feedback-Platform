// product.routes.js

import express from "express";
import {
  createProduct,
  commentOnProduct,
} from "../controllers/product.controller.js";
import { verifyPremium } from "../middlewares/auth.middlewares.js";

const router = express.Router();

// Route for uploading product (Only for premium users)
router.post("/upload", verifyPremium, createProduct);

// Route for commenting on a product (Available for both premium and non-premium users)
router.post("/comment", commentOnProduct);

export default router;
