import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/error.middlewares.js";

// Import routes
import userRoutes from "./routes/user.routes.js";
import eventRoutes from "./routes/event.routes.js";
import registrationRoutes from "./routes/registration.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import healthcheckRoutes from "./routes/healthcheck.routes.js";

const app = express();

// 1. Basic Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json({ limit: "16kb" })); // Essential for receiving data from registration forms
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // For form data
app.use(express.static("public")); // Serve static files
app.use(cookieParser()); // Needed for user authentication

// 2. API Routes with /api/v1 prefix
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/registrations", registrationRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/healthcheck", healthcheckRoutes);

// 3. Simple Test Route
app.get("/test", (req, res) => {
  res.status(200).json({ message: "Backend is working!" });
});

// 4. 404 Handler for undefined routes (must be before error handler)
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// 5. Error Handling Middleware (must be last)
app.use(errorHandler);

// 6. Export for index.js
export { app };
