import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

/**
 * Health check endpoint
 * GET /api/v1/healthcheck
 */
const healthcheck = asyncHandler(async (req, res, next) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || "development",
      },
      "API is healthy"
    )
  );
});

export { healthcheck };
