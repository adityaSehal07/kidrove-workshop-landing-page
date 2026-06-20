import { validateEnquiryPayload } from "./_lib/validateEnquiry.js";
import { connectDatabase, isDatabaseConnected } from "./_lib/db.js";
import Enquiry from "./_lib/Enquiry.js";

// Basic CORS so the frontend (deployed separately or from a different
// origin during local development) can call this endpoint.
function applyCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req, res) {
  applyCors(res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed." });
  }

  const result = validateEnquiryPayload(req.body);

  if (!result.valid) {
    return res.status(400).json({
      success: false,
      message: "Please correct the highlighted fields and try again.",
      errors: result.errors,
    });
  }

  const { name, email, phone } = result.data;

  try {
    await connectDatabase();

    if (isDatabaseConnected()) {
      const enquiry = await Enquiry.create({ name, email, phone });
      return res.status(201).json({
        success: true,
        message: "Registration received! We'll be in touch soon.",
        data: {
          id: enquiry._id,
          name: enquiry.name,
          email: enquiry.email,
          phone: enquiry.phone,
        },
      });
    }

    // No database configured — log and still confirm success so the
    // registration flow works end-to-end without MongoDB.
    console.log("New enquiry (not persisted, DB unavailable):", {
      name,
      email,
      phone,
      receivedAt: new Date().toISOString(),
    });

    return res.status(201).json({
      success: true,
      message: "Registration received! We'll be in touch soon.",
    });
  } catch (error) {
    console.error("Error creating enquiry:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong on our end. Please try again shortly.",
    });
  }
}
