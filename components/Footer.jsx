import Link from "next/link";

const Footer = () => (
  <footer className="w-full bg-[#f9f8f4] text-black py-12 md:py-20 px-5 md:px-12 font-sans border-t border-stone-200">
    <div className="max-w-[1800px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 text-[10px] md:text-[11px] tracking-wider leading-loose">
      <div className="col-span-2 md:col-span-1 flex flex-col gap-6 md:gap-10">
        <div>
          <h4 className="font-bold uppercase mb-2">
            Sprache: <span className="font-normal underline cursor-pointer">DE</span>
          </h4>
        </div>
        <div>
          <h4 className="font-bold uppercase mb-2">
            Land: <span className="font-normal underline cursor-pointer">Deutschland (EUR €)</span>
          </h4>
        </div>
      </div>

      <div>
        <h4 className="font-bold uppercase mb-4 md:mb-6">Kontakt</h4>
        <ul className="space-y-2.5 md:space-y-3 font-normal uppercase">
          <li className="cursor-pointer active:opacity-40 hover:opacity-50 transition-opacity">Email</li>
          <li className="cursor-pointer active:opacity-40 hover:opacity-50 transition-opacity">Whatsapp</li>
          <li className="cursor-pointer active:opacity-40 hover:opacity-50 transition-opacity">Live-chat</li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold uppercase mb-4 md:mb-6">Information</h4>
        <ul className="space-y-2.5 md:space-y-3 font-normal uppercase">
          <li className="cursor-pointer active:opacity-40 hover:opacity-50 transition-opacity">FAQ&apos;s</li>
          <li className="cursor-pointer active:opacity-40 hover:opacity-50 transition-opacity">Größentabelle</li>
          <li className="cursor-pointer active:opacity-40 hover:opacity-50 transition-opacity">Versand</li>
          <li className="cursor-pointer active:opacity-40 hover:opacity-50 transition-opacity">Rückgaben</li>
          <li className="cursor-pointer active:opacity-40 hover:opacity-50 transition-opacity">Schmuckpflege</li>
          <li className="active:opacity-40 hover:opacity-50 transition-opacity"><Link href="/agb">AGB</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold uppercase mb-4 md:mb-6">Über uns</h4>
        <ul className="space-y-2.5 md:space-y-3 font-normal uppercase">
          <li className="cursor-pointer active:opacity-40 hover:opacity-50 transition-opacity">Die Marke</li>
          <li className="cursor-pointer active:opacity-40 hover:opacity-50 transition-opacity">Nachhaltigkeit</li>
          <li className="cursor-pointer active:opacity-40 hover:opacity-50 transition-opacity">Karrieren</li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold uppercase mb-4 md:mb-6">Folge uns</h4>
        <ul className="space-y-2.5 md:space-y-3 font-normal uppercase">
          <li className="cursor-pointer active:opacity-40 hover:opacity-50 transition-opacity">Instagram</li>
          <li className="cursor-pointer active:opacity-40 hover:opacity-50 transition-opacity">Tiktok</li>
          <li className="cursor-pointer active:opacity-40 hover:opacity-50 transition-opacity">Pinterest</li>
          <li className="cursor-pointer active:opacity-40 hover:opacity-50 transition-opacity">YouTube</li>
        </ul>
      </div>
    </div>

    <div className="mt-16 md:mt-24 pt-6 md:pt-8 border-t border-stone-200 flex flex-col md:flex-row items-center justify-between gap-3 text-[8px] md:text-[9px] text-stone-400 tracking-[0.3em] uppercase">
      <span>© 2026 Elina Gold. Alle Rechte vorbehalten.</span>
      <div className="flex items-center gap-5">
        <Link href="/impressum" className="hover:text-stone-600 transition-colors">Impressum</Link>
        <Link href="/datenschutz" className="hover:text-stone-600 transition-colors">Datenschutz</Link>
        <Link href="/agb" className="hover:text-stone-600 transition-colors">AGB</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
