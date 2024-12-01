import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized request. No token provided." });
    }

    if (!process.env.ACCESS_TOKEN_SECRET) {
      console.error(
        "ACCESS_TOKEN_SECRET is not defined in environment variables"
      );
      return res.status(500).json({ message: "Internal Server Error" });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid Access Token. User not found." });
    }

    req.user = user; // Attach the user object to the request
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token has expired. Please login again." });
    }
    console.error("JWT Verification Error:", { message: error.message });
    return res.status(401).json({ message: "Invalid Access Token" });
  }
};


