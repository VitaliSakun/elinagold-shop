"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";

const SORT_OPTIONS = [
  { value: "default",    label: "Empfohlen" },
  { value: "price-asc",  label: "Preis aufsteigend" },
  { value: "price-desc", label: "Preis absteigend" },
  { value: "title-asc",  label: "Name A–Z" },
];

export default function CollectionFilters({ products }) {
  const [sort, setSort]           = useState("default");
  const [onlyAvail, setOnlyAvail] = useState(false);
  const [sortOpen, setSortOpen]   = useState(false);
  const sortRef = useRef(null);

  // Dropdown schließen beim Klick außerhalb
  useEffect(() => {
    const handler = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];
    if (onlyAvail) result = result.filter((p) => p.availableForSale !== false);
    if (sort === "price-asc")
      result.sort((a, b) =>
        parseFloat(a.priceRange.minVariantPrice.amount) -
        parseFloat(b.priceRange.minVariantPrice.amount)
      );
    else if (sort === "price-desc")
      result.sort((a, b) =>
        parseFloat(b.priceRange.minVariantPrice.amount) -
        parseFloat(a.priceRange.minVariantPrice.amount)
      );
    else if (sort === "title-asc")
      result.sort((a, b) => a.title.localeCompare(b.title, "de"));
    return result;
  }, [products, sort, onlyAvail]);

  const activeSort = SORT_OPTIONS.find((o) => o.value === sort);

  return (
    <div>

      {/* ── Filter / Sort Bar ── */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-stone-100">
        <div className="flex items-center justify-between px-4 md:px-16 py-3 md:py-4">

          {/* Links: Anzahl + Verfügbarkeit-Toggle */}
          <div className="flex items-center gap-4 md:gap-6">
            <span className="text-[8px] md:text-[9px] tracking-[0.4em] uppercase text-stone-400 tabular-nums">
              {filtered.length}
              <span className="ml-1">{filtered.length === 1 ? "Stück" : "Stücke"}</span>
            </span>

            <button
              onClick={() => setOnlyAvail((v) => !v)}
              className={`flex items-center gap-2 text-[9px] tracking-[0.3em] uppercase transition-colors duration-200 ${
                onlyAvail ? "text-black" : "text-stone-400 hover:text-stone-600"
              }`}
            >
              <span
                className={`w-3 h-3 rounded-full border transition-colors duration-200 ${
                  onlyAvail ? "bg-black border-black" : "border-stone-300"
                }`}
              />
              Verfügbar
            </button>
          </div>

          {/* Rechts: Sort-Dropdown */}
          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setSortOpen((v) => !v)}
              className="flex items-center gap-2 text-[9px] tracking-[0.3em] uppercase text-stone-600 hover:text-black transition-colors duration-200"
            >
              <SlidersHorizontal size={12} strokeWidth={1.5} className="text-stone-400" />
              <span className="hidden sm:inline">{activeSort?.label}</span>
              <span className="sm:hidden">Sortieren</span>
              <ChevronDown
                size={11}
                strokeWidth={1.5}
                className={`transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Panel */}
            <div
              className={`absolute right-0 top-full mt-3 w-52 bg-white border border-stone-100 shadow-lg shadow-black/5 transition-all duration-200 origin-top-right ${
                sortOpen
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setSort(opt.value); setSortOpen(false); }}
                  className={`w-full text-left px-5 py-3.5 text-[9px] tracking-[0.3em] uppercase transition-colors duration-150 ${
                    sort === opt.value
                      ? "text-black bg-stone-50"
                      : "text-stone-500 hover:text-black hover:bg-stone-50"
                  }`}
                >
                  {opt.value === sort && (
                    <span className="mr-2 text-black">—</span>
                  )}
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Produkt-Grid ── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <p className="text-[10px] tracking-[0.45em] uppercase text-stone-400">
            Keine Produkte gefunden
          </p>
          {onlyAvail && (
            <button
              onClick={() => setOnlyAvail(false)}
              className="flex items-center gap-1.5 text-[9px] tracking-[0.3em] uppercase text-stone-500 hover:text-black transition-colors border-b border-stone-300 pb-0.5"
            >
              <X size={10} strokeWidth={1.5} />
              Filter entfernen
            </button>
          )}
        </div>
      ) : (
        <div className="px-3 md:px-16 py-6 md:py-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2.5 md:gap-x-5 gap-y-5 md:gap-y-8">
            {filtered.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={i < 3}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
