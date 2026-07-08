"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import WorkoutPlanner from "@/components/WorkoutPlanner";
import ExerciseLibrary from "@/components/ExerciseLibrary";
import FitnessCalculators from "@/components/FitnessCalculators";
import ShopSection from "@/components/ShopSection";
import MemberTransformations from "@/components/MemberTransformations";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import AuthModal from "@/components/AuthModal";
import DashboardView from "@/components/DashboardView";
import AdminDashboard from "@/components/AdminDashboard";
import AIChatbot from "@/components/AIChatbot";
import { Terminal } from "lucide-react";

interface Product {
  _id: string;
  title: string;
  price: number;
  category: "merchandise" | "supplement" | "accessory";
  benefits: string;
  image: string;
  stock: number;
  rating: number;
  description: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modal Triggers
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setIsDashboardOpen(false);
  };

  const handleOpenTour = () => {
    const el = document.getElementById("transformations");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* 1. Custom Preloader */}
      <Preloader onComplete={() => setIsLoading(false)} />

      {!isLoading && (
        <div className="relative min-h-screen bg-[#050505] text-white">
          {/* 2. Custom Magnetic Cursor */}
          <CustomCursor />

          {/* 3. Sticky Navbar */}
          <Navbar
            onOpenAuth={() => setIsAuthOpen(true)}
            onOpenBooking={() => setIsBookingOpen(true)}
            cartCount={cartCount}
            onOpenCart={() => setIsCartOpen(true)}
            user={user}
            onLogout={handleLogout}
            onOpenDashboard={() => setIsDashboardOpen(true)}
          />

          {/* 4. Landing Page Core Sections */}
          <main>
            <Hero
              onOpenBooking={() => setIsBookingOpen(true)}
              onOpenTour={handleOpenTour}
            />
            <About />
            <WhyChooseUs />
            <WorkoutPlanner />
            <ExerciseLibrary />
            <FitnessCalculators />
            <ShopSection
              cart={cart}
              setCart={setCart}
              isCartOpen={isCartOpen}
              setIsCartOpen={setIsCartOpen}
            />
            <MemberTransformations />
            <Reviews />
            <Contact />
          </main>

          {/* 5. Luxury Footer */}
          <Footer />

          {/* 6. Modals & Portals */}
          <BookingModal
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            user={user}
          />

          <AuthModal
            isOpen={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
            onLoginSuccess={(userData) => {
              setUser(userData);
              setIsDashboardOpen(true);
            }}
          />

          {isDashboardOpen && user && (
            <DashboardView
              user={user}
              setUser={setUser}
              onClose={() => setIsDashboardOpen(false)}
            />
          )}

          {isAdminOpen && (
            <AdminDashboard onClose={() => setIsAdminOpen(false)} />
          )}

          {/* 7. Floating AI Assistant Chatbot */}
          <AIChatbot />

          {/* 8. Demo Helper: Floating Admin Portal Trigger */}
          <div className="fixed bottom-6 left-6 z-40">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-white/10 text-zinc-500 hover:text-white transition-all shadow-lg"
              title="Open Admin Terminal"
            >
              <Terminal className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
