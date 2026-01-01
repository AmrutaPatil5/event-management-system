import ApiError from "../utils/ApiError.js";

/**
 * Global Error Handling Middleware
 * IMPORTANT: Express ONLY recognizes this as an error handler if it has 4 arguments.
 */
const errorHandler = (err, req, res, next) => {
  let error = err;

  // 1. If error is not an instance of ApiError, convert it
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || error.status || 500;
    const message = error.message || "Internal Server Error";

    // Handle specific DB/Auth errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((el) => ({
        field: el.path,
        message: el.message,
      }));
      error = new ApiError(422, "Validation Error", errors);
    } else if (error.name === "CastError") {
      error = new ApiError(404, `Resource not found. Invalid ${error.path}`);
    } else if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0] || "field";
      error = new ApiError(409, `${field} already exists`);
    } else if (error.name === "JsonWebTokenError") {
      error = new ApiError(401, "Invalid token. Please login again");
    } else if (error.name === "TokenExpiredError") {
      error = new ApiError(401, "Token expired. Please login again");
    } else {
      error = new ApiError(statusCode, message, [], error.stack);
    }
  }

  // 2. Prepare the response
  const statusCode = error.statusCode || 500;
  const response = {
    success: false,
    message: error.message,
    ...(error.errors?.length > 0 ? { errors: error.errors } : {}),
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  };

  // 3. Log for the developer
  if (process.env.NODE_ENV === "development") {
    console.error("DEBUG ERROR:", response);
  }

  // 4. Send the response - DO NOT call next() here
  return res.status(statusCode).json(response);
};

export default errorHandler;
