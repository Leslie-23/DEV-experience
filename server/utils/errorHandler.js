// utils/errorHandler.js (global error handler)
const errorHandler = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      message: "Invalid token",
      error: err.message,
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation Error",
      error: err.message,
    });
  }

  // Default error
  return res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
};

module.exports = errorHandler;
