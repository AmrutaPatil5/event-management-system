import mongoose from "mongoose";

// Generate unique registration ID
const generateRegistrationId = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `REG-${timestamp}-${randomStr}`;
};

const registrationSchema = new mongoose.Schema(
  {
    registrationId: {
      type: String,
      required: true,
      unique: true,
      default: generateRegistrationId,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event is required"],
    },
    status: {
      type: String,
      enum: ["Confirmed", "Cancelled"],
      default: "Confirmed",
    },
    teamName: {
      type: String,
      trim: true,
      // Only required for Large-Scale events
    },
    teamMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Compound index to prevent duplicate registrations
registrationSchema.index({ user: 1, event: 1 }, { unique: true });

// Index for better query performance
registrationSchema.index({ event: 1 });
registrationSchema.index({ user: 1 });
registrationSchema.index({ registrationId: 1 });

export const Registration = mongoose.model("Registration", registrationSchema);
