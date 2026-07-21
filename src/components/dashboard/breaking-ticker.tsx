"use client";

import { ArrowRight } from "lucide-react";

const items = [
  "Major rally announced in Western UP — ground teams mobilizing overnight",
  "Social sentiment shift detected around irrigation scheme delivery",
  "Opposition press conference scheduled in Meerut — rebuttal pack ready",
  "Booth-level turnout anomaly flagged in 3 swing constituencies",
];

export function BreakingTicker() {
  const line = items.join("   ·   ");

  return (
    <div className="dash-card flex items-center gap-3 overflow-hidden px-3 py-2.5 sm:px-4">
      <span className="shrink-0 rounded-md bg-coral px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
        Breaking
      </span>
      <div className="relative min-w-0 flex-1 overflow-hidden">
        <div className="ticker-track flex whitespace-nowrap text-sm font-medium text-ink/85">
          <span className="px-4">{line}</span>
          <span className="px-4" aria-hidden>
            {line}
          </span>
        </div>
      </div>
      <button
        type="button"
        className="hidden shrink-0 items-center gap-1 text-xs font-bold text-brand sm:inline-flex"
      >
        View All Alerts
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
