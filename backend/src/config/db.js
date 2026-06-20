import mongoose from "mongoose";

/**
 * MongoDB connection is optional. If MONGODB_URI is not set in the
 * environment, the server will still run and the /api/enquiry endpoint
 * will simply log enquiries instead of persisting them.
 */
export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.log("ℹ️  MONGODB_URI not set — running without database persistence.");
    return false;
  }

  try {
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB");
    return true;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    console.log("ℹ️  Continuing without database persistence.");
    return false;
  }
}

export function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}
