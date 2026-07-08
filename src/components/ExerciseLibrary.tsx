"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronUp, Sparkles, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ExerciseItem {
  id: string;
  name: string;
  category: "Chest" | "Back" | "Shoulders" | "Legs" | "Arms" | "Core" | "Cardio";
  equipment: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  caloriesBurned: string;
  image: string;
  instructions: string[];
  tips: string[];
  mistakes: string[];
}

const ALL_EXERCISES: ExerciseItem[] = [
  // Chest
  {
    id: "chest-1",
    name: "Barbell Bench Press",
    category: "Chest",
    equipment: "Barbell",
    difficulty: "Intermediate",
    caloriesBurned: "8-12 kcal/min",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=300",
    instructions: [
      "Lie flat on the bench, feet flat on the ground. Grip the barbell slightly wider than shoulder width.",
      "Unrack the bar and stabilize it directly over your chest.",
      "Lower the bar slowly to your mid-chest while tucking elbows at a 45-degree angle.",
      "Push the bar explosively back to starting position while keeping your shoulders pinned down."
    ],
    tips: [
      "Keep your shoulder blades retracted and depressed (pin them into the bench).",
      "Ensure your wrists remain straight and do not bend backwards under the load."
    ],
    mistakes: [
      "Bouncing the barbell off your chest.",
      "Flaring elbows wide (90 degrees), which loads excess torque on the rotator cuff."
    ]
  },
  {
    id: "chest-2",
    name: "Incline Dumbbell Press",
    category: "Chest",
    equipment: "Dumbbells",
    difficulty: "Intermediate",
    caloriesBurned: "7-10 kcal/min",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=300",
    instructions: [
      "Set an incline bench to 30-45 degrees. Sit with dumbbells resting on your knees.",
      "Kick dumbbells back to shoulder level while laying down.",
      "Press the weights upward over your upper chest until arms are locked.",
      "Lower the weights slowly, maintaining control until dumbbells touch the chest level."
    ],
    tips: [
      "Focus on squeezing the upper chest fibers at the apex of the movement.",
      "Lower in a slow 3-second eccentric path."
    ],
    mistakes: [
      "Using too steep of an incline (greater than 45 degrees), which transfers tension to front delts."
    ]
  },
  // Back
  {
    id: "back-1",
    name: "Conventional Deadlift",
    category: "Back",
    equipment: "Barbell",
    difficulty: "Advanced",
    caloriesBurned: "12-15 kcal/min",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=300",
    instructions: [
      "Stand with mid-foot under the barbell. Grip the bar just outside shoulder width.",
      "Drop hips slightly, keep shin touch-points, and pull shoulders back to flatten the spine.",
      "Drive through the feet, pushing the floor away, and stand tall.",
      "Lock out hips and knees, then hinge hips back to lower the bar under control."
    ],
    tips: [
      "Create high abdominal brace (valsalva maneuver) before lifting.",
      "Keep the bar tight to shins and thighs throughout the range."
    ],
    mistakes: [
      "Rounding the lower back (spine flexion) under load.",
      "Shrugging the bar at lockout or hyperextending the spine."
    ]
  },
  {
    id: "back-2",
    name: "Wide Grip Lat Pulldown",
    category: "Back",
    equipment: "Cable Machine",
    difficulty: "Beginner",
    caloriesBurned: "6-8 kcal/min",
    image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=300",
    instructions: [
      "Grip the pulldown bar with hands wider than shoulder width.",
      "Sit with thighs secure under pads, lean back slightly (10 degrees).",
      "Pull the bar down toward upper chest, driving elbows down and back.",
      "Slowly extend arms back to starting stretch position."
    ],
    tips: [
      "Focus on pulling with your elbows, not your hands.",
      "Squeeze your shoulder blades together at the bottom."
    ],
    mistakes: [
      "Using momentum and swinging your torso back and forth.",
      "Pulling the bar behind your neck, which risks neck injuries."
    ]
  },
  // Shoulders
  {
    id: "shoulder-1",
    name: "Military Overhead Press",
    category: "Shoulders",
    equipment: "Barbell",
    difficulty: "Advanced",
    caloriesBurned: "8-11 kcal/min",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=300",
    instructions: [
      "Rest the bar on front shoulders. Grip slightly wider than shoulder width.",
      "Brace core, squeeze glutes, and press the bar straight up overhead.",
      "Pull your face back slightly as the bar passes, then lock arms out overhead.",
      "Lower the bar back to collarbones under absolute control."
    ],
    tips: [
      "Keep core tight and spine neutral. Do not arch your lower back excessively."
    ],
    mistakes: [
      "Using leg drive (which makes it a push press, not strict military press).",
      "Failing to lock out overhead."
    ]
  },
  // Legs
  {
    id: "legs-1",
    name: "Barbell Back Squat",
    category: "Legs",
    equipment: "Barbell",
    difficulty: "Advanced",
    caloriesBurned: "10-14 kcal/min",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=300",
    instructions: [
      "Rest the bar on upper traps. Stand with feet shoulder-width, toes slightly out.",
      "Hinge hips back and bend knees, lowering hips below knee crease (parallel).",
      "Keep chest upright and knees pushed outward.",
      "Drive through the mid-foot to stand back up to starting position."
    ],
    tips: [
      "Keep heels firmly planted. Do not let them lift off the floor.",
      "Maintain active brace."
    ],
    mistakes: [
      "Letting knees collapse inward (valgus collapse).",
      "Rounding the upper or lower spine."
    ]
  },
  // Arms
  {
    id: "arms-1",
    name: "EZ Bar Bicep Curl",
    category: "Arms",
    equipment: "EZ Barbell",
    difficulty: "Beginner",
    caloriesBurned: "4-6 kcal/min",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150",
    instructions: [
      "Stand holding the EZ bar at the outer angled ridges.",
      "Keep elbows pinned to your waist.",
      "Curl the bar up toward shoulders, contracting the bicep muscles.",
      "Lower the bar slowly back to full extension."
    ],
    tips: [
      "Control the eccentric (lowering) phase for better bicep muscle growth."
    ],
    mistakes: [
      "Swinging the body or flaring elbows to cheat the weight up."
    ]
  },
  // Core
  {
    id: "core-1",
    name: "Hanging Knee Raise",
    category: "Core",
    equipment: "Pullup Bar",
    difficulty: "Beginner",
    caloriesBurned: "4-5 kcal/min",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150",
    instructions: [
      "Hang from a pullup bar with a pronated grip.",
      "Brace your core and lift your knees toward your chest under control.",
      "Squeeze lower abs, hold for a split second.",
      "Slowly lower legs to the vertical starting position."
    ],
    tips: [
      "Avoid swinging your hips. Use core strength, not momentum."
    ],
    mistakes: [
      "Swinging your legs like a pendulum."
    ]
  },
  // Cardio
  {
    id: "cardio-1",
    name: "Rower Interval Sprints",
    category: "Cardio",
    equipment: "Rowing Machine",
    difficulty: "Intermediate",
    caloriesBurned: "12-16 kcal/min",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150",
    instructions: [
      "Sit with feet buckled. Hold the row handle with straight arms.",
      "Drive hard with legs, then lean back slightly, pulling handle to sternum.",
      "Return hands forward, hinge torso, and bend legs back to slide forward."
    ],
    tips: [
      "Focus on driving 60% power with legs, 20% core hinge, 20% arm pull."
    ],
    mistakes: [
      "Bending knees before arms are fully extended during return, forcing bar over knees."
    ]
  }
];

