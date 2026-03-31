"use client";

import { useState, useEffect } from "react";
import { X, ArrowRight, Crown } from "lucide-react";
import Image from "next/image";

export default function MemberPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("eg-member-dismissed");
    if (dismissed) return;
    const timer = setTimeout(() => setShow(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (show && !closing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [show, closing]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setShow(false);
      setClosing(false);
      sessionStorage.setItem("eg-member-dismissed", "1");
    }, 400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    sessionStorage.setItem("eg-member-dismissed", "1");
    setTimeout(handleClose, 3000);
  };

  if (!show) return null;

  return (
    <div className={`fixed inset-0 z-[9000] flex items-end md:items-center justify-center p-0 md:p-4 ${closing ? "popup-fade-out" : "popup-fade-in"}`}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />

      {/* Card — Mobile: volle Breite unten, Desktop: zentriert */}
      <div className={`relative bg-white w-full md:max-w-[440px] max-h-[90vh] overflow-y-auto shadow-2xl rounded-t-2xl md:rounded-none ${closing ? "" : "popup-scale-in"}`}>

        {/* Bordeaux Header */}
        <div className="relative bg-bordeaux-700 px-6 md:px-8 pt-8 md:pt-10 pb-6 md:pb-8 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-[0.06]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 0.5px, transparent 0)`,
            backgroundSize: "24px 24px",
          }} />

          <div className="relative">
            <Image
              src="https://brun-media.de/ElinaGold/logo.png"
              alt="Elina Gold"
              width={100}
              height={50}
              className="h-8 md:h-10 w-auto object-contain brightness-0 invert mx-auto mb-4 md:mb-5"
            />

            <div className="flex justify-center mb-3 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center">
                <Crown size={18} strokeWidth={1} className="text-white/80" />
              </div>
            </div>

            <h3 className="text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-white font-normal mb-1.5 md:mb-2">
              Werden Sie Member
            </h3>
            <p className="text-[8px] md:text-[9px] tracking-[0.25em] uppercase text-white/50 font-normal">
              Exklusiver Zugang · Neue Kollektionen
            </p>
          </div>
        </div>

        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 flex items-center justify-center text-white/60 active:text-white hover:text-white transition-colors"
          aria-label="Schließen"
        >
          <X size={16} strokeWidth={1.2} />
        </button>

        {/* Content */}
        <div className="px-5 md:px-8 py-6 md:py-8">
          {submitted ? (
            <div className="text-center py-4 md:py-6">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-bordeaux-50 flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Crown size={18} strokeWidth={1} className="text-bordeaux-700" />
              </div>
              <p className="text-[10px] md:text-[11px] tracking-[0.35em] uppercase text-stone-800 font-normal mb-1.5 md:mb-2">
                Willkommen im Club
              </p>
              <p className="text-[9px] md:text-[10px] font-normal text-stone-500 tracking-wide">
                Sie erhalten als Erste Zugang zu neuen Kollektionen.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                {[
                  { title: "Frühzeitiger Zugang", desc: "Neue Kollektionen vor allen anderen" },
                  { title: "Exklusive Einladungen", desc: "Private Events & Launch-Partys" },
                  { title: "Persönliche Vorteile", desc: "Willkommensgeschenk & Geburtstags-Überraschung" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 md:gap-4 items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-5 h-5 rounded-full border border-bordeaux-200 flex items-center justify-center">
                        <span className="text-[7px] text-bordeaux-600 font-normal">{i + 1}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-stone-800 font-normal mb-0.5">{item.title}</p>
                      <p className="text-[9px] md:text-[10px] font-normal text-stone-400 tracking-wide">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent mb-5 md:mb-6" />

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ihre E-Mail-Adresse"
                  required
                  className="w-full border border-stone-200 px-4 md:px-5 py-3 md:py-3.5 text-[10px] tracking-[0.15em] text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-bordeaux-300 transition-colors uppercase"
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2.5 bg-bordeaux-700 text-white py-3 md:py-3.5 text-[9px] tracking-[0.45em] uppercase font-normal active:bg-bordeaux-800 hover:bg-bordeaux-800 transition-colors duration-300"
                >
                  Member werden
                  <ArrowRight size={12} strokeWidth={1.5} />
                </button>
              </form>

              <p className="text-center text-[7px] tracking-[0.2em] text-stone-400 mt-3 md:mt-4 uppercase">
                Kostenlos · Jederzeit kündbar
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
