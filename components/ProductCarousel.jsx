"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

function fmt(amount) {
  return parseFloat(amount || 0).toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function ProductCarousel({ products = [] }) {
  const scrollRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateState, { passive: true });
    updateState();
    return () => el.removeEventListener("scroll", updateState);
  }, [updateState, products]);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    // Scroll um ~2 sichtbare Items
    const itemEl = el.querySelector(".carousel-item");
    const step = itemEl ? itemEl.offsetWidth * 2 + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  if (!products.length) return null;

  return (
    <div className="relative bg-white">
      {/* ── Scroll-Container ── */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 md:gap-6 px-4 md:px-16 lg:px-24 pt-2 pb-8 md:pb-10 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Verstecke WebKit-Scrollbar */}
        <style>{`.carousel-hide-scroll::-webkit-scrollbar { display: none; }`}</style>

        {products.map(({ node }, i) => {
          const img = node.images?.edges?.[0]?.node;
          const price = node.priceRange?.minVariantPrice?.amount;
          // Produkttyp oder Tags als Materialbeschreibung
          const material = node.productType || node.tags?.[0] || "Fine Jewelry";

          return (
            <Link
              key={node.id}
              href={`/produkt/${node.handle}`}
              className="carousel-item flex-none snap-start group block"
              style={{
                width: "clamp(150px, 40vw, 320px)",
              }}
            >
              {/* Quadratisches Bild (1:1) */}
              <div className="relative aspect-square overflow-hidden bg-stone-50 mb-3 md:mb-5">
                {img ? (
                  <Image
                    src={img.url}
                    alt={img.altText || node.title}
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 22vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    priority={i < 4}
                  />
                ) : (
                  <div className="absolute inset-0 bg-stone-100 flex items-center justify-center text-stone-300 text-[9px] tracking-[0.3em] uppercase">
                    Kein Bild
                  </div>
                )}
              </div>

              {/* Text-Bereich */}
              <div className="text-center px-2">
                {/* Produktname — fette Serifenschrift */}
                <h3
                  className="font-serif font-semibold text-stone-900 mb-1.5 leading-snug line-clamp-2"
                  style={{ fontSize: "clamp(13px, 1.1vw, 16px)" }}
                >
                  {node.title}
                </h3>
                {/* Material — leichte Sans-Serif mit Letter-Spacing */}
                <p className="text-[9px] tracking-[0.35em] uppercase font-normal text-stone-400 mb-2">
                  {material}
                </p>
                {/* Preis */}
                <p className="text-[12px] font-normal text-stone-700 tracking-wide">
                  {fmt(price)} €
                </p>
              </div>
            </Link>
          );
        })}

        {/* Letztes Pseudo-Item für Padding am rechten Rand */}
        <div className="flex-none w-8 md:w-16 lg:w-24" aria-hidden="true" />
      </div>

      {/* ── Navigation: Chevrons + Progress-Bar ── */}
      <div className="flex items-center gap-4 md:gap-5 px-4 md:px-16 lg:px-24 pb-4 md:pb-6">
        {/* Pfeil links */}
        <button
          onClick={() => scroll(-1)}
          aria-label="Zurück"
          disabled={!canPrev}
          className="flex-none transition-opacity duration-200"
          style={{ opacity: canPrev ? 1 : 0.2, cursor: canPrev ? "pointer" : "default" }}
        >
          <ChevronLeft size={14} strokeWidth={1.5} className="text-stone-600" />
        </button>

        {/* Progress-Leiste */}
        <div className="flex-1 h-px bg-stone-200 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full transition-all duration-200"
            style={{ width: `${progress * 100}%`, backgroundColor: "#641428" }}
          />
        </div>

        {/* Pfeil rechts */}
        <button
          onClick={() => scroll(1)}
          aria-label="Weiter"
          disabled={!canNext}
          className="flex-none transition-opacity duration-200"
          style={{ opacity: canNext ? 1 : 0.2, cursor: canNext ? "pointer" : "default" }}
        >
          <ChevronRight size={14} strokeWidth={1.5} className="text-stone-600" />
        </button>
      </div>
    </div>
  );
}
