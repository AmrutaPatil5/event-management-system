import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controllers.js";
import { verifyJWT, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllEvents);
router.get("/:id", getEventById);

// Protected routes (Coordinator/Admin only for create, update, delete)
router.post("/", verifyJWT, authorize("coordinator", "admin"), createEvent);
router.put("/:id", verifyJWT, authorize("coordinator", "admin"), updateEvent);
router.delete(
  "/:id",
  verifyJWT,
  authorize("coordinator", "admin"),
  deleteEvent
);

export default router;
