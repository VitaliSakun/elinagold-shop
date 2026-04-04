import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct, getAllProductHandles, getProducts } from "@/lib/shopify";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import ProductCard from "@/components/ProductCard";

export async function generateStaticParams() {
  try {
    const handles = await getAllProductHandles();
    return handles.map((handle) => ({ handle }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { handle } = await params;
  try {
    const product = await getProduct(handle);
    if (!product) return { title: "Produkt nicht gefunden — Elina Gold" };
    return {
      title: `${product.title} — Elina Gold`,
      description: product.description?.slice(0, 160) || "Fine Jewelry von Elina Gold.",
      openGraph: {
        title: product.title,
        description: product.description?.slice(0, 160),
        images: product.images?.edges?.[0]?.node?.url
          ? [{ url: product.images.edges[0].node.url }]
          : [],
      },
    };
  } catch {
    return { title: "Elina Gold" };
  }
}

export default async function ProductPage({ params }) {
  const { handle } = await params;

  let product = null;
  try {
    product = await getProduct(handle);
  } catch {}

  if (!product) notFound();

  const images = product.images.edges.map((e) => e.node);

  // Ähnliche Produkte
  let related = [];
  try {
    const all = await getProducts(12);
    related = all
      .filter((e) => e.node.handle !== handle)
      .slice(0, 4)
      .map((e) => e.node);
  } catch {}

  return (
    <div className="min-h-screen bg-white">

      {/* ── Split-Screen: Gallery links, Info rechts ── */}
      <div className="md:flex md:min-h-screen pt-20 md:pt-[104px]">

        {/* LINKS: Gallery */}
        <div className="relative w-full md:w-[55%] aspect-square md:aspect-auto md:sticky md:top-[104px] md:self-start md:h-[calc(100vh-104px)] bg-white">
          <ProductGallery images={images} />
        </div>

        {/* RECHTS: Scrollbare Produktinfo */}
        <div className="md:w-[45%] bg-[#faf9f7]">
          <div className="px-5 md:px-14 lg:px-16 py-6 md:py-14">

            {/* Breadcrumb — nur Desktop */}
            <nav className="hidden md:flex items-center gap-2 text-[7px] tracking-[0.35em] uppercase text-stone-400 mb-10 flex-wrap">
              <Link href="/" className="hover:text-stone-700 transition-colors duration-300">Start</Link>
              <span className="text-stone-300">·</span>
              {product.collections.edges[0] && (
                <>
                  <Link
                    href={`/kollektion/${product.collections.edges[0].node.handle}`}
                    className="hover:text-stone-700 transition-colors duration-300"
                  >
                    {product.collections.edges[0].node.title}
                  </Link>
                  <span className="text-stone-300">·</span>
                </>
              )}
              <span className="text-stone-500 truncate max-w-[160px]">{product.title}</span>
            </nav>

            <ProductInfo product={product} />

          </div>
        </div>
      </div>

      {/* ── Ähnliche Produkte ── */}
      {related.length > 0 && (
        <section className="bg-[#f9f8f4] border-t border-stone-200 py-20">
          <div className="px-8 md:px-16 max-w-[1600px] mx-auto">
            <div className="flex items-center gap-6 mb-10">
              <div className="flex-1 h-px bg-stone-200" />
              <h2 className="text-[10px] tracking-[0.55em] uppercase text-stone-500 whitespace-nowrap">
                Das könnte dir auch gefallen
              </h2>
              <div className="flex-1 h-px bg-stone-200" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-8">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
