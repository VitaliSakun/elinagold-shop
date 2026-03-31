"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";

const LEFT_ITEMS = [
  { num: "01", title: "Handgefertigt", text: "Jedes Stück wird in sorgfältiger Handarbeit von erfahrenen Goldschmieden gefertigt — mit Liebe zum Detail." },
  { num: "02", title: "Edelste Materialien", text: "Wir verwenden ausschließlich zertifiziertes Gold, ethisch gewonnene Edelsteine und nachhaltige Materialien." },
  { num: "03", title: "Echtheitszertifikat", text: "Jedes Schmuckstück wird mit einem Echtheitszertifikat geliefert — Qualität, der Sie vertrauen können." },
];

const RIGHT_ITEMS = [
  { num: "04", title: "Zeitloses Design", text: "Jede Kollektion vereint klassische Eleganz mit modernen Akzenten — Schmuck für die Ewigkeit." },
  { num: "05", title: "Persönliche Beratung", text: "Unser Expertenteam berät Sie individuell — ob Ringgröße, Gravur oder das perfekte Geschenk." },
  { num: "06", title: "Nachhaltig & Fair", text: "Von der Mine bis zu Ihnen — transparent, fair und umweltbewusst. Wahrer Luxus trägt Verantwortung." },
];

export default function CraftSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  // Refs für alle 6 Punkte (0-2 = links, 3-5 = rechts)
  const itemRefs = useRef([]);

  // ── Video: scroll-getrieben ──────────────────────────────────────────────
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    video.load();

    const scrub = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Divisor erhöht = Video läuft langsamer durch
      const progress = Math.min(1, Math.max(0,
        (viewportHeight - rect.top) / (viewportHeight * 2.5)
      ));

      if (video.duration) {
        video.currentTime = progress * video.duration;
      }
    };

    video.addEventListener("loadedmetadata", scrub);
    window.addEventListener("scroll", scrub, { passive: true });
    scrub();

    return () => {
      video.removeEventListener("loadedmetadata", scrub);
      window.removeEventListener("scroll", scrub);
    };
  }, []);

  // ── Punkte: IntersectionObserver, gestaffeltes Einblenden ───────────────
  useEffect(() => {
    const observers = [];

    itemRefs.current.forEach((el, i) => {
      if (!el) return;

      // Startzustand
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      el.style.transition = `opacity 0.75s ease ${i * 130}ms, transform 0.75s ease ${i * 130}ms`;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            obs.disconnect();
          }
        },
        { threshold: 0.15 }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-32 overflow-hidden" style={{ backgroundColor: "#FFFFFD" }}>
      {/* Dezente Hintergrund-Textur */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #641428 0.5px, transparent 0)`,
        backgroundSize: "48px 48px",
      }} />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">

        {/* Oberer Titel */}
        <div className="text-center mb-10 md:mb-20">
          <p className="text-[8px] tracking-[0.7em] uppercase text-bordeaux-600 mb-4 font-normal">
            The Art of Fine Jewelry
          </p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-normal tracking-[0.25em] uppercase text-stone-900 leading-tight">
            Zeitlose Eleganz
          </h2>
          <div className="mx-auto mt-6 w-10 h-px bg-bordeaux-700" />
        </div>

        {/* Drei-Spalten-Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr_1fr] gap-8 md:gap-0 items-center">

          {/* Linke Spalte — 01, 02, 03 */}
          <div className="flex flex-col gap-6 md:gap-14 md:pr-12 lg:pr-16 md:order-1">
            {LEFT_ITEMS.map((item, i) => (
              <div
                key={item.num}
                ref={(el) => { itemRefs.current[i] = el; }}
                className="text-center md:text-right"
              >
                <div className="inline-flex items-center gap-2 mb-2 md:mb-3 justify-center md:justify-end">
                  <div className="w-6 md:w-8 h-px bg-bordeaux-700/40" />
                  <span className="text-[7px] tracking-[0.5em] uppercase text-bordeaux-600 font-normal">{item.num}</span>
                </div>
                <h3 className="font-serif text-[14px] md:text-[17px] font-medium text-stone-900 tracking-wide mb-1.5 md:mb-2.5">
                  {item.title}
                </h3>
                <p className="text-[10px] md:text-[11px] font-normal leading-6 md:leading-7 text-stone-500 tracking-wide">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* Mitte — Video */}
          <div className="relative flex items-center justify-center md:order-2">
            <div className="hidden md:block absolute w-[85%] aspect-square rounded-full border border-stone-200/50" />
            <div className="hidden md:block absolute w-[95%] aspect-square rounded-full border border-stone-100/40" />

            <div className="relative w-full max-w-[280px] md:max-w-[480px] mx-auto">
              <video
                ref={videoRef}
                muted
                playsInline
                preload="auto"
                className="w-full h-auto"
                style={{ background: "transparent" }}
              >
                <source src="/videos/craft.mp4" type="video/mp4" />
              </video>
              <div className="absolute -bottom-4 md:-bottom-6 left-1/2 -translate-x-1/2 w-[60%] h-6 md:h-8 bg-stone-900/5 blur-xl rounded-full" />
            </div>
          </div>

          {/* Rechte Spalte — 04, 05, 06 */}
          <div className="flex flex-col gap-6 md:gap-14 md:pl-12 lg:pl-16 md:order-3">
            {RIGHT_ITEMS.map((item, i) => (
              <div
                key={item.num}
                ref={(el) => { itemRefs.current[3 + i] = el; }}
                className="text-center md:text-left"
              >
                <div className="inline-flex items-center gap-2 mb-2 md:mb-3 justify-center md:justify-start">
                  <span className="text-[7px] tracking-[0.5em] uppercase text-bordeaux-600 font-normal">{item.num}</span>
                  <div className="w-6 md:w-8 h-px bg-bordeaux-700/40" />
                </div>
                <h3 className="font-serif text-[14px] md:text-[17px] font-medium text-stone-900 tracking-wide mb-1.5 md:mb-2.5">
                  {item.title}
                </h3>
                <p className="text-[10px] md:text-[11px] font-normal leading-6 md:leading-7 text-stone-500 tracking-wide">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* CTA unten */}
        <div className="text-center mt-12 md:mt-24">
          <Link
            href="/kollektion"
            className="inline-flex items-center border border-bordeaux-700 text-bordeaux-700 px-14 py-4 text-[9px] tracking-[0.5em] uppercase transition-all duration-500 min-h-12 hover:bg-bordeaux-700 hover:text-white"
          >
            Kollektion entdecken
          </Link>
        </div>

      </div>
    </section>
  );
}
