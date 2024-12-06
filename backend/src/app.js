import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Create Express app
const app = express();

// Middleware setup
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true, 
  })
);
app.use(express.json({ limit: "16kb" })); 
app.use(express.urlencoded({ extended: true, limit: "16kb" })); 
app.use(express.static("public")); 
app.use(cookieParser()); 

// Import routes
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from './routes/order.routes.js';

// Route configurations
app.use("/api/v1/users", userRoutes); 
app.use("/api/v1/products", productRoutes); 
app.use('/api/v1/orders', orderRoutes);

// Export the app instance
export { app };
