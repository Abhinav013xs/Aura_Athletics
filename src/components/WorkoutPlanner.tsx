"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Flame, Clock, Award, Shuffle } from "lucide-react";

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  muscle: string;
  equipment: string;
}

interface Routine {
  name: string;
  duration: string;
  calories: string;
  difficulty: string;
  target: string;
  exercises: Exercise[];
}

export default function WorkoutPlanner() {
  const [level, setLevel] = useState<"beginner" | "intermediate" | "advanced">("intermediate");
  const [split, setSplit] = useState<"ppl" | "bro" | "upper-lower">("ppl");

  const programs: Record<string, Record<string, Routine>> = {
    beginner: {
      ppl: {
        name: "Introductory Push-Pull-Legs",
        duration: "40 Min",
        calories: "280 kcal",
        difficulty: "Easy",
        target: "Full Body Adaptation",
        exercises: [
          { name: "Dumbbell Chest Press", sets: 3, reps: "10-12", rest: "90s", muscle: "Chest", equipment: "Dumbbells" },
          { name: "Seated Cable Row", sets: 3, reps: "10-12", rest: "90s", muscle: "Upper Back", equipment: "Cable" },
          { name: "Goblet Squats", sets: 3, reps: "12", rest: "90s", muscle: "Quads", equipment: "Kettlebell / DB" },
          { name: "Dumbbell Shoulder Press", sets: 3, reps: "10", rest: "90s", muscle: "Shoulders", equipment: "Dumbbells" },
          { name: "Supported Laying Plank", sets: 3, reps: "30s hold", rest: "60s", muscle: "Core", equipment: "Bodyweight" },
        ],
      },
      bro: {
        name: "Standard 5-Day Isolation Split",
        duration: "45 Min",
        calories: "300 kcal",
        difficulty: "Easy",
        target: "Single Muscle focus",
        exercises: [
          { name: "Machine Chest Fly", sets: 4, reps: "12", rest: "60s", muscle: "Chest", equipment: "Machine" },
          { name: "Dumbbell Bicep Curls", sets: 3, reps: "12", rest: "60s", muscle: "Biceps", equipment: "Dumbbells" },
          { name: "Lat Pulldown (Wide Grip)", sets: 4, reps: "10", rest: "70s", muscle: "Back", equipment: "Cable" },
          { name: "Tricep Pushdowns", sets: 3, reps: "15", rest: "60s", muscle: "Triceps", equipment: "Cable" },
        ],
      },
    },
    intermediate: {
      ppl: {
        name: "Hypertrophy Push-Pull-Legs",
        duration: "60 Min",
        calories: "450 kcal",
        difficulty: "Medium",
        target: "Lean Muscle Development",
        exercises: [
          { name: "Incline Barbell Bench Press", sets: 4, reps: "8-10", rest: "90s", muscle: "Upper Chest", equipment: "Barbell" },
          { name: "Weighted Pull-ups", sets: 3, reps: "8", rest: "120s", muscle: "Back / Lats", equipment: "Weight Belt" },
          { name: "Barbell Squats", sets: 4, reps: "8", rest: "120s", muscle: "Quads / Glutes", equipment: "Barbell" },
          { name: "Cable Lateral Raises", sets: 4, reps: "12-15", rest: "60s", muscle: "Side Delts", equipment: "Cable" },
          { name: "Incline Dumbbell Hammer Curls", sets: 3, reps: "12", rest: "70s", muscle: "Brachialis", equipment: "Dumbbells" },
          { name: "Hanging Toes to Bar", sets: 3, reps: "12", rest: "60s", muscle: "Core", equipment: "Pullup Bar" }
        ],
      },
      bro: {
        name: "Golden-Era Hypertrophy split",
        duration: "55 Min",
        calories: "400 kcal",
        difficulty: "Medium",
        target: "Max Pump & Definition",
        exercises: [
          { name: "Flat Dumbbell Press", sets: 4, reps: "10", rest: "90s", muscle: "Chest", equipment: "Dumbbells" },
          { name: "Incline Chest Flys", sets: 3, reps: "12", rest: "60s", muscle: "Upper Chest", equipment: "Dumbbells" },
          { name: "Overhead Dumbbell Extension", sets: 3, reps: "10", rest: "90s", muscle: "Triceps", equipment: "Dumbbell" },
          { name: "Decline Pushups", sets: 3, reps: "Max Reps", rest: "60s", muscle: "Lower Chest", equipment: "Bodyweight" },
        ],
      },
    },
    advanced: {
      ppl: {
        name: "Power-Building Athletic Split",
        duration: "75 Min",
        calories: "620 kcal",
        difficulty: "Hard",
        target: "Raw Power & Density",
        exercises: [
          { name: "Barbell Squats (Low Bar)", sets: 5, reps: "5", rest: "180s", muscle: "Quads / Glutes", equipment: "Barbell" },
          { name: "Flat Barbell Bench Press", sets: 5, reps: "5", rest: "180s", muscle: "Chest", equipment: "Barbell" },
          { name: "Conventional Deadlifts", sets: 4, reps: "3", rest: "240s", muscle: "Back / Hamstrings", equipment: "Barbell" },
          { name: "Standing Military Press", sets: 4, reps: "6", rest: "120s", muscle: "Shoulders", equipment: "Barbell" },
          { name: "Weighted Dips", sets: 4, reps: "8", rest: "90s", muscle: "Triceps / Chest", equipment: "Weight Belt" },
        ],
      },
      bro: {
        name: "Giant-Sets Shock Protocol",
        duration: "70 Min",
        calories: "550 kcal",
        difficulty: "Hard",
        target: "Muscle Shock & Expansion",
        exercises: [
          { name: "Barbell Clean and Press", sets: 5, reps: "6", rest: "120s", muscle: "Full Body", equipment: "Barbell" },
          { name: "Incline Dumbbell Fly (Superset)", sets: 4, reps: "10", rest: "0s", muscle: "Chest", equipment: "Dumbbells" },
          { name: "Dumbbell Pull-Overs", sets: 4, reps: "12", rest: "90s", muscle: "Lats / Ribs", equipment: "Dumbbell" },
          { name: "Spider Curls (EZ Bar)", sets: 4, reps: "12", rest: "70s", muscle: "Biceps", equipment: "Barbell" },
        ],
      },
    },
  };

  // Fallback if split upper-lower is empty (redirect to ppl)
  const activeRoutine = programs[level][split] || programs[level]["ppl"];

  return (
    <section id="programs" className="relative w-full bg-[#050505] py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 55 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-7xl px-6 md:px-12"
      >
        {/* Header */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row mb-16">
          <div className="text-center md:text-left">
            <span className="font-poppins text-xs font-semibold uppercase tracking-widest text-primary">
              Premium Workout Planner
            </span>
            <h2 className="mt-2 font-bebas text-5xl font-normal tracking-wide text-white md:text-7xl uppercase">
              Workout <span className="gold-gradient-text">Programs</span>
            </h2>
          </div>

          {/* Toggles */}
          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Level Toggle */}
            <div className="flex rounded-full border border-white/5 bg-white/[0.02] p-1.5 backdrop-blur-md">
              {(["beginner", "intermediate", "advanced"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`rounded-full px-4 py-2 font-poppins text-[10px] font-bold uppercase tracking-wider transition-all ${
                    level === l
                      ? "bg-primary text-black"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Split Toggle */}
            <div className="flex rounded-full border border-white/5 bg-white/[0.02] p-1.5 backdrop-blur-md">
              {(["ppl", "bro"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSplit(s)}
                  className={`rounded-full px-4 py-2 font-poppins text-[10px] font-bold uppercase tracking-wider transition-all ${
                    split === s
                      ? "bg-primary text-black"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {s === "ppl" ? "Push Pull Legs" : "Bro Split"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Routine Panel */}
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Summary Panel */}
          <div className="lg:col-span-1">
            <motion.div
              layout
              className="glass-panel border border-white/5 rounded-3xl p-8 sticky top-32"
            >
              <span className="font-poppins text-xs font-semibold text-primary uppercase tracking-widest">
                Active Routine
              </span>
              <h3 className="mt-4 font-bebas text-3xl font-normal text-white uppercase tracking-wider leading-tight">
                {activeRoutine.name}
              </h3>
              
              <hr className="border-white/5 my-6" />

              {/* Stats */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-zinc-500 font-light font-inter">
                    <Clock className="h-4 w-4 text-zinc-600" />
                    Target Time
                  </span>
                  <span className="font-semibold text-white tabular-nums">{activeRoutine.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-zinc-500 font-light font-inter">
                    <Flame className="h-4 w-4 text-zinc-600" />
                    Est. Burn
                  </span>
                  <span className="font-semibold text-primary tabular-nums">{activeRoutine.calories}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-zinc-500 font-light font-inter">
                    <Award className="h-4 w-4 text-zinc-600" />
                    Difficulty
                  </span>
                  <span className="font-semibold text-white">{activeRoutine.difficulty}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-zinc-500 font-light font-inter">
                    <Shuffle className="h-4 w-4 text-zinc-600" />
                    Focus Goal
                  </span>
                  <span className="font-semibold text-white text-xs">{activeRoutine.target}</span>
                </div>
              </div>

              <div className="mt-8">
                <div className="rounded-xl bg-white/[0.02] p-4 text-[11px] text-zinc-500 font-inter font-light leading-relaxed border border-white/5">
                  <strong className="text-zinc-400 block mb-1">PRO COACHING TIP:</strong>
                  Focus on concentric control. Take 3 full seconds during eccentric stretch phases to stimulate maximum myofibril tear and muscle density.
                </div>
              </div>
            </motion.div>
          </div>

          {/* Exercise List Panel */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${level}-${split}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                {activeRoutine.exercises.map((ex, index) => (
                  <div
                    key={index}
                    className="glass-panel hover:bg-white/[0.04] flex flex-col justify-between gap-4 rounded-2xl p-6 md:flex-row md:items-center transition-all border border-white/5"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded bg-primary/10 text-primary font-bebas text-xs font-normal">
                          {index + 1}
                        </span>
                        <h4 className="font-poppins text-sm font-semibold text-white">
                          {ex.name}
                        </h4>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-4 text-zinc-500 font-inter font-light text-[11px]">
                        <span>Target: <strong className="text-zinc-300 font-normal">{ex.muscle}</strong></span>
                        <span>•</span>
                        <span>Equipment: <strong className="text-zinc-300 font-normal">{ex.equipment}</strong></span>
                      </div>
                    </div>

                    <div className="flex gap-6 border-t border-white/5 pt-4 md:border-t-0 md:pt-0">
                      <div className="text-center">
                        <span className="block text-[10px] text-zinc-600 font-poppins uppercase tracking-wider">Sets</span>
                        <span className="font-bebas text-xl text-white tabular-nums">{ex.sets}</span>
                      </div>
                      <div className="text-center">
                        <span className="block text-[10px] text-zinc-600 font-poppins uppercase tracking-wider">Reps</span>
                        <span className="font-bebas text-xl text-white tabular-nums">{ex.reps}</span>
                      </div>
                      <div className="text-center">
                        <span className="block text-[10px] text-zinc-600 font-poppins uppercase tracking-wider">Rest</span>
                        <span className="font-bebas text-xl text-primary tabular-nums">{ex.rest}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
