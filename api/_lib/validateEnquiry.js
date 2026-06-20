const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9]{10}$/;

/**
 * Validates the enquiry payload and returns either:
 * { valid: true, data: { name, email, phone } }
 * or
 * { valid: false, errors: { name?, email?, phone? } }
 */
export function validateEnquiryPayload(body) {
  const { name, email, phone } = body ?? {};
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
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
    },
  };
}
