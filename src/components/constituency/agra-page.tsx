"use client";

import { useState } from "react";
import {
  Bell,
  Bot,
  Menu,
  Search,
  Settings2,
  X,
} from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { ConstituencyHeatMap } from "@/components/constituency/heat-map";
import { ConstituencyProfileCard } from "@/components/constituency/profile-card";
import { LatestNewsCard } from "@/components/constituency/news-card";
import { GroundSignalsCard } from "@/components/constituency/ground-signals";
import { KeyIssuesCard } from "@/components/constituency/key-issues";
import { AiBriefCard } from "@/components/constituency/ai-brief-card";
import { StrategicBriefCard } from "@/components/constituency/strategic-brief";
import { agraConstituency } from "@/data/uttar-pradesh/agra";

export function AgraConstituencyPage() {
  const data = agraConstituency;
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
            aria-label="Close menu"
            onClick={() => setMobileNav(false)}
          />
          <div className="relative h-full w-[280px] shadow-2xl">
            <DashboardSidebar
              electionDays={data.election.daysToGo}
              electionTitle={data.election.title}
            />
            <button
              type="button"
              className="absolute right-3 top-4 rounded-lg bg-white/80 p-2 text-ink"
              onClick={() => setMobileNav(false)}
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-brand/10 bg-white/80 px-4 py-3 backdrop-blur-xl lg:hidden">
          <button
            type="button"
            className="rounded-xl border border-brand/15 bg-white p-2 text-ink"
            onClick={() => setMobileNav(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <p className="font-display text-sm font-bold text-ink">Caesar</p>
          <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand">
            UP
          </span>
        </div>

        <header className="dash-header-glass border-b border-brand/8 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <p className="text-sm font-semibold text-brand">
                Welcome back, Nikhil
              </p>
              <h1 className="font-display mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                {data.name}, {data.state}
              </h1>
              <p className="mt-1 max-w-xl text-sm text-ink-muted">
                {data.summary}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <label className="relative min-w-[200px] flex-1 sm:max-w-xs">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
                <input
                  placeholder="Search anything..."
                  className="w-full rounded-xl border border-brand/12 bg-white/90 py-2.5 pl-10 pr-3 text-sm outline-none ring-brand/25 focus:ring-2"
                />
              </label>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-brand/15 bg-white px-3.5 py-2.5 text-sm font-semibold text-ink shadow-sm"
              >
                <Bot className="h-4 w-4 text-[#2563eb]" />
                AI Assistant
              </button>
              <button
                type="button"
                className="relative rounded-xl border border-brand/15 bg-white p-2.5 text-ink shadow-sm"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-coral" />
              </button>
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-brand/15 bg-brand-soft font-display text-xs font-bold text-brand-dark">
                NV
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-brand/15 bg-white px-3.5 py-2.5 text-sm font-semibold text-ink-muted shadow-sm"
              >
                <Settings2 className="h-4 w-4" />
                Customize
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 space-y-5 px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
          <div className="grid gap-5 xl:grid-cols-[1.35fr_0.75fr_0.85fr]">
            <ConstituencyHeatMap
              title={`${data.name} · booth strength map`}
              zones={[...data.mapZones]}
              defaultZoneId="agra-city"
            />
            <ConstituencyProfileCard items={[...data.profile]} />
            <LatestNewsCard news={data.news} />
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            <GroundSignalsCard
              title={`${data.name} — Ground Signals`}
              signals={data.groundSignals}
            />
            <KeyIssuesCard issues={data.keyIssues} />
            <AiBriefCard teaser={data.aiBriefTeaser} />
          </div>

          <StrategicBriefCard brief={data.strategicBrief} />
        </main>
      </div>
    </div>
  );
}
