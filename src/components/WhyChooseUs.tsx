"use client";

import { motion } from "framer-motion";
import { 
  Users, Dumbbell, ShieldCheck, Apple, 
  Flame, Key, HeartPulse, Sparkles, MapPin 
} from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: Users,
      title: "Certified Master Coaches",
      desc: "Train under elite IFBB pros, sports therapists, and nutrition experts dedicated to your genetic blueprint.",
    },
    {
      icon: Dumbbell,
      title: "State-of-the-Art Arsenal",
      desc: "Equipped with biomechanical machines from Germany, carbon dumbbells, and digital tracking sensors.",
    },
    {
      icon: Sparkles,
      title: "Luxury Interiors",
      desc: "Aesthetic training bays designed with premium ambient lighting, acoustic spacing, and air diffusers.",
    },
    {
      icon: Apple,
      title: "Active Nutrition Bar",
      desc: "Direct access to certified dietitians and organic pre/post workout fuel shakes prepared fresh daily.",
    },
    {
      icon: Flame,
      title: "Thermal Recovery Zone",
      desc: "Unwind inside premium wood saunas, eucalyptus steam baths, and state-of-the-art cold plunges.",
    },
    {
      icon: Key,
      title: "Smart RFID Lockers",
      desc: "Seamless locker access with wireless charging plates, biometric safety locks, and carbon deodorizers.",
    },
    {
      icon: HeartPulse,
      title: "Physio & Bio-Analysis",
      desc: "Monthly body fat composition testing, range-of-motion assessments, and customized rehab therapy.",
    },
    {
      icon: MapPin,
      title: "Convenient Valet Parking",
      desc: "Guaranteed complimentary valet parking and luxury reception concierge desk ready at arrival.",
    }
  ];

  return (
    <section id="why-choose-us" className="relative w-full bg-[#050505] py-20 md:py-28">
      {/* Light accent lines */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 55 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-7xl px-6 md:px-12"
      >
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="font-poppins text-xs font-semibold uppercase tracking-widest text-primary">
            The Aura Distinction
          </span>
          <h2 className="mt-2 font-bebas text-5xl font-normal tracking-wide text-white md:text-7xl uppercase">
            Why Choose <span className="gold-gradient-text">Aura Athletics</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-inter text-sm text-zinc-400 font-light leading-relaxed">
            We reject the average. Aura provides an unparalleled tier of bespoke fitness amenities, biological tools, and recovery suites.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="interactive-card glass-panel gold-border gold-glow-hover flex flex-col justify-between rounded-2xl p-6"
              >
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-poppins text-sm font-semibold text-white">
                    {feat.title}
                  </h3>
                  <p className="mt-3 font-inter text-xs font-light text-zinc-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
