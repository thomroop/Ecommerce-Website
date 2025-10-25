// @desc    Utility functions for standardized API responses
// @file    constants/response.js
// @access  Public

// @desc    Send standardized error response
// @usage   errorResponse(res, httpStatus.BAD_REQUEST, "Invalid input")
export const errorResponse = (res, status, message) => {
  const code = typeof status === "object" ? status.code : status;
  return res.status(code).json({ success: false, message });
};

// @desc    Send standardized success response
// @usage   successResponse(res, data, "Fetched successfully", httpStatus.OK)
export const successResponse = (res, data, message, status = 200) => {
  const code = typeof status === "object" ? status.code : status;
  return res.status(code).json({ success: true, message, data });
};

