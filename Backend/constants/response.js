// constants/response.js

export const errorResponse = (res, status, message) => {
  const code = typeof status === "object" ? status.code : status;
  return res.status(code).json({ success: false, message });
};

export const successResponse = (res, data, message, status = 200) => {
  const code = typeof status === "object" ? status.code : status;
  return res.status(code).json({ success: true, message, data });
};

