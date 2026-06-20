const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9]{10}$/;

/**
 * Validates the incoming enquiry payload.
 * Sends a 400 response with field-level errors if validation fails,
 * otherwise passes control to the next handler.
 */
export function validateEnquiry(req, res, next) {
  const { name, email, phone } = req.body ?? {};
  const errors = {};

  if (!name || typeof name !== "string" || !name.trim()) {
    errors.name = "Name is required.";
  } else if (name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!email || typeof email !== "string" || !email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = "Please provide a valid email address.";
  }

  if (!phone || typeof phone !== "string" || !phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!PHONE_PATTERN.test(phone.trim())) {
    errors.phone = "Please provide a valid 10-digit phone number.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: "Please correct the highlighted fields and try again.",
      errors,
    });
  }

  // Normalize the payload for downstream handlers.
  req.body = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
  };

  next();
}
