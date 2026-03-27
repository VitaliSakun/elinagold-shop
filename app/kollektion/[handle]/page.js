import { notFound } from "next/navigation";
import Link from "next/link";
import { getCollection, getAllCollectionHandles } from "@/lib/shopify";
import CollectionFilters from "@/components/CollectionFilters";

export async function generateStaticParams() {
  try {
    const handles = await getAllCollectionHandles();
    return handles.map((handle) => ({ handle }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { handle } = await params;
  try {
    const col = await getCollection(handle);
    if (!col) return { title: "Kollektion — Elina Gold" };
    return {
      title: `${col.title} — Elina Gold`,
      description:
        col.description?.slice(0, 160) ||
        `${col.title} — handgefertigter Schmuck von Elina Gold`,
    };
  } catch {
    return { title: "Elina Gold" };
  }
}

export default async function CollectionPage({ params }) {
  const { handle } = await params;

  let collection = null;
  try {
    collection = await getCollection(handle);
  } catch {}

  if (!collection) notFound();

  const products = collection.products.edges.map((e) => e.node);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Editoriales Hero ── */}
      <div className="bg-[#f5f3ee] pt-24 md:pt-36 pb-10 md:pb-24 px-5 md:px-16 overflow-hidden">
        <div className="max-w-[1600px] mx-auto">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[7px] md:text-[8px] tracking-[0.4em] uppercase text-stone-400 mb-8 md:mb-16">
            <Link href="/" className="active:text-black hover:text-black transition-colors duration-200">
              Elina Gold
            </Link>
            <span className="text-stone-300">—</span>
            <span className="text-stone-500">{collection.title}</span>
          </nav>

          {/* Kollektion Titel */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-8">
            <h1
              className="text-[11vw] sm:text-[10vw] md:text-[7.5vw] font-[200] tracking-[0.06em] uppercase text-black leading-none"
            >
              {collection.title}
            </h1>

            <div className="md:max-w-xs md:pb-2 shrink-0">
              {collection.description && (
                <p className="text-[10px] md:text-[11px] font-light leading-6 md:leading-7 text-stone-500 mb-3 md:mb-4">
                  {collection.description}
                </p>
              )}
              <p className="text-[8px] md:text-[9px] tracking-[0.4em] uppercase text-stone-400">
                {products.length} {products.length === 1 ? "Stück" : "Stücke"}
              </p>
            </div>
          </div>

          <div className="mt-8 md:mt-14 h-px bg-stone-200 w-full" />
        </div>
      </div>

      {/* ── Produkte ── */}
      <div className="bg-white">
        <CollectionFilters products={products} />
      </div>

      {/* ── Footer-Spacer ── */}
      <div className="py-20 border-t border-stone-100 flex flex-col items-center gap-6">
        <p className="text-[8px] tracking-[0.5em] uppercase text-stone-300">
          Elina Gold — Fine Jewelry
        </p>
        <Link
          href="/kollektion"
          className="text-[9px] tracking-[0.4em] uppercase text-stone-400 hover:text-black transition-colors border-b border-stone-200 pb-px"
        >
          Alle Kollektionen
        </Link>
      </div>

    </div>
  );
}
