import Link from "next/link";
import { ArrowRight, Activity } from "lucide-react";
import { DottedWorldMap } from "@/components/landing/dotted-world-map";

const trustChips = [
  "Evidence-backed",
  "Constituency memory",
  "Human in control",
];

export function HeroSection() {
  return (
    <section className="relative mx-auto max-w-[1280px] px-4 pb-6 pt-8 sm:px-6 lg:px-10 lg:pb-8 lg:pt-12">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.18fr)] lg:gap-12">
        <div className="animate-float-in relative z-[1] max-w-xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white/55 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-brand shadow-sm backdrop-blur-sm">
            <Activity className="h-3.5 w-3.5" />
            AI Assisted Political Intelligence
          </p>

          <h1 className="font-display text-[2.55rem] font-bold leading-[1.02] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            Know First.
            <br />
            Act Fast.
            <span className="text-gradient mt-1 block">Win Every Battle.</span>
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-ink-muted sm:text-[1.05rem]">
            Caesar turns fragmented political signals into evidence-backed
            strategy — so your war room decides with clarity, not noise.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#regions"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand to-teal px-5 py-3 text-sm font-bold text-white shadow-[0_10px_28px_rgba(10,143,108,0.35)] transition hover:brightness-105"
            >
              Choose your theatre
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/login"
              className="inline-flex items-center rounded-xl border border-brand/25 bg-white/55 px-5 py-3 text-sm font-bold text-brand backdrop-blur-sm transition hover:bg-brand-soft"
            >
              Login
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2">
            {trustChips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-white/70 bg-white/50 px-3 py-1.5 text-xs font-semibold text-ink/80 shadow-sm backdrop-blur-sm"
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative min-h-[260px] w-full sm:min-h-[340px] lg:min-h-[400px]">
          <DottedWorldMap />
        </div>
      </div>
    </section>
  );
}
