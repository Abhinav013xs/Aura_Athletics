"use client";

import { useState } from "react";
import { X, Sparkles, LogIn } from "lucide-react";
import { motion } from "framer-motion";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";
    const body = isRegister ? { name, email, password } : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (res.ok) {
        if (isRegister) {
          setSuccessMsg("Registration successful! Switching to sign in.");
          setIsRegister(false);
          setName("");
        } else {
          // Login Success
          onLoginSuccess(data.user);
          onClose();
        }
      } else {
        setErrorMsg(data.error || "Authentication failed");
      }
    } catch {
      setErrorMsg("Network error contacting verification gates");
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/90 backdrop-blur-sm p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md rounded-3xl border border-white/5 bg-[#0b0b0b] p-8 space-y-6 relative"
      >
        {/* Close */}
        <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-white font-inter text-xs">
          [Close]
        </button>

        {/* Header */}
        <div className="border-b border-white/5 pb-4">
          <span className="font-poppins text-xs font-semibold text-primary uppercase tracking-widest flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5" />
            Aura Identity
          </span>
          <h3 className="font-bebas text-3xl text-white tracking-wider uppercase mt-1">
            {isRegister ? "Register Account" : "Sign In Portal"}
          </h3>
        </div>

        {errorMsg && <div className="text-xs text-red-500 font-inter">{errorMsg}</div>}
        {successMsg && <div className="text-xs text-primary font-inter">{successMsg}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block font-poppins text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ranveer Singh"
                className="w-full rounded-xl border border-white/5 bg-white/[0.01] p-4 text-white text-xs outline-none focus:border-primary/40"
              />
            </div>
          )}

          <div>
            <label className="block font-poppins text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="client@aura.com"
              className="w-full rounded-xl border border-white/5 bg-white/[0.01] p-4 text-white text-xs outline-none focus:border-primary/40"
            />
          </div>

          <div>
            <label className="block font-poppins text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/5 bg-white/[0.01] p-4 text-white text-xs outline-none focus:border-primary/40"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-primary font-poppins text-xs font-bold text-black uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]"
          >
            <LogIn className="h-4 w-4" />
            {loading ? "Authenticating..." : isRegister ? "Create Account" : "Access Hub"}
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setErrorMsg("");
              setSuccessMsg("");
            }}
            className="font-inter text-xs text-zinc-500 hover:text-white transition-colors"
          >
            {isRegister ? "Already registered? Sign In" : "Need an account? Register"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
