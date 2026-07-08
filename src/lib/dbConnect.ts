import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

// Initialize mock store for zero-database offline deployment fallback
if (!(global as any).mockStore) {
  (global as any).mockStore = {
    bookings: [],
    users: [],
  };
}

async function dbConnect() {
  if (!MONGODB_URI) {
    (global as any).IS_MOCKED_DB = true;
    console.warn("MONGODB_URI is not set. Operating in offline mock mode.");
    return { conn: null, mock: true };
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
