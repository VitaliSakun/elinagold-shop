"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const CARD_W = 260;
const CARD_GAP = 28;
const PADDING = 80;
const MAX_ROTATE_Y = 52;

function fmt(amount) {
  return parseFloat(amount || 0).toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function ScrollCarousel3D({ products = [] }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);

  const N = products.length;
  // Gesamtbreite der Karten inkl. Padding
  const totalW = N * (CARD_W + CARD_GAP) - CARD_GAP + PADDING * 2;

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const update = () => {
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const containerH = container.offsetHeight;

      const scrolled = -rect.top;
      const scrollable = containerH - vh;
      if (scrollable <= 0) return;

      const progress = Math.min(1, Math.max(0, scrolled / scrollable));
      const maxOffset = Math.max(0, totalW - vw);
      const offset = progress * maxOffset;

      // Track horizontal verschieben
      track.style.transform = `translateX(-${offset}px)`;

      // 3D-Transform pro Karte
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const cardCenterX = PADDING + i * (CARD_W + CARD_GAP) + CARD_W / 2 - offset;
        const dist = cardCenterX - vw / 2;
        const norm = dist / (vw / 2);
        const rotY = Math.max(-MAX_ROTATE_Y, Math.min(MAX_ROTATE_Y, norm * MAX_ROTATE_Y));
        const scale = 1 - Math.min(0.22, Math.abs(norm) * 0.22);
        const opacity = 1 - Math.min(0.55, Math.abs(norm) * 0.55);
        card.style.transform = `rotateY(${rotY}deg) scale(${scale})`;
        card.style.opacity = String(opacity);
        card.style.transition = "transform 0.12s ease-out, opacity 0.12s ease-out";
      });
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [totalW]);

  if (!N) return null;

  // Scroll-Höhe: genug damit alle Karten durch scrollen
  const scrollHeight = `calc(100vh + ${N * 220}px)`;

  return (
    <div ref={containerRef} style={{ height: scrollHeight }} className="relative">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden bg-white flex flex-col">

        {/* Überschrift */}
        <div className="text-center pt-16 pb-8 flex-none">
          <p className="text-[9px] tracking-[0.65em] uppercase text-stone-400 mb-3">
            Frisch eingetroffen
          </p>
          <h2 className="text-xl md:text-2xl font-normal tracking-[0.3em] uppercase text-stone-900">
            Neuheiten
          </h2>
          <div
            className="mx-auto mt-5"
            style={{ width: "28px", height: "1px", backgroundColor: "#641428" }}
          />
        </div>

        {/* 3D Karussell */}
        <div
          className="flex-1 flex items-center overflow-hidden"
          style={{ perspective: "1400px", perspectiveOrigin: "50% 40%" }}
        >
          <div
            ref={trackRef}
            className="flex items-end"
            style={{
              paddingLeft: `${PADDING}px`,
              paddingRight: `${PADDING}px`,
              gap: `${CARD_GAP}px`,
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            {products.map(({ node }, i) => {
              const img = node.images?.edges?.[0]?.node;
              const price = node.priceRange?.minVariantPrice?.amount;
              const material = node.productType || node.tags?.[0] || "Fine Jewelry";

              return (
                <div
                  key={node.id}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  style={{ width: `${CARD_W}px`, flexShrink: 0, willChange: "transform, opacity" }}
                >
                  <Link href={`/produkt/${node.handle}`} className="block group">
                    <div className="relative overflow-hidden bg-stone-50 mb-3"
                      style={{ height: `${CARD_W}px` }}
                    >
                      {img ? (
                        <Image
                          src={img.url}
                          alt={img.altText || node.title}
                          fill
                          sizes="260px"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                          priority={i < 4}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-stone-100 flex items-center justify-center text-stone-300 text-[9px] tracking-[0.3em] uppercase">
                          Kein Bild
                        </div>
                      )}
                    </div>
                    <div className="text-center px-2">
                      <h3 className="font-serif font-semibold text-stone-900 mb-1.5 leading-snug line-clamp-2 text-[14px]">
                        {node.title}
                      </h3>
                      <p className="text-[9px] tracking-[0.35em] uppercase font-normal text-stone-400 mb-1.5">
                        {material}
                      </p>
                      <p className="text-[12px] font-normal text-stone-700 tracking-wide">
                        {fmt(price)} €
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-8 flex-none">
          <Link
            href="/kollektion"
            className="inline-flex items-center border border-bordeaux-700 text-bordeaux-700 px-14 py-4 text-[9px] tracking-[0.55em] uppercase transition-all duration-500 min-h-12 hover:bg-bordeaux-700 hover:text-white"
          >
            Alle Produkte ansehen
          </Link>
        </div>

      </div>
    </div>
  );
}
