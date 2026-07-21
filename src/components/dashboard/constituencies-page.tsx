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
import { upConstituencyIndex } from "@/data/uttar-pradesh/constituencies";

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
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const election = { daysToGo: 216, title: "Uttar Pradesh Assembly 2027" };

  return (
    <div className="dash-shell flex min-h-screen">
      <div className="sticky top-0 hidden h-screen lg:block">
        <DashboardSidebar
          electionDays={election.daysToGo}
          electionTitle={election.title}
        />
      </div>
      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-brand">
              Uttar Pradesh · State map
            </p>
            <h1 className="font-display mt-1 text-3xl font-bold text-ink">
              Constituencies
            </h1>
            <p className="mt-2 max-w-xl text-sm text-ink-muted">
              Zoomed to UP — pin a theatre below or from the state map. India
              overview stays on the main dashboard.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 self-start rounded-xl border border-white/80 bg-white/55 px-3.5 py-2.5 text-sm font-semibold text-brand shadow-sm backdrop-blur-md transition hover:bg-white/85"
          >
            India map
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <article className="dash-card dash-hero mt-6 overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative min-h-[340px] overflow-hidden bg-gradient-to-br from-[#dff3eb] via-[#f4fbf8] to-[#e3f6f8] p-2 sm:min-h-[400px] sm:p-3">
              <div className="pointer-events-none absolute -left-10 top-8 h-40 w-40 rounded-full bg-brand/15 blur-3xl" />
              <div className="pointer-events-none absolute -right-8 bottom-10 h-44 w-44 rounded-full bg-teal/20 blur-3xl" />
              <UpStateTheatreMap
                selectedSlug={selectedSlug}
                onSelect={setSelectedSlug}
              />
            </div>

            <div className="relative z-[1] flex flex-col border-t border-brand/8 p-5 sm:p-6 lg:border-l lg:border-t-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
                Flagship theatres
              </p>
              <h2 className="font-display mt-1 text-lg font-bold text-ink">
                Click a pin or card
              </h2>
              <p className="mt-1 text-sm text-ink-muted">
                Five curated UP seats spanning live ops, capital, pilgrim belt,
                western swing, and NCR.
              </p>
              <ul className="mt-4 flex-1 space-y-2">
                {upConstituencyIndex.map((t) => (
                  <li key={t.slug}>
                    <button
                      type="button"
                      onClick={() => setSelectedSlug(t.slug)}
                      className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left text-sm transition ${
                        selectedSlug === t.slug
                          ? "border-brand/25 bg-brand-soft/80 shadow-sm"
                          : "border-white/70 bg-white/45 hover:bg-white/75"
                      }`}
                    >
                      <span>
                        <span className="font-bold text-ink">{t.name}</span>
                        <span className="text-ink-muted"> · {t.district}</span>
                      </span>
                      <span className="text-xs font-bold text-brand">
                        {t.lastWinner}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              {selectedSlug && (
                <Link
                  href={`/dashboard/constituencies/${selectedSlug}`}
                  className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-dark to-brand px-4 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(5,107,82,0.28)]"
                >
                  Open selected theatre
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </article>

        <div className="stagger-in mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {upConstituencyIndex.map((t) => (
            <Link
              key={t.slug}
              href={`/dashboard/constituencies/${t.slug}`}
              onMouseEnter={() => setSelectedSlug(t.slug)}
              className={`dash-card group relative overflow-hidden p-5 transition hover:-translate-y-1 ${
                selectedSlug === t.slug
                  ? "ring-2 ring-brand/30"
                  : ""
              }`}
            >
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-30 blur-2xl"
                style={{ backgroundColor: t.accent }}
              />
              <div className="relative z-[1] flex items-start justify-between gap-2">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-sm"
                  style={{
                    background: `linear-gradient(135deg, ${t.accent}, #045c47)`,
                  }}
                >
                  {t.badge === "Live" ? (
                    <Radio className="h-5 w-5" />
                  ) : (
                    <MapPinned className="h-5 w-5" />
                  )}
                </span>
                {t.badge && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                      t.badge === "Live"
                        ? "bg-brand text-white"
                        : "bg-white/70 text-brand"
                    }`}
                  >
                    {t.badge}
                  </span>
                )}
              </div>

              <h2 className="relative z-[1] font-display mt-4 text-xl font-bold text-ink">
                {t.name}
              </h2>
              <p className="relative z-[1] text-xs font-semibold text-ink-muted">
                {t.district} · Uttar Pradesh
              </p>
              <p className="relative z-[1] mt-2 text-sm leading-relaxed text-ink-muted">
                {t.summary}
              </p>

              <div className="relative z-[1] mt-4 grid grid-cols-2 gap-2 text-[11px] font-semibold">
                <div className="rounded-xl border border-white/70 bg-white/45 px-2.5 py-2">
                  <p className="text-ink-muted">Voters</p>
                  <p className="mt-0.5 text-ink">{t.voters}</p>
                </div>
                <div className="rounded-xl border border-white/70 bg-white/45 px-2.5 py-2">
                  <p className="text-ink-muted">Last result</p>
                  <p className="mt-0.5 text-ink">
                    {t.lastWinner}{" "}
                    <span className="text-brand">{t.margin}</span>
                  </p>
                </div>
              </div>

              <div className="relative z-[1] mt-3 flex flex-wrap items-center gap-2 text-[11px] font-bold">
                <span
                  className={`rounded-md px-1.5 py-0.5 ${swingTone[t.swing]}`}
                >
                  {t.swing} swing
                </span>
                <span
                  className={`inline-flex items-center gap-1 ${moodTone[t.mood]}`}
                >
                  <Thermometer className="h-3 w-3" />
                  {t.mood}
                </span>
                <span className="inline-flex items-center gap-1 text-ink-muted">
                  <ShieldAlert className="h-3 w-3" />
                  {t.risk} risk
                </span>
              </div>

              <span className="relative z-[1] mt-5 inline-flex items-center gap-1 text-sm font-bold text-brand transition group-hover:gap-2">
                Open theatre
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
