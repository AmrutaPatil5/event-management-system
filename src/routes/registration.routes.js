import express from "express";
import {
  joinEvent,
  cancelRegistration,
  getMyRegistrations,
  getEventRegistrations,
} from "../controllers/registration.controllers.js";
import { verifyJWT, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

// All registration routes require authentication
router.use(verifyJWT);

// User routes
router.post("/", joinEvent);
router.get("/my", getMyRegistrations);
router.delete("/:id", cancelRegistration);

// Coordinator/Admin routes
router.get(
  "/event/:eventId",
  authorize("coordinator", "admin"),
  getEventRegistrations
);

export default router;
