"use client";

import { useState, useEffect } from "react";
import { 
  Award, Flame, Droplet, Moon, Scale, Clock, 
  Play, Pause, SkipForward, CheckCircle2, Trophy 
} from "lucide-react";
import { motion } from "framer-motion";

interface DashboardViewProps {
  user: any;
  setUser: (user: any) => void;
  onClose: () => void;
}

export default function DashboardView({ user, setUser, onClose }: DashboardViewProps) {
  const [tab, setTab] = useState<"trackers" | "rewards" | "timer" | "music">("trackers");

  // Trackers State
  const [waterInput, setWaterInput] = useState("250");
  const [sleepInput, setSleepInput] = useState("8");
  const [measureWeight, setMeasureWeight] = useState("72");
  const [measureFat, setMeasureFat] = useState("14");
  const [measureArms, setMeasureArms] = useState("38");
  const [loggingStatus, setLoggingStatus] = useState("");

  // Timer State
  const [timerRunning, setTimerRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [timerInterval, setTimerIntervalRef] = useState<NodeJS.Timeout | null>(null);

  // Music Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);

  const playlist = [
    { title: "Lamborghini Exhaust (Hardstyle)", artist: "Aura DJ Collective", cover: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=150" },
    { title: "Stealth Mode Cardio beats", artist: "Nike Gym Crew", cover: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=150" },
    { title: "Gold Standard Recovery Chill", artist: "Zen Healing Spa", cover: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=150" }
  ];

  // Fetch updated user stats on load
  const logData = async (type: string, data: any) => {
    setLoggingStatus("Logging...");
    try {
      const res = await fetch("/api/users/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, type, data }),
      });
      const resData = await res.json();
      if (resData.user) {
        setUser(resData.user);
        setLoggingStatus("Log successful!");
      } else {
        setLoggingStatus(resData.error || "Failed to log");
      }
    } catch {
      setLoggingStatus("Network error logging data");
    }
    setTimeout(() => setLoggingStatus(""), 3000);
  };

  // Stopwatch Logic
  useEffect(() => {
    if (timerRunning) {
      const interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timerRunning]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleStopwatchReset = () => {
    setTimerRunning(false);
    setTime(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/95 backdrop-blur-md p-6 overflow-y-auto">
      <div className="w-full max-w-4xl rounded-3xl border border-white/5 bg-[#0b0b0b] p-8 space-y-8 max-h-[90vh] overflow-y-auto relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-500 hover:text-white font-inter text-xs border border-white/5 rounded-full px-3 py-1 bg-white/[0.01]"
        >
          [Exit Portal]
        </button>

        {/* User Greeting header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6">
          <div>
            <span className="font-poppins text-xs font-semibold text-primary uppercase tracking-widest">Aura Member Hub</span>
            <h2 className="font-bebas text-4xl text-white tracking-wider uppercase mt-1">Welcome back, {user.name}</h2>
          </div>
          <div className="flex gap-6 text-sm">
            <div className="text-right">
              <span className="block text-[10px] text-zinc-500 uppercase tracking-widest font-poppins">Tier Points</span>
              <span className="font-bebas text-2xl text-primary font-bold">{user.loyaltyPoints}</span>
            </div>
            <div className="text-right">
              <span className="block text-[10px] text-zinc-500 uppercase tracking-widest font-poppins">Badges Unlocked</span>
              <span className="font-bebas text-2xl text-white font-bold">{user.badges?.length || 0}</span>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex rounded-full border border-white/5 bg-white/[0.01] p-1 w-fit">
          {(["trackers", "rewards", "timer", "music"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-5 py-2 font-poppins text-[10px] font-bold uppercase tracking-wider transition-all ${
                tab === t ? "bg-primary text-black" : "text-zinc-500 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Status notifications */}
        {loggingStatus && (
          <div className="text-xs text-primary font-inter font-light">{loggingStatus}</div>
        )}

        {/* Tab Contents */}
        <div className="mt-6">
          {/* TRACKERS */}
          {tab === "trackers" && (
            <div className="grid gap-6 md:grid-cols-3">
              {/* Water Log */}
              <div className="glass-panel border border-white/5 rounded-2xl p-6 space-y-4">
                <h3 className="font-bebas text-xl text-white tracking-wide flex items-center gap-2">
                  <Droplet className="h-5 w-5 text-blue-400" />
                  Hydration Tracker
                </h3>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={waterInput}
                    onChange={(e) => setWaterInput(e.target.value)}
                    className="w-full rounded-xl border border-white/5 bg-[#050505] p-3 text-white text-xs outline-none focus:border-primary/40"
                  />
                  <span className="self-center text-xs text-zinc-400">ml</span>
                </div>
                <button
                  onClick={() => logData("water", { amountMl: waterInput })}
                  className="w-full py-2.5 rounded-xl bg-primary text-black font-poppins text-[10px] font-bold uppercase tracking-wider"
                >
                  Log Water
                </button>
                <div className="pt-2 text-[10px] text-zinc-500 font-inter font-light">
                  Today&apos;s Intake: <strong className="text-zinc-300 font-normal">
                    {user.waterLogs?.find((l: any) => l.date === new Date().toISOString().split("T")[0])?.amountMl || 0} ml
                  </strong>
                </div>
              </div>

              {/* Sleep Log */}
              <div className="glass-panel border border-white/5 rounded-2xl p-6 space-y-4">
                <h3 className="font-bebas text-xl text-white tracking-wide flex items-center gap-2">
                  <Moon className="h-5 w-5 text-indigo-400" />
                  Sleep Log
                </h3>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={sleepInput}
                    onChange={(e) => setSleepInput(e.target.value)}
                    className="w-full rounded-xl border border-white/5 bg-[#050505] p-3 text-white text-xs outline-none focus:border-primary/40"
                  />
                  <span className="self-center text-xs text-zinc-400">Hrs</span>
                </div>
                <button
                  onClick={() => logData("sleep", { hours: sleepInput })}
                  className="w-full py-2.5 rounded-xl bg-primary text-black font-poppins text-[10px] font-bold uppercase tracking-wider"
                >
                  Log Sleep
                </button>
                <div className="pt-2 text-[10px] text-zinc-500 font-inter font-light">
                  Last Record: <strong className="text-zinc-300 font-normal">
                    {user.sleepLogs?.slice(-1)[0]?.hours || 0} Hours
                  </strong>
                </div>
              </div>

              {/* Body Measurements */}
              <div className="glass-panel border border-white/5 rounded-2xl p-6 space-y-4">
                <h3 className="font-bebas text-xl text-white tracking-wide flex items-center gap-2">
                  <Scale className="h-5 w-5 text-emerald-400" />
                  Body Stats
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[9px] text-zinc-500 font-poppins uppercase">Weight (kg)</span>
                    <input
                      type="number"
                      value={measureWeight}
                      onChange={(e) => setMeasureWeight(e.target.value)}
                      className="w-full rounded-lg border border-white/5 bg-[#050505] p-2 mt-1 outline-none text-white text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-[9px] text-zinc-500 font-poppins uppercase">Body Fat %</span>
                    <input
                      type="number"
                      value={measureFat}
                      onChange={(e) => setMeasureFat(e.target.value)}
                      className="w-full rounded-lg border border-white/5 bg-[#050505] p-2 mt-1 outline-none text-white text-xs"
                    />
                  </div>
                </div>
                <button
                  onClick={() => logData("measurements", { weightKg: measureWeight, bodyFatPct: measureFat })}
                  className="w-full py-2.5 rounded-xl bg-primary text-black font-poppins text-[10px] font-bold uppercase tracking-wider"
                >
                  Log Stats
                </button>
              </div>
            </div>
          )}

          {/* GAMIFICATION & REWARDS */}
          {tab === "rewards" && (
            <div className="space-y-6">
              {/* Daily Challenge */}
              <div className="rounded-2xl border border-primary/20 bg-primary/[0.02] p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex gap-4 items-center">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-[0_0_10px_#D4AF37]">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-poppins text-sm font-semibold text-white">Daily Challenge: Hydra Beast</h4>
                    <p className="font-inter text-xs text-zinc-400 font-light mt-0.5">Drink 3000ml of water today to unlock +50 loyalty points.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-poppins text-[10px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
                    {user.waterLogs?.find((l: any) => l.date === new Date().toISOString().split("T")[0])?.amountMl >= 3000 ? "Completed" : "Active"}
                  </span>
                </div>
              </div>

              {/* Badges Box */}
              <div>
                <h3 className="font-bebas text-xl text-white tracking-wide uppercase mb-4">Earned Medals</h3>
                <div className="grid gap-4 sm:grid-cols-4">
                  {user.badges?.map((badge: string, idx: number) => (
                    <div key={idx} className="rounded-xl border border-white/5 bg-white/[0.01] p-4 text-center space-y-2">
                      <div className="mx-auto h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary drop-shadow-[0_0_5px_#D4AF37]">
                        <Award className="h-5 w-5" />
                      </div>
                      <span className="block font-poppins text-xs font-semibold text-white">{badge}</span>
                      <span className="block text-[9px] text-zinc-500 font-inter font-light">Granted for biological milestone achievements</span>
                    </div>
                  ))}
                  {(!user.badges || user.badges.length === 0) && (
                    <p className="font-inter text-xs text-zinc-500 font-light py-4 col-span-full">No achievements earned yet. Log hydration or visits to unlock badges.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* WORKOUT TIMER */}
          {tab === "timer" && (
            <div className="glass-panel border border-white/5 rounded-3xl p-8 max-w-md mx-auto text-center space-y-6">
              <h3 className="font-bebas text-2xl text-white tracking-wider uppercase flex items-center justify-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Lifting Stopwatch
              </h3>
              
              <div className="font-bebas text-7xl text-white tabular-nums tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                {formatTime(time)}
              </div>

              <div className="flex gap-4">
                {timerRunning ? (
                  <button
                    onClick={() => setTimerRunning(false)}
                    className="flex-1 py-3 rounded-xl bg-accent text-white font-poppins text-xs font-bold uppercase tracking-wider"
                  >
                    Pause
                  </button>
                ) : (
                  <button
                    onClick={() => setTimerRunning(true)}
                    className="flex-1 py-3 rounded-xl bg-primary text-black font-poppins text-xs font-bold uppercase tracking-wider"
                  >
                    Start
                  </button>
                )}
                <button
                  onClick={handleStopwatchReset}
                  className="flex-1 py-3 rounded-xl bg-zinc-800 text-white font-poppins text-xs font-bold uppercase tracking-wider"
                >
                  Reset
                </button>
              </div>
            </div>
          )}

          {/* MUSIC PLAYER */}
          {tab === "music" && (
            <div className="glass-panel border border-white/5 rounded-3xl p-8 max-w-md mx-auto flex items-center gap-6">
              <img
                src={playlist[currentTrackIdx].cover}
                alt="album art"
                className="h-20 w-20 object-cover rounded-xl bg-zinc-950"
              />
              <div className="flex-1 space-y-3">
                <div>
                  <h4 className="font-poppins text-sm font-semibold text-white truncate max-w-[200px]">
                    {playlist[currentTrackIdx].title}
                  </h4>
                  <span className="block text-[11px] text-zinc-500 font-inter font-light">
                    {playlist[currentTrackIdx].artist}
                  </span>
                </div>

                {/* Pulse visualizer animation */}
                <div className="flex gap-1.5 h-6 items-end pb-1.5">
                  {isPlaying ? (
                    Array.from({ length: 12 }).map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [4, 16, 4] }}
                        transition={{ repeat: Infinity, duration: 0.5 + Math.random() * 0.5, ease: "easeInOut" }}
                        className="w-[2px] bg-primary rounded-full"
                      />
                    ))
                  ) : (
                    Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="w-[2px] h-[4px] bg-zinc-800 rounded-full" />
                    ))
                  )}
                </div>

                {/* Player controls */}
                <div className="flex items-center gap-4 text-zinc-400">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="h-8 w-8 rounded-full bg-primary text-black flex items-center justify-center hover:scale-105 transition-transform"
                  >
                    {isPlaying ? <Pause className="h-4 w-4 fill-black" /> : <Play className="h-4 w-4 fill-black" />}
                  </button>
                  <button
                    onClick={() => setCurrentTrackIdx((prev) => (prev + 1) % playlist.length)}
                    className="hover:text-white"
                  >
                    <SkipForward className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
