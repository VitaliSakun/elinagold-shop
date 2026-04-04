"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

const SCROLL_HEIGHT = "300vh";

const TEXT_FADE_START = 0.6;
const TEXT_FADE_END = 0.85;

export default function ScrollVideoHero() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [textOpacity, setTextOpacity] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    video.load();

    const scrub = () => {
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;

      const scrolled = -rect.top;
      const scrollableDistance = containerHeight - viewportHeight;

      if (scrollableDistance <= 0) return;

      const progress = Math.min(1, Math.max(0, scrolled / scrollableDistance));

      if (video.duration) {
        video.currentTime = progress * video.duration;
      }

      const fadeRange = TEXT_FADE_END - TEXT_FADE_START;
      const fadeProgress = Math.min(1, Math.max(0, (progress - TEXT_FADE_START) / fadeRange));
      setTextOpacity(fadeProgress);
    };

    video.addEventListener("loadedmetadata", scrub);
    window.addEventListener("scroll", scrub, { passive: true });
    scrub();

    return () => {
      video.removeEventListener("loadedmetadata", scrub);
      window.removeEventListener("scroll", scrub);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ height: SCROLL_HEIGHT }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">

        {/* Video — contain zeigt es vollständig, weiße Ränder füllen den Rest */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            background: "#ffffff",
            zIndex: 1,
          }}
        >
          <source src="/videos/hero-scroll.mp4" type="video/mp4" />
        </video>

        {/* Weicher weißer Übergang an den Rändern für nahtlosen Look */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 75% 80% at 50% 50%, transparent 55%, rgba(255,255,255,0.85) 80%, #ffffff 100%)",
            zIndex: 2,
          }}
        />

        {/* Hero-Text — erscheint sanft gegen Ende, dunkle Farben auf weißem BG */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-end pb-24 md:justify-center md:pb-0 px-6 text-center"
          style={{
            zIndex: 3,
            opacity: textOpacity,
            transition: "opacity 0.15s ease-out",
          }}
        >
          <p className="text-[14px] md:text-[15px] tracking-[0.7em] uppercase mb-4 md:mb-5 text-stone-400">
            Fine Jewelry
          </p>
          <h1 className="text-4xl md:text-8xl font-medium tracking-[0.2em] md:tracking-[0.25em] uppercase mb-2 md:mb-3 text-stone-900">
            <span style={{ color: "#5c1325" }}>Elina</span>
            {" Gold"}
          </h1>
          <p className="text-[15px] md:text-[15px] tracking-[0.35em] md:tracking-[0.4em] uppercase mb-10 md:mb-12 text-stone-400 font-medium">
            Schmuck für besondere Momente
          </p>
          <Link
            href="/kollektion"
            className="border border-stone-800 px-10 md:px-14 py-3.5 md:py-4 text-[14px] md:text-[15px] tracking-[0.5em] uppercase transition-all duration-500 hover:bg-stone-900 hover:text-white min-h-11 md:min-h-12 inline-flex items-center text-stone-800"
          >
            Kollektion entdecken
          </Link>
        </div>

        {/* Scroll-Indikator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-stone-400 select-none pointer-events-none"
          style={{
            zIndex: 3,
            opacity: 1 - textOpacity,
            transition: "opacity 0.15s ease-out",
          }}
        >
          <span className="text-[15px] tracking-[0.5em] uppercase">Scroll</span>
          <div className="w-px h-12 bg-stone-300 scroll-pulse" />
        </div>

      </div>
    </div>
  );
}
