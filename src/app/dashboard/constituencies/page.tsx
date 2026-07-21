import Link from "next/link";
import { ArrowRight, MapPinned, Radio } from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { upConstituencyIndex } from "@/data/uttar-pradesh/constituencies";

const swingTone = {
  High: "text-coral",
  Medium: "text-[#8a6f2e]",
  Low: "text-brand",
} as const;

export default function ConstituenciesIndexPage() {
  const election = { daysToGo: 216, title: "Uttar Pradesh Assembly 2027" };

  return (
    <div className="dash-shell flex min-h-screen">
      <div className="sticky top-0 hidden h-screen lg:block">
        <DashboardSidebar
          electionDays={election.daysToGo}
          electionTitle={election.title}
        />
      </div>
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-10">
        <p className="text-sm font-semibold text-brand">Uttar Pradesh</p>
        <h1 className="font-display mt-1 text-3xl font-bold text-ink">
          Constituencies
        </h1>
        <p className="mt-2 max-w-xl text-sm text-ink-muted">
          Sample UP theatres for Caesar. Agra North is the live ops view; others
          are mock intelligence packs.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {upConstituencyIndex.map((t) =>
            t.enabled ? (
              <Link
                key={t.slug}
                href={`/dashboard/constituencies/${t.slug}`}
                className="dash-card group p-5 transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(16,60,48,0.12)]"
              >
                <div className="relative z-[1] flex items-start justify-between gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
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
                          : t.badge === "Overview"
                            ? "bg-teal-soft text-teal"
                            : "bg-brand-soft text-brand"
                      }`}
                    >
                      {t.badge}
                    </span>
                  )}
                </div>
                <h2 className="relative z-[1] font-display mt-4 text-lg font-bold text-ink">
                  {t.name}
                </h2>
                <p className="relative z-[1] text-xs font-semibold text-ink-muted">
                  {t.district} · UP
                </p>
                <p className="relative z-[1] mt-1 text-sm text-ink-muted">
                  {t.summary}
                </p>
                <div className="relative z-[1] mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-semibold text-ink/80">
                  <span>{t.voters} voters</span>
                  <span>{t.lastWinner}</span>
                  <span className="text-brand">{t.margin}</span>
                  <span className={swingTone[t.swing]}>{t.swing} swing</span>
                </div>
                <span className="relative z-[1] mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand group-hover:gap-1.5">
                  Open theatre
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ) : (
              <div key={t.slug} className="dash-card p-5 opacity-60">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef0ef] text-ink-muted">
                  <MapPinned className="h-5 w-5" />
                </span>
                <h2 className="font-display mt-4 text-lg font-bold text-ink">
                  {t.name}
                </h2>
                <p className="mt-1 text-sm text-ink-muted">{t.summary}</p>
                <span className="mt-4 text-xs font-bold uppercase tracking-wide text-ink-muted">
                  Not configured
                </span>
              </div>
            ),
          )}
        </div>
      </main>
    </div>
  );
}
