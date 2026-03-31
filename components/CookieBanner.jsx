"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "accepted" || stored === "declined") {
        setVisible(false);
      } else {
        // Small delay so it slides in after initial page paint
        const timer = setTimeout(() => setVisible(true), 600);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage may be blocked in private mode; fail silently
    }
  }, []);

  function handleAccept() {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {}
    setVisible(false);
  }

  function handleDecline() {
    try {
      localStorage.setItem(STORAGE_KEY, "declined");
    } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie-Einstellungen"
      aria-live="polite"
      className={[
        // Base positioning — fixed bottom, full-width on mobile, max-w-lg bottom-left on desktop
        "fixed bottom-0 left-0 right-0 z-[9999]",
        "md:bottom-5 md:left-5 md:right-auto md:max-w-lg",
        // Background & border
        "bg-white border-t border-stone-200 md:border md:rounded-sm md:shadow-xl",
        // Slide-up animation
        "animate-cookie-banner",
      ].join(" ")}
    >
      {/* Bordeaux accent bar */}
      <div className="h-[2px] w-full bg-[#641428] md:rounded-t-sm" />

      <div className="px-5 py-5 md:px-6 md:py-6">
        {/* Text */}
        <p className="text-[12px] md:text-[13px] font-normal leading-6 text-stone-600 font-sans mb-4">
          Wir verwenden Cookies, um Ihr Einkaufserlebnis zu verbessern.
          Weitere Informationen finden Sie in unserer{" "}
          <Link
            href="/datenschutz"
            className="text-[#641428] underline underline-offset-2 hover:opacity-70 transition-opacity"
          >
            Datenschutzerklärung
          </Link>
          .
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
          <button
            onClick={handleAccept}
            className="flex-1 bg-[#641428] text-white text-[11px] tracking-[0.2em] uppercase font-sans font-normal py-3 px-5 hover:bg-[#4e0f1e] active:opacity-80 transition-colors"
          >
            Alle akzeptieren
          </button>
          <button
            onClick={handleDecline}
            className="flex-1 border border-stone-300 text-stone-700 text-[11px] tracking-[0.2em] uppercase font-sans font-normal py-3 px-5 hover:border-stone-500 hover:text-stone-900 active:opacity-70 transition-colors"
          >
            Nur notwendige
          </button>
        </div>

        {/* Datenschutz link — subtle, below buttons */}
        <div className="mt-3 text-center md:text-left">
          <Link
            href="/datenschutz"
            className="text-[10px] tracking-[0.15em] uppercase text-stone-400 hover:text-stone-600 transition-colors font-sans"
          >
            Datenschutz
          </Link>
        </div>
      </div>

      {/* Slide-up animation keyframe via inline style — no extra CSS file needed */}
      <style>{`
        @keyframes cookieBannerSlideUp {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-cookie-banner {
          animation: cookieBannerSlideUp 0.45s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        @media (min-width: 768px) {
          @keyframes cookieBannerSlideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        }
      `}</style>
    </div>
  );
}
