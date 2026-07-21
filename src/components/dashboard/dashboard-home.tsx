"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, MapPin, Sparkles } from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { AiInsightBanner } from "@/components/dashboard/ai-insight-banner";
import { BreakingTicker } from "@/components/dashboard/breaking-ticker";
import { ConstituencyMapCard } from "@/components/dashboard/constituency-map-card";
import { GlancePanel } from "@/components/dashboard/glance-panel";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { SuccessToast } from "@/components/dashboard/ui-states";

export function DashboardHome() {
  const [mobileNav, setMobileNav] = useState(false);
  const [briefToast, setBriefToast] = useState<string | null>(null);
  const [briefLoading, setBriefLoading] = useState(false);

  useEffect(() => {
    if (!briefToast) return;
    const t = window.setTimeout(() => setBriefToast(null), 3200);
    return () => window.clearTimeout(t);
  }, [briefToast]);

  function headerBrief() {
    if (briefLoading) return;
    setBriefLoading(true);
    window.setTimeout(() => {
      setBriefLoading(false);
      setBriefToast("UP five-theatre brief queued — check Briefs.");
    }, 1100);
  }

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

        <header className="dash-header-glass border-b border-brand/8 px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold text-brand">
                Welcome back, Nikhil
              </p>
              <h1 className="font-display mt-0.5 text-2xl font-bold tracking-tight text-ink">
                Intelligence Dashboard
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-white/80 bg-white/55 px-3 py-2 text-sm font-semibold text-ink shadow-sm backdrop-blur-md"
              >
                <MapPin className="h-4 w-4 text-brand" />
                Uttar Pradesh · 5 theatres
                <ChevronDown className="h-4 w-4 text-ink-muted" />
              </button>
              <button
                type="button"
                onClick={headerBrief}
                disabled={briefLoading}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-dark to-brand px-4 py-2 text-sm font-bold text-white shadow-[0_8px_22px_rgba(5,107,82,0.3)] transition hover:brightness-105 disabled:opacity-70"
              >
                <Sparkles
                  className={`h-4 w-4 ${briefLoading ? "animate-pulse" : ""}`}
                />
                {briefLoading ? "Generating…" : "Generate Brief"}
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 space-y-4 px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
          <BreakingTicker />

          <div className="grid gap-4 xl:grid-cols-[1.7fr_0.55fr]">
            <ConstituencyMapCard />
            <div className="dash-quiet">
              <GlancePanel />
            </div>
          </div>

          <div className="dash-quiet">
            <AiInsightBanner />
          </div>

          <div className="dash-quiet">
            <QuickActions />
          </div>

          <p className="pb-2 text-center text-[11px] text-ink-muted">
            Need a module? Jump to{" "}
            <Link href="/dashboard/alerts" className="font-bold text-brand">
              Alerts
            </Link>
            ,{" "}
            <Link href="/dashboard/media" className="font-bold text-brand">
              Media
            </Link>
            , or{" "}
            <Link href="/dashboard/campaign" className="font-bold text-brand">
              Campaign
            </Link>
            .
          </p>
        </main>
      </div>

      {briefToast && (
        <SuccessToast
          message={briefToast}
          onDismiss={() => setBriefToast(null)}
        />
      )}
    </div>
  );
}
