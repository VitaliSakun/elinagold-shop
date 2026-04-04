import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f9f8f4] flex flex-col items-center justify-center text-center px-8">
      <p className="text-[9px] tracking-[0.5em] uppercase text-stone-400 mb-6">404</p>
      <h1 className="text-2xl md:text-3xl font-medium tracking-[0.2em] uppercase text-black mb-4">
        Seite nicht gefunden
      </h1>
      <p className="text-[12px] font-medium text-stone-500 mb-10 max-w-xs">
        Die gesuchte Seite existiert leider nicht.
      </p>
      <Link
        href="/"
        className="border border-black px-10 py-3.5 text-[10px] tracking-[0.4em] uppercase hover:bg-black hover:text-white transition-all duration-300"
      >
        Zurück zur Startseite
      </Link>
    </div>
  );
}
