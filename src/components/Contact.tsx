"use client";

import { useState } from "react";
import { Phone, Mail, Clock, MapPin, Send, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", phone: "", message: "" });
    }, 3000);
  };

  const contactDetails = [
    { icon: MapPin, title: "Our Location", value: "Level 4, Lamborghini Block, DLF Phase 5, Gurugram, India" },
    { icon: Phone, title: "Phone Line", value: "+91 99999 88888" },
    { icon: Mail, title: "Bespoke Support", value: "concierge@auraathletics.com" },
    { icon: Clock, title: "Working Hours", value: "Mon - Sat: 05:00 AM - 11:00 PM | Sun: 08:00 AM - 08:00 PM" }
  ];

  return (
    <section id="contact" className="relative w-full bg-[#050505] py-20 md:py-28 border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 55 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-7xl px-6 md:px-12"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-poppins text-xs font-semibold uppercase tracking-widest text-primary">
            Get in touch
          </span>
          <h2 className="mt-2 font-bebas text-5xl font-normal tracking-wide text-white md:text-7xl uppercase">
            Aura <span className="gold-gradient-text">Concierge</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-inter text-sm text-zinc-400 font-light leading-relaxed">
            Have questions about memberships, corporate accounts, or trainer booking? Leave a message or write to us.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Details & Map */}
          <div className="space-y-8">
            <div className="space-y-6">
              {contactDetails.map((det, i) => {
                const Icon = det.icon;
                return (
                  <div key={i} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-poppins text-xs font-semibold text-white uppercase tracking-wider">{det.title}</h4>
                      <p className="mt-1 font-inter text-sm font-light text-zinc-400 leading-relaxed">{det.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Real Google Map with Dark Aesthetic Filters */}
            <div className="relative h-[250px] w-full rounded-2xl border border-white/5 bg-zinc-950 overflow-hidden">
              <iframe
                title="Aura Athletics Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.728956972049!2d77.08573177612739!3d28.45760889199321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18e87e7f6e37%3A0xe54e2f384a5697f2!2sDLF%20Phase%205%2C%20Sector%2053%2C%20Gurugram%2C%20Haryana%20122002!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 filter grayscale invert contrast-125 brightness-90"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-panel border border-white/5 rounded-3xl p-8 space-y-6">
            <h3 className="font-bebas text-2xl text-white tracking-wider uppercase">Send A Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-poppins text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Ranveer Singh"
                  className="w-full rounded-xl border border-white/5 bg-white/[0.01] p-4 text-white text-xs outline-none focus:border-primary/40 focus:bg-white/[0.02]"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-poppins text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="e.g. client@aura.com"
                    className="w-full rounded-xl border border-white/5 bg-white/[0.01] p-4 text-white text-xs outline-none focus:border-primary/40"
                  />
                </div>
                <div>
                  <label className="block font-poppins text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">Phone (Optional)</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="e.g. +91 99999 88888"
                    className="w-full rounded-xl border border-white/5 bg-white/[0.01] p-4 text-white text-xs outline-none focus:border-primary/40"
                  />
                </div>
              </div>
              <div>
                <label className="block font-poppins text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">Message Body</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your fitness targets..."
                  className="w-full rounded-xl border border-white/5 bg-white/[0.01] p-4 text-white text-xs outline-none focus:border-primary/40"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-primary font-poppins text-xs font-bold text-black uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all"
              >
                <Send className="h-4 w-4" />
                Submit Request
              </button>
            </form>

            {sent && (
              <div className="rounded-xl bg-primary/10 border border-primary/20 p-4 text-center font-inter text-xs text-primary font-light">
                Message delivered. Our club concierge team will call/email you in a few moments.
              </div>
            )}

            {/* Quick WhatsApp Support */}
            <div className="text-center pt-2">
              <a
                href="https://wa.me/919999988888"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-poppins text-xs font-bold text-[#25d366] hover:text-[#25d366]/80 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Instant WhatsApp Concierge
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
