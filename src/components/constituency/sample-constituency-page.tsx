"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Menu,
  Radio,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { ConstituencyProfileCard } from "@/components/constituency/profile-card";
import { KeyIssuesCard } from "@/components/constituency/key-issues";
import type { SampleConstituency } from "@/data/uttar-pradesh/constituencies";

const boothTone = {
  Strong: "bg-brand-soft text-brand",
  Swing: "bg-accent-soft text-[#8a6f2e]",
  Watch: "bg-coral-soft text-coral",
} as const;

const sentimentTone = {
  Positive: "text-brand",
  Neutral: "text-ink-muted",
  Negative: "text-coral",
} as const;

export function SampleConstituencyPage({ data }: { data: SampleConstituency }) {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div className="dash-shell flex min-h-screen">
      <div className="sticky top-0 hidden h-screen lg:block">
        <DashboardSidebar
          electionDays={data.election.daysToGo}
          electionTitle={data.election.title}
        />
      </div>

      {mobileNav && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            aria-label="Close"
            onClick={() => setMobileNav(false)}
          />
          <div className="relative h-full w-[280px] shadow-2xl">
            <DashboardSidebar
              electionDays={data.election.daysToGo}
              electionTitle={data.election.title}
            />
            <button
              type="button"
              className="absolute right-3 top-4 rounded-lg bg-white/90 p-2"
              onClick={() => setMobileNav(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-brand/10 bg-white/55 px-4 py-3 backdrop-blur-xl lg:hidden">
          <button
            type="button"
            className="rounded-xl border border-white/70 bg-white/70 p-2"
            onClick={() => setMobileNav(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <p className="font-display text-sm font-bold">Caesar</p>
          <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-bold text-brand">
            Sample
          </span>
        </div>

        <header className="dash-header-glass border-b border-brand/8 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/dashboard/constituencies"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All constituencies
          </Link>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  {data.name}
                </h1>
                <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand">
                  Sample theatre
                </span>
              </div>
              <p className="mt-1.5 flex flex-wrap items-center gap-1.5 text-sm text-ink-muted">
                {data.summary}
                <span className="text-brand/40">·</span>
                <span className="inline-flex items-center gap-1 font-semibold text-brand">
                  <MapPin className="h-3.5 w-3.5" />
                  {data.district}, {data.state}
                </span>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/dashboard/voter-insights"
                className="inline-flex items-center gap-2 rounded-xl border border-white/80 bg-white/55 px-3.5 py-2.5 text-sm font-semibold shadow-sm backdrop-blur-md transition hover:bg-white/85"
              >
                <Radio className="h-4 w-4 text-brand" />
                Voter Insights
              </Link>
              <Link
                href="/dashboard/briefs"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-dark to-brand px-4 py-2.5 text-sm font-bold text-white shadow-[0_8px_22px_rgba(5,107,82,0.3)]"
              >
                <Zap className="h-4 w-4 fill-current" />
                Generate Brief
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 space-y-5 px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
          <div className="stagger-in grid gap-5 xl:grid-cols-[0.95fr_1.15fr]">
            <ConstituencyProfileCard items={data.profile} />

            <article className="dash-card p-5">
              <h3 className="relative z-[1] font-display text-base font-bold text-ink">
                Booth Heat Snapshot
              </h3>
              <ul className="relative z-[1] mt-4 grid gap-2 sm:grid-cols-2">
                {data.booths.map((b) => (
                  <li
                    key={b.name}
                    className="flex items-center justify-between rounded-xl border border-white/70 bg-white/40 px-3 py-2.5 backdrop-blur-sm"
                  >
                    <span className="text-sm font-semibold text-ink">{b.name}</span>
                    <span
                      className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${boothTone[b.status]}`}
                    >
                      {b.status}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className="stagger-in grid gap-5 lg:grid-cols-2">
            <KeyIssuesCard issues={data.keyIssues} />

            <article className="dash-card p-5">
              <h3 className="relative z-[1] font-display text-base font-bold text-ink">
                Ground Signals
              </h3>
              <ul className="relative z-[1] mt-4 space-y-2.5">
                {data.signals.map((s) => (
                  <li
                    key={s.id}
                    className="rounded-xl border border-white/70 bg-white/40 px-3 py-3 backdrop-blur-sm"
                  >
                    <div className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="font-semibold text-ink-muted">{s.source}</span>
                      <span className="text-ink-muted">{s.ago}</span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink/90">
                      {s.text}
                    </p>
                    <p
                      className={`mt-1.5 text-[11px] font-bold ${sentimentTone[s.sentiment]}`}
                    >
                      {s.sentiment}
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className="stagger-in grid gap-5 lg:grid-cols-[1.2fr_0.9fr]">
            <article className="dash-card p-5 sm:p-6">
              <div className="relative z-[1] flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-soft">
                  <Sparkles className="h-4 w-4 text-brand" />
                </span>
                <h3 className="font-display text-base font-bold text-ink">
                  AI Assisted Takeaways
                </h3>
              </div>
              <ul className="relative z-[1] mt-4 space-y-2.5">
                {data.takeaways.map((t) => (
                  <li
                    key={t}
                    className="flex gap-2.5 rounded-xl border border-white/50 bg-white/35 px-3 py-2.5 text-sm leading-relaxed text-ink/85"
                  >
                    <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                    {t}
                  </li>
                ))}
              </ul>
            </article>

            <article className="dash-card p-5 sm:p-6">
              <h3 className="relative z-[1] font-display text-base font-bold text-ink">
                Recommended Actions
              </h3>
              <ul className="relative z-[1] mt-4 space-y-2">
                {data.actions.map((a) => (
                  <li
                    key={a}
                    className="flex items-start gap-2 rounded-xl border border-brand/10 bg-brand-mist/50 px-3 py-2.5 text-sm font-semibold text-ink"
                  >
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    {a}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </main>
      </div>
    </div>
  );
}
