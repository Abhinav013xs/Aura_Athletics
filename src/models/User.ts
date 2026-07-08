import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["admin", "trainer", "member"],
      default: "member",
    },
    loyaltyPoints: {
      type: Number,
      default: 0,
    },
    badges: {
      type: [String],
      default: [], // e.g., ["Iron Starter", "Water Champion", "Goal Crusher"]
    },
    attendance: {
      type: [String], // Array of date strings: "YYYY-MM-DD"
      default: [],
    },
    waterLogs: [
      {
        date: { type: String, required: true }, // "YYYY-MM-DD"
        amountMl: { type: Number, required: true },
      },
    ],
    sleepLogs: [
      {
        date: { type: String, required: true }, // "YYYY-MM-DD"
        hours: { type: Number, required: true },
      },
    ],
    measurements: [
      {
        date: { type: String, required: true }, // "YYYY-MM-DD"
        weightKg: { type: Number, required: true },
        bodyFatPct: { type: Number },
        chestCm: { type: Number },
        waistCm: { type: Number },
        armsCm: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
