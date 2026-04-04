import Footer from "@/components/Footer";

export const metadata = {
  title: "Datenschutzerklärung — Elina Gold",
  description: "Informationen zum Datenschutz und zur Verarbeitung personenbezogener Daten bei Elina Gold.",
};

export default function DatenschutzPage() {
  return (
    <>
      <div className="bg-white min-h-screen">
        <main className="max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-28 font-sans">

          {/* Page Title */}
          <h1 className="text-2xl md:text-3xl font-medium tracking-[0.2em] uppercase text-stone-900 mb-2">
            Datenschutzerklärung
          </h1>
          <div className="w-10 h-[1.5px] bg-[#641428] mb-10" />

          <p className="text-[13px] md:text-[14px] font-medium leading-7 text-stone-600">
            Wir freuen uns über Ihr Interesse an unserem Online-Shop. Der Schutz Ihrer personenbezogenen Daten ist uns ein wichtiges Anliegen. Nachfolgend informieren wir Sie ausführlich über den Umgang mit Ihren Daten gemäß der Datenschutz-Grundverordnung (DSGVO) sowie weiterer anwendbarer datenschutzrechtlicher Vorschriften.
          </p>

          {/* 1. Verantwortlicher */}
          <h2 className="text-[11px] md:text-[12px] font-bold tracking-[0.3em] uppercase text-stone-900 mt-10 mb-3">
            1. Verantwortlicher
          </h2>
          <p className="text-[13px] md:text-[14px] font-medium leading-7 text-stone-600">
            Verantwortlicher im Sinne der DSGVO ist:<br /><br />
            Elina Gold GbR<br />
            Q4, 6<br />
            68161 Mannheim<br />
            Deutschland<br /><br />
            E-Mail:{" "}
            <a href="mailto:info@elinagold.de" className="text-[#641428] hover:opacity-70 transition-opacity">
              info@elinagold.de
            </a>
            <br />
            Telefon: +49 (0)172 8800656
          </p>

          {/* 2. Erhobene Daten und Zwecke */}
          <h2 className="text-[11px] md:text-[12px] font-bold tracking-[0.3em] uppercase text-stone-900 mt-10 mb-3">
            2. Erhobene Daten und Verarbeitungszwecke
          </h2>
          <p className="text-[13px] md:text-[14px] font-medium leading-7 text-stone-600">
            Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung einer funktionsfähigen Website, unserer Inhalte und Leistungen erforderlich ist. Eine Verarbeitung personenbezogener Daten unserer Nutzer erfolgt regelmäßig nur nach Einwilligung des Nutzers oder sofern eine gesetzliche Rechtsgrundlage dies erlaubt.
          </p>
          <p className="text-[13px] md:text-[14px] font-medium leading-7 text-stone-600 mt-4">
            Wir verarbeiten insbesondere folgende Datenkategorien:
          </p>
          <ul className="text-[13px] md:text-[14px] font-medium leading-7 text-stone-600 mt-3 space-y-2 list-disc list-inside">
            <li><strong className="font-semibold text-stone-700">Bestandsdaten:</strong> Name, Anschrift, E-Mail-Adresse, Telefonnummer (bei Bestellung oder Kontoerstellung)</li>
            <li><strong className="font-semibold text-stone-700">Zahlungsdaten:</strong> Bankverbindung, Kreditkarteninformationen (werden ausschließlich über zertifizierte Zahlungsdienstleister verarbeitet)</li>
            <li><strong className="font-semibold text-stone-700">Nutzungsdaten:</strong> IP-Adresse, Browsertyp, besuchte Seiten, Zugriffszeiten, Referrer-URL</li>
            <li><strong className="font-semibold text-stone-700">Kommunikationsdaten:</strong> Inhalte aus Kontaktanfragen per E-Mail oder Formular</li>
            <li><strong className="font-semibold text-stone-700">Transaktionsdaten:</strong> Bestellhistorie, bestellte Produkte, Lieferstatus</li>
          </ul>
          <p className="text-[13px] md:text-[14px] font-medium leading-7 text-stone-600 mt-4">
            Die Verarbeitung Ihrer Daten erfolgt zu folgenden Zwecken:
          </p>
          <ul className="text-[13px] md:text-[14px] font-medium leading-7 text-stone-600 mt-3 space-y-2 list-disc list-inside">
            <li>Durchführung und Abwicklung von Kaufverträgen (Bestellverarbeitung, Versand, Rechnungsstellung)</li>
            <li>Kundenkommunikation und Beantwortung von Anfragen</li>
            <li>Bereitstellung und Verbesserung unseres Online-Shops</li>
            <li>Erfüllung gesetzlicher Pflichten (z. B. Steuer- und Handelsrecht)</li>
            <li>Betrugsprävention und Sicherheit</li>
            <li>Zusendung von Newslettern und Werbemitteilungen (nur mit Ihrer ausdrücklichen Einwilligung)</li>
          </ul>

          {/* 3. Rechtsgrundlagen */}
          <h2 className="text-[11px] md:text-[12px] font-bold tracking-[0.3em] uppercase text-stone-900 mt-10 mb-3">
            3. Rechtsgrundlagen der Verarbeitung
          </h2>
          <p className="text-[13px] md:text-[14px] font-medium leading-7 text-stone-600">
            Die Verarbeitung Ihrer personenbezogenen Daten erfolgt auf folgenden Rechtsgrundlagen gemäß Art. 6 DSGVO:
          </p>
          <ul className="text-[13px] md:text-[14px] font-medium leading-7 text-stone-600 mt-3 space-y-2 list-disc list-inside">
            <li>
              <strong className="font-semibold text-stone-700">Art. 6 Abs. 1 lit. a DSGVO (Einwilligung):</strong> Sofern Sie uns eine Einwilligung zur Verarbeitung Ihrer Daten erteilt haben, z. B. für den Newsletter oder analytische Cookies.
            </li>
            <li>
              <strong className="font-semibold text-stone-700">Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung):</strong> Zur Durchführung eines Vertrags oder vorvertraglicher Maßnahmen, z. B. Bestellabwicklung, Lieferung, Zahlungsabwicklung.
            </li>
            <li>
              <strong className="font-semibold text-stone-700">Art. 6 Abs. 1 lit. c DSGVO (Rechtliche Verpflichtung):</strong> Zur Erfüllung gesetzlicher Aufbewahrungspflichten, z. B. nach Steuer- oder Handelsrecht.
            </li>
            <li>
              <strong className="font-semibold text-stone-700">Art. 6 Abs. 1 lit. f DSGVO (Berechtigtes Interesse):</strong> Zur Wahrung unserer berechtigten Interessen, z. B. Betrugsprävention, IT-Sicherheit, Analyse und Optimierung unserer Website.
            </li>
          </ul>

          {/* 4. Shopify */}
          <h2 className="text-[11px] md:text-[12px] font-bold tracking-[0.3em] uppercase text-stone-900 mt-10 mb-3">
            4. Shopify als technische Plattform und Auftragsverarbeiter
          </h2>
          <p className="text-[13px] md:text-[14px] font-medium leading-7 text-stone-600">
            Unser Online-Shop wird auf der Plattform Shopify betrieben. Anbieter ist die Shopify International Limited, Victoria Buildings, 2nd Floor, 1–2 Haddington Road, Dublin 4, D04 XN32, Irland (nachfolgend „Shopify").
          </p>
          <p className="text-[13px] md:text-[14px] font-medium leading-7 text-stone-600 mt-4">
            Shopify ist ein Auftragsverarbeiter im Sinne des Art. 28 DSGVO, mit dem wir einen Auftragsverarbeitungsvertrag abgeschlossen haben. Shopify verarbeitet Ihre Daten ausschließlich auf unsere Weisung und zur Bereitstellung der Shop-Infrastruktur (Hosting, Bestellverwaltung, Zahlungsabwicklung).
          </p>
          <p className="text-[13px] md:text-[14px] font-medium leading-7 text-stone-600 mt-4">
            Shopify verfügt über Zertifizierungen nach dem EU-US Data Privacy Framework, sodass Datentransfers in die USA rechtmäßig erfolgen können. Die Datenschutzerklärung von Shopify finden Sie unter:{" "}
            <a
              href="https://www.shopify.com/legal/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#641428] hover:opacity-70 transition-opacity"
            >
              https://www.shopify.com/legal/privacy
            </a>
          </p>

          {/* 5. Cookies */}
          <h2 className="text-[11px] md:text-[12px] font-bold tracking-[0.3em] uppercase text-stone-900 mt-10 mb-3">
            5. Cookies
          </h2>
          <p className="text-[13px] md:text-[14px] font-medium leading-7 text-stone-600">
            Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die beim Besuch unserer Website in Ihrem Browser gespeichert werden. Wir unterscheiden folgende Arten von Cookies:
          </p>
          <p className="text-[13px] md:text-[14px] font-medium leading-7 text-stone-600 mt-4">
            <strong className="font-semibold text-stone-700">Notwendige Cookies:</strong> Diese Cookies sind für den technischen Betrieb der Website unbedingt erforderlich und ermöglichen grundlegende Funktionen wie die Nutzung des Warenkorbs oder das Einloggen in Ihr Kundenkonto. Sie können nicht deaktiviert werden, da der Shop ohne sie nicht funktionieren würde. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b und lit. f DSGVO.
          </p>
          <p className="text-[13px] md:text-[14px] font-medium leading-7 text-stone-600 mt-4">
            <strong className="font-semibold text-stone-700">Funktionale Cookies:</strong> Diese Cookies ermöglichen es uns, Ihre Präferenzen (z. B. Sprache, Region) zu speichern, um Ihnen eine verbesserte und personalisierte Nutzererfahrung zu bieten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
          </p>
          <p className="text-[13px] md:text-[14px] font-medium leading-7 text-stone-600 mt-4">
            <strong className="font-semibold text-stone-700">Analyse-Cookies:</strong> Diese Cookies helfen uns, die Nutzung unserer Website zu analysieren (z. B. besuchte Seiten, Verweildauer, Absprungrate), um unseren Shop kontinuierlich zu verbessern. Die Analyse erfolgt nur mit Ihrer ausdrücklichen Einwilligung. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO.
          </p>
          <p className="text-[13px] md:text-[14px] font-medium leading-7 text-stone-600 mt-4">
            Sie können Ihre Cookie-Einstellungen jederzeit über das Cookie-Banner auf unserer Website oder die Einstellungen Ihres Browsers anpassen. Bitte beachten Sie, dass das Deaktivieren bestimmter Cookies die Funktionalität unseres Shops einschränken kann.
          </p>

          {/* 6. Zahlungsdienstleister */}
          <h2 className="text-[11px] md:text-[12px] font-bold tracking-[0.3em] uppercase text-stone-900 mt-10 mb-3">
            6. Zahlungsdienstleister
          </h2>
          <p className="text-[13px] md:text-[14px] font-medium leading-7 text-stone-600">
            Zur Abwicklung von Zahlungen setzen wir folgende externe Dienstleister ein. Diese Anbieter sind eigenständig für den Datenschutz im Rahmen ihrer Zahlungsprozesse verantwortlich:
          </p>
          <ul className="text-[13px] md:text-[14px] font-medium leading-7 text-stone-600 mt-3 space-y-3 list-disc list-inside">
            <li>
              <strong className="font-semibold text-stone-700">PayPal:</strong> PayPal (Europe) S.à r.l. et Cie, S.C.A., 22–24 Boulevard Royal, 2449 Luxemburg. Datenschutzerklärung:{" "}
              <a href="https://www.paypal.com/de/webapps/mpp/ua/privacy-full" target="_blank" rel="noopener noreferrer" className="text-[#641428] hover:opacity-70 transition-opacity">
                www.paypal.com
              </a>
            </li>
            <li>
              <strong className="font-semibold text-stone-700">Klarna:</strong> Klarna Bank AB, Sveavägen 46, 111 34 Stockholm, Schweden. Datenschutzerklärung:{" "}
              <a href="https://www.klarna.com/de/datenschutz/" target="_blank" rel="noopener noreferrer" className="text-[#641428] hover:opacity-70 transition-opacity">
                www.klarna.com/de/datenschutz
              </a>
            </li>
            <li>
              <strong className="font-semibold text-stone-700">Stripe:</strong> Stripe Payments Europe, Ltd., 1 Grand Canal Street Lower, Grand Canal Dock, Dublin, Irland. Datenschutzerklärung:{" "}
              <a href="https://stripe.com/de/privacy" target="_blank" rel="noopener noreferrer" className="text-[#641428] hover:opacity-70 transition-opacity">
                stripe.com/de/privacy
              </a>
            </li>
            <li>
              <strong className="font-semibold text-stone-700">Apple Pay / Google Pay:</strong> Diese Dienste werden über die jeweiligen Plattformanbieter (Apple Inc. bzw. Google LLC) abgewickelt. Ihre Zahlungsdaten werden dabei direkt über die sichere Umgebung des jeweiligen Anbieters verarbeitet.
            </li>
          </ul>
          <p className="text-[13px] md:text-[14px] font-medium leading-7 text-stone-600 mt-4">
            Die Weitergabe Ihrer Daten an Zahlungsdienstleister erfolgt auf Basis von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) und ist für die Abwicklung Ihrer Bestellung notwendig.
          </p>

          {/* 7. Kontaktformular / E-Mail */}
          <h2 className="text-[11px] md:text-[12px] font-bold tracking-[0.3em] uppercase text-stone-900 mt-10 mb-3">
            7. Kontaktformular und E-Mail-Kontakt
          </h2>
          <p className="text-[13px] md:text-[14px] font-medium leading-7 text-stone-600">
            Wenn Sie uns per E-Mail oder über ein Kontaktformular kontaktieren, werden die von Ihnen übermittelten Daten (Ihre E-Mail-Adresse, Name und gegebenenfalls Ihre Telefonnummer) zur Bearbeitung Ihrer Anfrage bei uns gespeichert. Die in diesem Zusammenhang anfallenden Daten löschen wir, sobald ihre Speicherung nicht mehr erforderlich ist, oder schränken die Verarbeitung ein, sofern gesetzliche Aufbewahrungspflichten bestehen.
          </p>
          <p className="text-[13px] md:text-[14px] font-medium leading-7 text-stone-600 mt-4">
            Rechtsgrundlage für die Verarbeitung der Daten ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung Ihrer Anfrage) bzw. Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage auf den Abschluss eines Vertrages gerichtet ist.
          </p>

          {/* 8. Betroffenenrechte */}
          <h2 className="text-[11px] md:text-[12px] font-bold tracking-[0.3em] uppercase text-stone-900 mt-10 mb-3">
            8. Ihre Rechte als betroffene Person (Art. 15–22 DSGVO)
          </h2>
          <p className="text-[13px] md:text-[14px] font-medium leading-7 text-stone-600">
            Sie haben uns gegenüber folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:
          </p>
          <ul className="text-[13px] md:text-[14px] font-medium leading-7 text-stone-600 mt-3 space-y-3 list-disc list-inside">
            <li>
              <strong className="font-semibold text-stone-700">Auskunftsrecht (Art. 15 DSGVO):</strong> Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob wir Sie betreffende personenbezogene Daten verarbeiten, und ggf. Auskunft über diese Daten sowie weitere Informationen zu erhalten.
            </li>
            <li>
              <strong className="font-semibold text-stone-700">Recht auf Berichtigung (Art. 16 DSGVO):</strong> Sie haben das Recht, unverzüglich die Berichtigung unrichtiger oder die Vervollständigung unvollständiger personenbezogener Daten zu verlangen.
            </li>
            <li>
              <strong className="font-semibold text-stone-700">Recht auf Löschung (Art. 17 DSGVO):</strong> Sie haben das Recht zu verlangen, dass Sie betreffende personenbezogene Daten unverzüglich gelöscht werden, sofern gesetzliche Aufbewahrungspflichten dem nicht entgegenstehen.
            </li>
            <li>
              <strong className="font-semibold text-stone-700">Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO):</strong> Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen, sofern bestimmte Voraussetzungen vorliegen.
            </li>
            <li>
              <strong className="font-semibold text-stone-700">Recht auf Widerspruch (Art. 21 DSGVO):</strong> Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung Ihrer Daten, die auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, Widerspruch einzulegen.
            </li>
            <li>
              <strong className="font-semibold text-stone-700">Recht auf Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie haben das Recht, die Sie betreffenden personenbezogenen Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten und diese Daten einem anderen Verantwortlichen zu übermitteln.
            </li>
            <li>
              <strong className="font-semibold text-stone-700">Widerrufsrecht bei Einwilligungen (Art. 7 Abs. 3 DSGVO):</strong> Sofern Sie uns eine Einwilligung zur Verarbeitung Ihrer Daten erteilt haben, können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen.
            </li>
          </ul>
          <p className="text-[13px] md:text-[14px] font-medium leading-7 text-stone-600 mt-4">
            Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{" "}
            <a href="mailto:info@elinagold.de" className="text-[#641428] hover:opacity-70 transition-opacity">
              info@elinagold.de
            </a>
          </p>

          {/* 9. Beschwerderecht */}
          <h2 className="text-[11px] md:text-[12px] font-bold tracking-[0.3em] uppercase text-stone-900 mt-10 mb-3">
            9. Beschwerderecht bei der Aufsichtsbehörde
          </h2>
          <p className="text-[13px] md:text-[14px] font-medium leading-7 text-stone-600">
            Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren. Die zuständige Aufsichtsbehörde für Baden-Württemberg ist:
          </p>
          <p className="text-[13px] md:text-[14px] font-medium leading-7 text-stone-600 mt-3">
            Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg<br />
            Lautenschlagerstraße 20<br />
            70173 Stuttgart<br />
            E-Mail: poststelle@lfdi.bwl.de<br />
            Webseite:{" "}
            <a href="https://www.baden-wuerttemberg.datenschutz.de" target="_blank" rel="noopener noreferrer" className="text-[#641428] hover:opacity-70 transition-opacity">
              www.baden-wuerttemberg.datenschutz.de
            </a>
          </p>

          {/* 10. Datensicherheit */}
          <h2 className="text-[11px] md:text-[12px] font-bold tracking-[0.3em] uppercase text-stone-900 mt-10 mb-3">
            10. Datensicherheit (SSL/TLS-Verschlüsselung)
          </h2>
          <p className="text-[13px] md:text-[14px] font-medium leading-7 text-stone-600">
            Unsere Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile. Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
          </p>
          <p className="text-[13px] md:text-[14px] font-medium leading-7 text-stone-600 mt-4">
            Wir treffen darüber hinaus geeignete technische und organisatorische Maßnahmen, um Ihre personenbezogenen Daten gegen zufällige oder vorsätzliche Manipulation, Verlust, Zerstörung oder gegen den Zugriff unberechtigter Personen zu schützen. Unsere Sicherheitsmaßnahmen werden entsprechend der technologischen Entwicklung fortlaufend verbessert.
          </p>

          {/* 11. Speicherdauer */}
          <h2 className="text-[11px] md:text-[12px] font-bold tracking-[0.3em] uppercase text-stone-900 mt-10 mb-3">
            11. Speicherdauer
          </h2>
          <p className="text-[13px] md:text-[14px] font-medium leading-7 text-stone-600">
            Wir speichern Ihre personenbezogenen Daten nur so lange, wie es für die Erfüllung der Zwecke, für die sie erhoben wurden, erforderlich ist oder wie es gesetzliche Aufbewahrungsfristen verlangen:
          </p>
          <ul className="text-[13px] md:text-[14px] font-medium leading-7 text-stone-600 mt-3 space-y-2 list-disc list-inside">
            <li>Bestelldaten und Rechnungen: 10 Jahre (§ 147 AO, § 257 HGB)</li>
            <li>Kundenkontodaten: bis zur Löschung des Kontos oder auf Antrag</li>
            <li>Kommunikationsdaten (E-Mails, Kontaktanfragen): 3 Jahre nach Abschluss des Vorgangs</li>
            <li>Cookie-Daten (analytisch/funktional): entsprechend der jeweiligen Cookie-Laufzeit, maximal 13 Monate</li>
          </ul>
          <p className="text-[13px] md:text-[14px] font-medium leading-7 text-stone-600 mt-4">
            Nach Ablauf der jeweiligen Frist werden Ihre Daten routinemäßig gelöscht oder anonymisiert, sofern keine weiteren gesetzlichen Pflichten der Speicherung entgegenstehen.
          </p>

          {/* 12. Änderungen */}
          <h2 className="text-[11px] md:text-[12px] font-bold tracking-[0.3em] uppercase text-stone-900 mt-10 mb-3">
            12. Aktualität und Änderung dieser Datenschutzerklärung
          </h2>
          <p className="text-[13px] md:text-[14px] font-medium leading-7 text-stone-600">
            Diese Datenschutzerklärung ist aktuell gültig und hat den Stand März 2026. Durch die Weiterentwicklung unserer Website und Angebote oder aufgrund geänderter gesetzlicher beziehungsweise behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern. Die jeweils aktuelle Datenschutzerklärung kann jederzeit auf der Website unter elinagold.de/datenschutz von Ihnen abgerufen und ausgedruckt werden.
          </p>

        </main>
      </div>
      <Footer />
    </>
  );
}
