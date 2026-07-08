import mongoose from "mongoose";

const TrainerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Trainer name is required"],
    },
    image: {
      type: String,
      required: [true, "Trainer image URL is required"],
    },
    experience: {
      type: String,
      required: true, // e.g., "8+ Years"
    },
    specializations: {
      type: [String],
      default: [], // e.g., ["Strength", "Powerlifting", "Mobility"]
    },
    certifications: {
      type: [String],
      default: [], // e.g., ["ACE Certified Personal Trainer", "ISSA Nutritionist"]
    },
    achievements: {
      type: [String],
      default: [], // e.g., ["State Benchpress Champion 2024"]
    },
    instagram: {
      type: String,
      default: "",
    },
    linkedin: {
      type: String,
      default: "",
    },
    slots: {
      type: [String],
      default: ["08:00 AM", "10:00 AM", "12:00 PM", "04:00 PM", "06:00 PM", "08:00 PM"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Trainer || mongoose.model("Trainer", TrainerSchema);
