"use client";

import { useState } from "react";
import AnimateIn from "@/components/AnimateIn";

const FAQ_ITEMS = [
  {
    question: "Aus welchen Materialien besteht der Schmuck?",
    answer:
      "Unser Schmuck wird aus hochwertigem 925er Sterling-Silber und 18 Karat vergoldetem Silber gefertigt. Jedes Stück wird sorgfältig in Handarbeit hergestellt.",
  },
  {
    question: "Wie lange dauert der Versand?",
    answer:
      "Der Standardversand innerhalb Deutschlands dauert 2–5 Werktage. Ab einem Bestellwert von 99 € ist der Versand kostenlos, darunter beträgt er 4,90 €.",
  },
  {
    question: "Kann ich meine Bestellung zurückgeben?",
    answer:
      "Ja, Sie können Ihre Bestellung innerhalb von 14 Tagen nach Erhalt ohne Angabe von Gründen widerrufen. Die Versandkosten der Rücksendung trägt der Käufer. Personalisierte Artikel (z. B. mit Gravur) sind vom Widerruf ausgeschlossen.",
  },
  {
    question: "Wie pflege ich meinen Schmuck?",
    answer:
      "Bewahren Sie Ihren Schmuck in der beigelegten Elina Gold Tasche oder Box auf. Vermeiden Sie Kontakt mit Parfum, Sonnencreme und chemischen Substanzen. Reinigen Sie ihn sanft mit einem weichen, fusselfreien Tuch.",
  },
  {
    question: "Welche Zahlungsmethoden werden akzeptiert?",
    answer:
      "Wir akzeptieren Visa, Mastercard, PayPal, Apple Pay, Google Pay und Klarna.",
  },
  {
    question: "Bietet Elina Gold Geschenkverpackungen an?",
    answer:
      "Ja, alle Bestellungen werden in einer eleganten Elina Gold Geschenkverpackung versandt – ohne Aufpreis.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-16 md:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 md:px-12">
        <AnimateIn className="text-center mb-10 md:mb-16">
          <h2 className="text-lg md:text-xl font-medium tracking-[0.35em] uppercase text-stone-900">
            Häufige Fragen
          </h2>
          <div
            className="mx-auto mt-5"
            style={{ width: "28px", height: "1px", backgroundColor: "rgba(0,0,0,0.2)" }}
          />
        </AnimateIn>

        <div className="divide-y divide-stone-200">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <AnimateIn key={i} delay={i * 60}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-5 md:py-6 text-left group"
                >
                  <span className="text-[13px] md:text-[14px] font-medium tracking-[0.15em] uppercase text-stone-700 group-hover:text-stone-900 transition-colors pr-4">
                    {item.question}
                  </span>
                  <span
                    className="text-stone-400 text-xl flex-shrink-0 transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    +
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: isOpen ? "200px" : "0px", opacity: isOpen ? 1 : 0 }}
                >
                  <p className="text-[13px] md:text-[14px] leading-7 text-stone-500 font-medium pb-5 md:pb-6">
                    {item.answer}
                  </p>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
