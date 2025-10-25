

// @desc    Handle 404 Not Found errors for undefined routes
// @route   Middleware
// @access  Public
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// @desc    Handle server errors and return proper JSON responses
// @route   Middleware
// @access  Public
export const errorHandler = (err, req, res, next) => {
  // If response status is still 200, set it to 500 (server error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message,
    // Show error stack only in development mode
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
