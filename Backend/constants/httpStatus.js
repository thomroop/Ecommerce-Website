// @desc     Centralized HTTP status code definitions and messages
// @file     constants/httpStatus.js
// @access   Public (Imported across backend files)
// @usage    Provides consistent status codes and messages for API responses
// @example  res.status(httpStatus.OK.code).json({ message: httpStatus.OK.message })
// @returns  Object containing standardized HTTP response structures

const httpStatus = {
  OK: {
    code: 200,
    message: "OK",
  },
  CREATED: {
    code: 201,
    message: "Resource created successfully",
  },
  BAD_REQUEST: {
    code: 400,
    message: "Bad Request",
  },
  UNAUTHORIZED: {
    code: 401,
    message: "Unauthorized",
  },
  FORBIDDEN: {
    code: 403,
    message: "Forbidden",
  },
  NOT_FOUND: {
    code: 404,
    message: "Resource not found",
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: "Internal Server Error",
  },
};

export default httpStatus;
