"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  Check,
  Download,
  FileText,
  Radio,
  Settings,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Minus,
} from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { CampaignBoard } from "@/components/dashboard/campaign-board";
import { SuccessToast } from "@/components/dashboard/ui-states";
import {
  alertsData,
  briefsData,
  campaignData,
  dashboardMeta,
  groundData,
  mediaData,
  oppositionData,
  productVoice,
  reportsData,
  settingsData,
  trendsData,
  type Sentiment,
  type Severity,
} from "@/data/uttar-pradesh/dashboard-modules";

const severityTone: Record<Severity, string> = {
  Critical: "bg-coral text-white",
  High: "bg-coral-soft text-coral",
  Medium: "bg-accent-soft text-[#8a6f2e]",
  Low: "bg-brand-soft text-brand",
};

const sentimentTone: Record<Sentiment, string> = {
  Positive: "text-brand",
  Neutral: "text-ink-muted",
  Negative: "text-coral",
};

const statusTone: Record<string, string> = {
  Open: "bg-coral-soft text-coral",
  Investigating: "bg-accent-soft text-[#8a6f2e]",
  Watching: "bg-teal-soft text-teal",
  Assigned: "bg-brand-soft text-brand",
  Ready: "bg-brand-soft text-brand",
  Draft: "bg-accent-soft text-[#8a6f2e]",
  Shared: "bg-teal-soft text-teal",
  "In progress": "bg-brand-soft text-brand",
  Scheduled: "bg-teal-soft text-teal",
  Queued: "bg-white/70 text-ink-muted",
  Published: "bg-brand-soft text-brand",
  Rising: "text-coral",
  Cooling: "text-brand",
  Watch: "text-[#8a6f2e]",
  Live: "bg-brand-soft text-brand",
  Batch: "bg-accent-soft text-[#8a6f2e]",
};

