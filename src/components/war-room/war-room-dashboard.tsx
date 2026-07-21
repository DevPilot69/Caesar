import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  FileSearch,
  MapPinned,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { Country, StateItem } from "@/lib/regions";
import { getTheatreIntel } from "@/lib/regions";

export function WarRoomDashboard({
  country,
  state,
}: {
  country: Country;
  state: StateItem;
}) {
  const intel = getTheatreIntel(state.slug, state.name);

  return (
    <main className="mx-auto max-w-[1180px] px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/#regions"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to theatres
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white/60 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-brand backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            Theatre live · Demo preview
          </div>
          <Link
            href="/dashboard"
            className="rounded-xl bg-gradient-to-r from-brand to-teal px-3.5 py-2 text-xs font-bold text-white shadow-sm"
          >
            Open Dashboard
          </Link>
        </div>
      </div>

      {/* Hero banner */}
      <section className="glass-premium overflow-hidden rounded-[28px]">
        <div className="relative h-44 sm:h-56">
          <Image
            src={state.image}
            alt={state.name}
            fill
            priority
            className="object-cover"
            sizes="1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/75">
              {country.flag} {country.name} · Intelligence theatre
            </p>
            <h1 className="font-display mt-1 text-3xl font-bold text-white sm:text-4xl">
              {state.name} War Room
            </h1>
            <p className="mt-2 max-w-xl text-sm text-white/80">
              Evidence-backed morning brief and strategy feed — humans decide,
              Caesar assists.
            </p>
          </div>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-2 gap-px border-t border-white/40 bg-white/20 sm:grid-cols-4">
          {[
            { label: "Constituency health", value: `${intel.health}` },
            { label: "Momentum", value: intel.momentum },
            { label: "Seats watched", value: String(intel.seatsAtRisk) },
            { label: "Evidence trail", value: "100%" },
          ].map((k) => (
            <div key={k.label} className="bg-white/50 px-4 py-4 backdrop-blur-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-muted">
                {k.label}
              </p>
              <p className="font-display mt-1 text-xl font-bold text-ink">
                {k.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.9fr]">
        {/* Morning brief */}
        <section className="glass-premium rounded-[24px] p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <h2 className="font-display text-lg font-bold text-ink">
                  Morning Brief
                </h2>
                <p className="text-xs text-ink-muted">
                  Generated in &lt;60s · ranked by confidence
                </p>
              </div>
            </div>
            <div className="hidden h-1 w-24 overflow-hidden rounded-full bg-brand-soft sm:block">
              <div className="shimmer-line h-full w-full" />
            </div>
          </div>

          <ul className="space-y-3">
            {intel.brief.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-white/70 bg-white/55 p-4 transition hover:bg-white/80"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-teal-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-teal">
                    {item.tag}
                  </span>
                  <span className="text-[10px] font-semibold text-ink-muted">
                    Confidence {item.confidence}%
                  </span>
                </div>
                <h3 className="mt-2 font-display text-sm font-bold text-ink">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
                  {item.detail}
                </p>
                <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-brand">
                  <FileSearch className="h-3.5 w-3.5" />
                  {item.source}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Strategy feed */}
        <section className="glass-premium rounded-[24px] p-5 sm:p-6">
          <div className="mb-5 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-[#8a6f2e]">
              <MapPinned className="h-4 w-4" />
            </span>
            <div>
              <h2 className="font-display text-lg font-bold text-ink">
                Strategy Feed
              </h2>
              <p className="text-xs text-ink-muted">
                Prioritized actions · evidence attached
              </p>
            </div>
          </div>

          <ul className="space-y-3">
            {intel.recs.map((rec) => (
              <li
                key={rec.title}
                className="rounded-2xl border border-white/70 bg-white/55 p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                      rec.priority === "High"
                        ? "bg-coral-soft text-coral"
                        : "bg-brand-soft text-brand"
                    }`}
                  >
                    {rec.priority}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-ink-muted" />
                </div>
                <h3 className="mt-2 font-display text-sm font-bold text-ink">
                  {rec.title}
                </h3>
                <p className="mt-1.5 text-xs text-ink-muted">{rec.evidence}</p>
                <button
                  type="button"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand"
                >
                  {rec.action}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-5 rounded-2xl border border-brand/15 bg-gradient-to-br from-brand-soft/80 to-teal-soft/50 p-4">
            <div className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <p className="text-xs leading-relaxed text-ink/80">
                <span className="font-semibold text-ink">Human gate.</span> No
                recommendation auto-executes. Accept, defer, or reject — outcomes
                feed the learning loop.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
