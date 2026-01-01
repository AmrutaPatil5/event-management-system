import express from "express";
import {
  getUserDashboard,
  getCoordinatorDashboard,
} from "../controllers/dashboard.controllers.js";
import { verifyJWT, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

// All dashboard routes require authentication
router.use(verifyJWT);

// User dashboard
router.get("/user", getUserDashboard);

// Coordinator dashboard
router.get(
  "/coordinator",
  authorize("coordinator", "admin"),
  getCoordinatorDashboard
);

export default router;
