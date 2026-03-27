"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";

export default function Header({ collections }) {
  const [hidden, setHidden] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  useEffect(() => {
    // Initialzustand setzen
    setOverDark(isHomepage);
    setScrolled(false);

    const onScroll = () => {
      if (document.body.style.overflow === "hidden") return;
      const y = window.scrollY;

      // Header ausblenden beim Scrollen nach unten
      if (y > lastY.current && y > 80) setHidden(true);
      else if (y < lastY.current) setHidden(false);
      lastY.current = y;

      // Weiß/transparent abhängig ob wir über dem dunklen Video-Hero sind
      setScrolled(y > 20);
      setOverDark(isHomepage ? y < window.innerHeight - 80 : false);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomepage]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-100 transition-transform duration-300 ease-[cubic-bezier(0.32,0,0,1)] ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <AnnouncementBar overDark={overDark} />
      <Navbar collections={collections} overDark={overDark} scrolled={scrolled} />
    </header>
  );
}