function Shell({
  title,
  subtitle,
  stats,
  insight,
  children,
}: {
  title: string;
  subtitle: string;
  stats: { label: string; value: string }[];
  insight?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="dash-shell flex min-h-screen">
      <div className="sticky top-0 hidden h-screen lg:block">
        <DashboardSidebar
          electionDays={dashboardMeta.election.daysToGo}
          electionTitle={dashboardMeta.election.title}
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="dash-header-glass border-b border-brand/8 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Dashboard
          </Link>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                {title}
              </h1>
              <p className="mt-1 text-sm text-ink-muted">{subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/80 bg-white/55 px-3 py-2 backdrop-blur-md"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wide text-ink-muted">
                    {s.label}
                  </p>
                  <p className="font-display text-lg font-bold text-ink">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </header>
        <main className="flex-1 space-y-4 px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
          {insight ? (
            <article className="dash-card relative overflow-hidden p-4 sm:p-5">
              <div className="pointer-events-none absolute -right-6 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-brand/15 blur-3xl" />
              <div className="relative z-[1] flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
                <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-brand/15 bg-white/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
                  <Sparkles className="h-3 w-3" />
                  {productVoice.assisted}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-relaxed text-ink/90">{insight}</p>
                  <p className="mt-2 text-[11px] font-semibold text-ink-muted">
                    Humans decide · {productVoice.tagline}
                  </p>
                </div>
              </div>
            </article>
          ) : null}
          {children}
        </main>
      </div>
    </div>
  );
}

function Spark({ series }: { series: number[] }) {
  const max = Math.max(...series);
  return (
    <div className="flex h-8 items-end gap-0.5">
      {series.map((v, i) => (
        <div
          key={i}
          className="w-1.5 rounded-sm bg-gradient-to-t from-brand-dark to-brand"
          style={{ height: `${Math.max(12, (v / max) * 100)}%` }}
        />
      ))}
    </div>
  );
}

function ConfidenceBadge({ value }: { value: number }) {
  return (
    <span className="rounded-md bg-brand-mist px-1.5 py-0.5 text-[10px] font-bold text-brand">
      {value}% conf
    </span>
  );
}

export function AlertsModulePage() {
  const d = alertsData;
  const rails: Severity[] = ["Critical", "High", "Medium", "Low"];
  const bySeverity = (s: Severity) => d.items.filter((i) => i.severity === s);

  return (
    <Shell title={d.title} subtitle={d.subtitle} stats={d.stats} insight={d.insight}>
      <div className="stagger-in grid gap-4 lg:grid-cols-4">
        {rails.map((sev) => {
          const items = bySeverity(sev);
          return (
            <section key={sev} className="dash-card flex min-h-[280px] flex-col p-3.5">
              <div className="relative z-[1] mb-3 flex items-center justify-between px-1">
                <span
                  className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${severityTone[sev]}`}
                >
                  {sev}
                </span>
                <span className="text-[11px] font-bold text-ink-muted">
                  {items.length}
                </span>
              </div>
              {items.length === 0 ? (
                <div className="relative z-[1] flex flex-1 items-center justify-center rounded-xl border border-dashed border-brand/15 bg-white/30 px-3 py-8 text-center text-xs text-ink-muted">
                  Clear — no {sev.toLowerCase()} alerts
                </div>
              ) : (
                <ul className="relative z-[1] flex-1 space-y-2">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="rounded-xl border border-white/70 bg-white/55 px-3 py-2.5 backdrop-blur-sm"
                    >
                      <div className="flex flex-wrap items-center gap-1.5">
                        <p className="text-[11px] font-semibold text-brand">
                          {item.theatre} · {item.ago}
                        </p>
                        <ConfidenceBadge value={item.confidence} />
                        <span className="text-[10px] font-semibold text-ink-muted">
                          {item.evidenceCount} evidence
                        </span>
                      </div>
                      <p className="mt-1 text-xs font-semibold leading-snug text-ink">
                        {item.title}
                      </p>
                      <p className="mt-1.5 line-clamp-1 text-[11px] text-ink-muted">
                        {item.why}
                      </p>
                      <p className="mt-1.5 text-[11px] font-semibold text-brand-dark">
                        Next · {item.nextAction}
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <span className="text-[10px] text-ink-muted">
                          {item.owner}
                        </span>
                        <span
                          className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${statusTone[item.status]}`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </Shell>
  );
}

export function BriefsModulePage() {
  const d = briefsData;
  const [toast, setToast] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(t);
  }, [toast]);

  function openBrief(id: string, title: string) {
    setBusyId(id);
    window.setTimeout(() => {
      setBusyId(null);
      setToast(`Opened — ${title}`);
    }, 900);
  }

  return (
    <>
      <Shell
        title={d.title}
        subtitle={d.subtitle}
        stats={d.stats}
        insight={d.insight}
      >
        <div className="stagger-in grid gap-4 md:grid-cols-2">
          {d.items.map((item) => (
            <article key={item.id} className="dash-card p-5">
              <div className="relative z-[1] flex items-start justify-between gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <FileText className="h-5 w-5" />
                </span>
                <div className="flex flex-wrap items-center justify-end gap-1.5">
                  <ConfidenceBadge value={item.confidence} />
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${statusTone[item.status]}`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
              <h3 className="relative z-[1] mt-3 font-display text-base font-bold text-ink">
                {item.title}
              </h3>
              <p className="relative z-[1] mt-1 text-xs leading-relaxed text-ink-muted">
                {item.summary}
              </p>
              <p className="relative z-[1] mt-2 text-[11px] font-semibold text-brand">
                {item.theatre} · {item.type} · {item.pages} pages ·{" "}
                {item.updated}
              </p>
              <p className="relative z-[1] mt-1 text-[11px] text-ink-muted">
                Audience · {item.audience}
              </p>
              <div className="relative z-[1] mt-3 flex flex-wrap gap-1.5">
                {item.sections.map((section) => (
                  <span
                    key={section}
                    className="rounded-md border border-brand/10 bg-white/60 px-1.5 py-0.5 text-[10px] font-semibold text-ink-muted"
                  >
                    {section}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => openBrief(item.id, item.title)}
                disabled={busyId === item.id}
                className="relative z-[1] mt-4 inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-dark to-brand px-3 py-2 text-xs font-bold text-white disabled:opacity-60"
              >
                <Download className="h-3.5 w-3.5" />
                {busyId === item.id ? "Opening…" : "Open brief"}
              </button>
            </article>
          ))}
        </div>
      </Shell>
      {toast && (
        <SuccessToast message={toast} onDismiss={() => setToast(null)} />
      )}
    </>
  );
}

export function CampaignModulePage() {
  const d = campaignData;
  return (
    <Shell title={d.title} subtitle={d.subtitle} stats={d.stats} insight={d.insight}>
      <CampaignBoard />
    </Shell>
  );
}

export function OppositionModulePage() {
  const d = oppositionData;
  return (
    <Shell title={d.title} subtitle={d.subtitle} stats={d.stats} insight={d.insight}>
      <div className="dash-card relative overflow-hidden p-5 sm:p-7">
        <div className="relative z-[1]">
          <ol className="space-y-0">
            {d.items.map((item, i) => (
              <li key={item.id} className="relative flex gap-4 pb-8 last:pb-0">
                <div className="flex w-10 flex-col items-center">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-sm ${
                      item.impact === "High" ? "bg-coral" : "bg-brand"
                    }`}
                  >
                    {item.party}
                  </span>
                  {i < d.items.length - 1 && (
                    <span className="mt-2 w-px flex-1 bg-gradient-to-b from-brand/40 to-transparent" />
                  )}
                </div>
                <div className="min-w-0 flex-1 rounded-2xl border border-white/70 bg-white/50 p-4 backdrop-blur-sm">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-semibold text-brand">{item.theatre}</span>
                    <span
                      className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                        item.impact === "High"
                          ? "bg-coral-soft text-coral"
                          : "bg-accent-soft text-[#8a6f2e]"
                      }`}
                    >
                      {item.impact} impact
                    </span>
                    <ConfidenceBadge value={item.confidence} />
                    <span className="text-ink-muted">Window · {item.window}</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-ink">{item.move}</p>
                  <p className="mt-1.5 text-xs italic text-ink-muted">
                    Narrative · {item.narrative}
                  </p>
                  <p className="mt-1.5 text-[11px] font-semibold text-coral">
                    Risk if ignored · {item.riskIfIgnored}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {item.evidence.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-md border border-brand/10 bg-white/60 px-1.5 py-0.5 text-[10px] font-semibold text-ink-muted"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2 rounded-xl bg-brand-mist/70 px-3 py-2 text-xs font-semibold text-brand-dark">
                    Counter · {item.counter}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Shell>
  );
}

export function MediaModulePage() {
  const d = mediaData;
  return (
    <Shell title={d.title} subtitle={d.subtitle} stats={d.stats} insight={d.insight}>
      <div className="stagger-in grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {d.items.map((item) => (
          <article key={item.id} className="dash-card overflow-hidden p-0">
            <div className="relative h-36 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
              <span
                className={`absolute left-3 top-3 rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                  item.sentiment === "Positive"
                    ? "bg-brand text-white"
                    : item.sentiment === "Negative"
                      ? "bg-coral text-white"
                      : "bg-white/90 text-ink"
                }`}
              >
                {item.sentiment}
              </span>
              <span className="absolute bottom-3 left-3 text-[11px] font-bold text-white">
                {item.source}
              </span>
              <span className="absolute bottom-3 right-3 rounded-md bg-ink/50 px-1.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                {item.confidence}%
              </span>
            </div>
            <div className="relative z-[1] p-4">
              <p className="text-[11px] font-semibold text-brand">
                {item.theatre} · {item.ago} · Reach {item.reach}
              </p>
              <h3 className="mt-1.5 text-sm font-semibold leading-snug text-ink">
                {item.headline}
              </h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {item.themes.map((theme) => (
                  <span
                    key={theme}
                    className="rounded-md border border-brand/10 bg-white/60 px-1.5 py-0.5 text-[10px] font-semibold text-ink-muted"
                  >
                    {theme}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-[11px] font-semibold text-brand-dark">
                Amplify · {item.amplify}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Shell>
  );
}

export function GroundModulePage() {
  const d = groundData;
  return (
    <Shell title={d.title} subtitle={d.subtitle} stats={d.stats} insight={d.insight}>
      <ul className="stagger-in space-y-3">
        {d.items.map((item) => (
          <li key={item.id} className="dash-card p-4 sm:p-5">
            <div className="relative z-[1]">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1 font-bold text-ink">
                  <Radio className="h-3.5 w-3.5 text-brand" />
                  {item.agent}
                </span>
                <span className="text-brand">{item.theatre}</span>
                <span className="text-ink-muted">{item.booth}</span>
                <span className="text-ink-muted">{item.ago}</span>
                <ConfidenceBadge value={item.confidence} />
                {item.verified && (
                  <span className="inline-flex items-center gap-0.5 rounded-md bg-brand-soft px-1.5 py-0.5 text-[10px] font-bold text-brand">
                    <Check className="h-3 w-3" />
                    Verified
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink/90">{item.text}</p>
              <p className="mt-1.5 text-[11px] text-ink-muted">
                Method · {item.method}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-brand/10 bg-white/60 px-1.5 py-0.5 text-[10px] font-semibold text-ink-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <p
                  className={`text-[11px] font-bold ${sentimentTone[item.sentiment]}`}
                >
                  {item.sentiment}
                </p>
                <p className="text-[11px] font-semibold text-brand">
                  Feeds · {item.feedsAlert}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

export function ReportsModulePage() {
  const d = reportsData;
  return (
    <Shell title={d.title} subtitle={d.subtitle} stats={d.stats} insight={d.insight}>
      <div className="stagger-in grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {d.items.map((item) => (
          <article key={item.id} className="dash-card p-5">
            <div className="relative z-[1] flex items-start justify-between gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <FileText className="h-5 w-5" />
              </span>
              <div className="flex flex-wrap items-center justify-end gap-1.5">
                <ConfidenceBadge value={item.confidence} />
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${statusTone[item.status]}`}
                >
                  {item.status}
                </span>
              </div>
            </div>
            <h3 className="relative z-[1] mt-3 font-display text-base font-bold text-ink">
              {item.title}
            </h3>
            <p className="relative z-[1] mt-1 text-xs text-ink-muted">
              {item.format} · {item.size} · {item.updated}
            </p>
            <p className="relative z-[1] mt-1 text-[11px] font-semibold text-brand">
              Audience · {item.audience}
            </p>
            <div className="relative z-[1] mt-3 flex flex-wrap gap-1.5">
              {item.covers.map((cover) => (
                <span
                  key={cover}
                  className="rounded-md border border-brand/10 bg-white/60 px-1.5 py-0.5 text-[10px] font-semibold text-ink-muted"
                >
                  {cover}
                </span>
              ))}
            </div>
            <button
              type="button"
              className="relative z-[1] mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-brand"
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </button>
          </article>
        ))}
      </div>
    </Shell>
  );
}

