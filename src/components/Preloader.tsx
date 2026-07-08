"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const duration = 2500; // 2.5 seconds total
    const intervalTime = 25;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(currentProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setIsLoaded(true);
        setTimeout(() => {
          onComplete();
        }, 600); // Allow fadeout animation time
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-white"
        >
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(212,175,55,0.08),rgba(255,255,255,0))]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:100px_100px]" />

          <div className="relative flex flex-col items-center">
            {/* Pulsing Outer Rings */}
            <div className="relative w-40 h-40 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="absolute inset-0 border border-dashed border-primary/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                className="absolute inset-2 border border-primary/40 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute inset-8 border border-white/10 rounded-full bg-white/[0.01] backdrop-blur-sm"
              />

              {/* Glowing SVG Muscle Flex / Weightlifting Symbol */}
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-16 h-16 text-primary drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]"
                animate={{
                  scale: [0.95, 1.05, 0.95],
                  strokeWidth: ["1.5", "2", "1.5"]
                }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                {/* Dumbbell Icon */}
                <path d="m6.5 6.5 11 11" />
                <path d="m21 21-1-1" />
                <path d="m3 3 1 1" />
                <path d="m18.5 12.5 3-3" />
                <path d="m12.5 18.5 3-3" />
                <path d="m5.5 11.5 3-3" />
                <path d="m11.5 5.5 3-3" />
                <path d="M8.5 5.5h3v3" />
                <path d="M15.5 12.5h3v3" />
              </motion.svg>
            </div>

            {/* Glowing Brand Name */}
            <motion.h1
              initial={{ letterSpacing: "2px", opacity: 0 }}
              animate={{ letterSpacing: "12px", opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="mt-8 font-bebas text-4xl font-normal text-white uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
            >
              AURA <span className="text-primary">ATHLETICS</span>
            </motion.h1>
            
            <p className="mt-2 font-inter font-light text-xs text-zinc-500 uppercase tracking-widest">
              The Apex of Fitness Luxury
            </p>
          </div>

          {/* Progress Percent */}
          <div className="absolute bottom-24 flex flex-col items-center">
            <span className="font-bebas text-8xl font-light text-primary tabular-nums tracking-widest drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              {progress}%
            </span>
            <div className="mt-4 w-60 h-[2px] bg-zinc-900 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-zinc-800 via-primary to-white"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
