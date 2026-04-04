import Image from "next/image";
import Link from "next/link";
import { getCollections } from "@/lib/shopify";

export const metadata = {
  title: "Kollektionen — Elina Gold",
  description: "Entdecke alle Schmuck-Kollektionen von Elina Gold.",
};

export default async function KollektionenPage() {
  let collections = [];
  try {
    collections = await getCollections();
  } catch {
    // Shopify nicht konfiguriert
  }

  // Fallback wenn keine Kollektionen via Shopify
  const fallback = [
    { handle: "ohrringe", title: "Ohrringe", img: "https://brun-media.de/ElinaGold/Gemini_Generated_Image_xfbbihxfbbihxfbb.png" },
    { handle: "ketten", title: "Ketten", img: "https://brun-media.de/ElinaGold/IMG_4971.jpg" },
    { handle: "armbaender", title: "Armbänder", img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070" },
    { handle: "ringe", title: "Ringe", img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070" },
  ];

  const items = collections.length > 0
    ? collections.map((e) => ({
        handle: e.node.handle,
        title: e.node.title,
        img: e.node.image?.url || null,
      }))
    : fallback;

  return (
    <div className="min-h-screen bg-[#f9f8f4] pt-22 md:pt-32">

      {/* Heading */}
      <div className="text-center py-8 md:py-12 px-5 md:px-8">
        <h1 className="text-2xl md:text-4xl font-medium tracking-[0.3em] uppercase text-black mb-3 md:mb-4">
          Kollektionen
        </h1>
        <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-stone-400">
          Zeitlose Stücke für jeden Anlass
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-200 max-w-[1600px] mx-auto">
        {items.map((col) => (
          <Link
            key={col.handle}
            href={`/kollektion/${col.handle}`}
            className="relative aspect-[3/2] md:aspect-[4/3] group overflow-hidden bg-stone-100 block"
          >
            {col.img ? (
              <Image
                src={col.img}
                alt={col.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
              />
            ) : (
              <div className="absolute inset-0 bg-stone-300" />
            )}
            <div className="absolute inset-0 bg-black/50 transition-all duration-700 active:bg-black/35 group-hover:bg-black/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 md:pb-12 text-white">
              <h2 className="text-2xl md:text-4xl font-bold tracking-[0.25em] md:tracking-[0.3em] uppercase mb-2 md:mb-3">
                {col.title}
              </h2>
              <span className="text-[8px] md:text-[9px] tracking-[0.4em] uppercase border-b border-white/40 pb-1 opacity-80">
                Entdecken
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="py-10 md:py-16" />
    </div>
  );
}
