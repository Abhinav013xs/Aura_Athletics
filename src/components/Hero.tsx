"use client";

import { motion } from "framer-motion";
import ThreeDScene from "./ThreeDScene";
import { Play } from "lucide-react";

interface HeroProps {
  onOpenBooking: () => void;
  onOpenTour: () => void;
}

export default function Hero({ onOpenBooking, onOpenTour }: HeroProps) {
  // Animating letters for the title
  const headlineWords = ["Transform", "Your", "Body.", "Transform", "Your", "Life."];

  const stats = [
    { value: "15,000+", label: "Elite Members" },
    { value: "200+", label: "Luxury Machines" },
    { value: "45+", label: "Pro Trainers" },
    { value: "12+", label: "Years Experience" },
  ];

  return (
    <section className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#050505] pt-32 pb-12">
      {/* 3D Scene Background Canvas */}
      <ThreeDScene />

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_35%,rgba(212,175,55,0.12),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_65%,rgba(255,77,77,0.06),transparent_50%)]" />

      {/* Animated dust columns and lights */}
      <div className="absolute top-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-primary/10 blur-[150px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[180px]" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 md:px-12">
        <div className="max-w-4xl text-left">
          {/* Subtle Label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-[1px] w-8 bg-primary" />
            <span className="font-poppins text-xs font-semibold uppercase tracking-widest text-primary">
              The Club of 100+ Crore Brands
            </span>
          </motion.div>

          {/* Huge Cinematic Headline */}
          <h1 className="font-bebas text-6xl font-normal leading-tight tracking-wide text-white sm:text-7xl md:text-8xl lg:text-[100px] xl:text-[120px] uppercase">
            {headlineWords.map((word, i) => (
              <span key={i} className="inline-block mr-4 md:mr-6 overflow-hidden">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: i * 0.08,
                  }}
                  className={`inline-block ${
                    word.includes("Body.") || word.includes("Life.")
                      ? "gold-gradient-text drop-shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                      : ""
                  }`}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 max-w-lg font-inter text-zinc-400 font-light text-base md:text-lg leading-relaxed"
          >
            An elite sanctuary where ultra-luxury amenities, state-of-the-art 3D fitness planners, 
            and customized athletic coaching converge to sculpt your masterpiece.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <button
              onClick={onOpenBooking}
              className="magnetic-btn gold-glow-hover rounded-full bg-primary px-8 py-4 font-poppins text-xs font-bold text-black uppercase tracking-wider transition-all"
            >
              Book Free Trial
            </button>
            <button
              onClick={onOpenBooking}
              className="magnetic-btn rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-8 py-4 font-poppins text-xs font-semibold text-white uppercase tracking-wider transition-all hover:bg-white/10 hover:border-white/20"
            >
              Join Membership
            </button>
            <button
              onClick={onOpenTour}
              className="flex items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-6 py-4 font-poppins text-xs font-semibold text-primary uppercase tracking-wider transition-all hover:bg-primary/10"
            >
              <Play className="h-4 w-4 fill-primary" />
              Watch Gym Tour
            </button>
          </motion.div>
        </div>
      </div>

      {/* Stats Board at Bottom */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-12 mt-16 md:mt-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="grid grid-cols-2 gap-6 rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-md md:grid-cols-4 md:gap-12"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center md:text-left border-r last:border-0 border-white/5 pr-4">
              <span className="block font-bebas text-4xl font-normal text-primary tracking-wide sm:text-5xl drop-shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                {stat.value}
              </span>
              <span className="mt-2 block font-poppins text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
