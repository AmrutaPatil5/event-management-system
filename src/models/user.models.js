import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Don't return password by default
    },
    role: {
      type: String,
      enum: ["student", "coordinator", "admin"],
      default: "student",
    },
    avatar: {
      type: String, // Cloudinary URL
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

/**
 * FIXED: Pre-save hook for password hashing.
 * Removing the 'next' parameter prevents the "next is not a function"
 * TypeError when used with async/await in modern Mongoose.
 */
userSchema.pre("save", async function () {
  // 1. Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return;

  try {
    // 2. Hash the password with a salt round of 10
    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    // 3. If hashing fails, throw the error so the Global Error Handler catches it
    throw error;
  }
});

// Method to compare password for login
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "7d",
    }
  );
};

// Method to generate refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "30d",
    }
  );
};

export const User = mongoose.model("User", userSchema);
