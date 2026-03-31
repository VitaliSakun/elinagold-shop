"use client";

import { useState, useCallback } from "react";
import { ShoppingBag, Heart, ChevronDown, Shield, RefreshCw, Truck, Award, Gem } from "lucide-react";
import { useCart } from "@/context/CartContext";

// ─── Helpers ──────────────────────────────────────────────────────────────

function fmt(amount) {
  return parseFloat(amount).toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + " €";
}

function buildMaterialDetails(product) {
  const lines = [];
  if (product.productType) lines.push({ label: "Typ", value: product.productType });
  if (product.vendor) lines.push({ label: "Marke", value: product.vendor });

  const materialTags = product.tags?.filter((t) =>
    /\d{3}er|karat|gold|silber|platin|zirkonia|diamant|türkis|smaragd|rubin|saphir/i.test(t)
  );
  if (materialTags?.length > 0) {
    lines.push({ label: "Material", value: materialTags.join(", ") });
  }

  const otherTags = product.tags?.filter(
    (t) => !/\d{3}er|karat|gold|silber|platin|zirkonia|diamant|türkis|smaragd|rubin|saphir/i.test(t)
  );
  if (otherTags?.length > 0) {
    lines.push({ label: "Merkmale", value: otherTags.join(", ") });
  }

  return lines;
}

// ─── Accordion ────────────────────────────────────────────────────────────

const CARE_TEXT =
  "Bewahren Sie Ihren Schmuck in der beigelegten Elina Gold Tasche oder Box auf. Vermeiden Sie Kontakt mit Parfum, Sonnencreme und chemischen Substanzen. Reinigen Sie ihn sanft mit einem weichen, fusselfreien Tuch. Nehmen Sie Ihren Schmuck vor dem Schlafen, Baden und Sport ab.";

const SHIPPING_TEXT =
  "Kostenloser Standardversand (2–4 Werktage) ab 60 €, darunter 4,90 €. Express-Lieferung (1–2 Werktage) 12,90 €. Alle Bestellungen werden in einer eleganten Elina Gold Geschenkverpackung versandt. Rückgabe innerhalb von 30 Tagen – kostenlos und unkompliziert.";

const PAYMENT_METHODS = [
  "VISA", "MASTERCARD", "PAYPAL", "APPLE PAY", "GOOGLE PAY", "KLARNA",
];

