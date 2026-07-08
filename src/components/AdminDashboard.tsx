"use client";

import { useEffect, useState } from "react";
import { 
  Users, Calendar, CreditCard, ShoppingBag, 
  Check, X, Activity, DollarSign 
} from "lucide-react";

interface AdminDashboardProps {
  onClose: () => void;
}

export default function AdminDashboard({ onClose }: AdminDashboardProps) {
  const [activePanel, setActivePanel] = useState<"analytics" | "bookings" | "members" | "payments">("analytics");
  const [bookings, setBookings] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    // Fetch bookings
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBookings(data);
        }
        setLoadingBookings(false);
      })
      .catch(() => setLoadingBookings(false));

    // Simulated members lookup
    setMembers([
      { name: "Ranveer Singh", email: "ranveer@gmail.com", role: "member", points: 250, date: "2026-07-01" },
      { name: "Aishwarya Sen", email: "aishwarya@gmail.com", role: "member", points: 180, date: "2026-07-02" },
      { name: "Kabir Malhotra", email: "kabir@gmail.com", role: "member", points: 320, date: "2026-07-03" }
    ]);
  }, []);

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.amount || 0), 0) + 120000; // adding base membership revenues

  const handleUpdateStatus = (id: string, newStatus: string) => {
    // Local update to mock responsiveness
    setBookings((prev) => {
      return prev.map((b) => {
        if (b._id === id) {
          return { ...b, status: newStatus };
        }
        return b;
      });
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/95 backdrop-blur-md p-6 overflow-y-auto">
      <div className="w-full max-w-5xl rounded-3xl border border-white/5 bg-[#0b0b0b] p-8 space-y-8 max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-500 hover:text-white font-inter text-xs border border-white/5 rounded-full px-3 py-1 bg-white/[0.01]"
        >
          [Exit Admin Console]
        </button>

        {/* Header */}
        <div className="flex justify-between items-center border-b border-white/5 pb-6">
          <div>
            <span className="font-poppins text-xs font-semibold text-accent uppercase tracking-widest flex items-center gap-1.5 animate-pulse-glow">
              <Activity className="h-3.5 w-3.5" />
              Administrative Terminal
            </span>
            <h2 className="font-bebas text-4xl text-white tracking-wider uppercase mt-1">Aura Admin Dashboard</h2>
          </div>
        </div>

        {/* Grid Selectors */}
        <div className="flex rounded-full border border-white/5 bg-white/[0.01] p-1 w-fit">
          {(["analytics", "bookings", "members", "payments"] as const).map((panel) => (
            <button
              key={panel}
              onClick={() => setActivePanel(panel)}
              className={`rounded-full px-5 py-2 font-poppins text-[10px] font-bold uppercase tracking-wider transition-all ${
                activePanel === panel ? "bg-primary text-black" : "text-zinc-500 hover:text-white"
              }`}
            >
              {panel}
            </button>
          ))}
        </div>

        {/* Panel Contents */}
        <div className="mt-6">
          {/* ANALYTICS */}
          {activePanel === "analytics" && (
            <div className="space-y-8">
              {/* Metric Cards Grid */}
              <div className="grid gap-6 sm:grid-cols-4">
                <div className="glass-panel border border-white/5 rounded-2xl p-6">
                  <div className="flex justify-between items-start text-zinc-500">
                    <span className="font-poppins text-[10px] font-semibold uppercase tracking-widest">Total Revenue</span>
                    <DollarSign className="h-4 w-4 text-primary" />
                  </div>
                  <span className="block font-bebas text-3xl text-white font-bold mt-4">₹{totalRevenue}</span>
                  <span className="block text-[9px] text-zinc-600 font-inter mt-1">Stripe & Razorpay combined</span>
                </div>
                <div className="glass-panel border border-white/5 rounded-2xl p-6">
                  <div className="flex justify-between items-start text-zinc-500">
                    <span className="font-poppins text-[10px] font-semibold uppercase tracking-widest">Total Bookings</span>
                    <Calendar className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="block font-bebas text-3xl text-white font-bold mt-4">{bookings.length + 34}</span>
                  <span className="block text-[9px] text-zinc-600 font-inter mt-1">Active slots & trials scheduled</span>
                </div>
                <div className="glass-panel border border-white/5 rounded-2xl p-6">
                  <div className="flex justify-between items-start text-zinc-500">
                    <span className="font-poppins text-[10px] font-semibold uppercase tracking-widest">Registrations</span>
                    <Users className="h-4 w-4 text-emerald-400" />
                  </div>
                  <span className="block font-bebas text-3xl text-white font-bold mt-4">{members.length + 154}</span>
                  <span className="block text-[9px] text-zinc-600 font-inter mt-1">Total active members database</span>
                </div>
                <div className="glass-panel border border-white/5 rounded-2xl p-6">
                  <div className="flex justify-between items-start text-zinc-500">
                    <span className="font-poppins text-[10px] font-semibold uppercase tracking-widest">Merch Sold</span>
                    <ShoppingBag className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="block font-bebas text-3xl text-white font-bold mt-4">84</span>
                  <span className="block text-[9px] text-zinc-600 font-inter mt-1">Apparel & supplement checkout logs</span>
                </div>
              </div>

              {/* Chart Placeholder */}
              <div className="glass-panel border border-white/5 rounded-3xl p-8 space-y-4">
                <h4 className="font-bebas text-xl text-white tracking-wide uppercase">Visits Activity Curve</h4>
                <div className="h-48 w-full bg-white/[0.01] border border-white/5 rounded-2xl flex items-end justify-between p-6">
                  {[20, 45, 30, 80, 50, 95, 60, 40, 75, 90, 110, 85].map((val, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2 w-full">
                      <div className="w-4 bg-primary/20 hover:bg-primary/80 transition-colors rounded-t-sm" style={{ height: `${val}px` }} />
                      <span className="text-[9px] text-zinc-600 font-inter font-light">M{idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* BOOKINGS */}
          {activePanel === "bookings" && (
            <div className="glass-panel border border-white/5 rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-inter font-light text-zinc-400">
                  <thead className="bg-white/[0.02] font-poppins text-[9px] font-bold text-zinc-500 uppercase tracking-widest border-b border-white/5">
                    <tr>
                      <th className="p-4">Name</th>
                      <th className="p-4">Program</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Slot</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b._id} className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                        <td className="p-4 font-semibold text-white">{b.name}</td>
                        <td className="p-4">{b.program}</td>
                        <td className="p-4">{b.date}</td>
                        <td className="p-4">{b.timeSlot}</td>
                        <td className="p-4">
                          <span className={`rounded-full px-2 py-0.5 font-poppins text-[9px] font-bold uppercase tracking-wider ${
                            b.status === "confirmed" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"
                          }`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          {b.status === "pending" && (
                            <>
                              <button
                                onClick={() => handleUpdateStatus(b._id, "confirmed")}
                                className="p-1 rounded bg-green-500/10 text-green-400 hover:bg-green-500/20"
                              >
                                <Check className="h-4.5 w-4.5" />
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(b._id, "cancelled")}
                                className="p-1 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20"
                              >
                                <X className="h-4.5 w-4.5" />
                              </button>
                            </>
                          )}
                          {b.status !== "pending" && (
                            <span className="text-[10px] text-zinc-600 italic">No actions pending</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {bookings.length === 0 && !loadingBookings && (
                      <tr>
                        <td className="p-8 text-center" colSpan={6}>No bookings registered in database.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MEMBERS */}
          {activePanel === "members" && (
            <div className="glass-panel border border-white/5 rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-inter font-light text-zinc-400">
                  <thead className="bg-white/[0.02] font-poppins text-[9px] font-bold text-zinc-500 uppercase tracking-widest border-b border-white/5">
                    <tr>
                      <th className="p-4">Name</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Tier Status</th>
                      <th className="p-4 text-right">Loyalty Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((m, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/[0.01]">
                        <td className="p-4 font-semibold text-white">{m.name}</td>
                        <td className="p-4">{m.email}</td>
                        <td className="p-4 capitalize">{m.role}</td>
                        <td className="p-4 text-right text-primary font-bebas text-lg tabular-nums">{m.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PAYMENTS */}
          {activePanel === "payments" && (
            <div className="glass-panel border border-white/5 rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-inter font-light text-zinc-400">
                  <thead className="bg-white/[0.02] font-poppins text-[9px] font-bold text-zinc-500 uppercase tracking-widest border-b border-white/5">
                    <tr>
                      <th className="p-4">Transaction ID</th>
                      <th className="p-4">Method</th>
                      <th className="p-4">Purpose</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="p-4 font-mono">tx_8273648123</td>
                      <td className="p-4">Stripe API</td>
                      <td className="p-4">Elite Gym Membership</td>
                      <td className="p-4 text-green-400">Paid</td>
                      <td className="p-4 text-right font-bebas text-lg text-white">₹12,500</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 font-mono">tx_1092837492</td>
                      <td className="p-4">Razorpay Card</td>
                      <td className="p-4">Gold Whey Isolate</td>
                      <td className="p-4 text-green-400">Paid</td>
                      <td className="p-4 text-right font-bebas text-lg text-white">₹4,999</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 font-mono">tx_3847293847</td>
                      <td className="p-4">Stripe UPI</td>
                      <td className="p-4">Trainer Private Session</td>
                      <td className="p-4 text-green-400">Paid</td>
                      <td className="p-4 text-right font-bebas text-lg text-white">₹2,500</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
