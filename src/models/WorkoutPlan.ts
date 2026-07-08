import mongoose from "mongoose";

const WorkoutPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // If null, it is a global template
    },
    name: {
      type: String,
      required: true, // e.g. "Push Day (Hypertrophy)"
    },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Intermediate",
    },
    durationMin: {
      type: Number,
      required: true, // Total target duration, e.g. 45
    },
    calories: {
      type: Number,
      required: true, // Est. burned, e.g. 350
    },
    exercises: [
      {
        name: { type: String, required: true },
        sets: { type: Number, required: true },
        reps: { type: String, required: true }, // e.g., "8-12" or "10"
        restSeconds: { type: Number, default: 90 },
        equipment: { type: String, default: "Dumbbell" },
        muscleTarget: { type: String, default: "Chest" },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.WorkoutPlan || mongoose.model("WorkoutPlan", WorkoutPlanSchema);
