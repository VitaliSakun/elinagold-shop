"use client";

import { useState } from "react";

export default function VariantPicker({ variants, productHandle, shopifyDomain }) {
  const [selectedId, setSelectedId] = useState(null);

  const checkoutUrl = shopifyDomain
    ? `https://${shopifyDomain}/products/${productHandle}`
    : "#";

  return (
    <div>
      {/* Varianten-Auswahl (nur wenn mehr als 1 Variante & nicht nur "Default Title") */}
      {variants.length > 1 && variants[0]?.title !== "Default Title" && (
        <div className="mb-8">
          <p className="text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-3">Variante</p>
          <div className="flex flex-wrap gap-2">
            {variants.map(({ node }) => (
              <button
                key={node.id}
                onClick={() => setSelectedId(node.id)}
                disabled={!node.availableForSale}
                className={`px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase border transition-all duration-200 min-h-[44px]
                  ${!node.availableForSale
                    ? "opacity-30 cursor-not-allowed border-stone-200 text-stone-400 line-through"
                    : selectedId === node.id
                    ? "border-black bg-black text-white"
                    : "border-stone-300 hover:border-black text-black"
                  }`}
              >
                {node.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <a
        href={checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center min-h-[52px] bg-black text-white text-[11px] tracking-[0.4em] uppercase hover:bg-stone-800 transition-colors duration-300 mb-4"
      >
        In den Warenkorb
      </a>

      <p className="text-[9px] tracking-[0.2em] text-stone-400 text-center uppercase">
        Kostenloser Versand ab 60 € · 30 Tage Rückgaberecht
      </p>
    </div>
  );
}
