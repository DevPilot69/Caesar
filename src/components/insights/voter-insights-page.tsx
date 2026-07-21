"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  Bot,
  Check,
  ChevronDown,
  Download,
  FileText,
  MapPin,
  Menu,
  Search,
  Sparkles,
  Users,
  X,
  Zap,
} from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import {
  AgeDonutChart,
  TurnoutBarChart,
  VoteShareTrendChart,
} from "@/components/insights/charts";
import { voterInsightsAgraNorth as data } from "@/data/uttar-pradesh/voter-insights";

const partyTone: Record<string, string> = {
  BJP: "bg-[#f59e0b]/15 text-[#b45309]",
  SP: "bg-[#ef4444]/15 text-[#b91c1c]",
  BSP: "bg-[#3b82f6]/15 text-[#1d4ed8]",
  OTH: "bg-slate-200/80 text-slate-600",
};

const swingTone = {
  "High Swing": "bg-coral-soft text-coral",
  "Medium Swing": "bg-accent-soft text-[#8a6f2e]",
} as const;

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 rounded-xl border border-white/80 bg-white/55 px-3 py-2 text-sm font-semibold text-ink shadow-[0_4px_16px_rgba(16,60,48,0.06)] backdrop-blur-md transition hover:bg-white/80"
      >
        <span className="text-[10px] font-bold uppercase tracking-wide text-ink-muted">
          {label}
        </span>
        {value}
        <ChevronDown
          className={`h-3.5 w-3.5 text-ink-muted transition ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-20"
            aria-label="Close"
            onClick={() => setOpen(false)}
          />
          <ul className="absolute left-0 top-[calc(100%+6px)] z-30 min-w-full overflow-hidden rounded-xl border border-white/80 bg-white/90 py-1 shadow-[0_16px_40px_rgba(16,60,48,0.14)] backdrop-blur-xl">
            {options.map((opt) => (
              <li key={opt}>
                <button
                  type="button"
                  className={`block w-full px-3 py-2 text-left text-sm font-semibold transition hover:bg-brand-soft ${
                    opt === value ? "bg-brand-mist text-brand-dark" : "text-ink"
                  }`}
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export function VoterInsightsPage() {
  const [mobileNav, setMobileNav] = useState(false);
  const [state, setState] = useState<string>(data.location.state);
  const [district, setDistrict] = useState<string>(data.location.district);
  const [constituency, setConstituency] = useState<string>(
    data.location.constituency,
  );
  const [briefState, setBriefState] = useState<"idle" | "generating" | "done">(
    "idle",
  );
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(t);
  }, [toast]);

  function generateBrief() {
    if (briefState === "generating") return;
    setBriefState("generating");
    window.setTimeout(() => {
      setBriefState("done");
      setToast("Election brief ready — Agra North demographics pack downloaded.");
      window.setTimeout(() => setBriefState("idle"), 1800);
    }, 1400);
  }

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
              className="absolute right-3 top-4 rounded-lg bg-white/90 p-2 backdrop-blur-sm"
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
            className="rounded-xl border border-white/70 bg-white/70 p-2 shadow-sm"
            onClick={() => setMobileNav(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <p className="font-display text-sm font-bold">Caesar</p>
          <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-bold text-brand">
            Insights
          </span>
        </div>

        <header className="dash-header-glass border-b border-brand/8 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div className="animate-float-in">
                <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  Voter Insights
                </h1>
                <p className="mt-1 flex flex-wrap items-center gap-1.5 text-sm text-ink-muted">
                  Historical trends & demographics
                  <span className="text-brand/40">·</span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-brand/12 bg-brand-soft/70 px-2 py-0.5 font-semibold text-brand">
                    <MapPin className="h-3.5 w-3.5" />
                    {constituency}, {state}
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <label className="relative min-w-[160px] flex-1 sm:max-w-[220px]">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
                  <input
                    placeholder="Search anything..."
                    className="w-full rounded-xl border border-white/80 bg-white/55 py-2.5 pl-10 pr-3 text-sm outline-none ring-brand/25 backdrop-blur-md transition focus:bg-white/85 focus:ring-2"
                  />
                </label>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/80 bg-white/55 px-3 py-2.5 text-sm font-semibold shadow-sm backdrop-blur-md transition hover:bg-white/85"
                >
                  <Bot className="h-4 w-4 text-[#2563eb]" />
                  AI Assistant
                </button>
                <button
                  type="button"
                  className="relative rounded-xl border border-white/80 bg-white/55 p-2.5 shadow-sm backdrop-blur-md transition hover:bg-white/85"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-coral px-1 text-[9px] font-bold text-white">
                    12
                  </span>
                </button>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-gradient-to-br from-brand-soft to-teal-soft text-xs font-bold text-brand-dark shadow-sm">
                  NV
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2">
                <FilterSelect
                  label="State"
                  value={state}
                  options={["Uttar Pradesh", "Punjab", "Maharashtra"]}
                  onChange={setState}
                />
                <FilterSelect
                  label="District"
                  value={district}
                  options={["Agra", "Lucknow", "Varanasi"]}
                  onChange={setDistrict}
                />
                <FilterSelect
                  label="Constituency"
                  value={constituency}
                  options={[
                    "Agra North",
                    "Lucknow Central",
                    "Varanasi Cantt",
                    "Gorakhpur Urban",
                    "Meerut South",
                    "Prayagraj West",
                    "Kanpur Cantt",
                    "Ghaziabad",
                  ]}
                  onChange={setConstituency}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={generateBrief}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-dark to-brand px-4 py-2.5 text-sm font-bold text-white shadow-[0_8px_22px_rgba(5,107,82,0.3)] transition hover:brightness-105"
                >
                  <Zap className="h-4 w-4 fill-current" />
                  {briefState === "generating" ? "Generating…" : "Generate Brief"}
                </button>
                <button
                  type="button"
                  onClick={() => setToast("Report exported as PDF.")}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/80 bg-white/55 px-3.5 py-2.5 text-sm font-semibold shadow-sm backdrop-blur-md transition hover:bg-white/85"
                >
                  <Download className="h-4 w-4" />
                  Export Report
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 space-y-5 px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
          <div className="stagger-in grid gap-5 xl:grid-cols-2">
            <div className="space-y-5">
              <article className="dash-card p-5">
                <div className="relative z-[1] flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-base font-bold text-ink">
                      Vote Share Trends
                    </h3>
                    <p className="text-xs text-ink-muted">2012 · 2017 · 2022</p>
                  </div>
                  <span className="rounded-full bg-brand-soft/80 px-2 py-0.5 text-[10px] font-bold text-brand">
                    Live series
                  </span>
                </div>
                <div className="relative z-[1] mt-3">
                  <VoteShareTrendChart
                    years={data.voteShareTrends.years}
                    series={data.voteShareTrends.series}
                  />
                </div>
              </article>

              <div className="grid gap-5 sm:grid-cols-2">
                <article className="dash-card p-5">
                  <h3 className="relative z-[1] font-display text-base font-bold text-ink">
                    Previous Winners
                  </h3>
                  <div className="relative z-[1] mt-3 overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-[10px] uppercase tracking-wide text-ink-muted">
                          <th className="pb-2 font-bold">Year</th>
                          <th className="pb-2 font-bold">Winner</th>
                          <th className="pb-2 font-bold">Party</th>
                          <th className="pb-2 font-bold">Margin</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand/8">
                        {data.previousWinners.map((r) => (
                          <tr key={r.year} className="transition hover:bg-white/40">
                            <td className="py-2.5 font-semibold text-ink">
                              {r.year}
                            </td>
                            <td className="py-2.5 text-ink/85">{r.winner}</td>
                            <td className="py-2.5">
                              <span
                                className={`rounded-md px-1.5 py-0.5 font-bold ${partyTone[r.party] ?? partyTone.OTH}`}
                              >
                                {r.party}
                              </span>
                            </td>
                            <td className="py-2.5 font-bold text-brand">
                              {r.margin}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </article>

                <article className="dash-card p-5">
                  <h3 className="relative z-[1] font-display text-base font-bold text-ink">
                    Turnout History
                  </h3>
                  <div className="relative z-[1]">
                    <TurnoutBarChart data={data.turnoutHistory} />
                  </div>
                </article>
              </div>

              <article className="dash-card p-5">
                <h3 className="relative z-[1] font-display text-base font-bold text-ink">
                  Swing Analysis
                </h3>
                <ul className="relative z-[1] mt-3 grid gap-2 sm:grid-cols-2">
                  {data.swingAnalysis.map((s) => (
                    <li
                      key={s.segment}
                      className="flex items-center justify-between rounded-xl border border-white/70 bg-white/40 px-3 py-2.5 backdrop-blur-sm transition hover:bg-white/65"
                    >
                      <span className="text-sm font-semibold text-ink">
                        {s.segment}
                      </span>
                      <span
                        className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${swingTone[s.level]}`}
                      >
                        {s.level}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="relative z-[1] mt-3 rounded-xl border border-brand/10 bg-gradient-to-r from-brand-soft/80 to-teal-soft/50 px-3 py-2.5 text-xs font-semibold text-brand-dark">
                  Overall swing in 2022 vs 2017: {data.overallSwing}
                </p>
              </article>
            </div>

            <div className="space-y-5">
              <article className="dash-card p-5">
                <h3 className="relative z-[1] font-display text-base font-bold text-ink">
                  Age Groups
                </h3>
                <div className="relative z-[1] mt-4">
                  <AgeDonutChart
                    segments={data.ageGroups}
                    centerLabel="Total Voters"
                    centerValue={data.totalVoters}
                  />
                </div>
              </article>

              <article className="dash-card p-5">
                <h3 className="relative z-[1] font-display text-base font-bold text-ink">
                  Religion / Community Clusters
                </h3>
                <ul className="relative z-[1] mt-4 space-y-3.5">
                  {data.communities.map((c, i) => (
                    <li key={c.label}>
                      <div className="mb-1.5 flex justify-between text-xs">
                        <span className="font-semibold text-ink">{c.label}</span>
                        <span className="font-bold text-brand">{c.percent}%</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full border border-white/60 bg-white/35">
                        <div
                          className="bar-grow h-full rounded-full bg-gradient-to-r from-brand via-brand-light to-teal"
                          style={{
                            width: `${c.percent}%`,
                            animationDelay: `${0.2 + i * 0.08}s`,
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </article>

              <div className="grid gap-4 sm:grid-cols-2">
                <article className="dash-card p-4">
                  <div className="relative z-[1] flex items-center gap-2 text-brand">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-soft">
                      <Users className="h-4 w-4" />
                    </span>
                    <h3 className="text-xs font-bold uppercase tracking-wide">
                      Women Voters
                    </h3>
                  </div>
                  <p className="relative z-[1] font-display mt-3 text-2xl font-bold text-ink">
                    {data.womenVoters.count}
                  </p>
                  <p className="relative z-[1] text-xs text-ink-muted">
                    {data.womenVoters.share} of total
                  </p>
                  <p className="relative z-[1] mt-2 inline-flex rounded-md bg-brand-soft px-1.5 py-0.5 text-[11px] font-bold text-brand">
                    {data.womenVoters.note}
                  </p>
                </article>
                <article className="dash-card p-4">
                  <div className="relative z-[1] flex items-center gap-2 text-teal">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-soft">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    <h3 className="text-xs font-bold uppercase tracking-wide">
                      Youth (18–25)
                    </h3>
                  </div>
                  <p className="relative z-[1] font-display mt-3 text-2xl font-bold text-ink">
                    {data.youthVoters.count}
                  </p>
                  <p className="relative z-[1] text-xs text-ink-muted">
                    {data.youthVoters.share} of total
                  </p>
                  <span className="relative z-[1] mt-2 inline-flex rounded-md bg-teal-soft px-1.5 py-0.5 text-[10px] font-bold text-teal">
                    {data.youthVoters.note}
                  </span>
                </article>
              </div>

              <article className="dash-card p-5">
                <h3 className="relative z-[1] font-display text-base font-bold text-ink">
                  Urban / Rural Split
                </h3>
                <div className="relative z-[1] mt-4 h-4 overflow-hidden rounded-full border border-white/70 bg-white/35 p-0.5 backdrop-blur-sm">
                  <div className="flex h-full overflow-hidden rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-teal to-[#2ec4b6] transition-all duration-700"
                      style={{ width: `${data.urbanRural.urban.percent}%` }}
                    />
                    <div
                      className="h-full bg-gradient-to-r from-brand to-brand-dark transition-all duration-700"
                      style={{ width: `${data.urbanRural.rural.percent}%` }}
                    />
                  </div>
                </div>
                <div className="relative z-[1] mt-3 flex justify-between text-xs font-semibold">
                  <span className="inline-flex items-center gap-1.5 text-teal">
                    <span className="h-2 w-2 rounded-full bg-teal" />
                    Urban {data.urbanRural.urban.percent}% ·{" "}
                    {data.urbanRural.urban.count}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-brand">
                    <span className="h-2 w-2 rounded-full bg-brand" />
                    Rural {data.urbanRural.rural.percent}% ·{" "}
                    {data.urbanRural.rural.count}
                  </span>
                </div>
              </article>
            </div>
          </div>

          <div className="stagger-in grid gap-5 lg:grid-cols-[1.35fr_0.9fr]">
            <article className="dash-card relative overflow-hidden p-5 sm:p-6">
              <div className="pointer-events-none absolute -right-8 bottom-0 h-36 w-36 rounded-full bg-brand/15 blur-3xl" />
              <FileText className="pointer-events-none absolute bottom-4 right-6 h-24 w-24 text-brand/10" />
              <div className="relative z-[1] flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-soft">
                  <Sparkles className="h-4 w-4 text-brand" />
                </span>
                <h3 className="font-display text-base font-bold text-ink">
                  AI Assisted Insights
                </h3>
              </div>
              <ul className="relative z-[1] mt-4 space-y-2.5">
                {data.aiInsights.map((insight) => (
                  <li
                    key={insight}
                    className="flex gap-2.5 rounded-xl border border-white/50 bg-white/35 px-3 py-2.5 text-sm leading-relaxed text-ink/85 backdrop-blur-sm"
                  >
                    <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                    {insight}
                  </li>
                ))}
              </ul>
            </article>

            <article className="relative overflow-hidden rounded-[1.2rem] bg-gradient-to-br from-brand-dark via-brand to-teal p-5 text-white shadow-[0_18px_48px_rgba(5,107,82,0.35)] sm:p-6">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-24 w-24 rounded-full bg-accent/20 blur-2xl" />
              <div className="relative mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="relative font-display text-lg font-bold">
                Generate Election Brief
              </h3>
              <p className="relative mt-2 text-sm text-white/80">
                Download a PDF with historical summary, demographics, swing
                segments, and recommended outreach for {constituency}.
              </p>
              <ul className="relative mt-4 space-y-1.5">
                {data.briefChecklist.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-xs font-semibold text-white/90"
                  >
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20">
                      <Check className="h-2.5 w-2.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={generateBrief}
                disabled={briefState === "generating"}
                className="relative mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-brand-dark shadow-sm transition hover:bg-brand-soft disabled:opacity-70"
              >
                {briefState === "done" ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                {briefState === "generating"
                  ? "Building brief…"
                  : briefState === "done"
                    ? "Brief ready"
                    : "Generate Brief & Download"}
              </button>
            </article>
          </div>
        </main>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-2xl border border-white/80 bg-ink/90 px-4 py-3 text-sm font-semibold text-white shadow-2xl backdrop-blur-xl animate-float-in">
          <Check className="h-4 w-4 text-brand-light" />
          {toast}
        </div>
      )}
    </div>
  );
}
