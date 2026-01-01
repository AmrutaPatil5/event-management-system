import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { Event } from "../models/event.models.js";
import { Registration } from "../models/registration.models.js";

/**
 * Get all users (Admin only)
 * GET /api/v1/admin/users
 */
const getAllUsers = asyncHandler(async (req, res, next) => {
  // Check if user is admin
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Only admins can access this resource");
  }

  const { role, page = 1, limit = 10, search } = req.query;

  // Build filter
  const filter = {};
  if (role) filter.role = role;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  // Pagination
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  // Query users
  const users = await User.find(filter)
    .select("-password")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNum);

  // Get total count
  const total = await User.countDocuments(filter);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        users,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum),
        },
      },
      "Users fetched successfully"
    )
  );
});

/**
 * Delete user (Admin only)
 * DELETE /api/v1/admin/users/:id
 */
const deleteUser = asyncHandler(async (req, res, next) => {
  // Check if user is admin
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Only admins can delete users");
  }

  const { id } = req.params;

  // Prevent admin from deleting themselves
  if (id === req.user._id.toString()) {
    throw new ApiError(400, "You cannot delete your own account");
  }

  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Delete user's registrations
  await Registration.deleteMany({ user: id });

  // Remove user from event participants
  await Event.updateMany({ participants: id }, { $pull: { participants: id } });

  // If user is a coordinator, handle their events
  if (user.role === "coordinator") {
    // Option 1: Delete events (uncomment if preferred)
    // await Event.deleteMany({ coordinator: id });

    // Option 2: Reassign to admin (current implementation)
    const admin = await User.findOne({ role: "admin" });
    if (admin) {
      await Event.updateMany({ coordinator: id }, { coordinator: admin._id });
    }
  }

  // Delete user
  await User.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User deleted successfully"));
});

/**
 * Get admin dashboard statistics
 * GET /api/v1/admin/stats
 */
const getAdminStats = asyncHandler(async (req, res, next) => {
  // Check if user is admin
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Only admins can access this resource");
  }

  // Get statistics
  const totalUsers = await User.countDocuments();
  const totalStudents = await User.countDocuments({ role: "student" });
  const totalCoordinators = await User.countDocuments({ role: "coordinator" });
  const totalAdmins = await User.countDocuments({ role: "admin" });

  const totalEvents = await Event.countDocuments();
  const upcomingEvents = await Event.countDocuments({
    date: { $gte: new Date() },
    status: { $ne: "cancelled" },
  });
  const completedEvents = await Event.countDocuments({
    $or: [{ date: { $lt: new Date() } }, { status: "completed" }],
  });

  const totalRegistrations = await Registration.countDocuments({
    status: "Confirmed",
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        users: {
          total: totalUsers,
          students: totalStudents,
          coordinators: totalCoordinators,
          admins: totalAdmins,
        },
        events: {
          total: totalEvents,
          upcoming: upcomingEvents,
          completed: completedEvents,
        },
        registrations: {
          total: totalRegistrations,
        },
      },
      "Admin statistics fetched successfully"
    )
  );
});

export { getAllUsers, deleteUser, getAdminStats };
