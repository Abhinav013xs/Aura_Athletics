"use client";

import { useEffect, useState } from "react";
import { X, Calendar, User, Clock, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Trainer {
  _id: string;
  name: string;
  image: string;
  specializations: string[];
  slots: string[];
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

export default function BookingModal({ isOpen, onClose, user }: BookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loadingTrainers, setLoadingTrainers] = useState(true);

  // Form State
  const [program, setProgram] = useState("Complimentary Free Trial");
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [timeSlot, setTimeSlot] = useState("10:00 AM");
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setErrorMsg("");
      fetch("/api/trainers")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setTrainers(data);
            if (data.length > 0) {
              setSelectedTrainer(data[0]);
            }
          }
          setLoadingTrainers(false);
        })
        .catch(() => setLoadingTrainers(false));
    }
  }, [isOpen, user]);

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (!name || !email || !phone) {
        setErrorMsg("All contact fields are required.");
        return;
      }
      setErrorMsg("");
      handleSubmitBooking();
    }
  };

  const handleSubmitBooking = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?._id || null,
          name,
          email,
          phone,
          program,
          trainerId: selectedTrainer?._id || null,
          date,
          timeSlot,
          amount: program === "Complimentary Free Trial" ? 0 : 2500, // mock price
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStep(3);
      } else {
        setErrorMsg(data.error || "Booking failed");
      }
    } catch {
      setErrorMsg("Network error submitting booking request");
    }
    setSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/90 backdrop-blur-sm p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-xl rounded-3xl border border-white/5 bg-[#0b0b0b] p-8 space-y-6 relative"
      >
        {/* Close */}
        <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-white font-inter text-xs">
          [Cancel]
        </button>

        {/* Header */}
        <div className="border-b border-white/5 pb-4">
          <span className="font-poppins text-xs font-semibold text-primary uppercase tracking-widest">
            Aura Scheduling
          </span>
          <h3 className="font-bebas text-3xl text-white tracking-wider uppercase mt-1">
            Book Private Session
          </h3>
        </div>

        {errorMsg && <div className="text-xs text-red-500 font-inter">{errorMsg}</div>}

        {/* STEP 1: SELECT PROGRAM & SCHEDULING */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block font-poppins text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">Select Program Tier</label>
              <select
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                className="w-full rounded-xl border border-white/5 bg-[#050505] p-4 text-white text-xs outline-none focus:border-primary/40 h-[53px]"
              >
                <option value="Complimentary Free Trial">Complimentary Free Trial (₹0)</option>
                <option value="Elite Personal Training Session">Elite Personal Training Session (₹2500)</option>
                <option value="Luxury Yoga & Pilates Class">Luxury Yoga & Pilates Class (₹1500)</option>
              </select>
            </div>

            <div>
              <label className="block font-poppins text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">Select Private Coach</label>
              {loadingTrainers ? (
                <div className="text-zinc-500 text-xs py-2">Loading trainers...</div>
              ) : (
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {trainers.map((tr) => (
                    <button
                      key={tr._id}
                      onClick={() => {
                        setSelectedTrainer(tr);
                        if (tr.slots.length > 0) setTimeSlot(tr.slots[0]);
                      }}
                      className={`flex flex-col items-center p-3 rounded-xl border shrink-0 w-24 text-center transition-all ${
                        selectedTrainer?._id === tr._id ? "border-primary bg-primary/5" : "border-white/5 bg-white/[0.01]"
                      }`}
                    >
                      <img src={tr.image} alt={tr.name} className="h-10 w-10 object-cover rounded-full bg-zinc-900 mb-2" />
                      <span className="font-poppins text-[9px] font-bold text-white leading-tight truncate w-full">{tr.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block font-poppins text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">Target Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl border border-white/5 bg-white/[0.01] p-4 text-white text-xs outline-none focus:border-primary/40"
                />
              </div>
              <div>
                <label className="block font-poppins text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">Available Slots</label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full rounded-xl border border-white/5 bg-[#050505] p-4 text-white text-xs outline-none focus:border-primary/40 h-[53px]"
                >
                  {selectedTrainer?.slots.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  )) || (
                    <option value="10:00 AM">10:00 AM</option>
                  )}
                </select>
              </div>
            </div>

            <button
              onClick={handleNextStep}
              className="w-full py-4 rounded-xl bg-primary font-poppins text-xs font-bold text-black uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]"
            >
              Continue to Details
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* STEP 2: USER DETAILS & MOCK TRANSACTION SUMMARY */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block font-poppins text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ranveer Singh"
                className="w-full rounded-xl border border-white/5 bg-white/[0.01] p-4 text-white text-xs outline-none focus:border-primary/40"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block font-poppins text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@aura.com"
                  className="w-full rounded-xl border border-white/5 bg-white/[0.01] p-4 text-white text-xs outline-none focus:border-primary/40"
                />
              </div>
              <div>
                <label className="block font-poppins text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 99999 88888"
                  className="w-full rounded-xl border border-white/5 bg-white/[0.01] p-4 text-white text-xs outline-none focus:border-primary/40"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-[#050505] p-5 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-500">
                <span>Selected Coach:</span>
                <span className="text-white font-semibold">{selectedTrainer?.name}</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>Date & Slot:</span>
                <span className="text-white">{date} at {timeSlot}</span>
              </div>
              <div className="flex justify-between text-zinc-500 border-t border-white/5 pt-2 mt-2">
                <span>Total Amount:</span>
                <span className="text-primary font-bebas text-lg font-bold">
                  {program === "Complimentary Free Trial" ? "FREE" : "₹2500"}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-4 rounded-xl bg-zinc-900 border border-white/10 font-poppins text-[10px] font-bold text-white uppercase tracking-wider"
              >
                Back
              </button>
              <button
                onClick={handleNextStep}
                disabled={submitting}
                className="flex-[2] py-4 rounded-xl bg-primary font-poppins text-[10px] font-bold text-black uppercase tracking-wider flex items-center justify-center gap-2"
              >
                {submitting ? "Booking..." : "Confirm Booking"}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: BOOKING SUCCESS */}
        {step === 3 && (
          <div className="py-12 text-center space-y-4">
            <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
              <CheckCircle2 className="h-8 w-8 animate-pulse-glow" />
            </div>
            <h4 className="font-bebas text-3xl text-white tracking-wider uppercase">Booking Confirmed!</h4>
            <p className="font-inter text-xs text-zinc-400 font-light leading-relaxed max-w-sm mx-auto">
              Your private slot has been locked. The active-carbon lockers, valet services, and your master coach will be prepped. Confirmation details dispatched via email.
            </p>
            <button
              onClick={onClose}
              className="mt-6 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 font-poppins text-[10px] font-semibold text-white uppercase tracking-wider hover:bg-white/10"
            >
              Exit portal
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
