import Footer from "@/components/Footer";

export const metadata = {
  title: "Impressum — Elina Gold",
  description: "Impressum und rechtliche Angaben der Elina Gold GbR, Mannheim.",
};

export default function ImpressumPage() {
  return (
    <>
      <div className="bg-white min-h-screen">
        <main className="max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-28 font-sans">

          {/* Page Title */}
          <h1 className="text-2xl md:text-3xl font-normal tracking-[0.2em] uppercase text-stone-900 mb-2">
            Impressum
          </h1>
          <div className="w-10 h-[1.5px] bg-[#641428] mb-10" />

          {/* Angaben gemäß § 5 TMG */}
          <h2 className="text-[11px] md:text-[12px] font-bold tracking-[0.3em] uppercase text-stone-900 mt-10 mb-3">
            Angaben gemäß § 5 TMG
          </h2>
          <p className="text-[13px] md:text-[14px] font-normal leading-7 text-stone-600">
            Elina Gold GbR<br />
            Q4, 6<br />
            68161 Mannheim<br />
            Deutschland
          </p>

          {/* Kontakt */}
          <h2 className="text-[11px] md:text-[12px] font-bold tracking-[0.3em] uppercase text-stone-900 mt-10 mb-3">
            Kontakt
          </h2>
          <p className="text-[13px] md:text-[14px] font-normal leading-7 text-stone-600">
            Telefon: +49 (0)172 8800656<br />
            Telefon: +49 (0)157 77779333<br />
            E-Mail:{" "}
            <a
              href="mailto:info@elinagold.de"
              className="text-[#641428] hover:opacity-70 transition-opacity"
            >
              info@elinagold.de
            </a>
          </p>

          {/* Vertretungsberechtigte */}
          <h2 className="text-[11px] md:text-[12px] font-bold tracking-[0.3em] uppercase text-stone-900 mt-10 mb-3">
            Vertretungsberechtigte Gesellschafterinnen
          </h2>
          <p className="text-[13px] md:text-[14px] font-normal leading-7 text-stone-600">
            Elif Ortac<br />
            Rina Kocbay
          </p>

          {/* Umsatzsteuer */}
          <h2 className="text-[11px] md:text-[12px] font-bold tracking-[0.3em] uppercase text-stone-900 mt-10 mb-3">
            Umsatzsteuer-Identifikationsnummer
          </h2>
          <p className="text-[13px] md:text-[14px] font-normal leading-7 text-stone-600">
            Umsatzsteuer-ID: DE367927391<br />
            (gemäß § 27a Umsatzsteuergesetz)
          </p>

          {/* Markenhinweis */}
          <h2 className="text-[11px] md:text-[12px] font-bold tracking-[0.3em] uppercase text-stone-900 mt-10 mb-3">
            Markenhinweis
          </h2>
          <p className="text-[13px] md:text-[14px] font-normal leading-7 text-stone-600">
            Die Marken aller auf dieser Webseite angebotenen Artikel sind ausschließliches Eigentum der jeweiligen Inhaberinnen.
          </p>

          {/* Online-Streitbeilegung */}
          <h2 className="text-[11px] md:text-[12px] font-bold tracking-[0.3em] uppercase text-stone-900 mt-10 mb-3">
            Online-Streitbeilegung (ODR)
          </h2>
          <p className="text-[13px] md:text-[14px] font-normal leading-7 text-stone-600">
            Online-Streitbeilegung gemäß Art. 14 Abs. 1 ODR-VO und § 36 VSBG:
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die Sie unter{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#641428] hover:opacity-70 transition-opacity"
            >
              https://ec.europa.eu/consumers/odr
            </a>{" "}
            finden.
          </p>
          <p className="text-[13px] md:text-[14px] font-normal leading-7 text-stone-600 mt-4">
            Wir sind weder verpflichtet noch bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>

          {/* Haftungsausschluss */}
          <h2 className="text-[11px] md:text-[12px] font-bold tracking-[0.3em] uppercase text-stone-900 mt-10 mb-3">
            Haftungsausschluss
          </h2>

          <h3 className="text-[11px] md:text-[12px] font-semibold tracking-[0.2em] uppercase text-stone-800 mt-6 mb-2">
            Haftung für Inhalte
          </h3>
          <p className="text-[13px] md:text-[14px] font-normal leading-7 text-stone-600">
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>

          <h3 className="text-[11px] md:text-[12px] font-semibold tracking-[0.2em] uppercase text-stone-800 mt-6 mb-2">
            Haftung für Links
          </h3>
          <p className="text-[13px] md:text-[14px] font-normal leading-7 text-stone-600">
            Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
          </p>

          <h3 className="text-[11px] md:text-[12px] font-semibold tracking-[0.2em] uppercase text-stone-800 mt-6 mb-2">
            Urheberrecht
          </h3>
          <p className="text-[13px] md:text-[14px] font-normal leading-7 text-stone-600">
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
          </p>

        </main>
      </div>
      <Footer />
    </>
  );
}
