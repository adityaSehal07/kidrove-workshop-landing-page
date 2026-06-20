import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./src/config/db.js";
import enquiryRoutes from "./src/routes/enquiryRoutes.js";

dotenv.config();

const app = express();

// Connect to the database once when the module loads (works for both
// the local long-running server and Vercel's serverless function reuse).
connectDatabase();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Kidrove Workshop API is running." });
});

// Routes
app.use("/api", enquiryRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, message: "Internal server error." });
});

export default app;
