/**
 * Standardized API Response Class
 *
 * Provides a consistent response format across all API endpoints.
 * Automatically determines success status based on HTTP status code.
 */
class ApiResponse {
  /**
   * @param {number} statusCode - HTTP status code
   * @param {*} data - Response data
   * @param {string} message - Response message
   */
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }

  /**
   * Convert to plain object for JSON serialization
   */
  toJSON() {
    return {
      success: this.success,
      message: this.message,
      data: this.data,
    };
  }

  /**
   * Sends the response to the client (legacy method)
   * @param {Object} res - Express response object
   */
  send(res) {
    return res.status(this.statusCode).json(this.toJSON());
  }
}

export default ApiResponse;
