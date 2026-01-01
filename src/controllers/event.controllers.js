import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Event } from "../models/event.models.js";

/**
 * Create a new event (Coordinator only)
 * POST /api/v1/events
 */
const createEvent = asyncHandler(async (req, res, next) => {
  const {
    title,
    type,
    category,
    description,
    date,
    deadline,
    capacity,
    location,
    banner,
  } = req.body;

  // Validation
  if (!title || !type || !category || !date || !deadline || !capacity) {
    throw new ApiError(400, "All required fields must be provided");
  }

  // Validate deadline is before event date
  const eventDate = new Date(date);
  const deadlineDate = new Date(deadline);
  if (deadlineDate >= eventDate) {
    throw new ApiError(
      400,
      "Registration deadline must be before the event date"
    );
  }

  // Check if user is coordinator or admin
  if (req.user.role !== "coordinator" && req.user.role !== "admin") {
    throw new ApiError(403, "Only coordinators and admins can create events");
  }

  // Create event
  const event = await Event.create({
    title,
    type,
    category,
    description,
    date: eventDate,
    deadline: deadlineDate,
    capacity,
    coordinator: req.user._id,
    location,
    banner,
    participants: [],
  });

  // Populate coordinator details
  await event.populate("coordinator", "name email");

  return res
    .status(201)
    .json(new ApiResponse(201, event, "Event created successfully"));
});

/**
 * Get all events with optional filters
 * GET /api/v1/events
 */
const getAllEvents = asyncHandler(async (req, res, next) => {
  const {
    type,
    category,
    status,
    page = 1,
    limit = 10,
    sortBy = "date",
    sortOrder = "asc",
  } = req.query;

  // Build filter object
  const filter = {};
  if (type) filter.type = type;
  if (category) filter.category = category;
  if (status) filter.status = status;

  // Pagination
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  // Sort
  const sort = {};
  sort[sortBy] = sortOrder === "desc" ? -1 : 1;

  // Query events
  const events = await Event.find(filter)
    .populate("coordinator", "name email")
    .sort(sort)
    .skip(skip)
    .limit(limitNum);

  // Get total count for pagination
  const total = await Event.countDocuments(filter);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        events,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum),
        },
      },
      "Events fetched successfully"
    )
  );
});

/**
 * Get event by ID
 * GET /api/v1/events/:id
 */
const getEventById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const event = await Event.findById(id)
    .populate("coordinator", "name email")
    .populate("participants", "name email");

  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, event, "Event fetched successfully"));
});

/**
 * Update event (Coordinator/Admin only)
 * PUT /api/v1/events/:id
 */
const updateEvent = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const event = await Event.findById(id);
  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  // Check if user is the coordinator or admin
  if (
    event.coordinator.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    throw new ApiError(403, "You don't have permission to update this event");
  }

  // Update event
  const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  }).populate("coordinator", "name email");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedEvent, "Event updated successfully"));
});

/**
 * Delete event (Coordinator/Admin only)
 * DELETE /api/v1/events/:id
 */
const deleteEvent = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const event = await Event.findById(id);
  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  // Check if user is the coordinator or admin
  if (
    event.coordinator.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    throw new ApiError(403, "You don't have permission to delete this event");
  }

  await Event.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Event deleted successfully"));
});

export { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent };
