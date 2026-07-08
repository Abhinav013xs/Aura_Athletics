"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = cursorRingRef.current;
    if (!cursor || !ring) return;

    // Only enable custom cursor on desktops (non-touch devices)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);
    document.body.classList.add("has-custom-cursor");

    let hasInitialized = false;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      if (!hasInitialized) {
        gsap.set([cursor, ring], { x: clientX, y: clientY, opacity: 1 });
        hasInitialized = true;
      }

      // Move dot immediately
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      // Move outer ring with slight lag (smooth trail)
      gsap.to(ring, {
        x: clientX,
        y: clientY,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const onMouseEnter = () => {
      gsap.to([cursor, ring], { opacity: 1, duration: 0.3 });
    };

    const onMouseLeave = () => {
      gsap.to([cursor, ring], { opacity: 0, duration: 0.3 });
    };

    // Global Hover Interactions
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Hover over CTA buttons, cards, links
      const isLink = target.closest("a") || target.closest("button") || target.closest('[role="button"]');
      const isInteractiveCard = target.closest(".glass-panel") || target.closest(".interactive-card");

      if (isLink) {
        gsap.to(ring, {
          scale: 1.8,
          borderColor: "#D4AF37",
          backgroundColor: "rgba(212, 175, 55, 0.1)",
          duration: 0.3,
        });
        gsap.to(cursor, {
          scale: 1.5,
          backgroundColor: "#D4AF37",
          duration: 0.3,
        });
      } else if (isInteractiveCard) {
        gsap.to(ring, {
          scale: 2.2,
          borderColor: "rgba(255, 255, 255, 0.4)",
          backgroundColor: "rgba(255, 255, 255, 0.02)",
          duration: 0.3,
        });
      } else {
        // Reset
        gsap.to(ring, {
          scale: 1,
          borderColor: "rgba(212, 175, 55, 0.5)",
          backgroundColor: "transparent",
          duration: 0.3,
        });
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: "#D4AF37",
          duration: 0.3,
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mouseover", onMouseOver);

    // Magnetic Button Effect helper
    const magneticElements = document.querySelectorAll(".magnetic-btn");
    magneticElements.forEach((btn) => {
      const onBtnMouseMove = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = btn.getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left - rect.width / 2;
        const y = mouseEvent.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.45,
          y: y * 0.45,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const onBtnMouseLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
      };

      btn.addEventListener("mousemove", onBtnMouseMove);
      btn.addEventListener("mouseleave", onBtnMouseLeave);
    });

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Central Golden Dot */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[99999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary opacity-0"
      />
      {/* Outer Glowing Ring */}
      <div
        ref={cursorRingRef}
        className="pointer-events-none fixed top-0 left-0 z-[99998] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/50 opacity-0"
      />
    </>
  );
}
