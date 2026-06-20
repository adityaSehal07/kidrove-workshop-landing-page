import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    workshop: {
      type: String,
      default: "AI & Robotics Summer Workshop",
    },
  },
  { timestamps: true }
);

// Reuse the compiled model across warm serverless invocations instead of
// redefining it (which would throw "Cannot overwrite model" errors).
const Enquiry =
  mongoose.models.Enquiry || mongoose.model("Enquiry", enquirySchema);

export default Enquiry;
