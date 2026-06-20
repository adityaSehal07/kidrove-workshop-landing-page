import { LEARNING_OUTCOMES } from "../data";

const COLORS = [
  { bg: "bg-kid-red/10", text: "text-kid-red" },
  { bg: "bg-kid-orange/10", text: "text-kid-orange" },
  { bg: "bg-kid-yellow/20", text: "text-yellow-600" },
  { bg: "bg-kid-green/10", text: "text-kid-green" },
  { bg: "bg-kid-blue/10", text: "text-kid-blue" },
  { bg: "bg-grape/10", text: "text-grape" },
];

export default function LearningOutcomes() {
  return (
    <section id="outcomes" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="font-display inline-block rounded-full bg-kid-green/10 px-4 py-1.5 text-sm font-bold text-kid-green">
            🌟 Learning Outcomes
          </span>
          <h2 className="font-display mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What Your Child Will Learn
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-500">
            By the end of the four weeks, every participant completes these milestones.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LEARNING_OUTCOMES.map((outcome, index) => {
            const color = COLORS[index % COLORS.length];
            return (
              <div
                key={index}
                className="flex gap-4 rounded-3xl border-2 border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:border-kid-blue/20"
              >
                <div className="flex-none">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full font-display font-bold ${color.bg} ${color.text}`}>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-gray-600">{outcome}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
