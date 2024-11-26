import { User } from "../models/user.models.js";
// import bcrypt from "bcrypt";

// Register User
const registerUser = async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;

    // Validation
    if (!fullname || !username || !email || !password) {
      console.log("All fields are required for registration");
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email or username already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      console.log("User already registered with this email or username");
      return res
        .status(400)
        .json({ message: "Email or username already registered" });
    }

    // Hash password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      fullname,
      username,
      email,
      password,
    });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        username: newUser.username,
        rewardpoints: newUser.rewardpoints,
      },
    });
  } catch (error) {
    console.log("Error with registration", error);
    res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Validation
    if (!email && !username) {
      console.log("Email or username is required for login");
      return res
        .status(400)
        .json({ message: "Email or username is required" });
    }
    if (!password) {
      console.log("Password is required for login");
      return res.status(400).json({ message: "Password is required" });
    }

    // Find user by email or username
    const user = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // Validate password
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      console.log("Incorrect password");
      return res.status(400).json({ message: "Invalid password credentials" });
    }

    // Generate tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        username: user.username,
        rewardpoints: user.rewardpoints,
        isPremium: user.isPremium,
      },
    });

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "Login successful",
        tokens: { accessToken, refreshToken },
      });
  } catch (error) {
    console.error("Error in loginUser:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

export { registerUser, loginUser };
