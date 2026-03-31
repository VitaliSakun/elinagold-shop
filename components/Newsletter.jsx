"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="relative bg-bordeaux-700 py-14 md:py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: "32px 32px",
      }} />

      <div className="relative max-w-xl mx-auto px-5 md:px-8 text-center">
        <p className="text-[7px] md:text-[8px] tracking-[0.6em] uppercase text-bordeaux-200 mb-3 md:mb-4 font-normal">
          Exklusiv für Sie
        </p>
        <h2 className="text-lg md:text-2xl font-normal tracking-[0.3em] uppercase text-white mb-3 md:mb-4">
          Newsletter
        </h2>
        <div className="mx-auto w-8 h-px bg-white/30 mb-5 md:mb-6" />
        <p className="text-[10px] md:text-[12px] font-normal text-bordeaux-100/80 leading-6 md:leading-7 tracking-wide mb-8 md:mb-10 max-w-md mx-auto">
          Erhalten Sie frühzeitig Zugang zu neuen Kollektionen, exklusiven Angeboten und Einblicken in die Welt von Elina Gold.
        </p>

        {submitted ? (
          <div className="py-4">
            <p className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-white font-normal">
              Vielen Dank für Ihre Anmeldung
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ihre E-Mail-Adresse"
              required
              className="flex-1 bg-white/10 border border-white/20 px-4 md:px-5 py-3 md:py-3.5 text-[10px] tracking-[0.2em] text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-colors duration-300 uppercase"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-white text-bordeaux-700 px-6 md:px-8 py-3 md:py-3.5 text-[9px] tracking-[0.45em] uppercase font-normal active:bg-bordeaux-50 hover:bg-bordeaux-50 transition-colors duration-300"
            >
              Anmelden
              <ArrowRight size={12} strokeWidth={1.5} />
            </button>
          </form>
        )}

        <p className="text-[6px] md:text-[7px] tracking-[0.2em] text-white/30 mt-5 md:mt-6 uppercase">
          Abmeldung jederzeit möglich · Datenschutz garantiert
        </p>
      </div>
    </section>
  );
}
