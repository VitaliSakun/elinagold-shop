import Footer from "@/components/Footer";

export const metadata = {
  title: "AGB — Elina Gold",
  description: "Allgemeine Geschäftsbedingungen der Elina Gold GbR.",
};

export default function AgbPage() {
  return (
    <>
      <div className="bg-white min-h-screen">
        <main className="max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-28 font-sans">

          {/* Page Title */}
          <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em] uppercase text-stone-900 mb-2">
            Allgemeine Geschäftsbedingungen
          </h1>
          <div className="w-10 h-[1.5px] bg-[#641428] mb-10" />

          <p className="text-[13px] md:text-[14px] font-light leading-7 text-stone-600 mb-8">
            Stand: März 2026 — Elina Gold GbR, Q4, 6, 68161 Mannheim
          </p>

          {/* § 1 */}
          <h2 className="text-[11px] md:text-[12px] font-bold tracking-[0.3em] uppercase text-stone-900 mt-10 mb-3">
            § 1 Geltungsbereich
          </h2>
          <p className="text-[13px] md:text-[14px] font-light leading-7 text-stone-600">
            Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge, die zwischen der Elina Gold GbR (nachfolgend „Elina Gold" oder „wir") und unseren Kunden (nachfolgend „Kunden" oder „Sie") über unseren Online-Shop unter der Domain elinagold.de geschlossen werden. Abweichende, entgegenstehende oder ergänzende Allgemeine Geschäftsbedingungen des Kunden werden nicht Vertragsbestandteil, es sei denn, ihrer Geltung wird ausdrücklich schriftlich zugestimmt.
          </p>

          {/* § 2 */}
          <h2 className="text-[11px] md:text-[12px] font-bold tracking-[0.3em] uppercase text-stone-900 mt-10 mb-3">
            § 2 Vertragspartner und Vertragsschluss
          </h2>
          <p className="text-[13px] md:text-[14px] font-light leading-7 text-stone-600">
            Der Kaufvertrag kommt zustande mit:
          </p>
          <p className="text-[13px] md:text-[14px] font-light leading-7 text-stone-600 mt-3">
            Elina Gold GbR<br />
            Q4, 6<br />
            68161 Mannheim<br />
            Deutschland<br />
            E-Mail: info@elinagold.de
          </p>
          <p className="text-[13px] md:text-[14px] font-light leading-7 text-stone-600 mt-4">
            Vertragsschluss: Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot, sondern eine Aufforderung zur Bestellung (invitatio ad offerendum) dar. Durch das Klicken auf die Schaltfläche „Jetzt kaufen" / „Kostenpflichtig bestellen" geben Sie eine verbindliche Bestellung der im Warenkorb enthaltenen Produkte auf. Die Annahme Ihres Angebots (und damit der Vertragsschluss) erfolgt durch eine Auftragsbestätigung per E-Mail, spätestens jedoch durch die Lieferung der Ware.
          </p>

          {/* § 3 */}
          <h2 className="text-[11px] md:text-[12px] font-bold tracking-[0.3em] uppercase text-stone-900 mt-10 mb-3">
            § 3 Preise und Versandkosten
          </h2>
          <p className="text-[13px] md:text-[14px] font-light leading-7 text-stone-600">
            Alle angegebenen Preise sind Endpreise in Euro (€) und enthalten die gesetzliche Mehrwertsteuer. Zusätzliche Liefer- und Versandkosten werden im Bestellprozess ausgewiesen und sind vom Kunden zu tragen, sofern dieser nicht den für den kostenlosen Versand erforderlichen Mindestbestellwert erreicht. Wir behalten uns das Recht vor, Preisänderungen vorzunehmen; für abgeschlossene Bestellungen gilt jedoch stets der zum Zeitpunkt der Bestellung gültige Preis.
          </p>

          {/* § 4 */}
          <h2 className="text-[11px] md:text-[12px] font-bold tracking-[0.3em] uppercase text-stone-900 mt-10 mb-3">
            § 4 Lieferung
          </h2>
          <p className="text-[13px] md:text-[14px] font-light leading-7 text-stone-600">
            Die Lieferung erfolgt an die vom Kunden angegebene Lieferadresse. Lieferungen erfolgen grundsätzlich innerhalb Deutschlands sowie in ausgewählte europäische Länder. Die voraussichtlichen Lieferzeiten werden auf den jeweiligen Produktseiten angegeben. Liegt kein anderes Datum in der Auftragsbestätigung vor, gilt eine Lieferfrist von 3–7 Werktagen für Deutschland. Bei Bestellung von personalisierten Artikeln (z. B. Gravuren) verlängert sich die Lieferfrist entsprechend und wird auf der Produktseite oder im Bestellprozess angegeben. Wir sind berechtigt, Teillieferungen vorzunehmen, sofern dies für Sie zumutbar ist.
          </p>

          {/* § 5 */}
          <h2 className="text-[11px] md:text-[12px] font-bold tracking-[0.3em] uppercase text-stone-900 mt-10 mb-3">
            § 5 Zahlungsmethoden
          </h2>
          <p className="text-[13px] md:text-[14px] font-light leading-7 text-stone-600">
            Wir akzeptieren folgende Zahlungsmethoden:
          </p>
          <ul className="text-[13px] md:text-[14px] font-light leading-7 text-stone-600 mt-3 space-y-1.5 list-disc list-inside">
            <li>Kreditkarte (Visa, Mastercard, American Express)</li>
            <li>PayPal</li>
            <li>Apple Pay</li>
            <li>Google Pay</li>
            <li>Klarna (Ratenkauf, Rechnung oder Sofortüberweisung)</li>
            <li>SEPA-Lastschrift</li>
          </ul>
          <p className="text-[13px] md:text-[14px] font-light leading-7 text-stone-600 mt-4">
            Der Rechnungsbetrag ist sofort fällig, sofern bei der jeweiligen Zahlungsmethode nicht anders angegeben. Im Falle des Zahlungsverzugs sind wir berechtigt, Verzugszinsen in gesetzlicher Höhe zu berechnen.
          </p>

          {/* § 6 */}
          <h2 className="text-[11px] md:text-[12px] font-bold tracking-[0.3em] uppercase text-stone-900 mt-10 mb-3">
            § 6 Eigentumsvorbehalt
          </h2>
          <p className="text-[13px] md:text-[14px] font-light leading-7 text-stone-600">
            Die gelieferte Ware bleibt bis zur vollständigen Bezahlung des Kaufpreises unser Eigentum. Vor Eigentumsübergang ist eine Verpfändung, Sicherungsübereignung, Verarbeitung oder Umgestaltung der Vorbehaltsware ohne unsere Zustimmung nicht gestattet.
          </p>

          {/* § 7 */}
          <h2 className="text-[11px] md:text-[12px] font-bold tracking-[0.3em] uppercase text-stone-900 mt-10 mb-3">
            § 7 Personalisierungen und Gravuren
          </h2>
          <p className="text-[13px] md:text-[14px] font-light leading-7 text-stone-600">
            Artikel mit individuellen Personalisierungen oder Gravuren werden nach Kundenspezifikation gefertigt. Gemäß § 312g Abs. 2 Nr. 1 BGB besteht für solche Waren kein Widerrufsrecht, da es sich um Waren handelt, die nach Kundenspezifikation angefertigt werden oder eindeutig auf die persönlichen Bedürfnisse des Verbrauchers zugeschnitten sind.
          </p>
          <p className="text-[13px] md:text-[14px] font-light leading-7 text-stone-600 mt-4">
            Bitte prüfen Sie die Angaben für Personalisierungen vor dem Absenden der Bestellung sorgfältig, da Änderungen nach Auftragsbestätigung nicht mehr möglich sind. Für Schreib- oder Rechtschreibfehler in der vom Kunden eingegebenen Personalisierung übernehmen wir keine Haftung.
          </p>

          {/* § 8 */}
          <h2 className="text-[11px] md:text-[12px] font-bold tracking-[0.3em] uppercase text-stone-900 mt-10 mb-3">
            § 8 Widerrufsrecht
          </h2>
          <p className="text-[13px] md:text-[14px] font-light leading-7 text-stone-600">
            Verbrauchern steht ein gesetzliches Widerrufsrecht zu. Als Verbraucher haben Sie das Recht, binnen 14 Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt 14 Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.
          </p>
          <p className="text-[13px] md:text-[14px] font-light leading-7 text-stone-600 mt-4">
            Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Elina Gold GbR, Q4, 6, 68161 Mannheim, E-Mail: info@elinagold.de) mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
          </p>
          <p className="text-[13px] md:text-[14px] font-light leading-7 text-stone-600 mt-4">
            Folgen des Widerrufs: Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen 14 Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben.
          </p>
          <p className="text-[13px] md:text-[14px] font-light leading-7 text-stone-600 mt-4">
            <strong className="font-semibold text-stone-700">Ausnahmen vom Widerrufsrecht:</strong> Das Widerrufsrecht besteht nicht bei Waren, die nach Kundenspezifikation angefertigt werden oder eindeutig auf die persönlichen Bedürfnisse des Verbrauchers zugeschnitten sind (insbesondere personalisierte Artikel und Gravuren gemäß § 312g Abs. 2 Nr. 1 BGB).
          </p>

          {/* § 9 */}
          <h2 className="text-[11px] md:text-[12px] font-bold tracking-[0.3em] uppercase text-stone-900 mt-10 mb-3">
            § 9 Gewährleistung
          </h2>
          <p className="text-[13px] md:text-[14px] font-light leading-7 text-stone-600">
            Es gelten die gesetzlichen Gewährleistungsrechte. Die Gewährleistungsfrist für neue Waren beträgt 2 Jahre ab Lieferdatum. Bei gebrauchten Waren kann die Gewährleistungsfrist auf 1 Jahr verkürzt werden, sofern dies im Einzelfall vereinbart wird. Mängel sind uns unverzüglich nach Entdeckung mitzuteilen. Wir leisten nach unserer Wahl zunächst Nacherfüllung durch Reparatur oder Ersatzlieferung.
          </p>

          {/* § 10 */}
          <h2 className="text-[11px] md:text-[12px] font-bold tracking-[0.3em] uppercase text-stone-900 mt-10 mb-3">
            § 10 Vertragssprache
          </h2>
          <p className="text-[13px] md:text-[14px] font-light leading-7 text-stone-600">
            Die für den Vertragsschluss zur Verfügung stehende Sprache ist ausschließlich Deutsch. Der Vertragstext wird von uns nicht gespeichert und ist nach Abschluss des Bestellvorgangs nicht mehr zugänglich. Ihre Bestelldaten werden Ihnen per E-Mail übermittelt und von Ihnen gespeichert werden können.
          </p>

          {/* § 11 */}
          <h2 className="text-[11px] md:text-[12px] font-bold tracking-[0.3em] uppercase text-stone-900 mt-10 mb-3">
            § 11 Streitbeilegung
          </h2>
          <p className="text-[13px] md:text-[14px] font-light leading-7 text-stone-600">
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit. Die Plattform finden Sie unter{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#641428] hover:opacity-70 transition-opacity"
            >
              https://ec.europa.eu/consumers/odr
            </a>
            .
          </p>
          <p className="text-[13px] md:text-[14px] font-light leading-7 text-stone-600 mt-4">
            Wir sind weder verpflichtet noch bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen. Im Übrigen gilt für alle Streitigkeiten aus und im Zusammenhang mit dem Vertrag deutsches Recht unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist Mannheim, sofern Sie keinen allgemeinen Gerichtsstand in Deutschland haben oder nach Vertragsschluss Ihren Wohnsitz ins Ausland verlegt haben.
          </p>

        </main>
      </div>
      <Footer />
    </>
  );
}
