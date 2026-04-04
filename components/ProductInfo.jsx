"use client";

import { useState, useCallback } from "react";
import { ShoppingBag, Heart, ChevronDown, Shield, Gem } from "lucide-react";
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
  "Kostenloser Standardversand (2–4 Werktage) ab 99 €, darunter 4,90 €. Alle Bestellungen werden in einer eleganten Elina Gold Geschenkverpackung versandt.";

const PAYMENT_ICONS = [
  { name: "Visa", icon: (
    <svg viewBox="0 0 48 32" className="w-10 h-7"><rect width="48" height="32" rx="4" fill="#fff" stroke="#e5e5e5" strokeWidth="1"/><path d="M19.5 21h-3l1.9-11.5h3L19.5 21zm12.7-11.2c-.6-.2-1.5-.5-2.7-.5-3 0-5.1 1.6-5.1 3.8 0 1.7 1.5 2.6 2.6 3.1 1.1.6 1.5 1 1.5 1.5 0 .8-1 1.2-1.8 1.2-1.2 0-1.9-.2-2.9-.6l-.4-.2-.4 2.6c.7.3 2.1.6 3.5.6 3.2 0 5.2-1.6 5.2-3.9 0-1.3-.8-2.3-2.5-3.1-1-.5-1.7-.9-1.7-1.4 0-.5.5-1 1.7-1 1 0 1.7.2 2.2.4l.3.1.5-2.6zm7.8-.3h-2.3c-.7 0-1.3.2-1.6 1L32 21h3.2l.6-1.8h3.9l.4 1.8H43l-2.6-11.5h-1.4zm-2.4 7.4l1.2-3.3c0 0 .3-.7.4-1.1l.2 1 .7 3.4h-2.5zM17.2 9.5L14.3 18l-.3-1.5c-.5-1.8-2.2-3.7-4-4.7l2.7 10.2h3.2l4.8-12.5h-3.5z" fill="#1a1f71"/><path d="M12 9.5H7l0 .2c3.8 1 6.3 3.3 7.3 6.1l-1-5.3c-.2-.8-.7-1-1.3-1z" fill="#f9a533"/></svg>
  )},
  { name: "Mastercard", icon: (
    <svg viewBox="0 0 48 32" className="w-10 h-7"><rect width="48" height="32" rx="4" fill="#fff" stroke="#e5e5e5" strokeWidth="1"/><circle cx="19" cy="16" r="8" fill="#eb001b"/><circle cx="29" cy="16" r="8" fill="#f79e1b"/><path d="M24 10.3a8 8 0 0 1 0 11.4 8 8 0 0 1 0-11.4z" fill="#ff5f00"/></svg>
  )},
  { name: "PayPal", icon: (
    <svg viewBox="0 0 48 32" className="w-10 h-7"><rect width="48" height="32" rx="4" fill="#fff" stroke="#e5e5e5" strokeWidth="1"/><path d="M20.4 8h5.4c2.5 0 4.3 1.8 4 4.3-.4 3.5-2.8 5.4-5.8 5.4h-1.5c-.4 0-.8.3-.9.8l-.7 4.3c0 .2-.3.4-.5.4h-2.7c-.3 0-.5-.3-.4-.6l2.3-14.2c.1-.3.4-.4.8-.4z" fill="#003087"/><path d="M22 20.5l.6-3.8c.1-.5.5-.8.9-.8h1.5c3 0 5.4-1.9 5.8-5.4.2-1.5-.3-2.8-1.2-3.6 1.5.9 2.3 2.5 2 4.5-.4 3.5-2.8 5.4-5.8 5.4h-1.5c-.4 0-.8.3-.9.8l-.7 4.3c0 .2-.3.4-.5.4h-1.7l.5-1.3c.1-.2.2-.4.3-.5h.7z" fill="#0070e0"/></svg>
  )},
  { name: "Apple Pay", icon: (
    <svg viewBox="0 0 48 32" className="w-10 h-7"><rect width="48" height="32" rx="4" fill="#fff" stroke="#e5e5e5" strokeWidth="1"/><path d="M15.2 11.2c.4-.5.6-1.1.6-1.8-.6.1-1.4.4-1.8 1-.4.4-.7 1.1-.6 1.7.7.1 1.3-.3 1.8-.9zm.5 1c-1-.1-1.9.6-2.4.6s-1.2-.5-2-.5c-1 0-2 .6-2.5 1.5-1.1 1.9-.3 4.7.8 6.2.5.8 1.1 1.6 2 1.6.8 0 1.1-.5 2-.5s1.2.5 2 .5 1.4-.8 1.9-1.5c.6-.9.8-1.7.8-1.7-1-.4-1.1-1.7-1.1-2.8 0-.9.5-1.7 1-2.2-.6-.7-1.4-1.1-2.2-1.2h-.3zm7.8-1.5v10.6h1.8v-3.6h2.5c2.3 0 3.9-1.5 3.9-3.5s-1.6-3.5-3.8-3.5h-4.4zm1.8 1.5h2.1c1.6 0 2.4.8 2.4 2s-.9 2.1-2.5 2.1h-2v-4.1zm10.1 9.2c1.1 0 2.2-.6 2.7-1.5h0v1.4h1.6v-5.3c0-1.6-1.3-2.7-3.3-2.7-1.8 0-3.2 1.1-3.2 2.5h1.6c.1-.7.8-1.2 1.6-1.2.9 0 1.5.5 1.5 1.3v.6l-2.1.1c-2 .1-3 .9-3 2.3s1.1 2.5 2.6 2.5zm.5-1.3c-.8 0-1.4-.4-1.4-1.1 0-.7.5-1.1 1.5-1.2l1.9-.1v.6c0 1-1 1.8-2 1.8z" fill="#000"/></svg>
  )},
  { name: "Google Pay", icon: (
    <svg viewBox="0 0 48 32" className="w-10 h-7"><rect width="48" height="32" rx="4" fill="#fff" stroke="#e5e5e5" strokeWidth="1"/><path d="M23.8 16.6v3.1h-1v-7.7h2.6c.6 0 1.2.2 1.7.7.5.4.7 1 .7 1.6s-.2 1.2-.7 1.6c-.5.4-1 .7-1.7.7h-1.6zm0-3.6v2.7h1.7c.4 0 .8-.2 1.1-.5.3-.3.4-.6.4-1s-.2-.7-.4-1c-.3-.3-.7-.4-1.1-.4h-1.7v.2zm7.4 1.3c.7 0 1.3.2 1.8.6.5.4.7 1 .7 1.7v3.4h-1v-.8c-.3.6-.9.9-1.7.9-.6 0-1.1-.2-1.5-.5-.4-.3-.6-.8-.6-1.3 0-.5.2-1 .6-1.3.4-.3 1-.5 1.6-.5.6 0 1.1.2 1.5.5v-.3c0-.4-.2-.8-.5-1-.3-.3-.7-.4-1-.4-.6 0-1 .3-1.3.7l-.9-.5c.4-.7 1.1-1.2 2.3-1.2zm-1.3 4.4c0 .3.1.5.4.7.3.2.5.3.9.3.4 0 .9-.2 1.2-.5.4-.3.5-.7.5-1.1-.4-.3-.9-.5-1.4-.5-.4 0-.8.1-1.1.3-.3.2-.5.5-.5.8zm9.3-4.2l-3.4 7.8h-1l1.3-2.7-2.3-5.1h1.1l1.7 4 1.7-4h.9z" fill="#5f6368"/><path d="M21.2 16c0-.3 0-.7-.1-1h-4.6v1.9h2.6c-.1.6-.4 1.1-.9 1.4v1.2h1.5c.9-.8 1.5-2 1.5-3.5z" fill="#4285f4"/><path d="M16.5 19.5c1.2 0 2.3-.4 3-1.1l-1.5-1.2c-.4.3-.9.5-1.6.5-1.2 0-2.2-.8-2.6-1.9h-1.5v1.2c.8 1.5 2.3 2.5 4.2 2.5z" fill="#34a853"/><path d="M13.9 15.8c-.1-.3-.2-.6-.2-1s.1-.7.2-1v-1.2h-1.5c-.3.7-.5 1.4-.5 2.2s.2 1.5.5 2.2l1.5-1.2z" fill="#fbbc04"/><path d="M16.5 11.9c.7 0 1.3.2 1.8.7l1.3-1.3c-.8-.7-1.9-1.2-3.1-1.2-1.8 0-3.4 1-4.2 2.5l1.5 1.2c.4-1.2 1.4-1.9 2.7-1.9z" fill="#ea4335"/></svg>
  )},
  { name: "Klarna", icon: (
    <svg viewBox="0 0 48 32" className="w-10 h-7"><rect width="48" height="32" rx="4" fill="#FFB3C7" stroke="#e5e5e5" strokeWidth="1"/><path d="M12 11h2.5v10H12V11zm3.5 0h2.3c0 2-1 3.8-2.5 5l3.5 5h-2.8l-3.2-4.6.8-.6c1.3-1 2-2.5 2-4.2V11zm5.5 0h2.3v10H21V11zm5.6 7.5c-.6 0-1-.5-1-1s.5-1 1-1 1 .5 1 1-.5 1-1 1zm8.4-1c0 .5-.5 1-1 1s-1-.5-1-1 .4-1 1-1 1 .5 1 1zm-4.6-3.2c-.7-.4-1.5-.5-2.3-.5-1.5 0-2.5.8-2.5 2v.1c0 1 .7 1.6 1.8 1.8l.5.1c.7.1 1 .4 1 .7 0 .4-.5.7-1.2.7-.6 0-1.2-.2-1.7-.7l-1 1c.7.7 1.6 1 2.7 1 1.6 0 2.7-.8 2.7-2.1 0-1-.7-1.6-1.9-1.9l-.5-.1c-.6-.1-.9-.3-.9-.7 0-.4.4-.6 1-.6.6 0 1.1.2 1.5.5l.8-1.3zm3 3.7v-4h1.2v-1.6h-1.2V11h-2v1.4h-.8V14h.8v4c0 1.4 1 2.2 2.4 2.2.3 0 .5 0 .7-.1v-1.6c-.1 0-.3.1-.4.1-.4 0-.7-.2-.7-.7z" fill="#0A0B09"/></svg>
  )},
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
            <span className="text-[15px] tracking-[0.4em] uppercase font-medium text-stone-500 group-hover:text-black transition-colors duration-300">
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
                  <p className="text-[14px] font-medium text-stone-400 leading-6 mb-4">
                    Wir akzeptieren alle gängigen Zahlungsmethoden für ein sicheres
                    und bequemes Einkaufserlebnis.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {PAYMENT_ICONS.map(({ name, icon }) => (
                      <div key={name} title={name}>
                        {icon}
                      </div>
                    ))}
                  </div>
                </div>
              ) : s.isTable ? (
                <div className="space-y-3">
                  {s.rows.map((row) => (
                    <div key={row.label} className="flex gap-4">
                      <span className="text-[15px] tracking-[0.25em] uppercase text-stone-400 w-24 flex-shrink-0">
                        {row.label}
                      </span>
                      <span className="text-[14px] font-medium text-stone-600 flex-1">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[14px] font-medium leading-7 text-stone-500">{s.content}</p>
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
          <p className="text-[14px] tracking-[0.5em] uppercase text-stone-400 font-medium">
            {product.collections.edges[0].node.title}
          </p>
        </div>
      )}

      {/* Produktname */}
      <h1 className="text-[24px] md:text-[30px] font-medium tracking-[0.2em] uppercase text-stone-900 leading-[1.3] mb-6">
        {product.title}
      </h1>

      {/* Preis */}
      <div className="flex items-baseline gap-4 mb-5">
        <span className="text-[22px] font-medium tracking-[0.1em] text-stone-900">
          {fmt(price)}
        </span>
        {hasDiscount && (
          <span className="text-[15px] font-medium text-stone-400 line-through tracking-wide">
            {fmt(comparePrice)}
          </span>
        )}
        {hasDiscount && (
          <span className="text-[14px] tracking-[0.3em] uppercase bg-stone-900 text-white px-2.5 py-1 font-medium">
            Sale
          </span>
        )}
      </div>

      {/* Verfügbarkeit */}
      <div className="flex items-center gap-2.5 mb-8">
        <span
          className={`w-1.5 h-1.5 rounded-full ${isAvailable ? "bg-emerald-500" : "bg-red-400"}`}
        />
        <span className="text-[14px] tracking-[0.35em] uppercase text-stone-400">
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
              <p className="text-[14px] tracking-[0.45em] uppercase text-stone-400 mb-3 font-medium">
                {opt.name}
                {selectedOptions[opt.name] && (
                  <span className="ml-3 text-stone-700 font-medium tracking-[0.15em]">{selectedOptions[opt.name]}</span>
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
                      className={`min-w-[42px] px-4 py-2.5 text-[15px] tracking-[0.2em] border transition-all duration-300
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
        <p className="text-[14px] tracking-[0.45em] uppercase text-stone-400 mb-3 font-medium">Anzahl</p>
        <div className="inline-flex items-center border border-stone-200">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-11 h-11 flex items-center justify-center hover:bg-stone-50 transition-colors text-stone-500 text-sm"
          >
            −
          </button>
          <span className="w-11 h-11 flex items-center justify-center border-x border-stone-200 text-[15px] font-medium text-stone-800">
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
          className={`w-full flex items-center justify-center gap-3 py-4 text-[15px] tracking-[0.5em] uppercase transition-all duration-400 font-medium
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

        <button className="w-full flex items-center justify-center gap-2.5 py-3.5 border border-stone-200 text-[15px] tracking-[0.4em] uppercase text-stone-500 hover:border-stone-400 hover:text-stone-800 transition-all duration-300 font-medium">
          <Heart size={13} strokeWidth={1.2} />
          Merken
        </button>
      </div>

      {/* Trust Badge */}
      <div className="flex justify-center mb-10">
        <div className="flex flex-col items-center gap-2 py-5">
          <Shield size={16} strokeWidth={1} className="text-stone-400" />
          <div className="text-center">
            <p className="text-[14px] tracking-[0.25em] uppercase text-stone-600 font-medium">Sichere Zahlung</p>
            <p className="text-[15px] tracking-[0.15em] uppercase text-stone-400 mt-0.5">SSL-verschlüsselt</p>
          </div>
        </div>
      </div>

      {/* Accordion */}
      <Accordion sections={accordionSections} />

      {/* Vendor Badge */}
      {product.vendor && (
        <div className="mt-10 pt-6 border-t border-stone-200/60 flex items-center gap-3">
          <Gem size={14} strokeWidth={1} className="text-stone-400" />
          <div>
            <p className="text-[14px] tracking-[0.4em] uppercase text-stone-400 font-medium">Handgefertigt von</p>
            <p className="text-[15px] tracking-[0.2em] uppercase text-stone-700 font-medium mt-0.5">{product.vendor}</p>
          </div>
        </div>
      )}
    </div>
  );
}
