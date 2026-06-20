import express from "express";
import { validateEnquiry } from "../middleware/validateEnquiry.js";
import { createEnquiry } from "../controllers/enquiryController.js";

const router = express.Router();

// POST /api/enquiry
router.post("/enquiry", validateEnquiry, createEnquiry);

export default router;
