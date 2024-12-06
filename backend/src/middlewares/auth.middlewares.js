// import jwt from "jsonwebtoken";
// import { User } from "../models/user.models.js";

// export const verifyJWT = async (req, res, next) => {
//   try {
//     const token =
//       req.cookies?.accessToken ||
//       req.header("Authorization")?.replace("Bearer ", "");

//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: "Unauthorized request. No token provided." });
//     }

//     if (!process.env.ACCESS_TOKEN_SECRET) {
//       console.error(
//         "ACCESS_TOKEN_SECRET is not defined in environment variables"
//       );
//       return res.status(500).json({ message: "Internal Server Error" });
//     }

//     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//     const user = await User.findById(decodedToken?._id).select(
//       "-password -refreshToken"
//     );

//     if (!user) {
//       return res
//         .status(401)
//         .json({ message: "Invalid Access Token. User not found." });
//     }

//     req.user = user; // Attach the user object to the request
//     next();
//   } catch (error) {
//     if (error.name === "TokenExpiredError") {
//       return res
//         .status(401)
//         .json({ message: "Token has expired. Please login again." });
//     }
//     console.error("JWT Verification Error:", { message: error.message });
//     return res.status(401).json({ message: "Invalid Access Token" });
//   }
// };

import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const verifyJWT = async (req, res, next) => {
  try {
    // Attempt to retrieve the token from either cookies or Authorization header
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized request. No token provided." });
    }

    // Ensure that the ACCESS_TOKEN_SECRET is defined in the environment variables
    if (!process.env.ACCESS_TOKEN_SECRET) {
      console.error(
        "ACCESS_TOKEN_SECRET is not defined in environment variables"
      );
      return res.status(500).json({ message: "Internal Server Error" });
    }

    // Decode and verify the JWT token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // If token is invalid or decodedToken is not present, return 401
    if (!decodedToken?._id) {
      return res
        .status(401)
        .json({ message: "Invalid Access Token. User not found." });
    }

    // Fetch user by ID (omit sensitive fields like password and refreshToken)
    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    // Check if the user exists
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid Access Token. User not found." });
    }

    // Attach the user object to the request for further use in other routes
    req.user = user;
    next();
  } catch (error) {
    // Handle different types of errors with specific messages
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token has expired. Please login again." });
    }

    // Log the error for debugging purposes
    console.error("JWT Verification Error:", error.message);

    // Return a generic invalid token error
    return res.status(401).json({ message: "Invalid Access Token" });
  }
};
