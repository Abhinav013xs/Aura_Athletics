"use client";

import { useEffect, useState } from "react";
import { Menu, X, ShoppingCart, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onOpenAuth: () => void;
  onOpenBooking: () => void;
  cartCount: number;
  onOpenCart: () => void;
  user: any;
  onLogout: () => void;
  onOpenDashboard: () => void;
}

export default function Navbar({
  onOpenAuth,
  onOpenBooking,
  cartCount,
  onOpenCart,
  user,
  onLogout,
  onOpenDashboard,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Programs", href: "#programs" },
    { name: "Exercises", href: "#exercises" },
    { name: "Calculators", href: "#calculators" },
    { name: "Shop", href: "#shop" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? "bg-[#050505]/80 backdrop-blur-md border-b border-white/5 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 font-bebas text-3xl font-normal tracking-wider text-white"
          >
            AURA <span className="text-primary drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">ATHLETICS</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="magnetic-btn font-inter text-sm font-light tracking-wide text-zinc-400 transition-colors hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* User Status and CTAs */}
          <div className="hidden items-center gap-6 lg:flex">
            {/* Cart Icon */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-zinc-400 hover:text-primary transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={onOpenDashboard}
                  className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 font-poppins text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
                >
                  <Award className="h-4 w-4" />
                  {user.name.split(" ")[0]}
                </button>
                <button
                  onClick={onLogout}
                  className="font-inter text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="font-poppins text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
              >
                Sign In
              </button>
            )}

            <button
              onClick={onOpenBooking}
              className="magnetic-btn gold-glow-hover rounded-full bg-primary px-6 py-2.5 font-poppins text-xs font-bold text-black uppercase tracking-wider transition-all"
            >
              Join Now
            </button>
          </div>

          {/* Mobile Hamburguer */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={onOpenCart}
              className="relative p-2 text-zinc-400 hover:text-primary transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-primary transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-[#050505] border-b border-white/5 py-8 px-6 lg:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-inter text-lg text-zinc-300 hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-white/5 my-2" />
              {user ? (
                <div className="flex flex-col gap-4 items-center">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenDashboard();
                    }}
                    className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-6 py-2.5 font-poppins text-sm font-semibold text-primary"
                  >
                    <Award className="h-4 w-4" />
                    Open Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="font-inter text-sm text-zinc-500 hover:text-zinc-300"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="font-inter text-zinc-300 hover:text-primary"
                >
                  Sign In / Register
                </button>
              )}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="mx-auto rounded-full bg-primary px-8 py-3 font-poppins text-sm font-bold text-black uppercase tracking-wider w-full max-w-xs"
              >
                Join Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
