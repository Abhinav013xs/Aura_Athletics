import mongoose from "mongoose";

const DietPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // Null for global plans
    },
    name: {
      type: String,
      required: true, // e.g. "Lean Bulking (Vegetarian)"
    },
    totalCalories: {
      type: Number,
      required: true, // e.g., 2800
    },
    macros: {
      proteinGrams: { type: Number, required: true },
      carbGrams: { type: Number, required: true },
      fatGrams: { type: Number, required: true },
    },
    meals: [
      {
        mealType: { type: String, enum: ["Breakfast", "Lunch", "Dinner", "Snacks"], required: true },
        name: { type: String, required: true }, // e.g., "Oats with Almond Butter & Whey"
        calories: { type: Number, default: 400 },
      },
    ],
    shoppingList: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.DietPlan || mongoose.model("DietPlan", DietPlanSchema);
