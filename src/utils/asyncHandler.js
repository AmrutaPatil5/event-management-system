/**
 * Async Handler Utility
 *
 * Wraps async route handlers to automatically catch errors
 * and pass them to Express error handling middleware.
 *
 * @param {Function} fn - Async function to wrap
 * @returns {Function} - Wrapped function that handles errors
 *
 * @example
 * router.get('/users', asyncHandler(async (req, res) => {
 *   const users = await User.find();
 *   res.json(users);
 * }));
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
