import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Create Express app
const app = express();

// Middleware setup
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true, // Enables credentials like cookies, headers, etc.
  })
);
app.use(express.json({ limit: "16kb" })); // JSON parsing with limit
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // URL-encoded parsing with limit
app.use(express.static("public")); // Serve static files
app.use(cookieParser()); // Parse cookies

// Import routes
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";

// Route configurations
app.use("/api/v1/users", userRoutes); // For user-related routes
app.use("/api/v1/products", productRoutes); // For product-related routes

// Export the app instance
export { app };
