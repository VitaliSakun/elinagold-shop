"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, Search, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function fmt(amount) {
  return parseFloat(amount || 0).toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults([]);
      setSearched(false);
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const doSearch = useCallback(async (term) => {
    if (term.trim().length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(term.trim())}`);
      const data = await res.json();
      setResults(data.products || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(val), 350);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white w-full max-h-[85vh] md:max-h-[80vh] flex flex-col animate-slide-down">
        {/* Suchfeld */}
        <div className="flex items-center gap-3 md:gap-4 px-4 md:px-12 py-4 md:py-5 border-b border-stone-100">
          <Search size={18} strokeWidth={1.2} className="text-stone-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Wonach suchen Sie?"
            className="flex-1 bg-transparent text-[14px] md:text-[16px] font-light tracking-[0.05em] text-stone-900 placeholder:text-stone-400 outline-none"
          />
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1.5 active:opacity-50 hover:opacity-50 transition-opacity"
            aria-label="Suche schließen"
          >
            <X size={20} strokeWidth={1.2} className="text-stone-500" />
          </button>
        </div>

        {/* Ergebnisse */}
        <div className="flex-1 overflow-y-auto -webkit-overflow-scrolling-touch px-4 md:px-12 py-5 md:py-6">
          {loading && (
            <div className="flex items-center justify-center py-10 md:py-12">
              <Loader2 size={20} strokeWidth={1.2} className="animate-spin text-stone-400" />
            </div>
          )}

          {!loading && searched && results.length === 0 && (
            <div className="text-center py-12 md:py-16">
              <p className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-2">
                Keine Ergebnisse für
              </p>
              <p className="text-[13px] md:text-[14px] font-light text-stone-600">&ldquo;{query}&rdquo;</p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <>
              <p className="text-[8px] md:text-[9px] tracking-[0.4em] uppercase text-stone-400 mb-4 md:mb-6">
                {results.length} {results.length === 1 ? "Ergebnis" : "Ergebnisse"}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                {results.map((product) => {
                  const img = product.images?.edges?.[0]?.node;
                  const price = product.priceRange?.minVariantPrice?.amount;
                  return (
                    <Link
                      key={product.id}
                      href={`/produkt/${product.handle}`}
                      onClick={onClose}
                      className="group block"
                    >
                      <div className="relative aspect-4/5 overflow-hidden bg-stone-100 mb-2">
                        {img ? (
                          <Image
                            src={img.url}
                            alt={img.altText || product.title}
                            fill
                            sizes="20vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-stone-300 text-[8px] tracking-[0.3em] uppercase">
                            Kein Bild
                          </div>
                        )}
                      </div>
                      <h4 className="text-[8px] md:text-[9px] tracking-[0.12em] uppercase font-light text-stone-800 mb-0.5 line-clamp-2 leading-snug">
                        {product.title}
                      </h4>
                      <p className="text-[9px] md:text-[10px] font-light text-stone-600">
                        {fmt(price)} €
                      </p>
                    </Link>
                  );
                })}
              </div>
            </>
          )}

          {!loading && !searched && (
            <div className="text-center py-12 md:py-16">
              <p className="text-[9px] md:text-[10px] tracking-[0.35em] uppercase text-stone-400">
                Suchen Sie nach Produkten oder Kategorien
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
