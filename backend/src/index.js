import express from "express";
import dotenv from "dotenv";
import connectDB from './db/index.js';
import { app } from './app.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 3000;

// Resolve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Connect to the database
connectDB()
  .then(() => {
    console.log("Database connected successfully.");

    // Serve React static files
    app.use(express.static(path.join(__dirname, "../frontend/build")));

    // Fallback route for React SPA
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
    });

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
