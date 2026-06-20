import { WORKSHOP_TITLE, WORKSHOP_TAGLINE, WORKSHOP_DESCRIPTION } from "../data";
import KidroveLogo from "./KidroveLogo";

interface HeroProps {
  onEnrollClick: () => void;
}

export default function Hero({ onEnrollClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-kid-blue via-kid-blue-dark to-grape">
      {/* Floating decorative shapes — playful, not corporate */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="float-slow absolute left-[8%] top-16 h-16 w-16 rounded-full bg-kid-yellow opacity-90 shadow-lg sm:h-20 sm:w-20" />
        <div className="float-slower absolute right-[12%] top-24 h-12 w-12 rotate-12 rounded-2xl bg-kid-pink opacity-90 shadow-lg sm:h-16 sm:w-16" />
        <div className="float-slow absolute left-[20%] bottom-16 h-10 w-10 rounded-full bg-kid-green opacity-80 sm:h-14 sm:w-14" />
        <div className="float-slower absolute right-[20%] bottom-10 h-14 w-14 -rotate-12 rounded-2xl bg-kid-orange opacity-80 sm:h-20 sm:w-20" />
        <div className="absolute right-[35%] top-8 h-8 w-8 rounded-full bg-white opacity-20" />
      </div>

      {/* Nav bar */}
      <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="rounded-2xl bg-white px-4 py-2 shadow-md">
          <KidroveLogo className="h-7 w-auto md:h-9" />
        </div>
        <button
          onClick={onEnrollClick}
          className="wiggle-on-hover rounded-full bg-kid-yellow px-5 py-2.5 text-sm font-bold text-gray-900 shadow-md transition hover:shadow-lg"
        >
          Enroll Now
        </button>
      </nav>

      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-8 sm:pb-28 sm:pt-12">
        <div className="max-w-2xl">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-bold text-white backdrop-blur-sm">
            <span className="flex h-2.5 w-2.5 rounded-full bg-kid-yellow animate-pulse" aria-hidden="true" />
            ✨ Enrollment Open · Starts 15 July 2026
          </span>

          <h1 className="font-display mt-3 text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
            {WORKSHOP_TITLE}
          </h1>

          <p className="font-display mt-5 text-xl text-yellow-200 sm:text-2xl">
            {WORKSHOP_TAGLINE}
          </p>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-blue-100">
            {WORKSHOP_DESCRIPTION}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={onEnrollClick}
              className="font-display inline-flex items-center gap-2 rounded-full bg-kid-orange px-8 py-4 text-lg font-bold text-white shadow-lg shadow-kid-orange/40 transition-all hover:-translate-y-1 hover:rotate-1 hover:shadow-xl"
            >
              Enroll Now
            </button>
            <a
              href="#details"
              className="font-display inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-8 py-4 text-lg font-bold text-white transition hover:bg-white/10"
            >
              Learn More
            </a>
          </div>

          {/* Quick stats as friendly badges */}
          <div className="mt-10 flex flex-wrap gap-3">
            {[
              { stat: "8–14 yrs", emoji: "🧒" },
              { stat: "4 Weeks", emoji: "📅" },
              { stat: "Online", emoji: "💻" },
              { stat: "₹2,999", emoji: "🎟️" },
            ].map((item) => (
              <div
                key={item.stat}
                className="flex items-center gap-2 rounded-2xl bg-white/15 px-4 py-2.5 backdrop-blur-sm"
              >
                <span className="text-lg" aria-hidden="true">{item.emoji}</span>
                <span className="font-display text-sm font-bold text-white">{item.stat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wavy bottom edge for a friendly transition into the next section */}
      <svg
        className="relative block w-full"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        style={{ height: "50px" }}
        aria-hidden="true"
      >
        <path
          d="M0,40 C240,90 480,0 720,30 C960,60 1200,10 1440,40 L1440,80 L0,80 Z"
          fill="var(--color-cream)"
        />
      </svg>
    </section>
  );
}
