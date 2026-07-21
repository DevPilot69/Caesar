"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Filter,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";
import { IndiaUpTheatreMap } from "@/components/dashboard/india-up-theatre-map";
import {
  EmptyState,
  SuccessToast,
} from "@/components/dashboard/ui-states";
import { upConstituencyIndex } from "@/data/uttar-pradesh/constituencies";

export function ConstituencyMapCard() {
  const [query, setQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [briefState, setBriefState] = useState<"idle" | "loading" | "done">(
    "idle",
  );
  const [toast, setToast] = useState<string | null>(null);

  const selected = useMemo(
    () => upConstituencyIndex.find((c) => c.slug === selectedSlug) ?? null,
    [selectedSlug],
  );

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return upConstituencyIndex.slice(0, 5);
    return upConstituencyIndex.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.district.toLowerCase().includes(q),
    );
  }, [query]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(t);
  }, [toast]);

  function generateBrief() {
    if (!selected || briefState === "loading") return;
    setBriefState("loading");
    window.setTimeout(() => {
      setBriefState("done");
      setToast(`Brief ready — ${selected.name} pack queued for download.`);
      window.setTimeout(() => setBriefState("idle"), 1600);
    }, 1200);
  }

  const evidence = selected
    ? [
        `${selected.swing} swing`,
        `${selected.mood} mood`,
        `${selected.risk} risk`,
        `${selected.lastWinner} ${selected.margin}`,
      ]
    : [];

  return (
    <>
      <article className="dash-card dash-hero flex min-h-[460px] flex-col overflow-hidden lg:min-h-[520px]">
        <div className="grid flex-1 gap-0 lg:grid-cols-[0.88fr_1.22fr]">
          <div className="relative z-[1] flex flex-col border-b border-brand/8 p-5 sm:p-6 lg:border-b-0 lg:border-r">
            {selected ? (
              <div className="animate-float-in">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
                  Theatre locked
                </p>
                <h3 className="font-display mt-1 text-xl font-bold text-ink">
                  {selected.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  {selected.summary}
                </p>

                <div className="mt-4 rounded-2xl border border-brand/12 bg-gradient-to-br from-brand-soft/70 to-teal-soft/40 p-3.5">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-brand">
                    Why this matters
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-ink/85">
                    Evidence points to a{" "}
                    <span className="font-bold text-brand-dark">
                      {selected.mood.toLowerCase()}
                    </span>{" "}
                    theatre with{" "}
                    <span className="font-bold text-brand-dark">
                      {selected.swing.toLowerCase()} swing
                    </span>
                    . Prioritize booth coverage and a same-day brief.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {evidence.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-white/70 bg-white/70 px-2 py-0.5 text-[10px] font-bold text-ink/80"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={`/dashboard/constituencies/${selected.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-dark to-brand px-3.5 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(5,107,82,0.28)]"
                  >
                    Open theatre
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={generateBrief}
                    disabled={briefState === "loading"}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/80 bg-white/70 px-3.5 py-2.5 text-sm font-bold text-brand-dark backdrop-blur-md transition hover:bg-white disabled:opacity-60"
                  >
                    {briefState === "loading" ? (
                      <>
                        <Sparkles className="h-4 w-4 animate-pulse" />
                        Building…
                      </>
                    ) : briefState === "done" ? (
                      <>
                        <FileText className="h-4 w-4" />
                        Brief ready
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4" />
                        Generate brief
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-display text-xl font-bold text-ink">
                  Select a theatre
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  India rises into Uttar Pradesh. Pin one of five flagship
                  constituencies to unlock memory, evidence, and a brief.
                </p>
              </>
            )}

            <div className="relative mt-5">
              <div className="flex gap-2">
                <label className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search constituency..."
                    className="w-full rounded-xl border border-brand/12 bg-brand-mist/60 py-2.5 pl-10 pr-3 text-sm text-ink outline-none ring-brand/25 placeholder:text-ink-muted/70 focus:bg-white focus:ring-2"
                  />
                </label>
                <button
                  type="button"
                  className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-xl border border-brand/12 bg-white text-ink-muted transition hover:border-brand/30 hover:text-brand"
                  aria-label="Filter constituencies"
                >
                  <Filter className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-2 max-h-40 overflow-y-auto rounded-xl border border-white/70 bg-white/75 p-1.5 shadow-sm backdrop-blur-md">
                {suggestions.length === 0 ? (
                  <EmptyState
                    title="No theatres match"
                    description="Try Agra, Lucknow, Varanasi, Meerut, or Ghaziabad."
                  />
                ) : (
                  <ul className="space-y-1">
                    {suggestions.map((c) => (
                      <li key={c.slug}>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedSlug(c.slug);
                            setQuery(c.name);
                          }}
                          className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs transition hover:bg-brand-soft ${
                            selectedSlug === c.slug ? "bg-brand-mist" : ""
                          }`}
                        >
                          <span>
                            <span className="font-bold text-ink">{c.name}</span>
                            <span className="text-ink-muted">
                              {" "}
                              · {c.district}
                            </span>
                          </span>
                          <span className="font-semibold text-brand">
                            {c.lastWinner}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-br from-[#dff3eb] via-[#f4fbf8] to-[#e3f6f8] p-2 sm:p-3">
            <div className="pointer-events-none absolute -left-10 top-8 h-40 w-40 rounded-full bg-brand/15 blur-3xl" />
            <div className="pointer-events-none absolute -right-8 bottom-10 h-44 w-44 rounded-full bg-teal/20 blur-3xl" />
            <IndiaUpTheatreMap
              query={query}
              selectedSlug={selectedSlug}
              onSelect={(slug) => {
                setSelectedSlug(slug);
                const hit = upConstituencyIndex.find((c) => c.slug === slug);
                if (hit) setQuery(hit.name);
              }}
            />
          </div>
        </div>
      </article>
      {toast && (
        <SuccessToast message={toast} onDismiss={() => setToast(null)} />
      )}
    </>
  );
}
