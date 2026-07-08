import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    name: {
      type: String,
      required: [true, "Customer name is required"],
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    program: {
      type: String,
      required: true, // e.g., "Free Trial", "Elite Membership Training", "Pilates Class"
    },
    trainerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainer",
      required: false,
    },
    date: {
      type: String,
      required: true, // "YYYY-MM-DD"
    },
    timeSlot: {
      type: String,
      required: true, // e.g., "10:00 AM"
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    amount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
