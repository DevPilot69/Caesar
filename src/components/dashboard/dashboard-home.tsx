"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { AiInsightBanner } from "@/components/dashboard/ai-insight-banner";
import { BreakingTicker } from "@/components/dashboard/breaking-ticker";
import { ConstituencyMapCard } from "@/components/dashboard/constituency-map-card";
import { GlancePanel } from "@/components/dashboard/glance-panel";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { ChevronDown, MapPin, Sparkles } from "lucide-react";

export function DashboardHome() {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div className="dash-shell flex min-h-screen">
      <div className="sticky top-0 hidden h-screen lg:block">
        <DashboardSidebar
          electionDays={216}
          electionTitle="Uttar Pradesh Assembly 2027"
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
              electionDays={216}
              electionTitle="Uttar Pradesh Assembly 2027"
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
            Live
          </span>
        </div>

        <header className="dash-header-glass flex flex-col gap-4 border-b border-brand/8 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-5">
          <div>
            <p className="text-sm font-semibold text-brand">
              Welcome back, Nikhil
            </p>
            <h1 className="font-display mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Intelligence Dashboard
            </h1>
            <p className="mt-1 text-sm text-ink-muted">
              Real insights. Timely intelligence. Smarter decisions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-brand/15 bg-white/80 px-3.5 py-2.5 text-sm font-semibold text-ink shadow-sm backdrop-blur-sm"
            >
              <MapPin className="h-4 w-4 text-brand" />
              Meerut, Uttar Pradesh
              <ChevronDown className="h-4 w-4 text-ink-muted" />
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-dark to-brand px-4 py-2.5 text-sm font-bold text-white shadow-[0_8px_22px_rgba(5,107,82,0.3)] transition hover:brightness-105"
            >
              <Sparkles className="h-4 w-4" />
              Generate Brief
            </button>
          </div>
        </header>

        <main className="flex-1 space-y-5 px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
          <div className="grid gap-5 xl:grid-cols-[1.45fr_0.7fr]">
            <ConstituencyMapCard />
            <GlancePanel />
          </div>

          <AiInsightBanner />
          <QuickActions />
          <BreakingTicker />
        </main>
      </div>
    </div>
  );
}
