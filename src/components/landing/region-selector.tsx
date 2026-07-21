"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Check, ChevronRight, Lock, Search } from "lucide-react";
import {
  countries,
  statesByCountry,
  type StateItem,
} from "@/lib/regions";

export function RegionSelector() {
  const [selectedCountry, setSelectedCountry] = useState("in");
  const [query, setQuery] = useState("");

  const filteredCountries = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter((c) => c.name.toLowerCase().includes(q));
  }, [query]);

  const states = useMemo(() => {
    const list = statesByCountry[selectedCountry] ?? [];
    return [...list].sort((a, b) => Number(b.enabled) - Number(a.enabled));
  }, [selectedCountry]);

  const countryName =
    countries.find((c) => c.id === selectedCountry)?.name ?? "Region";

  return (
    <section
      id="regions"
      className="mx-auto max-w-[1280px] px-4 pb-10 sm:px-6 lg:px-10"
    >
      <div className="glass-premium overflow-hidden rounded-[28px] p-5 sm:p-7 lg:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_0.8fr_1.45fr]">
          <div className="flex flex-col justify-between gap-6">
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                Theatre selection
              </p>
              <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-[1.85rem]">
                Your Region.
                <br />
                Your Intelligence.
                <br />
                Your Advantage.
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
                Unlock constituency memory, morning briefs, and strategy feeds
                for the states configured on your Caesar deployment.
              </p>
            </div>

            <div className="rounded-2xl border border-brand/15 bg-gradient-to-br from-brand-soft/90 to-teal-soft/50 p-4 backdrop-blur-sm">
              <div className="flex gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/70 text-brand shadow-sm">
                  <Lock className="h-4 w-4" />
                </span>
                <p className="text-sm leading-relaxed text-ink/80">
                  <span className="font-semibold text-ink">Access control.</span>{" "}
                  Enabled regions follow your subscription and admin
                  permissions.
                </p>
              </div>
            </div>
          </div>

          <div className="glass flex max-h-[420px] flex-col rounded-2xl p-4">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-ink-muted">
              Select Country
            </h3>

            <label className="relative mb-3 block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search country..."
                className="w-full rounded-xl border border-brand/10 bg-white/75 py-2.5 pl-10 pr-3 text-sm text-ink outline-none ring-brand/30 placeholder:text-ink-muted/70 focus:ring-2"
              />
            </label>

            <ul className="flex-1 space-y-1.5 overflow-y-auto">
              {filteredCountries.map((country) => {
                const active = country.id === selectedCountry;
                return (
                  <li key={country.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedCountry(country.id)}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition ${
                        active
                          ? "bg-gradient-to-r from-brand-soft to-teal-soft text-brand-dark shadow-sm"
                          : "hover:bg-white/70"
                      }`}
                    >
                      <span className="flex items-center gap-2.5 text-sm font-semibold text-ink">
                        <span className="text-base" aria-hidden>
                          {country.flag}
                        </span>
                        {country.name}
                      </span>
                      {active && (
                        <ChevronRight className="h-4 w-4 text-brand" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-ink-muted">
                Select state · {countryName}
              </h3>
              <a
                href="#contact"
                className="text-xs font-semibold text-brand hover:underline"
              >
                Need another region? Contact admin
              </a>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {states.map((state) =>
                state.enabled ? (
                  <EnabledStateCard
                    key={state.id}
                    state={state}
                    countryId={selectedCountry}
                  />
                ) : (
                  <LockedStateCard key={state.id} state={state} />
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EnabledStateCard({
  state,
  countryId,
}: {
  state: StateItem;
  countryId: string;
}) {
  return (
    <Link
      href={`/war-room/${countryId}/${state.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-white/80 bg-white/50 shadow-[0_8px_24px_rgba(20,50,40,0.08)] transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(20,50,40,0.14)]"
    >
      <div className="relative h-32 overflow-hidden">
        <Image
          src={state.image}
          alt={state.name}
          fill
          sizes="(max-width: 768px) 100vw, 220px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
        <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-lg bg-brand px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
          <Check className="h-3 w-3" strokeWidth={3} />
          Enabled
        </span>
      </div>
      <div className="p-3.5">
        <h4 className="font-display text-sm font-semibold text-ink">
          {state.name}
        </h4>
        <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-brand transition group-hover:gap-1.5">
          Enter intelligence
          <ChevronRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

function LockedStateCard({ state }: { state: StateItem }) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/50 bg-white/30">
      <div className="relative h-32 overflow-hidden">
        <Image
          src={state.image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 220px"
          className="object-cover grayscale contrast-90"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
        <span className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm">
          <Lock className="h-3.5 w-3.5" />
        </span>
        <div className="absolute inset-x-0 bottom-0 p-3.5">
          <h4 className="font-display text-sm font-semibold text-white">
            {state.name}
          </h4>
          <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/75">
            Not configured
          </p>
        </div>
      </div>
    </article>
  );
}
