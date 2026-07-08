import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import WorkoutPlan from "@/models/WorkoutPlan";
import DietPlan from "@/models/DietPlan";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { userId, name, goal, fitnessLevel, dietPref, weightKg, heightCm } = body;

    if (!goal || !fitnessLevel || !dietPref || !weightKg || !heightCm) {
      return NextResponse.json({ error: "Goal, level, diet, weight, and height are required" }, { status: 400 });
    }

    // Calorie & Macro calculator
    const weight = Number(weightKg);
    const height = Number(heightCm);
    
    // Estimate Maintenance calories
    let bmr = 10 * weight + 6.25 * height - 5 * 25 + 5; // Default age 25 male BMR
    let maintenance = Math.round(bmr * 1.5); // Moderate activity

    let targetCalories = maintenance;
    let protein = Math.round(weight * 2.2); // 2.2g per kg
    let fat = Math.round((weight * 1.0)); // 1.0g per kg
    let carbs = 0;

    if (goal === "fat-loss") {
      targetCalories = Math.round(maintenance * 0.8); // 20% deficit
      carbs = Math.round((targetCalories - (protein * 4 + fat * 9)) / 4);
    } else if (goal === "muscle-gain") {
      targetCalories = Math.round(maintenance * 1.15); // 15% surplus
      carbs = Math.round((targetCalories - (protein * 4 + fat * 9)) / 4);
    } else {
      // Strength
      targetCalories = maintenance;
      carbs = Math.round((targetCalories - (protein * 4 + fat * 9)) / 4);
    }

    if (carbs < 50) {
      carbs = 100;
      targetCalories = protein * 4 + fat * 9 + carbs * 4;
    }

    // Procedural Diet Generation based on diet preference
    let breakfastName = "Oatmeal with protein powder & blueberries";
    let lunchName = "Grilled Chicken Breast with brown rice & broccoli";
    let dinnerName = "Baked Salmon with sweet potatoes & asparagus";
    let snackName = "Greek yogurt with a handful of almonds";
    let shoppingList = ["Whey Protein", "Almonds", "Sweet Potatoes", "Spinach", "Avocado"];

    if (dietPref === "veg") {
      breakfastName = "Paneer bhurji with whole wheat toast & chia seeds";
      lunchName = "Lentil soup with quinoa, sautéed tofu & avocado salad";
      dinnerName = "Stir-fried soy chunks with jasmine rice & mixed greens";
      snackName = "Roasted chickpeas & pumpkin seeds with dark chocolate";
      shoppingList = ["Tofu", "Paneer", "Lentils", "Soy Chunks", "Quinoa", "Pumpkin Seeds"];
    } else if (dietPref === "vegan") {
      breakfastName = "Tofu scramble on sourdough with avocado & greens";
      lunchName = "Brown rice bowl with black beans, edamame & tahini dressing";
      dinnerName = "Tempeh curry with sweet potatoes & baby spinach";
      snackName = "Vegan protein shake with peanut butter & banana";
      shoppingList = ["Tofu", "Tempeh", "Black Beans", "Sourdough", "Peanut Butter", "Edamame"];
    } else {
      // Non-veg additions
      shoppingList = ["Chicken Breast", "Salmon", "Eggs", "Sweet Potatoes", "Greek Yogurt", "Whey Protein"];
    }

    const aiDietName = `AI Custom ${goal.toUpperCase()} (${dietPref.toUpperCase()})`;
    const generatedDiet = await DietPlan.create({
      userId: userId || null,
      name: aiDietName,
      totalCalories: targetCalories,
      macros: {
        proteinGrams: protein,
        carbGrams: carbs,
        fatGrams: fat,
      },
      meals: [
        { mealType: "Breakfast", name: breakfastName, calories: Math.round(targetCalories * 0.25) },
        { mealType: "Lunch", name: lunchName, calories: Math.round(targetCalories * 0.35) },
        { mealType: "Snacks", name: snackName, calories: Math.round(targetCalories * 0.15) },
        { mealType: "Dinner", name: dinnerName, calories: Math.round(targetCalories * 0.25) },
      ],
      shoppingList,
    });

    // Procedural Workout Generation
    let workoutName = `AI Luxury Split - ${goal.toUpperCase()}`;
    let exercisesList = [];

    if (goal === "fat-loss") {
      exercisesList = [
        { name: "Barbell Squats", sets: 4, reps: "12-15", restSeconds: 60, equipment: "Barbell", muscleTarget: "Legs" },
        { name: "Dumbbell Incline Press", sets: 4, reps: "10-12", restSeconds: 60, equipment: "Dumbbells", muscleTarget: "Chest" },
        { name: "Lat Pulldowns", sets: 4, reps: "12", restSeconds: 60, equipment: "Cable Machine", muscleTarget: "Back" },
        { name: "Dumbbell Lateral Raises", sets: 3, reps: "15", restSeconds: 45, equipment: "Dumbbells", muscleTarget: "Shoulders" },
        { name: "Kettlebell Swings", sets: 4, reps: "20", restSeconds: 45, equipment: "Kettlebell", muscleTarget: "Full Body" },
        { name: "Hanging Leg Raises", sets: 3, reps: "15-20", restSeconds: 45, equipment: "Bodyweight", muscleTarget: "Core" }
      ];
    } else if (goal === "muscle-gain") {
      exercisesList = [
        { name: "Barbell Flat Bench Press", sets: 4, reps: "8-10", restSeconds: 90, equipment: "Barbell", muscleTarget: "Chest" },
        { name: "Deadlifts", sets: 3, reps: "5", restSeconds: 120, equipment: "Barbell", muscleTarget: "Lower Back" },
        { name: "Bulgarian Split Squats", sets: 3, reps: "10-12 per leg", restSeconds: 90, equipment: "Dumbbells", muscleTarget: "Legs" },
        { name: "Standing Barbell Overhead Press", sets: 4, reps: "8", restSeconds: 90, equipment: "Barbell", muscleTarget: "Shoulders" },
        { name: "Cable Seated Rows", sets: 4, reps: "10", restSeconds: 90, equipment: "Cable Machine", muscleTarget: "Back" },
        { name: "Incline Dumbbell Hammer Curls", sets: 3, reps: "12", restSeconds: 60, equipment: "Dumbbells", muscleTarget: "Arms" }
      ];
    } else {
      // Strength / Powerlifting focus
      exercisesList = [
        { name: "Barbell Squats (Low Bar)", sets: 5, reps: "5", restSeconds: 180, equipment: "Barbell", muscleTarget: "Legs" },
        { name: "Barbell Bench Press", sets: 5, reps: "5", restSeconds: 180, equipment: "Barbell", muscleTarget: "Chest" },
        { name: "Conventional Deadlifts", sets: 4, reps: "3", restSeconds: 240, equipment: "Barbell", muscleTarget: "Posterior Chain" },
        { name: "Weighted Pull-ups", sets: 4, reps: "6", restSeconds: 120, equipment: "Bodyweight + Plates", muscleTarget: "Back" },
        { name: "Military Overhead Press", sets: 4, reps: "5", restSeconds: 150, equipment: "Barbell", muscleTarget: "Shoulders" }
      ];
    }

    const generatedWorkout = await WorkoutPlan.create({
      userId: userId || null,
      name: workoutName,
      difficulty: fitnessLevel === "beginner" ? "Beginner" : fitnessLevel === "advanced" ? "Advanced" : "Intermediate",
      durationMin: goal === "fat-loss" ? 50 : 65,
      calories: goal === "fat-loss" ? 450 : 350,
      exercises: exercisesList,
    });

    return NextResponse.json({
      message: "AI Fitness Plan Generated Successfully",
      dietPlan: generatedDiet,
      workoutPlan: generatedWorkout,
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || "AI calculation failed" }, { status: 500 });
  }
}
