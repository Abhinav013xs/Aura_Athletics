"use client";

import { motion } from "framer-motion";
import { Award, Compass, Eye, ShieldCheck } from "lucide-react";

export default function About() {
  const cards = [
    {
      icon: Compass,
      title: "Our Mission",
      description: "To deliver an absolute premium lifestyle sanctuary where body sculpting, recovery wellness, and elite community styling meet under one roof.",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description: "Setting the gold standard for global luxury fitness, leveraging customized AI engines, premium high-tech machines, and unmatched aesthetics.",
    },
    {
      icon: Award,
      title: "Our Achievements",
      description: "Consistently voted India's Most Luxurious Gym, hosting 50+ celebrity trainers, and facilitating over 10,000+ life transformations.",
    },
  ];

  const milestones = [
    { year: "2014", title: "The Foundation", desc: "Aura Athletics was launched in South Delhi as a premium private fitness club for high net-worth individuals." },
    { year: "2018", title: "Nationwide Expansion", desc: "Expanded to Mumbai, Bangalore, and Pune, introducing high-end biomechanical machines from Germany." },
    { year: "2022", title: "AI Custom Launch", desc: "Integrated smart IoT workout lockers, customized DNA nutrition mapping, and local AI training agents." },
    { year: "2026", title: "The ₹100Cr Milestone", desc: "Reimagined modern training with 3D projection rooms, cryogenic chambers, and state-of-the-art visualizers." }
  ];

  return (
    <section id="about" className="relative w-full bg-[#050505] py-24 md:py-32">
      {/* Light spots */}
      <div className="absolute top-1/2 left-0 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-accent/3 blur-[150px]" />

      <motion.div
        initial={{ opacity: 0, y: 55 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-7xl px-6 md:px-12"
      >
        {/* Section Heading */}
        <div className="text-center md:text-left mb-16">
          <span className="font-poppins text-xs font-semibold uppercase tracking-widest text-primary">
            Who We Are
          </span>
          <h2 className="mt-2 font-bebas text-5xl font-normal tracking-wide text-white md:text-7xl uppercase">
            A New Era Of <span className="gold-gradient-text">Luxury Fitness</span>
          </h2>
          <p className="mt-4 max-w-xl font-inter text-sm text-zinc-400 font-light leading-relaxed">
            Founded with a commitment to visual excellence and high performance, Aura Athletics is the apex playground for elite professionals and athletes.
          </p>
        </div>

        {/* Mission Vision Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="interactive-card glass-panel gold-border rounded-2xl p-8 transition-all hover:bg-white/[0.04]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-poppins text-lg font-semibold text-white">
                  {card.title}
                </h3>
                <p className="mt-4 font-inter text-sm font-light text-zinc-400 leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Founder Story */}
        <div className="mt-24 grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[350px] overflow-hidden rounded-2xl border border-white/5 bg-zinc-900 md:h-[450px]"
          >
            {/* Visual Placeholder */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800')" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="font-poppins text-[10px] font-bold text-primary uppercase tracking-widest">
                Our Founders
              </span>
              <h4 className="font-bebas text-2xl text-white tracking-wider mt-1">
                Karan & Kabir Malhotra
              </h4>
              <p className="text-xs text-zinc-400 font-inter font-light">
                Former National Bodybuilders & Creative Designers
              </p>
            </div>
          </motion.div>

          <div>
            <span className="font-poppins text-xs font-semibold uppercase tracking-widest text-primary">
              The Genesis
            </span>
            <h3 className="mt-2 font-bebas text-4xl font-normal text-white tracking-wide sm:text-5xl uppercase">
              The Story Behind the Brand
            </h3>
            <p className="mt-6 font-inter text-sm text-zinc-400 font-light leading-relaxed">
              &quot;We realized that fitness centers in India were generic warehouses. We wanted to build an aesthetic sanctuary that felt like entering a Lamborghini cockpit: clean lines, red led accents, carbon fiber textures, and cinematic lighting.&quot;
            </p>
            <p className="mt-4 font-inter text-sm text-zinc-400 font-light leading-relaxed">
              At Aura Athletics, every detail is bespoke: from our acoustic soundscapes designed by leading DJs, to our custom-scented air diffuser systems, and our active-carbon lockers that recharge your device while you train.
            </p>
          </div>
        </div>

        {/* Animated Timeline */}
        <div className="mt-28">
          <div className="text-center mb-16">
            <span className="font-poppins text-xs font-semibold uppercase tracking-widest text-primary">
              Our Journey
            </span>
            <h3 className="mt-2 font-bebas text-4xl font-normal text-white tracking-wide sm:text-5xl uppercase">
              A Decade of Growth
            </h3>
          </div>

          <div className="relative border-l border-white/10 ml-4 md:ml-32">
            {milestones.map((milestone, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative pl-8 pb-12 last:pb-0"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-primary bg-[#050505] shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                
                {/* Year Label */}
                <span className="font-bebas text-xl font-normal text-primary tracking-widest">
                  {milestone.year}
                </span>
                
                {/* Milestone Details */}
                <h4 className="mt-1 font-poppins text-base font-semibold text-white">
                  {milestone.title}
                </h4>
                <p className="mt-2 max-w-2xl font-inter text-sm font-light text-zinc-400 leading-relaxed">
                  {milestone.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
