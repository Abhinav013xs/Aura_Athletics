"use client";

import { useState } from "react";
import { Instagram, Facebook, Youtube, Linkedin, Send } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 2500);
  };

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com" },
    { icon: Facebook, href: "https://facebook.com" },
    { icon: Youtube, href: "https://youtube.com" },
    { icon: Linkedin, href: "https://linkedin.com" }
  ];

  return (
    <footer className="relative w-full bg-[#050505] border-t border-white/5 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6 md:px-12 space-y-12">
        <div className="grid gap-8 lg:grid-cols-4 sm:grid-cols-2">
          {/* Logo & Pitch */}
          <div className="space-y-4">
            <h3 className="font-bebas text-3xl font-normal text-white uppercase tracking-wider">
              AURA <span className="text-primary">ATHLETICS</span>
            </h3>
            <p className="font-inter text-xs text-zinc-500 font-light leading-relaxed">
              Experience the absolute pinnacle of luxury fitness. High-end training bays, recovery suites, and personalized AI support.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-white/[0.01] text-zinc-500 hover:text-primary hover:border-primary/40 transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins text-xs font-bold text-white uppercase tracking-widest mb-4">Navigations</h4>
            <ul className="space-y-2 font-inter text-xs font-light text-zinc-500">
              <li><a href="#" className="hover:text-white transition-colors">Home Page</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">Training Programs</a></li>
              <li><a href="#exercises" className="hover:text-white transition-colors">Exercise Library</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Gear & Supplements</a></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-poppins text-xs font-bold text-white uppercase tracking-widest mb-4">Schedules</h4>
            <ul className="space-y-2 font-inter text-xs font-light text-zinc-500">
              <li><a href="#programs" className="hover:text-white transition-colors">Push-Pull-Legs</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">Bro Splits</a></li>
              <li><a href="#calculators" className="hover:text-white transition-colors">Macro Partitioning</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Trainer Appointment</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-poppins text-xs font-bold text-white uppercase tracking-widest">Newsletter</h4>
            <p className="font-inter text-xs text-zinc-500 font-light leading-relaxed">
              Subscribe to unlock quarterly luxury lifestyle magazines, workout logs, and product discounts.
            </p>

            <form onSubmit={handleSubscribe} className="relative w-full">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="concierge@email.com"
                className="w-full rounded-full border border-white/5 bg-white/[0.01] py-3 pl-4 pr-12 font-inter text-xs text-white placeholder-zinc-600 outline-none focus:border-primary/40"
              />
              <button
                type="submit"
                className="absolute top-1/2 right-2 h-8 w-8 -translate-y-1/2 rounded-full bg-primary text-black flex items-center justify-center hover:scale-105 transition-transform"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>

            {subscribed && (
              <span className="block text-[10px] text-primary font-inter font-light">Subscribed successfully. Welcome to the club.</span>
            )}
          </div>
        </div>

        <hr className="border-white/5" />

        {/* Subfooter */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-zinc-600 font-inter font-light">
          <span>&copy; {new Date().getFullYear()} Aura Athletics. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-zinc-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
