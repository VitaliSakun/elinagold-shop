"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, Heart, ShoppingBag, X, Menu } from "lucide-react";
import { useCart } from "@/context/CartContext";
import SearchOverlay from "@/components/SearchOverlay";

const FALLBACK_LINKS = [
  { title: "Ringe", handle: "ringe" },
  { title: "Ketten & Colliers", handle: "ketten-colliers" },
  { title: "Armbänder", handle: "armbander" },
  { title: "Ohrringe", handle: "ohrringe" },
];

export default function Navbar({ collections = [], overDark = false, scrolled = false }) {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const { cart, setCartOpen } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const totalQty = cart?.totalQuantity || 0;

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const textColor = overDark ? "text-white" : "text-black";
  const logoFilter = overDark ? "brightness-0 invert" : "";

  let bgClass = "";
  if (!isHomepage) {
    bgClass = "bg-white/96 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.07)]";
  } else if (!scrolled) {
    bgClass = "bg-transparent";
  } else if (overDark) {
    bgClass = "bg-black/20 backdrop-blur-[2px] shadow-sm"; // Slightly darker background for readability over dark sections
  } else {
    bgClass = "bg-white/96 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.07)]";
  }

  const navLinks = (collections.length > 0 ? collections : FALLBACK_LINKS)
    .filter((c) => c.handle !== "anhanger")
    .map((c) => ({
      label: c.title.toUpperCase(),
      href: `/kollektion/${c.handle}`,
    }));

  return (
    <>
      <nav className={`w-full flex items-center justify-between px-4 md:px-10 py-3 md:py-5 transition-all duration-500 ${textColor} ${bgClass}`}>

        {/* Desktop Links */}
        <ul className="hidden lg:flex gap-4 xl:gap-6 text-[10px] xl:text-[11px] tracking-[0.2em] font-bold items-center flex-1">
          {navLinks.slice(0, 5).map((link) => (
            <li key={link.href} className="whitespace-nowrap">
              <Link
                href={link.href}
                className={`hover:opacity-50 transition-opacity ${pathname.startsWith(link.href) ? "opacity-40" : ""}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logo */}
        <div className="flex justify-start lg:justify-center flex-1">
          <Link href="/">
            <Image
              src="https://brun-media.de/ElinaGold/logo.png"
              alt="Elina Gold"
              width={110}
              height={56}
              className={`h-10 md:h-14 w-auto object-contain transition-all duration-500 ${logoFilter}`}
              priority
            />
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center justify-end gap-3 md:gap-5 flex-1">
          {/* Mobile Suche */}
          <button onClick={() => setSearchOpen(true)} className="md:hidden p-1 hover:opacity-50 transition-opacity" aria-label="Suche">
            <Search size={18} strokeWidth={1.2} />
          </button>

          {/* Desktop Suche */}
          <button onClick={() => setSearchOpen(true)} className="hidden xl:flex items-center gap-2 hover:opacity-50 transition-opacity" aria-label="Suche">
            <Search size={17} strokeWidth={1.2} />
            <span className="text-[10px] tracking-[0.2em] font-bold uppercase">Suchen</span>
          </button>

          <button aria-label="Wunschliste" className="hidden md:block hover:opacity-50 transition-opacity">
            <Heart size={17} strokeWidth={1.2} />
          </button>

          {/* Warenkorb — immer sichtbar */}
          <button
            aria-label="Warenkorb"
            onClick={() => setCartOpen(true)}
            className="relative flex items-center hover:opacity-50 transition-opacity"
          >
            <ShoppingBag size={18} strokeWidth={1.2} />
            {totalQty > 0 && (
              <span className="absolute -top-1.5 -right-2 text-white text-[7px] font-semibold w-4 h-4 rounded-full flex items-center justify-center leading-none" style={{ backgroundColor: "#641428" }}>
                {totalQty > 9 ? "9+" : totalQty}
              </span>
            )}
          </button>

          {/* Hamburger Mobile */}
          <button className="lg:hidden p-1 -mr-1" onClick={() => setMenuOpen(true)} aria-label="Menü öffnen">
            <Menu size={22} strokeWidth={1.2} />
          </button>
        </div>
      </nav>

      {mounted && createPortal(
        <>
          {/* Mobile Menu — Fullscreen */}
          <div
            className={`fixed inset-0 bg-white z-200 flex flex-col transition-opacity duration-300 ${
              menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-stone-100">
              <Image
                src="https://brun-media.de/ElinaGold/logo.png"
                alt="Elina Gold"
                width={100}
                height={50}
                className="h-10 w-auto object-contain"
              />
              <button onClick={() => setMenuOpen(false)} aria-label="Menü schließen" className="p-2 -mr-1">
                <X size={22} strokeWidth={1.2} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-6 gap-5 overflow-y-auto py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-lg font-bold tracking-[0.25em] uppercase text-black active:opacity-40 transition-opacity ${
                    pathname.startsWith(link.href) ? "opacity-40" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="px-6 pb-8 flex gap-5 text-black border-t border-stone-100 pt-4">
              <button aria-label="Suche" onClick={() => { setMenuOpen(false); setSearchOpen(true); }} className="p-2 active:opacity-50 transition-opacity">
                <Search size={20} strokeWidth={1.2} />
              </button>
              <button aria-label="Wunschliste" className="p-2 active:opacity-50 transition-opacity">
                <Heart size={20} strokeWidth={1.2} />
              </button>
              <button
                aria-label="Warenkorb"
                onClick={() => { setMenuOpen(false); setCartOpen(true); }}
                className="relative p-2 active:opacity-50 transition-opacity"
              >
                <ShoppingBag size={20} strokeWidth={1.2} />
                {totalQty > 0 && (
                  <span className="absolute top-0 right-0 text-white text-[7px] font-semibold w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: "#641428" }}>
                    {totalQty > 9 ? "9+" : totalQty}
                  </span>
                )}
              </button>
            </div>
          </div>

          <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
        </>,
        document.body
      )}
    </>
  );
}
