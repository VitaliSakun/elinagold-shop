"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Kürzere Dauer auf Mobile
    const duration = window.innerWidth < 768 ? 1600 : 2200;
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setVisible(false), 600);
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center transition-opacity duration-600 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{ backgroundColor: "#641428" }}
    >
      <div className="relative flex items-center justify-center">
        <div className="absolute w-32 md:w-40 h-32 md:h-40 rounded-full border border-white/10 preloader-ring-outer" />
        <div className="absolute w-40 md:w-52 h-40 md:h-52 rounded-full border border-white/5 preloader-ring-outer-2" />

        <div className="relative preloader-logo">
          <Image
            src="https://brun-media.de/ElinaGold/logo.png"
            alt="Elina Gold"
            width={140}
            height={70}
            className="h-12 md:h-20 w-auto object-contain brightness-0 invert"
            priority
          />
        </div>
      </div>

      <div className="mt-8 md:mt-12 w-24 md:w-32 h-px bg-white/15 overflow-hidden rounded-full">
        <div className="h-full bg-white/60 preloader-bar" />
      </div>

      <p className="mt-4 md:mt-6 text-[6px] md:text-[7px] tracking-[0.6em] uppercase text-white/40 font-normal preloader-text">
        Fine Jewelry
      </p>
    </div>
  );
}
