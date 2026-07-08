"use client";

import { useState } from "react";
import { Calculator, Sparkles, Scale, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function FitnessCalculators() {
  const [activeTab, setActiveTab] = useState<"bmi" | "bodyfat" | "calories">("bmi");

  // BMI State
  const [bmiHeight, setBmiHeight] = useState("175");
  const [bmiWeight, setBmiWeight] = useState("70");
  const [bmiResult, setBmiResult] = useState<number | null>(null);
  const [bmiStatus, setBmiStatus] = useState("");

  const calculateBMI = () => {
    const h = Number(bmiHeight) / 100;
    const w = Number(bmiWeight);
    if (!h || !w) return;
    const score = Number((w / (h * h)).toFixed(1));
    setBmiResult(score);
    if (score < 18.5) setBmiStatus("Underweight (Aura Tip: Focus on caloric surplus and heavy compound movements)");
    else if (score < 25) setBmiStatus("Optimal Range (Maintain active balance and hypertrophy conditioning)");
    else if (score < 30) setBmiStatus("Overweight (Aura Tip: Focus on caloric deficit and high intensity intervals)");
    else setBmiStatus("Obese (Aura Tip: Focus on progressive deficit and low impact cardio)");
  };

  // Body Fat State (US Navy method)
  const [gender, setGender] = useState<"male" | "female">("male");
  const [bfHeight, setBfHeight] = useState("175");
  const [bfWaist, setBfWaist] = useState("80");
  const [bfNeck, setBfNeck] = useState("38");
  const [bfHip, setBfHip] = useState("95"); // only needed for female
  const [bfResult, setBfResult] = useState<number | null>(null);

  const calculateBodyFat = () => {
    const h = Number(bfHeight);
    const w = Number(bfWaist);
    const n = Number(bfNeck);
    const hp = Number(bfHip);

    if (!h || !w || !n) return;

    let percentage = 0;
    if (gender === "male") {
      // US Navy Male Formula (inches based, converted from cm)
      const wIn = w / 2.54;
      const nIn = n / 2.54;
      const hIn = h / 2.54;
      percentage = 86.01 * Math.log10(wIn - nIn) - 70.041 * Math.log10(hIn) + 36.76;
    } else {
      // US Navy Female Formula
      const wIn = w / 2.54;
      const nIn = n / 2.54;
      const hIn = h / 2.54;
      const hpIn = hp / 2.54;
      percentage = 163.205 * Math.log10(wIn + hpIn - nIn) - 97.684 * Math.log10(hIn) - 78.387;
    }

    setBfResult(Number(Math.max(2, percentage).toFixed(1)));
  };

  // Calorie State
  const [calWeight, setCalWeight] = useState("70");
  const [calHeight, setCalHeight] = useState("175");
  const [calAge, setCalAge] = useState("25");
  const [calGoal, setCalGoal] = useState<"maintain" | "loss" | "gain">("maintain");
  const [activity, setActivity] = useState("1.55"); // Active
  const [calResult, setCalResult] = useState<number | null>(null);
  const [macros, setMacros] = useState<{ p: number; c: number; f: number } | null>(null);

  const calculateCalories = () => {
    const w = Number(calWeight);
    const h = Number(calHeight);
    const age = Number(calAge);
    const act = Number(activity);

    if (!w || !h || !age) return;

    // Harris-Benedict BMR Estimation
    const bmr = 10 * w + 6.25 * h - 5 * age + (gender === "male" ? 5 : -161);
    const maintenance = Math.round(bmr * act);

    let target = maintenance;
    if (calGoal === "loss") target = Math.round(maintenance - 500);
    else if (calGoal === "gain") target = Math.round(maintenance + 400);

    setCalResult(target);

    // Calculate generic high-end macro split (2.0g protein/kg bodyweight, 1g fat/kg, remainder carbs)
    const p = Math.round(w * 2);
    const f = Math.round(w * 1);
    const c = Math.max(50, Math.round((target - (p * 4 + f * 9)) / 4));

    setMacros({ p, c, f });
  };

  return (
    <section id="calculators" className="relative w-full bg-[#050505] py-20 md:py-28 border-t border-white/5">
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
            Bio-Metrics Analyzer
          </span>
          <h2 className="mt-2 font-bebas text-5xl font-normal tracking-wide text-white md:text-7xl uppercase">
            Fitness <span className="gold-gradient-text">Calculators</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-inter text-sm text-zinc-400 font-light leading-relaxed">
            Obtain immediate biometric parameters. Calculate body index targets and customize energy partitions.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="mx-auto flex w-full max-w-lg rounded-full border border-white/5 bg-white/[0.02] p-1.5 backdrop-blur-md mb-12">
          {(["bmi", "bodyfat", "calories"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 rounded-full py-2.5 font-poppins text-[10px] font-bold uppercase tracking-wider transition-all ${
                activeTab === tab
                  ? "bg-primary text-black"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {tab === "bmi" ? "BMI Index" : tab === "bodyfat" ? "Body Fat %" : "Calorie/Macros"}
            </button>
          ))}
        </div>

        {/* Tab Content Box */}
        <div className="mx-auto max-w-3xl glass-panel border border-white/5 rounded-3xl p-8">
          {/* BMI */}
          {activeTab === "bmi" && (
            <div className="space-y-6">
              <h3 className="font-bebas text-2xl text-white tracking-wider flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" />
                Body Mass Index
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block font-poppins text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">Height (cm)</label>
                  <input
                    type="number"
                    value={bmiHeight}
                    onChange={(e) => setBmiHeight(e.target.value)}
                    className="w-full rounded-xl border border-white/5 bg-white/[0.01] p-4 text-white text-sm outline-none focus:border-primary/40"
                  />
                </div>
                <div>
                  <label className="block font-poppins text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    value={bmiWeight}
                    onChange={(e) => setBmiWeight(e.target.value)}
                    className="w-full rounded-xl border border-white/5 bg-white/[0.01] p-4 text-white text-sm outline-none focus:border-primary/40"
                  />
                </div>
              </div>

              <button
                onClick={calculateBMI}
                className="w-full rounded-xl bg-primary py-4 font-poppins text-xs font-bold text-black uppercase tracking-wider transition-all hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]"
              >
                Calculate BMI
              </button>

              {bmiResult !== null && (
                <div className="mt-6 rounded-2xl bg-white/[0.02] border border-white/5 p-6 text-center">
                  <span className="block text-zinc-400 text-xs font-inter font-light">Your BMI Score</span>
                  <span className="block font-bebas text-6xl text-primary font-bold my-2">{bmiResult}</span>
                  <p className="font-inter text-xs text-zinc-300 font-light mt-2">{bmiStatus}</p>
                </div>
              )}
            </div>
          )}

          {/* Body Fat */}
          {activeTab === "bodyfat" && (
            <div className="space-y-6">
              <h3 className="font-bebas text-2xl text-white tracking-wider flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                US Navy Body Fat Estimator
              </h3>

              <div className="flex gap-4">
                <button
                  onClick={() => setGender("male")}
                  className={`flex-1 rounded-xl py-3 border font-poppins text-xs font-semibold ${
                    gender === "male" ? "bg-primary border-primary text-black" : "bg-transparent border-white/5 text-white"
                  }`}
                >
                  Male
                </button>
                <button
                  onClick={() => setGender("female")}
                  className={`flex-1 rounded-xl py-3 border font-poppins text-xs font-semibold ${
                    gender === "female" ? "bg-primary border-primary text-black" : "bg-transparent border-white/5 text-white"
                  }`}
                >
                  Female
                </button>
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                <div>
                  <label className="block font-poppins text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">Height (cm)</label>
                  <input
                    type="number"
                    value={bfHeight}
                    onChange={(e) => setBfHeight(e.target.value)}
                    className="w-full rounded-xl border border-white/5 bg-white/[0.01] p-4 text-white text-sm outline-none focus:border-primary/40"
                  />
                </div>
                <div>
                  <label className="block font-poppins text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">Waist (cm)</label>
                  <input
                    type="number"
                    value={bfWaist}
                    onChange={(e) => setBfWaist(e.target.value)}
                    className="w-full rounded-xl border border-white/5 bg-white/[0.01] p-4 text-white text-sm outline-none focus:border-primary/40"
                  />
                </div>
                <div>
                  <label className="block font-poppins text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">Neck (cm)</label>
                  <input
                    type="number"
                    value={bfNeck}
                    onChange={(e) => setBfNeck(e.target.value)}
                    className="w-full rounded-xl border border-white/5 bg-white/[0.01] p-4 text-white text-sm outline-none focus:border-primary/40"
                  />
                </div>
                {gender === "female" && (
                  <div className="col-span-full">
                    <label className="block font-poppins text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">Hip Circumference (cm)</label>
                    <input
                      type="number"
                      value={bfHip}
                      onChange={(e) => setBfHip(e.target.value)}
                      className="w-full rounded-xl border border-white/5 bg-white/[0.01] p-4 text-white text-sm outline-none focus:border-primary/40"
                    />
                  </div>
                )}
              </div>

              <button
                onClick={calculateBodyFat}
                className="w-full rounded-xl bg-primary py-4 font-poppins text-xs font-bold text-black uppercase tracking-wider transition-all"
              >
                Calculate Body Fat %
              </button>

              {bfResult !== null && (
                <div className="mt-6 rounded-2xl bg-white/[0.02] border border-white/5 p-6 text-center">
                  <span className="block text-zinc-400 text-xs font-inter font-light">Estimated Body Fat Percentage</span>
                  <span className="block font-bebas text-6xl text-primary font-bold my-2">{bfResult}%</span>
                  <p className="font-inter text-[10px] text-zinc-500 uppercase tracking-widest mt-2">
                    {gender === "male"
                      ? bfResult < 10 ? "Essential Fat / Shredded" : bfResult < 18 ? "Lean Athletic" : bfResult < 25 ? "Normal Range" : "High Fat Level"
                      : bfResult < 18 ? "Essential Fat / Shredded" : bfResult < 25 ? "Lean Athletic" : bfResult < 31 ? "Normal Range" : "High Fat Level"}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Calories */}
          {activeTab === "calories" && (
            <div className="space-y-6">
              <h3 className="font-bebas text-2xl text-white tracking-wider flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Macronutrient Calorie targets
              </h3>

              <div className="grid gap-6 sm:grid-cols-4">
                <div>
                  <label className="block font-poppins text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    value={calWeight}
                    onChange={(e) => setCalWeight(e.target.value)}
                    className="w-full rounded-xl border border-white/5 bg-white/[0.01] p-4 text-white text-sm outline-none focus:border-primary/40"
                  />
                </div>
                <div>
                  <label className="block font-poppins text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">Height (cm)</label>
                  <input
                    type="number"
                    value={calHeight}
                    onChange={(e) => setCalHeight(e.target.value)}
                    className="w-full rounded-xl border border-white/5 bg-white/[0.01] p-4 text-white text-sm outline-none focus:border-primary/40"
                  />
                </div>
                <div>
                  <label className="block font-poppins text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">Age (yrs)</label>
                  <input
                    type="number"
                    value={calAge}
                    onChange={(e) => setCalAge(e.target.value)}
                    className="w-full rounded-xl border border-white/5 bg-white/[0.01] p-4 text-white text-sm outline-none focus:border-primary/40"
                  />
                </div>
                <div>
                  <label className="block font-poppins text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">Activity</label>
                  <select
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                    className="w-full rounded-xl border border-white/5 bg-[#050505] p-4 text-white text-xs outline-none focus:border-primary/40 h-[53px]"
                  >
                    <option value="1.2">Sedentary (No gym)</option>
                    <option value="1.375">Lightly Active (1-2 days/wk)</option>
                    <option value="1.55">Moderately Active (3-5 days/wk)</option>
                    <option value="1.725">Very Active (6-7 days/wk)</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                {(["loss", "maintain", "gain"] as const).map((goal) => (
                  <button
                    key={goal}
                    onClick={() => setCalGoal(goal)}
                    className={`flex-1 rounded-xl py-3 border font-poppins text-xs font-semibold capitalize ${
                      calGoal === goal ? "bg-primary border-primary text-black" : "bg-transparent border-white/5 text-white"
                    }`}
                  >
                    {goal === "loss" ? "Fat Loss" : goal === "gain" ? "Muscle Gain" : "Maintenance"}
                  </button>
                ))}
              </div>

              <button
                onClick={calculateCalories}
                className="w-full rounded-xl bg-primary py-4 font-poppins text-xs font-bold text-black uppercase tracking-wider transition-all"
              >
                Calculate Daily Targets
              </button>

              {calResult !== null && macros && (
                <div className="mt-6 space-y-6">
                  <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-6 text-center">
                    <span className="block text-zinc-400 text-xs font-inter font-light">Calculated Target Energy Intake</span>
                    <span className="block font-bebas text-6xl text-primary font-bold my-2">{calResult} kcal/day</span>
                  </div>

                  {/* Macro Split Grid */}
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl bg-white/[0.01] border border-white/5 p-4 text-center">
                      <span className="block text-[10px] text-zinc-500 font-poppins uppercase tracking-wider">Protein</span>
                      <span className="block font-bebas text-2xl text-white font-normal mt-1">{macros.p}g</span>
                      <span className="block text-[9px] text-zinc-600 font-inter mt-0.5">({macros.p * 4} kcal)</span>
                    </div>
                    <div className="rounded-xl bg-white/[0.01] border border-white/5 p-4 text-center">
                      <span className="block text-[10px] text-zinc-500 font-poppins uppercase tracking-wider">Carbs</span>
                      <span className="block font-bebas text-2xl text-white font-normal mt-1">{macros.c}g</span>
                      <span className="block text-[9px] text-zinc-600 font-inter mt-0.5">({macros.c * 4} kcal)</span>
                    </div>
                    <div className="rounded-xl bg-white/[0.01] border border-white/5 p-4 text-center">
                      <span className="block text-[10px] text-zinc-500 font-poppins uppercase tracking-wider">Fats</span>
                      <span className="block font-bebas text-2xl text-white font-normal mt-1">{macros.f}g</span>
                      <span className="block text-[9px] text-zinc-600 font-inter mt-0.5">({macros.f * 9} kcal)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
