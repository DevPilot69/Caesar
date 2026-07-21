"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { breakingTickerItems } from "@/data/uttar-pradesh/dashboard-modules";

export function BreakingTicker() {
  const line = breakingTickerItems.join("   ·   ");

  return (
    <div className="dash-card flex items-center gap-3 overflow-hidden px-3 py-2.5 sm:px-4">
      <span className="relative z-[1] shrink-0 rounded-md bg-coral px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
        Breaking
      </span>
      <div className="relative z-[1] min-w-0 flex-1 overflow-hidden">
        <div className="ticker-track flex whitespace-nowrap text-sm font-medium text-ink/85">
          <span className="px-4">{line}</span>
          <span className="px-4" aria-hidden>
            {line}
          </span>
        </div>
      </div>
      <Link
        href="/dashboard/alerts"
        className="relative z-[1] hidden shrink-0 items-center gap-1 text-xs font-bold text-brand sm:inline-flex"
      >
        View All Alerts
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
