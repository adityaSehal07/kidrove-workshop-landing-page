import { useState } from "react";
import { FAQS } from "../data";

const ACCENTS = ["border-kid-red", "border-kid-orange", "border-kid-yellow", "border-kid-green", "border-kid-blue"];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section id="faq" className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <span className="font-display inline-block rounded-full bg-kid-orange/10 px-4 py-1.5 text-sm font-bold text-kid-orange">
            🙋 FAQs
          </span>
          <h2 className="font-display mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-500">
            Still deciding? Here's what other parents usually ask first.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;
            const accent = ACCENTS[index % ACCENTS.length];

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-3xl border-2 bg-white shadow-sm transition-all ${
                  isOpen ? `${accent} shadow-md` : "border-gray-100"
                }`}
              >
                <button
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-gray-50"
                >
                  <span className="font-display text-base font-bold text-gray-900">
                    {faq.question}
                  </span>
                  <span
                    className={`flex h-8 w-8 flex-none items-center justify-center rounded-full text-lg font-bold transition-all ${
                      isOpen ? "bg-kid-blue text-white rotate-45" : "bg-gray-100 text-gray-500"
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`transition-all duration-200 ${
                    isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-5 text-sm leading-relaxed text-gray-500">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
