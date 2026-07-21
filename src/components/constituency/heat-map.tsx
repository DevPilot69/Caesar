"use client";

import { useMemo, useState } from "react";
import { LocateFixed, Minus, Plus } from "lucide-react";
import type { MapZone, ZoneStrength } from "@/data/uttar-pradesh/agra";

const strengthFill: Record<ZoneStrength, string> = {
  strong: "#0a8f6c",
  swing: "#c4a35a",
  weak: "#e07a5f",
  none: "#d5ddd8",
};

const legend = [
  { key: "strong" as const, label: "Strong", color: "#0a8f6c" },
  { key: "swing" as const, label: "Swing", color: "#c4a35a" },
  { key: "weak" as const, label: "Weak", color: "#e07a5f" },
  { key: "none" as const, label: "No Data", color: "#d5ddd8" },
];

export function ConstituencyHeatMap({
  title,
  zones,
  defaultZoneId,
}: {
  title: string;
  zones: MapZone[];
  defaultZoneId: string;
}) {
  const [activeId, setActiveId] = useState(defaultZoneId);
  const [zoom, setZoom] = useState(1);
  const active = useMemo(
    () => zones.find((z) => z.id === activeId) ?? zones[0],
    [activeId, zones],
  );

  return (
    <article className="dash-card flex min-h-[340px] flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-brand/8 px-5 py-4">
        <div>
          <h3 className="font-display text-base font-bold text-ink">
            Constituency Overview
          </h3>
          <p className="text-xs text-ink-muted">{title}</p>
        </div>
        <div className="flex items-center gap-3">
          {legend.map((l) => (
            <span
              key={l.key}
              className="hidden items-center gap-1.5 text-[10px] font-semibold text-ink-muted sm:inline-flex"
            >
              <span
                className="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: l.color }}
              />
              {l.label}
            </span>
          ))}
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center bg-gradient-to-br from-brand-mist via-white to-[#f3f1ea] p-4 sm:p-6">
        <div className="absolute right-3 top-3 z-[2] flex flex-col gap-1">
          <button
            type="button"
            className="rounded-lg border border-brand/15 bg-white/90 p-2 text-ink shadow-sm backdrop-blur-sm"
            onClick={() => setZoom((z) => Math.min(1.35, z + 0.1))}
            aria-label="Zoom in"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            className="rounded-lg border border-brand/15 bg-white/90 p-2 text-ink shadow-sm backdrop-blur-sm"
            onClick={() => setZoom((z) => Math.max(0.85, z - 0.1))}
            aria-label="Zoom out"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            className="rounded-lg border border-brand/15 bg-white/90 p-2 text-ink shadow-sm backdrop-blur-sm"
            onClick={() => setZoom(1)}
            aria-label="Reset map"
          >
            <LocateFixed className="h-3.5 w-3.5" />
          </button>
        </div>

        <svg
          viewBox="0 0 380 320"
          className="h-auto w-full max-w-[420px] transition-transform duration-300"
          style={{ transform: `scale(${zoom})` }}
          role="img"
          aria-label="Agra constituency heatmap"
        >
          <rect
            x="40"
            y="40"
            width="300"
            height="240"
            rx="18"
            fill="#eef5f1"
            stroke="#cfe3da"
            strokeWidth="2"
          />
          {zones.map((zone) => (
            <path
              key={zone.id}
              d={zone.path}
              transform="translate(40 40)"
              fill={strengthFill[zone.strength]}
              fillOpacity={activeId === zone.id ? 1 : 0.88}
              stroke="#fff"
              strokeWidth="2.5"
              className="cursor-pointer transition-opacity hover:opacity-100"
              onMouseEnter={() => setActiveId(zone.id)}
              onClick={() => setActiveId(zone.id)}
            />
          ))}
        </svg>

        {active && (
          <div className="absolute left-4 top-4 w-[min(100%,240px)] rounded-2xl border border-white/80 bg-white/95 p-3.5 shadow-[0_12px_32px_rgba(16,60,48,0.14)] backdrop-blur-md sm:left-6 sm:top-6">
            <p className="font-display text-sm font-bold text-ink">
              {active.name}
            </p>
            {active.sentiment != null ? (
              <dl className="mt-3 space-y-2 text-xs">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-ink-muted">Overall Sentiment</dt>
                  <dd className="font-bold text-brand">
                    {active.sentiment}/100 · {active.sentimentLabel}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-ink-muted">Risk Level</dt>
                  <dd className="rounded-md bg-accent-soft px-1.5 py-0.5 font-bold text-[#8a6f2e]">
                    {active.risk}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-ink-muted">Key Issue</dt>
                  <dd className="font-semibold text-ink">{active.keyIssue}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-ink-muted">Dominant Community</dt>
                  <dd className="font-semibold text-ink">
                    {active.dominantCommunity}
                  </dd>
                </div>
              </dl>
            ) : (
              <p className="mt-2 text-xs text-ink-muted">
                Strength:{" "}
                <span className="font-semibold capitalize text-ink">
                  {active.strength === "none" ? "No data" : active.strength}
                </span>
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-3 overflow-x-auto border-t border-brand/8 px-4 py-3 sm:hidden">
        {legend.map((l) => (
          <span
            key={l.key}
            className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-ink-muted"
          >
            <span
              className="h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: l.color }}
            />
            {l.label}
          </span>
        ))}
      </div>
    </article>
  );
}
