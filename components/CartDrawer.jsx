"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

const FREE_SHIPPING_THRESHOLD = 60;

function fmt(amount) {
  return parseFloat(amount).toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateLine, removeLine, loading } = useCart();

  // Schließen mit ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setCartOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setCartOpen]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [cartOpen]);

  const lines = cart?.lines?.edges?.map((e) => e.node) || [];
  const totalAmount = parseFloat(cart?.cost?.totalAmount?.amount || 0);
  const totalQty = cart?.totalQuantity || 0;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - totalAmount);
  const shippingProgress = Math.min(100, (totalAmount / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setCartOpen(false)}
        className={`fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[300] transition-opacity duration-400 ${
          cartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[380px] md:w-[420px] bg-white z-[310] flex flex-col shadow-[-20px_0_60px_rgba(0,0,0,0.12)] transition-transform duration-500 ease-[cubic-bezier(0.32,0,0,1)] ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 md:px-8 py-4 md:py-6 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} strokeWidth={1.2} />
            <span className="text-[11px] tracking-[0.35em] uppercase font-normal">
              Warenkorb
            </span>
            {totalQty > 0 && (
              <span className="bg-black text-white text-[9px] font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                {totalQty}
              </span>
            )}
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="p-1 hover:opacity-50 transition-opacity"
          >
            <X size={20} strokeWidth={1.2} />
          </button>
        </div>

        {/* Versandfortschritt */}
        {totalAmount > 0 && (
          <div className="px-5 md:px-8 py-3 md:py-4 bg-stone-50 border-b border-stone-100">
            <div className="h-[1px] bg-stone-200 mb-2 overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-700"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
            <p className="text-[9px] tracking-[0.25em] uppercase text-stone-500">
              {remaining > 0
                ? `Noch ${fmt(remaining)} € bis zum kostenlosen Versand`
                : "✓ Kostenloser Versand inklusive"}
            </p>
          </div>
        )}

        {/* Produkte */}
        <div className="flex-1 overflow-y-auto py-6">
          {lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 px-8 text-center">
              <ShoppingBag size={40} strokeWidth={0.8} className="text-stone-300" />
              <div>
                <p className="text-[11px] tracking-[0.3em] uppercase text-stone-500 mb-2">
                  Ihr Warenkorb ist leer
                </p>
                <p className="text-[11px] text-stone-400 font-normal">
                  Entdecken Sie unsere Kollektionen
                </p>
              </div>
              <Link
                href="/kollektion"
                onClick={() => setCartOpen(false)}
                className="border border-black px-8 py-3 text-[10px] tracking-[0.35em] uppercase hover:bg-black hover:text-white transition-all duration-300"
              >
                Kollektionen
              </Link>
            </div>
          ) : (
            <div className="px-4 md:px-6 flex flex-col gap-0">
              {lines.map((line, i) => {
                const img = line.merchandise?.product?.images?.edges?.[0]?.node;
                const price = parseFloat(line.merchandise?.price?.amount || 0);
                const totalLinePrice = parseFloat(line.cost?.totalAmount?.amount || 0);
                const isLoading = loading;

                return (
                  <div
                    key={line.id}
                    className={`flex gap-4 py-5 ${i < lines.length - 1 ? "border-b border-stone-100" : ""}`}
                  >
                    {/* Produktbild */}
                    <Link
                      href={`/produkt/${line.merchandise?.product?.handle}`}
                      onClick={() => setCartOpen(false)}
                      className="relative w-20 h-20 flex-shrink-0 bg-stone-50 overflow-hidden block"
                    >
                      {img && (
                        <Image
                          src={img.url}
                          alt={img.altText || line.merchandise?.product?.title}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      )}
                    </Link>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/produkt/${line.merchandise?.product?.handle}`}
                        onClick={() => setCartOpen(false)}
                        className="text-[11px] tracking-[0.1em] uppercase font-normal text-black hover:opacity-60 transition-opacity leading-tight block mb-1"
                      >
                        {line.merchandise?.product?.title}
                      </Link>

                      {line.merchandise?.title !== "Default Title" && (
                        <p className="text-[9px] tracking-[0.2em] uppercase text-stone-400 mb-2">
                          {line.merchandise?.title}
                        </p>
                      )}

                      <p className="text-[11px] font-normal text-stone-600 mb-3">
                        {fmt(price)} €
                      </p>

                      {/* Menge */}
                      <div className="flex items-center gap-0">
                        <button
                          onClick={() =>
                            line.quantity > 1
                              ? updateLine(line.id, line.quantity - 1)
                              : removeLine(line.id)
                          }
                          disabled={isLoading}
                          className="w-7 h-7 border border-stone-200 flex items-center justify-center hover:border-black transition-colors disabled:opacity-40"
                        >
                          <Minus size={10} strokeWidth={1.5} />
                        </button>
                        <span className="w-8 text-center text-[11px] font-normal border-t border-b border-stone-200 h-7 flex items-center justify-center">
                          {line.quantity}
                        </span>
                        <button
                          onClick={() => updateLine(line.id, line.quantity + 1)}
                          disabled={isLoading}
                          className="w-7 h-7 border border-stone-200 flex items-center justify-center hover:border-black transition-colors disabled:opacity-40"
                        >
                          <Plus size={10} strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>

                    {/* Preis rechts + Remove */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeLine(line.id)}
                        disabled={isLoading}
                        className="text-stone-300 hover:text-black transition-colors disabled:opacity-40"
                      >
                        <X size={14} strokeWidth={1.2} />
                      </button>
                      <p className="text-[12px] font-normal text-black">
                        {fmt(totalLinePrice)} €
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer: Summe + Checkout */}
        {lines.length > 0 && (
          <div className="border-t border-stone-100 px-5 md:px-8 py-5 md:py-6 bg-white">
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-[9px] tracking-[0.35em] uppercase text-stone-500">
                Zwischensumme
              </span>
              <span className="text-[14px] font-normal text-black">
                {fmt(totalAmount)} €
              </span>
            </div>
            <p className="text-[9px] text-stone-400 font-normal mb-6">
              Versandkosten werden an der Kasse berechnet
            </p>

            <a
              href={cart?.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-black text-white py-4 text-[11px] tracking-[0.4em] uppercase hover:bg-stone-800 transition-colors duration-300 group"
            >
              Zur Kasse
              <ArrowRight
                size={14}
                strokeWidth={1.5}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </a>

            <p className="text-center text-[9px] tracking-[0.2em] uppercase text-stone-400 mt-4">
              🔒 SSL-verschlüsselte Zahlung
            </p>
          </div>
        )}
      </div>
    </>
  );
}
