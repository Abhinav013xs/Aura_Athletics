"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, Heart, Trash2, ArrowRight, Sparkles, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

interface ShopSectionProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

export default function ShopSection({ cart, setCart, isCartOpen, setIsCartOpen }: ShopSectionProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "payment" | "success">("cart");
  const [selectedGateway, setSelectedGateway] = useState<"stripe" | "razorpay">("stripe");

  useEffect(() => {
    // Fetch products from our api
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = ["All", "supplement", "merchandise", "accessory"];

  const filteredProducts = products.filter((p) => {
    return activeCategory === "All" || p.category === activeCategory;
  });

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.product._id === product._id);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].quantity += 1;
        return updated;
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.product._id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) => {
      return prev.map((item) => {
        if (item.product._id === id) {
          return { ...item, quantity: qty };
        }
        return item;
      });
    });
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      if (prev.includes(id)) {
        return prev.filter((wId) => wId !== id);
      }
      return [...prev, id];
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckoutSubmit = () => {
    setCheckoutStep("success");
    // Clear cart on success
    setTimeout(() => {
      setCart([]);
      setIsCartOpen(false);
      setCheckoutStep("cart");
    }, 4000);
  };

  return (
    <section id="shop" className="relative w-full bg-[#050505] py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 55 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-7xl px-6 md:px-12"
      >
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="text-center md:text-left">
            <span className="font-poppins text-xs font-semibold uppercase tracking-widest text-primary">
              Premium Gear & Fuel
            </span>
            <h2 className="mt-2 font-bebas text-5xl font-normal tracking-wide text-white md:text-7xl uppercase">
              Aura <span className="gold-gradient-text">Bespoke Shop</span>
            </h2>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 font-poppins text-[10px] font-bold uppercase tracking-wider transition-all border ${
                  activeCategory === cat
                    ? "bg-primary border-primary text-black"
                    : "bg-white/[0.01] border-white/5 text-zinc-400 hover:text-white"
                }`}
              >
                {cat === "All" ? "All Products" : `${cat}s`}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="py-20 text-center text-zinc-500 font-inter font-light">Loading catalog...</div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((p) => (
              <div key={p._id} className="glass-panel border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between group">
                <div className="relative h-[250px] bg-zinc-950 overflow-hidden">
                  {/* Product Image */}
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />

                  {/* Actions Over image */}
                  <button
                    onClick={() => toggleWishlist(p._id)}
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-[#050505]/60 backdrop-blur-sm border border-white/10 text-white hover:text-red-500 transition-colors"
                  >
                    <Heart className={`h-4 w-4 ${wishlist.includes(p._id) ? "fill-red-500 text-red-500" : ""}`} />
                  </button>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-poppins font-semibold text-zinc-500 uppercase tracking-widest">{p.category}</span>
                    <h3 className="mt-2 font-poppins text-base font-semibold text-white group-hover:text-primary transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-2 font-inter text-xs text-zinc-400 font-light line-clamp-2">
                      {p.description}
                    </p>
                    <p className="mt-3 text-[10px] text-primary/80 font-poppins font-semibold uppercase tracking-wide">
                      {p.benefits}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="font-bebas text-2xl text-white tabular-nums">
                      ₹{p.price}
                    </span>
                    <button
                      onClick={() => addToCart(p)}
                      className="rounded-full bg-white/5 border border-white/10 hover:bg-primary hover:text-black hover:border-primary px-5 py-2 font-poppins text-[10px] font-bold uppercase tracking-wider text-white transition-all flex items-center gap-1.5"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Slide-out Cart Panel Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-50 bg-[#050505]/80 backdrop-blur-sm"
            />

            {/* Sidebar Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.4 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[#0b0b0b] border-l border-white/5 p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                  <h3 className="font-bebas text-3xl text-white tracking-wider flex items-center gap-2">
                    <ShoppingBag className="h-6 w-6 text-primary" />
                    Bespoke Cart
                  </h3>
                  <button onClick={() => setIsCartOpen(false)} className="text-zinc-500 hover:text-white font-inter text-xs">
                    [Close]
                  </button>
                </div>

                {checkoutStep === "cart" && (
                  <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    {cart.map((item) => (
                      <div key={item.product._id} className="flex gap-4 rounded-xl bg-white/[0.01] border border-white/5 p-4 items-center justify-between">
                        <img src={item.product.image} alt={item.product.title} className="h-12 w-12 object-cover rounded-lg bg-zinc-900" />
                        <div className="flex-1 px-2">
                          <h4 className="font-poppins text-xs font-semibold text-white truncate max-w-[150px]">{item.product.title}</h4>
                          <span className="block text-[11px] text-zinc-500 font-bebas mt-0.5">₹{item.product.price}</span>
                        </div>
                        <div className="flex items-center gap-2 border border-white/5 rounded-full p-1 bg-white/[0.02]">
                          <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)} className="px-2 text-zinc-400 hover:text-white">-</button>
                          <span className="text-xs text-white tabular-nums font-semibold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)} className="px-2 text-zinc-400 hover:text-white">+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.product._id)} className="text-zinc-600 hover:text-red-500 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    {cart.length === 0 && (
                      <p className="py-20 text-center font-inter text-sm text-zinc-600 font-light">Your shopping cart is currently empty.</p>
                    )}
                  </div>
                )}

                {checkoutStep === "payment" && (
                  <div className="space-y-6">
                    <span className="font-poppins text-[10px] font-bold text-primary uppercase tracking-widest">Select Luxury Gate</span>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setSelectedGateway("stripe")}
                        className={`rounded-xl p-4 border text-center font-poppins text-xs font-semibold transition-all ${
                          selectedGateway === "stripe" ? "bg-primary/10 border-primary text-primary" : "bg-[#050505] border-white/5 text-zinc-400"
                        }`}
                      >
                        <CreditCard className="mx-auto h-5 w-5 mb-2" />
                        Stripe Luxury
                      </button>
                      <button
                        onClick={() => setSelectedGateway("razorpay")}
                        className={`rounded-xl p-4 border text-center font-poppins text-xs font-semibold transition-all ${
                          selectedGateway === "razorpay" ? "bg-primary/10 border-primary text-primary" : "bg-[#050505] border-white/5 text-zinc-400"
                        }`}
                      >
                        <ShoppingBag className="mx-auto h-5 w-5 mb-2" />
                        Razorpay Pro
                      </button>
                    </div>

                    <div className="rounded-2xl border border-white/5 bg-[#050505] p-5 space-y-4">
                      <div className="flex justify-between text-xs text-zinc-400">
                        <span>Transaction Tier:</span>
                        <span className="text-white">Ultra-Secure SSL</span>
                      </div>
                      <div className="flex justify-between text-xs text-zinc-400">
                        <span>Gateway Charge:</span>
                        <span className="text-primary">FREE</span>
                      </div>
                    </div>
                  </div>
                )}

                {checkoutStep === "success" && (
                  <div className="py-16 text-center space-y-4">
                    <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                      <Sparkles className="h-8 w-8 animate-pulse-glow" />
                    </div>
                    <h4 className="font-bebas text-3xl text-white tracking-wider uppercase">Order Placed!</h4>
                    <p className="font-inter text-xs text-zinc-400 font-light leading-relaxed">
                      Thank you for purchasing Aura Equipment. Your shipment order has been routed to logistics. Confirmation dispatched via email.
                    </p>
                  </div>
                )}
              </div>

              {/* Checkout Controls Footer */}
              {cart.length > 0 && checkoutStep !== "success" && (
                <div className="border-t border-white/5 pt-6 space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="font-inter text-xs text-zinc-500 font-light">Subtotal Amount:</span>
                    <span className="font-bebas text-3xl text-white">₹{cartTotal}</span>
                  </div>

                  {checkoutStep === "cart" ? (
                    <button
                      onClick={() => setCheckoutStep("payment")}
                      className="w-full py-4 rounded-full bg-primary font-poppins text-xs font-bold text-black uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all"
                    >
                      Proceed to Checkout
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <div className="flex gap-4">
                      <button
                        onClick={() => setCheckoutStep("cart")}
                        className="flex-1 py-4 rounded-full bg-zinc-900 border border-white/10 font-poppins text-[10px] font-bold text-white uppercase tracking-wider"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleCheckoutSubmit}
                        className="flex-[2] py-4 rounded-full bg-primary font-poppins text-[10px] font-bold text-black uppercase tracking-wider"
                      >
                        Confirm & Pay
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
