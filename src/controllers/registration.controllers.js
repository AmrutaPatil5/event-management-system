import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Event } from "../models/event.models.js";
import { Registration } from "../models/registration.models.js";
import { User } from "../models/user.models.js";
import { sendRegistrationEmail } from "../utils/nodemailer.js";

/**
 * Register user for an event
 * POST /api/v1/registrations
 */
const joinEvent = asyncHandler(async (req, res) => {
  const { eventId, teamName, teamMembers } = req.body;
  const userId = req.user._id;

  // 1. Validation
  if (!eventId) {
    throw new ApiError(400, "Event ID is required");
  }

  // 2. Find event and check existence
  const event = await Event.findById(eventId);
  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  // 3. Check if registration deadline has passed
  const now = new Date();
  if (event.deadline && new Date(event.deadline) < now) {
    throw new ApiError(400, "Registration deadline has passed");
  }

  // 4. Check if user is already registered (Strict check)
  const existingRegistration = await Registration.findOne({
    user: userId,
    event: eventId,
    status: { $ne: "Cancelled" }, // Allow re-registration if previous was cancelled
  });

  if (existingRegistration) {
    throw new ApiError(409, "You are already registered for this event");
  }

  // 5. Check event capacity
  const currentRegistrations = await Registration.countDocuments({
    event: eventId,
    status: "Confirmed",
  });

  if (currentRegistrations >= event.capacity) {
    throw new ApiError(400, "Event is at full capacity");
  }

  // 6. Large-Scale event team validation
  if (event.type === "Large-Scale") {
    if (!teamName) {
      throw new ApiError(400, "Team name is required for Large-Scale events");
    }

    if (teamMembers && teamMembers.length > 0) {
      const teamMemberUsers = await User.find({
        _id: { $in: teamMembers },
      });

      if (teamMemberUsers.length !== teamMembers.length) {
        throw new ApiError(400, "One or more team members not found");
      }

      const teamRegistrations = await Registration.find({
        event: eventId,
        user: { $in: teamMembers },
        status: "Confirmed",
      });

      if (teamRegistrations.length > 0) {
        throw new ApiError(
          409,
          "One or more team members are already registered for this event"
        );
      }
    }
  }

  // 7. Create registration
  const registration = await Registration.create({
    user: userId,
    event: eventId,
    teamName: event.type === "Large-Scale" ? teamName : undefined,
    teamMembers: event.type === "Large-Scale" && teamMembers ? teamMembers : [],
    status: "Confirmed",
  });

  // 8. Update Event Participants
  await Event.findByIdAndUpdate(eventId, {
    $addToSet: { participants: userId },
  });

  // 9. Populate details for response and email
  await registration.populate([
    { path: "user", select: "name email" },
    { path: "event", select: "title date type" },
    { path: "teamMembers", select: "name email" },
  ]);

  // 10. Send registration confirmation email
  try {
    await sendRegistrationEmail(
      req.user.email,
      req.user.name,
      event.title,
      registration._id, // Changed registrationId to _id to ensure it exists
      event.date
    );
  } catch (emailError) {
    console.error("Email Service Error:", emailError.message);
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, registration, "Successfully registered for event")
    );
});

/**
 * Cancel registration
 * DELETE /api/v1/registrations/:id
 */
const cancelRegistration = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const registration = await Registration.findById(id);
  if (!registration) {
    throw new ApiError(404, "Registration not found");
  }

  // Permission check
  if (
    registration.user.toString() !== userId.toString() &&
    req.user.role !== "admin"
  ) {
    throw new ApiError(403, "Permission denied to cancel this registration");
  }

  const event = await Event.findById(registration.event);
  if (event && new Date(event.date) < new Date()) {
    throw new ApiError(
      400,
      "Cannot cancel registration after event has started"
    );
  }

  registration.status = "Cancelled";
  await registration.save();

  await Event.findByIdAndUpdate(registration.event, {
    $pull: { participants: registration.user },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, registration, "Registration cancelled successfully")
    );
});

/**
 * Get user's registrations
 * GET /api/v1/registrations/my
 */
const getMyRegistrations = asyncHandler(async (req, res) => {
  const registrations = await Registration.find({ user: req.user._id })
    .populate("event", "title date type category location")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(
      new ApiResponse(200, registrations, "Registrations fetched successfully")
    );
});

/**
 * Get registrations for an event (Coordinator/Admin only)
 */
const getEventRegistrations = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  if (req.user.role !== "coordinator" && req.user.role !== "admin") {
    throw new ApiError(403, "Access restricted to coordinators and admins");
  }

  const event = await Event.findById(eventId);
  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  if (
    event.coordinator.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    throw new ApiError(403, "You do not manage this event");
  }

  const registrations = await Registration.find({
    event: eventId,
    status: "Confirmed",
  })
    .populate("user", "name email")
    .populate("teamMembers", "name email")
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        event: {
          title: event.title,
          capacity: event.capacity,
          currentRegistrations: registrations.length,
        },
        registrations,
      },
      "Event registrations fetched successfully"
    )
  );
});

export {
  joinEvent,
  cancelRegistration,
  getMyRegistrations,
  getEventRegistrations,
};
