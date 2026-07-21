"use client";

import { useState } from "react";
import {
  Bell,
  Bookmark,
  Bot,
  ChevronDown,
  Download,
  Menu,
  Search,
  Share2,
  X,
  Zap,
} from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { LiveGroundSignals } from "@/components/constituency/live-ground-signals";
import { EmotionalTemperature } from "@/components/constituency/emotional-temperature";
import { StrategicRecommendations } from "@/components/constituency/strategic-recommendations";
import { LiveAiBriefCard } from "@/components/constituency/live-ai-brief";
import { StrategicSummaryPlan } from "@/components/constituency/strategic-summary-plan";
import { AlertsWatchlist } from "@/components/constituency/alerts-watchlist";
import { agraNorthLive } from "@/data/uttar-pradesh/agra-north";

function FilterSelect({ label, value }: { label: string; value: string }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-xl border border-brand/12 bg-white px-3 py-2 text-sm font-semibold text-ink shadow-sm"
    >
      <span className="text-[10px] font-bold uppercase tracking-wide text-ink-muted">
        {label}
      </span>
      <span>{value}</span>
      <ChevronDown className="h-3.5 w-3.5 text-ink-muted" />
    </button>
  );
}

export function AgraNorthLivePage() {
  const data = agraNorthLive;
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
          <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold text-white">
            Live
          </span>
        </div>

        <header className="dash-header-glass border-b border-brand/8 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <p className="text-sm font-semibold text-brand">
                  Welcome back, {data.greetingName}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                    {data.name} Constituency
                  </h1>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    Live
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink-muted">
                  {data.district} District, {data.state}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <label className="relative min-w-[180px] flex-1 sm:max-w-[220px]">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
                  <input
                    placeholder="Search anything..."
                    className="w-full rounded-xl border border-brand/12 bg-white py-2.5 pl-10 pr-3 text-sm outline-none ring-brand/25 focus:ring-2"
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
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand/15 bg-brand-soft font-display text-xs font-bold text-brand-dark">
                  NV
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <FilterSelect label="State" value={data.filters.state} />
                <FilterSelect label="District" value={data.filters.district} />
                <FilterSelect
                  label="Constituency"
                  value={data.filters.constituency}
                />
                <button
                  type="button"
                  className="rounded-xl border border-brand/12 bg-white p-2.5 text-brand shadow-sm"
                  aria-label="Bookmark theatre"
                >
                  <Bookmark className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-dark to-brand px-4 py-2.5 text-sm font-bold text-white shadow-[0_8px_22px_rgba(5,107,82,0.3)]"
                >
                  <Zap className="h-4 w-4 fill-current" />
                  Generate Full Brief
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl border border-brand/15 bg-white px-3.5 py-2.5 text-sm font-semibold text-ink shadow-sm"
                >
                  <Download className="h-4 w-4" />
                  Export Report
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl border border-brand/15 bg-white px-3.5 py-2.5 text-sm font-semibold text-ink shadow-sm"
                >
                  <Share2 className="h-4 w-4" />
                  Share with Team
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 space-y-5 px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
          <div className="grid gap-5 xl:grid-cols-3">
            <LiveGroundSignals signals={data.groundSignals} />
            <EmotionalTemperature
              emotions={data.emotions}
              volatility={data.volatilityIndex}
            />
            <StrategicRecommendations items={data.recommendations} />
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.7fr_1.5fr_0.85fr]">
            <LiveAiBriefCard checklist={data.aiBriefChecklist} />
            <StrategicSummaryPlan plan={data.strategicPlan} />
            <AlertsWatchlist alerts={data.alerts} />
          </div>
        </main>
      </div>
    </div>
  );
}
