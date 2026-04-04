"use client";

import { useState, useRef, useEffect } from "react";

// ─── Tausche src gegen deinen Video-Pfad aus ───────────────────────────────
// Lege die Videodatei z. B. unter /public/videos/hero.mp4 ab
// und setze src="/videos/hero.mp4" oder eine externe URL.
const VIDEO_SRC = "/videos/hero-scroll.mp4";
// ───────────────────────────────────────────────────────────────────────────

export default function VideoHero() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.readyState >= 2) setLoaded(true);
  }, []);

  return (
    <>
      {/* Fallback-Hintergrund (sichtbar bis Video geladen / bei Fehler) */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background:
            "linear-gradient(135deg, #1a0a0e 0%, #3d1020 50%, #1a0a0e 100%)",
          opacity: loaded && !error ? 0 : 1,
          zIndex: 0,
        }}
      />

      {!error && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setLoaded(true)}
          onError={() => setError(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: loaded ? 1 : 0,
            transition: "opacity 1.2s ease",
            zIndex: 0,
          }}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      )}
    </>
  );
}
