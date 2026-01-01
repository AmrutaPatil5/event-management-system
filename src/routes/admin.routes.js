import express from "express";
import {
  getAllUsers,
  deleteUser,
  getAdminStats,
} from "../controllers/admin.controllers.js";
import { verifyJWT, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

// All admin routes require authentication and admin role
router.use(verifyJWT);
router.use(authorize("admin"));

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.get("/stats", getAdminStats);

export default router;
