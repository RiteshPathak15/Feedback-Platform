import express from "express";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/github", (req, res) => {
  res.send("this is github");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