export function TrendsModulePage() {
  const d = trendsData;
  return (
    <Shell title={d.title} subtitle={d.subtitle} stats={d.stats} insight={d.insight}>
      <ul className="stagger-in space-y-3">
        {d.items.map((item) => (
          <li key={item.id} className="dash-card p-4 sm:p-5">
            <div className="relative z-[1] flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-base font-bold text-ink">
                    {item.topic}
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold ${statusTone[item.direction]}`}
                  >
                    {item.direction === "Rising" ? (
                      <TrendingUp className="h-3.5 w-3.5" />
                    ) : item.direction === "Cooling" ? (
                      <TrendingDown className="h-3.5 w-3.5" />
                    ) : (
                      <Minus className="h-3.5 w-3.5" />
                    )}
                    {item.direction} {item.change}
                  </span>
                  <ConfidenceBadge value={item.confidence} />
                </div>
                <p className="mt-1 text-xs font-semibold text-brand">
                  {item.theatre}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {item.drivers.map((driver) => (
                    <span
                      key={driver}
                      className="rounded-md border border-brand/10 bg-white/60 px-1.5 py-0.5 text-[10px] font-semibold text-ink-muted"
                    >
                      {driver}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-[11px] font-semibold text-brand-dark">
                  Decision · {item.decision}
                </p>
              </div>
              <Spark series={item.series} />
            </div>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

export function SettingsModulePage() {
  const d = settingsData;
  return (
    <Shell
      title={d.title}
      subtitle={d.subtitle}
      insight={d.insight}
      stats={[
        { label: "Role", value: d.profile.role },
        { label: "Theatres", value: d.profile.theatres },
        { label: "Alerts", value: "On" },
      ]}
    >
      <div className="stagger-in grid gap-5 lg:grid-cols-2">
        <article className="dash-card p-5">
          <div className="relative z-[1] flex items-center gap-2">
            <Settings className="h-4 w-4 text-brand" />
            <h3 className="font-display text-base font-bold text-ink">Profile</h3>
          </div>
          <dl className="relative z-[1] mt-4 space-y-3 text-sm">
            {[
              ["Name", d.profile.name],
              ["Role", d.profile.role],
              ["Org", d.profile.org],
              ["Email", d.profile.email],
              ["Theatres", d.profile.theatres],
              ["Clearance", d.profile.clearance],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/70 bg-white/40 px-3 py-2.5"
              >
                <dt className="shrink-0 font-semibold text-ink-muted">{k}</dt>
                <dd className="text-right font-bold text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </article>

        <article className="dash-card p-5">
          <h3 className="relative z-[1] font-display text-base font-bold text-ink">
            Preferences
          </h3>
          <ul className="relative z-[1] mt-4 space-y-2">
            {d.preferences.map((p) => (
              <li
                key={p.id}
                className="rounded-xl border border-white/70 bg-white/40 px-3 py-2.5 text-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-semibold text-ink-muted">{p.label}</span>
                  <span className="font-bold text-ink">{p.value}</span>
                </div>
                <p className="mt-1 text-[11px] text-ink-muted">{p.hint}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className="dash-card p-5">
          <div className="relative z-[1] flex items-center gap-2">
            <Bell className="h-4 w-4 text-brand" />
            <h3 className="font-display text-base font-bold text-ink">
              Notifications
            </h3>
          </div>
          <ul className="relative z-[1] mt-4 space-y-2">
            {d.notifications.map((n) => (
              <li
                key={n.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/70 bg-white/40 px-3 py-2.5 text-sm"
              >
                <div>
                  <p className="font-semibold text-ink">{n.label}</p>
                  <p className="mt-0.5 text-[11px] text-ink-muted">
                    Channel · {n.channel}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    n.enabled
                      ? "bg-brand-soft text-brand"
                      : "bg-white/80 text-ink-muted"
                  }`}
                >
                  {n.enabled ? "Enabled" : "Off"}
                </span>
              </li>
            ))}
          </ul>
        </article>

        <article className="dash-card p-5">
          <h3 className="relative z-[1] font-display text-base font-bold text-ink">
            Data sources
          </h3>
          <div className="relative z-[1] mt-4 overflow-hidden rounded-xl border border-white/70 bg-white/40">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-brand/8 text-[10px] font-bold uppercase tracking-wide text-ink-muted">
                  <th className="px-3 py-2.5">Source</th>
                  <th className="px-3 py-2.5">Status</th>
                  <th className="px-3 py-2.5">Lag</th>
                </tr>
              </thead>
              <tbody>
                {d.dataSources.map((src) => (
                  <tr
                    key={src.id}
                    className="border-b border-brand/5 last:border-0"
                  >
                    <td className="px-3 py-2.5 font-semibold text-ink">
                      {src.name}
                    </td>
                    <td className="px-3 py-2.5">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${statusTone[src.status]}`}
                      >
                        {src.status}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-ink-muted">{src.lag}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </Shell>
  );
}
