"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  MapPinned,
  Radio,
  ShieldAlert,
  Thermometer,
} from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { UpStateTheatreMap } from "@/components/dashboard/up-state-theatre-map";
import { PunjabStateTheatreMap } from "@/components/dashboard/punjab-state-theatre-map";
import { useStatePack } from "@/lib/use-state-pack";

const swingTone = {
  High: "bg-coral-soft text-coral",
  Medium: "bg-accent-soft text-[#8a6f2e]",
  Low: "bg-brand-soft text-brand",
} as const;

const moodTone = {
  Stable: "text-brand",
  Heating: "text-[#8a6f2e]",
  Volatile: "text-coral",
} as const;

export function ConstituenciesPage() {
  const pack = useStatePack();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const isPb = pack.code === "PB";

  return (
    <div className="dash-shell flex min-h-screen">
      <div className="sticky top-0 hidden h-screen lg:block">
        <DashboardSidebar
          electionDays={pack.meta.election.daysToGo}
          electionTitle={pack.meta.election.title}
        />
      </div>
      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-brand">
              {pack.state.name}
            </p>
            <h1 className="font-display mt-1 text-3xl font-bold text-ink">
              Constituencies
            </h1>
            <p className="mt-2 max-w-lg text-sm text-ink-muted">
              Five sample theatres on the state map. Select a pin or row.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 self-start rounded-xl border border-white/80 bg-white/55 px-3.5 py-2.5 text-sm font-semibold text-brand shadow-sm backdrop-blur-md transition hover:bg-white/85"
          >
            Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <article className="dash-card dash-hero mt-6 overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative min-h-[360px] overflow-hidden bg-gradient-to-br from-[#e8f6f0] via-[#f7fcfa] to-[#e3f6f8] p-3 sm:min-h-[420px]">
              {isPb ? (
                <PunjabStateTheatreMap
                  selectedSlug={selectedSlug}
                  onSelect={setSelectedSlug}
                />
              ) : (
                <UpStateTheatreMap
                  selectedSlug={selectedSlug}
                  onSelect={setSelectedSlug}
                />
              )}
            </div>

            <div className="relative z-[1] flex flex-col border-t border-brand/8 bg-white/35 p-5 sm:p-6 lg:border-l lg:border-t-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
                Theatres
              </p>
              <h2 className="font-display mt-1 text-lg font-bold text-ink">
                {pack.state.shortName} · 5 seats
              </h2>
              <ul className="mt-4 flex-1 space-y-2">
                {pack.constituencies.map((t) => (
                  <li key={t.slug}>
                    <button
                      type="button"
                      onClick={() => setSelectedSlug(t.slug)}
                      className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left text-sm transition ${
                        selectedSlug === t.slug
                          ? "border-brand/25 bg-brand-soft/80 shadow-sm"
                          : "border-white/70 bg-white/55 hover:bg-white/85"
                      }`}
                    >
                      <span>
                        <span className="font-bold text-ink">{t.name}</span>
                        <span className="text-ink-muted"> · {t.district}</span>
                      </span>
                      <span className="font-semibold text-brand">
                        {t.lastWinner}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>

        <div className="stagger-in mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {pack.constituencies.map((t) => (
            <article key={t.slug} className="dash-card p-4">
              <div className="relative z-[1] flex items-start justify-between gap-2">
                <div>
                  <p className="font-display text-base font-bold text-ink">
                    {t.name}
                  </p>
                  <p className="text-[11px] text-ink-muted">{t.district}</p>
                </div>
                {t.badge ? (
                  <span className="rounded-md bg-brand-mist px-1.5 py-0.5 text-[9px] font-bold uppercase text-brand">
                    {t.badge}
                  </span>
                ) : null}
              </div>
              <p className="relative z-[1] mt-2 line-clamp-3 text-[11px] leading-relaxed text-ink-muted">
                {t.summary}
              </p>
              <div className="relative z-[1] mt-3 flex flex-wrap gap-1.5 text-[10px] font-bold">
                <span className={`rounded-md px-1.5 py-0.5 ${swingTone[t.swing]}`}>
                  {t.swing} swing
                </span>
                <span className={moodTone[t.mood]}>{t.mood}</span>
              </div>
              <div className="relative z-[1] mt-3 flex items-center gap-3 text-[10px] font-semibold text-ink-muted">
                <span className="inline-flex items-center gap-1">
                  <Radio className="h-3 w-3 text-brand" />
                  {t.voters}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Thermometer className="h-3 w-3 text-brand" />
                  {t.risk}
                </span>
                <span className="inline-flex items-center gap-1">
                  <ShieldAlert className="h-3 w-3 text-brand" />
                  {t.margin}
                </span>
              </div>
              {!isPb && t.enabled ? (
                <Link
                  href={`/dashboard/constituencies/${t.slug}`}
                  className="relative z-[1] mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand"
                >
                  <MapPinned className="h-3.5 w-3.5" />
                  Open
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ) : (
                <p className="relative z-[1] mt-3 text-[10px] font-semibold text-ink-muted">
                  Punjab sample · detail pages next
                </p>
              )}
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
