import { WORKSHOP_DETAILS } from "../data";

const CARD_STYLES: Record<string, { emoji: string; bg: string; text: string }> = {
  "Age Group": { emoji: "🧒", bg: "bg-kid-red/10", text: "text-kid-red" },
  "Duration": { emoji: "📅", bg: "bg-kid-orange/10", text: "text-kid-orange" },
  "Mode": { emoji: "💻", bg: "bg-kid-green/10", text: "text-kid-green" },
  "Fee": { emoji: "🎟️", bg: "bg-kid-blue/10", text: "text-kid-blue" },
  "Start Date": { emoji: "🚀", bg: "bg-grape/10", text: "text-grape" },
};

export default function WorkshopDetails() {
  return (
    <section id="details" className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="font-display inline-block rounded-full bg-kid-blue/10 px-4 py-1.5 text-sm font-bold text-kid-blue">
            🗂️ Workshop Details
          </span>
          <h2 className="font-display mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Everything You Need to Know
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-500">
            A quick overview of the workshop structure, schedule, and pricing.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {WORKSHOP_DETAILS.map((detail) => {
            const style = CARD_STYLES[detail.label] || { emoji: "📌", bg: "bg-gray-100", text: "text-gray-600" };
            return (
              <div
                key={detail.label}
                className="group rounded-3xl border-2 border-gray-100 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:rotate-1 hover:shadow-lg hover:border-kid-blue/20"
              >
                <div className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl text-3xl ${style.bg}`}>
                  {style.emoji}
                </div>
                <p className="text-sm font-semibold text-gray-500">{detail.label}</p>
                <p className={`font-display mt-1 text-xl font-extrabold ${style.text}`}>{detail.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
