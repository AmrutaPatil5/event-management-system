import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    type: {
      type: String,
      enum: ["Daily", "Large-Scale"],
      required: [true, "Event type is required"],
    },
    category: {
      type: String,
      required: [true, "Event category is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    date: {
      type: Date,
      required: [true, "Event date is required"],
    },
    deadline: {
      type: Date,
      required: [true, "Registration deadline is required"],
      validate: {
        validator: function (value) {
          return value < this.date;
        },
        message: "Deadline must be before the event date",
      },
    },
    capacity: {
      type: Number,
      required: [true, "Event capacity is required"],
      min: [1, "Capacity must be at least 1"],
    },
    coordinator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Event coordinator is required"],
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    banner: {
      type: String, // Cloudinary URL
      default: "",
    },
    location: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed", "cancelled"],
      default: "upcoming",
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
eventSchema.index({ date: 1 });
eventSchema.index({ coordinator: 1 });
eventSchema.index({ type: 1 });

export const Event = mongoose.model("Event", eventSchema);
