"use client";

import React, { useState, useRef } from "react";
import { Sparkles, Trophy } from "lucide-react";
import { motion } from "framer-motion";

export default function MemberTransformations() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const stories = [
    {
      name: "Rohit Sharma",
      duration: "16 Weeks",
      loss: "-18 kg",
      muscle: "+4.5 kg",
      quote: "Aura's personalized recommendation engine and high-end biomechanical machines completely optimized my workouts. My posture is better, my strength is doubled.",
    }
  ];

  return (
    <section id="transformations" className="relative w-full bg-[#050505] py-20 md:py-28 border-t border-white/5">
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
            Biological Achievements
          </span>
          <h2 className="mt-2 font-bebas text-5xl font-normal tracking-wide text-white md:text-7xl uppercase">
            Client <span className="gold-gradient-text">Transformations</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-inter text-sm text-zinc-400 font-light leading-relaxed">
            Witness the biological proof. Drag the slider to inspect the sculpting precision of our master coaches.
          </p>
        </div>

        {/* Drag Slider Box */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Draggable Slider */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative h-[320px] sm:h-[450px] w-full overflow-hidden rounded-3xl border border-white/10 select-none cursor-ew-resize"
          >
            {/* Before Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800')`,
              }}
            >
              <div className="absolute top-4 left-4 rounded bg-black/60 px-3 py-1 font-poppins text-[10px] font-bold text-white uppercase tracking-wider">
                Before
              </div>
            </div>

            {/* After Image (clipped based on sliderPosition) */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800')`,
                clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`,
              }}
            >
              <div className="absolute top-4 right-4 rounded bg-primary px-3 py-1 font-poppins text-[10px] font-bold text-black uppercase tracking-wider">
                After (Week 16)
              </div>
            </div>

            {/* Vertical Bar Separator */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-primary shadow-[0_0_10px_#D4AF37]"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary bg-black flex items-center justify-center text-primary shadow-[0_0_10px_#D4AF37]">
                <Sparkles className="h-4 w-4 animate-pulse-glow" />
              </div>
            </div>
          </div>

          {/* Transformation Story details */}
          <div className="space-y-8">
            {stories.map((story, i) => (
              <div key={i} className="space-y-6">
                <div>
                  <span className="font-poppins text-xs font-semibold text-primary uppercase tracking-widest flex items-center gap-1.5">
                    <Trophy className="h-4 w-4" />
                    Member Spotlight
                  </span>
                  <h3 className="mt-2 font-bebas text-4xl text-white tracking-wider uppercase">
                    {story.name}
                  </h3>
                </div>

                <p className="font-inter text-sm text-zinc-400 font-light leading-relaxed">
                  &quot;{story.quote}&quot;
                </p>

                {/* Transformation Stats */}
                <div className="grid grid-cols-3 gap-6 rounded-2xl border border-white/5 bg-white/[0.01] p-6 text-center">
                  <div>
                    <span className="block text-[10px] text-zinc-500 font-poppins uppercase tracking-wider">Timeline</span>
                    <span className="block font-bebas text-2xl text-white font-normal mt-1">{story.duration}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-zinc-500 font-poppins uppercase tracking-wider">Fat Loss</span>
                    <span className="block font-bebas text-2xl text-primary font-normal mt-1">{story.loss}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-zinc-500 font-poppins uppercase tracking-wider">Muscle Gain</span>
                    <span className="block font-bebas text-2xl text-white font-normal mt-1">{story.muscle}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
