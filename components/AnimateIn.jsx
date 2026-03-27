"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Wrapper that fades + slides children in when they enter the viewport.
 * from: "bottom" | "top" | "left" | "right"
 * delay: ms delay before animation starts
 */
export default function AnimateIn({ children, delay = 0, from = "bottom", className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const translateMap = {
    bottom: `translateY(${visible ? 0 : 32}px)`,
    top: `translateY(${visible ? 0 : -32}px)`,
    left: `translateX(${visible ? 0 : -32}px)`,
    right: `translateX(${visible ? 0 : 32}px)`,
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: translateMap[from] ?? translateMap.bottom,
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
