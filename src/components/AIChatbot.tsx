"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Bot, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Welcome to Aura Intelligence. I am your bespoke AI Master Coach. How can I help sculpt your path today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInput("");
    setIsTyping(true);

    // Rule-based smart coaching responses
    setTimeout(() => {
      let botResponse = "I have noted your request. As an elite Master Coach, I recommend balancing compound lifting movements (squats, benches, deadlifts) with high-density organic macronutrients. To get a complete plan, please use our Workout Programs & Calculators sections above.";

      const lower = userText.toLowerCase();
      if (lower.includes("push") || lower.includes("chest") || lower.includes("tricep")) {
        botResponse = "For Chest & Triceps (Push Day), I recommend: 4 sets of Incline Dumbbell Presses (8-10 reps), 4 sets of Flat Barbell Benches (6-8 reps), and 3 sets of Cable Tricep Pushdowns (12-15 reps). Focus on strict concentric power and 3-second eccentric lowerings.";
      } else if (lower.includes("diet") || lower.includes("eat") || lower.includes("protein") || lower.includes("veg")) {
        botResponse = "To optimize protein synthesis, consume 2.0g to 2.2g of protein per kg of bodyweight daily. Excellent vegetarian sources include organic tofu, low-fat paneer, and lentil broth. Make sure to check out the customized Calorie & Macro calculator above!";
      } else if (lower.includes("fat") || lower.includes("loss") || lower.includes("shred")) {
        botResponse = "For optimal fat loss, target a moderate 15-20% caloric deficit, maintain heavy resistance training to preserve lean muscle, and supplement with micronized creatine to sustain raw workout power.";
      } else if (lower.includes("hi") || lower.includes("hello") || lower.includes("hey")) {
        botResponse = "Greetings, athlete. I am ready to review your parameters. Are you looking to optimize fat loss, design a muscle gain split, or structure a high-protein diet plan?";
      }

      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-[320px] sm:w-[360px] rounded-3xl border border-white/5 bg-[#0b0b0b] shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col h-[450px]"
          >
            {/* Header */}
            <div className="bg-white/[0.02] border-b border-white/5 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <Bot className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="font-poppins text-xs font-semibold text-white flex items-center gap-1">
                    Aura Intelligence
                    <Sparkles className="h-3 w-3 text-primary animate-pulse" />
                  </h4>
                  <span className="block text-[8px] text-zinc-500 uppercase tracking-wider font-inter">Active Master Coach</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Message Area */}
            <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 font-inter text-xs">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3.5 leading-relaxed font-light ${
                      msg.sender === "user"
                        ? "bg-primary text-black rounded-tr-none font-normal"
                        : "bg-white/[0.02] border border-white/5 text-zinc-300 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.02] border border-white/5 text-zinc-500 rounded-2xl rounded-tl-none p-3 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Footer */}
            <div className="border-t border-white/5 p-3.5 bg-white/[0.01] flex gap-2">
              <input
                type="text"
                placeholder="Ask Aura Coach..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 rounded-full border border-white/5 bg-[#050505] py-2.5 px-4 text-white text-xs outline-none focus:border-primary/40 placeholder-zinc-600"
              />
              <button
                onClick={handleSend}
                className="h-9 w-9 rounded-full bg-primary text-black flex items-center justify-center hover:scale-105 transition-transform"
              >
                <Send className="h-4 w-4 fill-black" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
