import Link from "next/link";
import Image from "next/image";
import { getProducts, getCollections } from "@/lib/shopify";
import ScrollVideoHero from "@/components/ScrollVideoHero";
import CraftSection from "@/components/CraftSection";
import ScrollCarousel3D from "@/components/ScrollCarousel3D";
import Newsletter from "@/components/Newsletter";
import FAQ from "@/components/FAQ";
import AnimateIn from "@/components/AnimateIn";

export default async function Home() {
  const FALLBACK_CATEGORIES = [
    { handle: "ringe", label: "Ringe", img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800", imgAlt: "Ringe" },
    { handle: "ketten-colliers", label: "Ketten & Colliers", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800", imgAlt: "Ketten & Colliers" },
    { handle: "armbander", label: "Armbänder", img: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=800", imgAlt: "Armbänder" },
    { handle: "ohrringe", label: "Ohrringe", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800", imgAlt: "Ohrringe" },
  ];

  let products = [];
  let categories = [];

  try {
    const [allProducts, allCollections] = await Promise.all([
      getProducts(12),
      getCollections(),
    ]);

    products = allProducts;

    const shopifyMap = {};
    allCollections
      .filter((e) => e.node.handle !== "frontpage")
      .forEach((e) => {
        shopifyMap[e.node.handle] = {
          handle: e.node.handle,
          label: e.node.title,
          href: `/kollektion/${e.node.handle}`,
          img: e.node.image?.url || null,
          imgAlt: e.node.image?.altText || e.node.title,
        };
      });

    categories = FALLBACK_CATEGORIES.map((fb) => {
      const shopify = shopifyMap[fb.handle];
      return {
        handle: fb.handle,
        label: shopify?.label || fb.label,
        href: `/kollektion/${fb.handle}`,
        img: shopify?.img || fb.img,
        imgAlt: shopify?.imgAlt || fb.imgAlt,
      };
    });
  } catch {
    categories = FALLBACK_CATEGORIES.map((fb) => ({
      ...fb,
      href: `/kollektion/${fb.handle}`,
    }));
  }

  return (
    <div className="relative w-full font-sans bg-white">
      <main>

        {/* ══════════════════════════════════════════
            1. SCROLL-VIDEO HERO
        ══════════════════════════════════════════ */}
        <ScrollVideoHero />

        {/* ══════════════════════════════════════════
            2. KOLLEKTIONEN
        ══════════════════════════════════════════ */}
        {categories.length > 0 && (
          <section data-theme="dark" className="py-14 md:py-28" style={{ backgroundColor: "#641428" }}>
            <div className="max-w-7xl mx-auto px-4 md:px-12">

              <AnimateIn className="text-center mb-8 md:mb-14">
                <h2 className="text-xl md:text-2xl font-medium tracking-[0.35em] uppercase text-white">
                  Kollektionen
                </h2>
                <div
                  className="mx-auto mt-5"
                  style={{ width: "28px", height: "1px", backgroundColor: "rgba(255,255,255,0.5)" }}
                />
              </AnimateIn>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
                {categories.map((cat, i) => (
                  <AnimateIn key={cat.handle} delay={i * 100}>
                    <Link href={cat.href} className="group block">
                      <div className="relative aspect-4/5 overflow-hidden bg-bordeaux-900 mb-3">
                        <Image
                          src={cat.img}
                          alt={cat.imgAlt}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      </div>
                      <div className="text-center mt-2">
                        <h3 className="font-serif text-[13px] md:text-[15px] font-bold text-white/90 tracking-wide leading-snug group-hover:text-white transition-colors duration-300">
                          {cat.label}
                        </h3>
                      </div>
                    </Link>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════
            3. CRAFT EDITORIAL
        ══════════════════════════════════════════ */}
        <CraftSection />

        {/* ══════════════════════════════════════════
            4. NEUHEITEN – 3D Scroll-Karussell
        ══════════════════════════════════════════ */}
        {products.length > 0 ? (
          <ScrollCarousel3D products={products} />
        ) : (
          <div className="text-center py-20 text-[10px] tracking-[0.5em] text-stone-400 uppercase">
            Produkte werden geladen…
          </div>
        )}

        {/* ══════════════════════════════════════════
            5. NEWSLETTER
        ══════════════════════════════════════════ */}
        <AnimateIn>
          <Newsletter />
        </AnimateIn>

        {/* ══════════════════════════════════════════
            6. FAQ
        ══════════════════════════════════════════ */}
        <FAQ />

      </main>
    </div>
  );
}
