"use client";

import Link from "next/link";
import Image from "next/image";

function fmt(amount) {
  return parseFloat(amount).toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function ProductCard({ product, priority = false }) {
  const image = product.images?.edges?.[0]?.node;
  const hoverImage = product.images?.edges?.[1]?.node;
  const price = parseFloat(product.priceRange?.minVariantPrice?.amount || 0);
  const comparePrice = parseFloat(
    product.compareAtPriceRange?.minVariantPrice?.amount || 0
  );
  const hasDiscount = comparePrice > 0 && comparePrice > price;
  const isAvailable = product.availableForSale !== false;
  const variantOptions = product.options?.filter((opt) => opt.name !== "Title") || [];

  return (
    <Link href={`/produkt/${product.handle}`} className="group block">

      {/* Bild — kompakt, 4:5 */}
      <div className="relative aspect-4/5 overflow-hidden bg-white mb-2.5">
        {image ? (
          <>
            <Image
              src={image.url}
              alt={image.altText || product.title}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, 20vw"
              className={`object-cover transition-all duration-700 ease-out ${
                hoverImage ? "group-hover:opacity-0" : "group-hover:scale-[1.04]"
              }`}
              quality={85}
              priority={priority}
            />
            {hoverImage && (
              <Image
                src={hoverImage.url}
                alt={hoverImage.altText || product.title}
                fill
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, 20vw"
                className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"
                quality={85}
              />
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-stone-300 text-[8px] tracking-[0.3em] uppercase">
            Kein Bild
          </div>
        )}

        {!isAvailable && (
          <div className="absolute top-2.5 left-2.5">
            <span className="text-[6px] tracking-[0.25em] uppercase bg-white/90 backdrop-blur-sm text-stone-500 px-2 py-0.5">
              Ausverkauft
            </span>
          </div>
        )}
        {hasDiscount && isAvailable && (
          <div className="absolute top-2.5 right-2.5">
            <span className="text-[6px] tracking-[0.25em] uppercase bg-black text-white px-2 py-0.5">
              Sale
            </span>
          </div>
        )}

        <div className="absolute inset-0 ring-1 ring-inset ring-black/0 group-hover:ring-black/10 transition-all duration-500" />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out">
          <span className="text-[7px] tracking-[0.4em] uppercase text-white bg-black/75 backdrop-blur-sm px-4 py-2">
            Ansehen
          </span>
        </div>
      </div>

      <div>
        <h3 className="text-[11px] md:text-[12px] tracking-[0.15em] uppercase font-semibold text-stone-800 mb-1 leading-snug line-clamp-2">
          {product.title}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-[13px] font-semibold tracking-[0.05em] text-black">
            {fmt(price)} €
          </span>
          {hasDiscount && (
            <span className="text-[11px] font-medium text-stone-400 line-through">
              {fmt(comparePrice)} €
            </span>
          )}
        </div>
        {variantOptions.length > 0 && (
          <div className="mt-1.5 space-y-0.5">
            {variantOptions.map((opt) => (
              <p key={opt.name} className="text-[8px] md:text-[9px] tracking-[0.1em] text-stone-400 font-medium">
                {opt.values.join(" · ")}
              </p>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
