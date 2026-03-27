"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductGallery({ images }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const touchStart = useRef(null);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[3/4] w-full bg-stone-100 flex items-center justify-center text-stone-400 text-[10px] tracking-[0.3em] uppercase">
        Kein Bild
      </div>
    );
  }

  const prev = () => setActiveIdx((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setActiveIdx((i) => (i === images.length - 1 ? 0 : i + 1));

  // Swipe-Handling für Mobile
  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    touchStart.current = null;
  };

  return (
    <div className="flex flex-col md:flex-row h-full">

      {/* Desktop Thumbnails — links */}
      {images.length > 1 && (
        <div className="hidden md:flex flex-col gap-2.5 p-4 w-[88px] overflow-y-auto scrollbar-none">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`relative aspect-square w-full flex-shrink-0 overflow-hidden transition-all duration-200 ${
                i === activeIdx
                  ? "ring-2 ring-black ring-offset-2"
                  : "opacity-60 hover:opacity-100"
              }`}
              aria-label={`Bild ${i + 1}`}
            >
              <Image src={img.url} alt={img.altText || `Bild ${i + 1}`} fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Haupt-Bild — swipe-fähig auf Mobile */}
      <div
        className="flex-1 relative bg-stone-50 overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative w-full h-full min-h-[300px] md:min-h-0">
          <Image
            src={images[activeIdx].url}
            alt={images[activeIdx].altText || "Produktbild"}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-all duration-500"
            quality={90}
            priority
          />
        </div>

        {/* Desktop Pfeile */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 w-9 md:w-10 h-9 md:h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm active:bg-white hover:bg-white transition-all duration-200"
              aria-label="Vorheriges Bild"
            >
              <ChevronLeft size={16} strokeWidth={1.2} />
            </button>
            <button
              onClick={next}
              className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-9 md:w-10 h-9 md:h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm active:bg-white hover:bg-white transition-all duration-200"
              aria-label="Nächstes Bild"
            >
              <ChevronRight size={16} strokeWidth={1.2} />
            </button>
          </>
        )}

        {/* Bildzähler */}
        {images.length > 1 && (
          <div className="absolute bottom-3 md:bottom-4 right-3 md:right-4 text-[8px] md:text-[9px] tracking-[0.2em] text-stone-500 bg-white/80 backdrop-blur-sm px-2.5 md:px-3 py-1 md:py-1.5">
            {activeIdx + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Mobile Thumbnails — scrollbar unten */}
      {images.length > 1 && (
        <div className="md:hidden flex gap-2 p-2.5 overflow-x-auto scrollbar-none bg-white">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`relative w-14 h-14 flex-shrink-0 overflow-hidden transition-all duration-200 ${
                i === activeIdx
                  ? "ring-2 ring-black ring-offset-1"
                  : "opacity-50"
              }`}
              aria-label={`Bild ${i + 1}`}
            >
              <Image src={img.url} alt={img.altText || `Bild ${i + 1}`} fill sizes="56px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
