import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { sendWelcomeEmail } from "../utils/nodemailer.js";

/**
 * Register a new user
 */
const registerUser = asyncHandler(async (req, res, next) => {
  // Added 'next'
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "Name, email, and password are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || "student",
  });

  const createdUser = await User.findById(user._id).select("-password");

  try {
    await sendWelcomeEmail(user.email, user.name);
  } catch (emailError) {
    console.error("Failed to send welcome email:", emailError);
  }

  // Using .json() is more standard for Express responses
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

/**
 * Login user
 */
const loginUser = asyncHandler(async (req, res, next) => {
  // Added 'next'
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  const loggedInUser = await User.findById(user._id).select("-password");

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("cookieRefreshToken", refreshToken, options) // Standardized cookie name
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

/**
 * Logout user
 */
const logoutUser = asyncHandler(async (req, res, next) => {
  // Added 'next'
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };
  console.log(`User Logged Out: ${req.user.name} (${req.user.email})`);
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("cookieRefreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

/**
 * Get current user profile
 */
const getCurrentUser = asyncHandler(async (req, res, next) => {
  // Added 'next'
  const user = await User.findById(req.user?._id).select("-password");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User profile fetched successfully"));
});

export { registerUser, loginUser, logoutUser, getCurrentUser };
