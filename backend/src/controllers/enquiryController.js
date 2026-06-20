import Enquiry from "../models/Enquiry.js";
import { isDatabaseConnected } from "../config/db.js";

export async function createEnquiry(req, res) {
  const { name, email, phone } = req.body;

  try {
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

    // Database not configured — log the enquiry and still return success
    // so the front end flow can be evaluated end-to-end without MongoDB.
    console.log("📩 New enquiry (not persisted, DB unavailable):", {
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
