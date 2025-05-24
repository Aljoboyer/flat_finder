// Success response
const successResponse = (res, statusCode = 200, msg = "Success", data = {}) => {
  return res.status(statusCode).json({
    success: true,
    msg,
    data
  });
};

// Error response
const errorResponse = (res, statusCode = 500, msg = "Something went wrong", error = {}) => {
  return res.status(statusCode).json({
    success: false,
    msg,
    error
  });
};

module.exports = {
  successResponse,
  errorResponse
};
