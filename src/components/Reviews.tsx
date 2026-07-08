"use client";

import { useEffect, useState } from "react";
import { Star, MessageSquare, Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  program: string;
  image: string;
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    // Fetch from our reviews route (auto-seeded)
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReviews(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const videoStories = [
    {
      id: "v1",
      title: "Aura Transformation V1",
      url: "https://www.youtube.com/embed/14q2z26jT1s", // High-production fitness motivation
      thumbnail: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600",
    },
    {
      id: "v2",
      title: "Aura Transformation V2",
      url: "https://www.youtube.com/embed/X_9VoSZcwc4", // Athletic training styling
      thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600",
    },
    {
      id: "v3",
      title: "Aura Transformation V3",
      url: "https://www.youtube.com/embed/e7spiM6C6Xg", // Calisthenics strength
      thumbnail: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=600",
    }
  ];

  return (
    <section id="reviews" className="relative w-full bg-[#050505] py-20 md:py-28 border-t border-white/5 overflow-hidden">
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
            Client Testimonials
          </span>
          <h2 className="mt-2 font-bebas text-5xl font-normal tracking-wide text-white md:text-7xl uppercase">
            Aura <span className="gold-gradient-text">Reviews</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-inter text-sm text-zinc-400 font-light leading-relaxed">
            Read stories from individuals who raised their standards and transcended their fitness limitations.
          </p>
        </div>

        {/* Reviews Cards List */}
        {loading ? (
          <div className="py-12 text-center text-zinc-500 font-inter font-light">Loading reviews...</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((rev) => (
              <motion.div
                key={rev._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass-panel border border-white/5 rounded-3xl p-8 flex flex-col justify-between"
              >
                <div>
                  {/* Rating */}
                  <div className="flex gap-1 text-primary mb-4">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} className={`h-4 w-4 fill-primary ${idx < rev.rating ? "opacity-100" : "opacity-20"}`} />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="font-inter text-zinc-300 font-light text-sm italic leading-relaxed">
                    &quot;{rev.comment}&quot;
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-4 border-t border-white/5 pt-4">
                  <img src={rev.image} alt={rev.name} className="h-10 w-10 object-cover rounded-full bg-zinc-900" />
                  <div>
                    <h4 className="font-poppins text-xs font-semibold text-white">{rev.name}</h4>
                    <span className="block text-[10px] text-zinc-500 font-inter font-light uppercase tracking-wider mt-0.5">
                      {rev.program}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Video Testimonials Showcase */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h3 className="font-bebas text-2xl text-white tracking-wider uppercase flex items-center justify-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Watch Video Stories
            </h3>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videoStories.map((v) => (
              <div
                key={v.id}
                onClick={() => setActiveVideoUrl(v.url)}
                className="relative h-[200px] rounded-2xl border border-white/5 bg-zinc-950 overflow-hidden group cursor-pointer"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${v.thumbnail}')` }}
                />
                <div className="absolute inset-0 bg-[#050505]/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/95 text-black scale-100 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                    <Play className="h-5 w-5 fill-black pl-0.5" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="font-poppins text-[10px] font-bold text-white uppercase tracking-widest">
                    {v.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Video Modal Player Popup */}
      <AnimatePresence>
        {activeVideoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideoUrl(null)}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden border border-white/10 bg-[#050505]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideoUrl(null)}
                className="absolute top-4 right-4 z-10 text-white hover:text-primary font-inter text-xs bg-black/60 rounded-full px-3 py-1 border border-white/5"
              >
                [Close Player]
              </button>
              <iframe
                src={`${activeVideoUrl}?autoplay=1`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