function Accordion({ sections }) {
  const [open, setOpen] = useState(null);

  return (
    <div>
      {sections.map((s) => (
        <div key={s.id} className="border-b border-stone-200/60">
          <button
            onClick={() => setOpen(open === s.id ? null : s.id)}
            className="w-full flex items-center justify-between py-5 text-left group"
          >
            <span className="text-[9px] tracking-[0.4em] uppercase font-normal text-stone-500 group-hover:text-black transition-colors duration-300">
              {s.title}
            </span>
            <ChevronDown
              size={13}
              strokeWidth={1}
              className={`text-stone-300 transition-transform duration-300 ${
                open === s.id ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-400 ease-in-out ${
              open === s.id ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="pb-6">
              {s.isPayment ? (
                <div>
                  <p className="text-[11px] font-normal text-stone-400 leading-6 mb-4">
                    Wir akzeptieren alle gängigen Zahlungsmethoden für ein sicheres
                    und bequemes Einkaufserlebnis.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {PAYMENT_METHODS.map((method) => (
                      <span
                        key={method}
                        className="border border-stone-200 px-3 py-1.5 text-[8px] tracking-[0.25em] font-normal text-stone-400 uppercase"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              ) : s.isTable ? (
                <div className="space-y-3">
                  {s.rows.map((row) => (
                    <div key={row.label} className="flex gap-4">
                      <span className="text-[9px] tracking-[0.25em] uppercase text-stone-400 w-24 flex-shrink-0">
                        {row.label}
                      </span>
                      <span className="text-[11px] font-normal text-stone-600 flex-1">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[11.5px] font-normal leading-7 text-stone-500">{s.content}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Hauptkomponente ───────────────────────────────────────────────────────

export default function ProductInfo({ product }) {
  const { addToCart, loading } = useCart();
  const [added, setAdded] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(() => {
    const defaults = {};
    product.options?.forEach((opt) => {
      defaults[opt.name] = opt.values[0];
    });
    return defaults;
  });
  const [qty, setQty] = useState(1);

  const activeVariant = product.variants.edges.find(({ node }) =>
    node.selectedOptions.every(
      (opt) => selectedOptions[opt.name] === opt.value
    )
  )?.node || product.variants.edges[0]?.node;

  const price = parseFloat(activeVariant?.price?.amount || 0);
  const comparePrice = parseFloat(activeVariant?.compareAtPrice?.amount || 0);
  const hasDiscount = comparePrice > 0 && comparePrice > price;
  const isAvailable = activeVariant?.availableForSale !== false;

  const handleAddToCart = useCallback(async () => {
    if (!activeVariant || !isAvailable) return;
    await addToCart(activeVariant.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }, [activeVariant, qty, addToCart, isAvailable]);

  const materialRows = buildMaterialDetails(product);

  const accordionSections = [
    ...(product.description
      ? [{ id: "desc", title: "Beschreibung", content: product.description }]
      : []),
    ...(materialRows.length > 0
      ? [{ id: "details", title: "Details & Materialien", isTable: true, rows: materialRows }]
      : []),
    { id: "care", title: "Schmuckpflege", content: CARE_TEXT },
    { id: "shipping", title: "Versand & Rückgabe", content: SHIPPING_TEXT },
    { id: "payment", title: "Zahlungsmethoden", isPayment: true },
  ];

  const hasRealOptions =
    product.options?.length > 0 &&
    !(product.options.length === 1 && product.options[0].name === "Title");

  return (
    <div className="flex flex-col">

      {/* Kollektion-Label */}
      {product.collections?.edges?.[0] && (
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-stone-300" />
          <p className="text-[8px] tracking-[0.5em] uppercase text-stone-400 font-normal">
            {product.collections.edges[0].node.title}
          </p>
        </div>
      )}

      {/* Produktname */}
      <h1 className="text-[24px] md:text-[30px] font-normal tracking-[0.2em] uppercase text-stone-900 leading-[1.3] mb-6">
        {product.title}
      </h1>

      {/* Preis */}
      <div className="flex items-baseline gap-4 mb-5">
        <span className="text-[22px] font-normal tracking-[0.1em] text-stone-900">
          {fmt(price)}
        </span>
        {hasDiscount && (
          <span className="text-[13px] font-normal text-stone-400 line-through tracking-wide">
            {fmt(comparePrice)}
          </span>
        )}
        {hasDiscount && (
          <span className="text-[8px] tracking-[0.3em] uppercase bg-stone-900 text-white px-2.5 py-1 font-normal">
            Sale
          </span>
        )}
      </div>

      {/* Verfügbarkeit */}
      <div className="flex items-center gap-2.5 mb-8">
        <span
          className={`w-1.5 h-1.5 rounded-full ${isAvailable ? "bg-emerald-500" : "bg-red-400"}`}
        />
        <span className="text-[8px] tracking-[0.35em] uppercase text-stone-400">
          {isAvailable ? "Auf Lager — Versandfertig" : "Derzeit nicht verfügbar"}
        </span>
      </div>

      {/* Dezente Trennlinie */}
      <div className="w-full h-px bg-gradient-to-r from-stone-200 via-stone-300 to-stone-200 mb-8" />

      {/* Varianten */}
      {hasRealOptions && (
        <div className="mb-8 space-y-6">
          {product.options.map((opt) => (
            <div key={opt.name}>
              <p className="text-[8px] tracking-[0.45em] uppercase text-stone-400 mb-3 font-normal">
                {opt.name}
                {selectedOptions[opt.name] && (
                  <span className="ml-3 text-stone-700 font-normal tracking-[0.15em]">{selectedOptions[opt.name]}</span>
                )}
              </p>
              <div className="flex flex-wrap gap-2">
                {opt.values.map((val) => {
                  const testOptions = { ...selectedOptions, [opt.name]: val };
                  const variant = product.variants.edges.find(({ node }) =>
                    node.selectedOptions.every((o) => testOptions[o.name] === o.value)
                  )?.node;
                  const available = variant?.availableForSale !== false;

                  return (
                    <button
                      key={val}
                      onClick={() =>
                        setSelectedOptions((prev) => ({ ...prev, [opt.name]: val }))
                      }
                      disabled={!available}
                      className={`min-w-[42px] px-4 py-2.5 text-[9px] tracking-[0.2em] border transition-all duration-300
                        ${!available
                          ? "border-stone-200 text-stone-300 cursor-not-allowed line-through"
                          : selectedOptions[opt.name] === val
                          ? "border-stone-900 bg-stone-900 text-white"
                          : "border-stone-200 text-stone-600 hover:border-stone-500"
                        }`}
                    >
                      {val}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Menge */}
      <div className="mb-8">
        <p className="text-[8px] tracking-[0.45em] uppercase text-stone-400 mb-3 font-normal">Anzahl</p>
        <div className="inline-flex items-center border border-stone-200">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-11 h-11 flex items-center justify-center hover:bg-stone-50 transition-colors text-stone-500 text-sm"
          >
            −
          </button>
          <span className="w-11 h-11 flex items-center justify-center border-x border-stone-200 text-[12px] font-normal text-stone-800">
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="w-11 h-11 flex items-center justify-center hover:bg-stone-50 transition-colors text-stone-500 text-sm"
          >
            +
          </button>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col gap-3 mb-10">
        <button
          onClick={handleAddToCart}
          disabled={loading || !isAvailable}
          className={`w-full flex items-center justify-center gap-3 py-4 text-[10px] tracking-[0.5em] uppercase transition-all duration-400 font-normal
            ${added
              ? "bg-emerald-800 text-white"
              : isAvailable
              ? "bg-stone-900 text-white hover:bg-stone-800 active:scale-[0.995]"
              : "bg-stone-200 text-stone-400 cursor-not-allowed"
            } ${loading ? "opacity-60" : ""}`}
        >
          <ShoppingBag
            size={14}
            strokeWidth={1.2}
            className={loading ? "animate-pulse" : ""}
          />
          {loading ? "Wird hinzugefügt…" : added ? "Hinzugefügt" : "In den Warenkorb"}
        </button>

        <button className="w-full flex items-center justify-center gap-2.5 py-3.5 border border-stone-200 text-[10px] tracking-[0.4em] uppercase text-stone-500 hover:border-stone-400 hover:text-stone-800 transition-all duration-300 font-normal">
          <Heart size={13} strokeWidth={1.2} />
          Merken
        </button>
      </div>

      {/* Trust Badges — edler gestaltet */}
      <div className="grid grid-cols-3 gap-0 mb-10">
        {[
          { icon: Shield, label: "Sichere Zahlung", sub: "SSL-verschlüsselt" },
          { icon: Truck, label: "Gratis Versand", sub: "Ab 60 € Bestellwert" },
          { icon: RefreshCw, label: "30 Tage", sub: "Kostenlose Rückgabe" },
        ].map(({ icon: Icon, label, sub }, idx) => (
          <div
            key={label}
            className={`flex flex-col items-center gap-2 py-5 ${
              idx < 2 ? "border-r border-stone-200/60" : ""
            }`}
          >
            <Icon size={16} strokeWidth={1} className="text-stone-400" />
            <div className="text-center">
              <p className="text-[8px] tracking-[0.25em] uppercase text-stone-600 font-normal">{label}</p>
              <p className="text-[7px] tracking-[0.15em] uppercase text-stone-400 mt-0.5">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Accordion */}
      <Accordion sections={accordionSections} />

      {/* Vendor Badge */}
      {product.vendor && (
        <div className="mt-10 pt-6 border-t border-stone-200/60 flex items-center gap-3">
          <Gem size={14} strokeWidth={1} className="text-stone-400" />
          <div>
            <p className="text-[8px] tracking-[0.4em] uppercase text-stone-400 font-normal">Handgefertigt von</p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-stone-700 font-normal mt-0.5">{product.vendor}</p>
          </div>
        </div>
      )}
    </div>
  );
}
