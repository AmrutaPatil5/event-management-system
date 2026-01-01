import express from "express";
import { healthcheck } from "../controllers/healthcheck.controller.js";

const router = express.Router();

// Public route - no authentication required
router.get("/", healthcheck);

export default router;
