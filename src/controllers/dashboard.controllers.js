import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Event } from "../models/event.models.js";
import { Registration } from "../models/registration.models.js";
import { User } from "../models/user.models.js";

/**
 * Get user dashboard data
 * GET /api/v1/dashboard/user
 */
const getUserDashboard = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  // Get user's registrations
  const registrations = await Registration.find({
    user: userId,
    status: "Confirmed",
  })
    .populate("event", "title date type category location status")
    .sort({ createdAt: -1 })
    .limit(10);

  // Get upcoming events count
  const upcomingEventsCount = await Registration.countDocuments({
    user: userId,
    status: "Confirmed",
    event: {
      $in: await Event.find({
        date: { $gte: new Date() },
        status: { $ne: "cancelled" },
      }).distinct("_id"),
    },
  });

  // Get total registrations count
  const totalRegistrations = await Registration.countDocuments({
    user: userId,
    status: "Confirmed",
  });

  // Get recent events (not registered)
  const registeredEventIds = await Registration.find({
    user: userId,
    status: "Confirmed",
  }).distinct("event");

  const recentEvents = await Event.find({
    _id: { $nin: registeredEventIds },
    date: { $gte: new Date() },
    deadline: { $gte: new Date() },
    status: { $ne: "cancelled" },
  })
    .populate("coordinator", "name email")
    .sort({ date: 1 })
    .limit(5);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        stats: {
          totalRegistrations,
          upcomingEvents: upcomingEventsCount,
        },
        recentRegistrations: registrations,
        recommendedEvents: recentEvents,
      },
      "Dashboard data fetched successfully"
    )
  );
});

/**
 * Get coordinator dashboard data
 * GET /api/v1/dashboard/coordinator
 */
const getCoordinatorDashboard = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  // Check if user is coordinator or admin
  if (req.user.role !== "coordinator" && req.user.role !== "admin") {
    throw new ApiError(403, "Only coordinators can access this dashboard");
  }

  // Get events created by coordinator
  const myEvents = await Event.find({
    coordinator: userId,
  })
    .populate("participants", "name email")
    .sort({ createdAt: -1 });

  // Get event statistics
  const totalEvents = myEvents.length;
  const upcomingEvents = myEvents.filter(
    (event) =>
      new Date(event.date) >= new Date() && event.status !== "cancelled"
  ).length;
  const completedEvents = myEvents.filter(
    (event) => new Date(event.date) < new Date() || event.status === "completed"
  ).length;

  // Get registration statistics for each event
  const eventsWithStats = await Promise.all(
    myEvents.map(async (event) => {
      const registrations = await Registration.countDocuments({
        event: event._id,
        status: "Confirmed",
      });

      return {
        ...event.toObject(),
        registrationCount: registrations,
        availableSlots: event.capacity - registrations,
        isFull: registrations >= event.capacity,
      };
    })
  );

  // Get recent registrations across all events
  const recentRegistrations = await Registration.find({
    event: { $in: myEvents.map((e) => e._id) },
    status: "Confirmed",
  })
    .populate("user", "name email")
    .populate("event", "title date")
    .sort({ createdAt: -1 })
    .limit(10);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        stats: {
          totalEvents,
          upcomingEvents,
          completedEvents,
        },
        events: eventsWithStats,
        recentRegistrations,
      },
      "Coordinator dashboard data fetched successfully"
    )
  );
});

export { getUserDashboard, getCoordinatorDashboard };