export default function ExerciseLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = ["All", "Chest", "Back", "Shoulders", "Legs", "Arms", "Core", "Cardio"];

  const filteredExercises = useMemo(() => {
    return ALL_EXERCISES.filter((ex) => {
      const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            ex.equipment.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "All" || ex.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="exercises" className="relative w-full bg-[#050505] py-20 md:py-28 border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 55 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-7xl px-6 md:px-12"
      >
        {/* Title */}
        <div className="text-center mb-16">
          <span className="font-poppins text-xs font-semibold uppercase tracking-widest text-primary">
            Master Your Biomechanics
          </span>
          <h2 className="mt-2 font-bebas text-5xl font-normal tracking-wide text-white md:text-7xl uppercase">
            Exercise <span className="gold-gradient-text">Library</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-inter text-sm text-zinc-400 font-light leading-relaxed">
            Search our curated athletic guides. Study instructions, pro tips, and common form mistakes.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-12">
          {/* Search Bar */}
          <div className="relative w-full max-w-md">
            <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search exercise or equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-white/5 bg-white/[0.02] py-3.5 pl-12 pr-6 font-inter text-xs text-white placeholder-zinc-500 outline-none transition-all focus:border-primary/40 focus:bg-white/[0.04]"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 max-w-full overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`rounded-full px-4 py-2 font-poppins text-[10px] font-bold uppercase tracking-wider transition-all border ${
                  categoryFilter === cat
                    ? "bg-primary border-primary text-black"
                    : "bg-white/[0.01] border-white/5 text-zinc-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Exercises Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredExercises.map((ex) => {
            const isExpanded = expandedId === ex.id;
            return (
              <div
                key={ex.id}
                className={`glass-panel border rounded-2xl p-6 transition-all duration-300 ${
                  isExpanded ? "border-primary/40 shadow-[0_0_20px_rgba(212,175,55,0.05)]" : "border-white/5"
                }`}
              >
                {/* Header Information */}
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="rounded bg-white/[0.03] border border-white/5 px-2 py-0.5 font-poppins text-[9px] font-semibold text-zinc-400 uppercase tracking-widest">
                      {ex.category}
                    </span>
                    <h3 className="mt-2 font-poppins text-base font-semibold text-white">
                      {ex.name}
                    </h3>
                    <p className="mt-1 font-inter text-[11px] text-zinc-500 font-light">
                      Equipment: <strong className="text-zinc-400 font-normal">{ex.equipment}</strong>
                    </p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 font-poppins text-[9px] font-bold uppercase tracking-wider ${
                    ex.difficulty === "Beginner" 
                      ? "bg-green-500/10 text-green-400"
                      : ex.difficulty === "Intermediate"
                      ? "bg-yellow-500/10 text-yellow-400"
                      : "bg-red-500/10 text-red-400"
                  }`}>
                    {ex.difficulty}
                  </span>
                </div>

                <div className="mt-4 flex justify-between items-center text-xs border-t border-b border-white/5 py-3 my-4">
                  <span className="font-inter text-zinc-500 font-light">Energy Cost:</span>
                  <span className="font-semibold text-primary">{ex.caloriesBurned}</span>
                </div>

                {/* Toggle Button */}
                <button
                  onClick={() => toggleExpand(ex.id)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/[0.02] border border-white/5 font-poppins text-xs font-semibold text-zinc-300 hover:text-white transition-all hover:bg-white/[0.04]"
                >
                  {isExpanded ? (
                    <>
                      Close Form Guide
                      <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      View Form Guide
                      <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </button>

                {/* Expanded Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-6 space-y-5"
                    >
                      {/* Step-by-Step Instructions */}
                      <div>
                        <h4 className="font-poppins text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                          <Sparkles className="h-3.5 w-3.5 text-primary" />
                          Instructions
                        </h4>
                        <ol className="list-decimal pl-4 font-inter text-[11px] font-light text-zinc-400 space-y-1">
                          {ex.instructions.map((step, sIdx) => (
                            <li key={sIdx}>{step}</li>
                          ))}
                        </ol>
                      </div>

                      {/* Pro Tips */}
                      <div className="bg-primary/[0.02] rounded-xl p-4 border border-primary/10">
                        <h4 className="font-poppins text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5">
                          Pro Coaching Tips
                        </h4>
                        <ul className="list-disc pl-4 font-inter text-[11px] font-light text-zinc-400 space-y-1">
                          {ex.tips.map((tip, tIdx) => (
                            <li key={tIdx}>{tip}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Common Mistakes */}
                      <div className="bg-red-500/[0.01] rounded-xl p-4 border border-red-500/10">
                        <h4 className="font-poppins text-[10px] font-bold text-red-400 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
                          <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
                          Common Mistakes
                        </h4>
                        <ul className="list-disc pl-4 font-inter text-[11px] font-light text-zinc-400 space-y-1">
                          {ex.mistakes.map((mistake, mIdx) => (
                            <li key={mIdx}>{mistake}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {filteredExercises.length === 0 && (
            <div className="col-span-full py-16 text-center">
              <p className="font-inter text-zinc-500 font-light text-sm">
                No exercises found matching your search.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
