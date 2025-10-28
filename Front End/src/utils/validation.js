// @desc    Validation Utilities - Contains reusable functions for form validation
// @route   Frontend Utility File
// @access  Public

// ✅ Email validation (safe and clean)
export const validateEmail = (email) => {
  // Check that email exists and follows basic pattern
  return email && /^\S+@\S+\.\S+$/.test(email);
};

// ✅ Password validation (minimum 6 characters)
export const validatePassword = (password) => {
  return password && password.length >= 6;
};

// ✅ Optional phone validation (if used elsewhere)
export const validatePhone = (phone) => {
  return phone && /^[0-9]{10}$/.test(phone);
};
