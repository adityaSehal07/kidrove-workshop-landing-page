import mongoose from "mongoose";

/**
 * MongoDB connection for serverless functions.
 *
 * Serverless functions can be reused across invocations (warm starts), so we
 * cache the connection promise on the global object to avoid reconnecting on
 * every request. If MONGODB_URI isn't set, this resolves to "no connection"
 * and the calling code falls back to logging instead of persisting.
 */
let cachedConnectionPromise = global._mongooseConnectionPromise;

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return false;
  }

  if (!cachedConnectionPromise) {
    cachedConnectionPromise = mongoose
      .connect(uri)
      .then(() => true)
      .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
        cachedConnectionPromise = null;
        return false;
      });
    global._mongooseConnectionPromise = cachedConnectionPromise;
  }

  return cachedConnectionPromise;
}

export function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}
