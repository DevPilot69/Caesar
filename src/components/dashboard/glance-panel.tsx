import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Megaphone,
  Newspaper,
  Radio,
  Siren,
} from "lucide-react";
import { glanceStats } from "@/data/uttar-pradesh/dashboard-modules";

const icons = {
  "New Signals": Radio,
  "Critical Alerts": Siren,
  "Opposition Moves": Megaphone,
  "Media Mentions": Newspaper,
} as const;

const wraps = {
  "New Signals": "bg-brand-soft text-brand",
  "Critical Alerts": "bg-coral-soft text-coral",
  "Opposition Moves": "bg-accent-soft text-[#8a6f2e]",
  "Media Mentions": "bg-teal-soft text-teal",
} as const;

export function GlancePanel() {
  return (
    <article className="dash-card flex h-full flex-col p-5 sm:p-6">
      <div className="relative z-[1]">
        <h3 className="font-display text-lg font-bold text-ink">
          Today at a Glance
        </h3>
        <p className="mt-1 text-xs text-ink-muted">
          Live pulse across 5 UP theatres
        </p>
      </div>

      <ul className="relative z-[1] mt-5 flex-1 space-y-2.5">
        {glanceStats.map((item) => {
          const Icon = icons[item.label as keyof typeof icons] ?? Radio;
          const wrap = wraps[item.label as keyof typeof wraps] ?? "bg-brand-soft text-brand";
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                className="flex items-center gap-3 rounded-xl border border-white/70 bg-white/40 px-3 py-3 backdrop-blur-sm transition hover:bg-white/75"
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${wrap}`}
                >
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-xl font-bold leading-none text-ink">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs font-medium text-ink-muted">
                    {item.label}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center gap-0.5 text-xs font-bold ${
                    item.up ? "text-brand" : "text-coral"
                  }`}
                >
                  <ArrowUpRight
                    className={`h-3.5 w-3.5 ${item.up ? "" : "rotate-90"}`}
                  />
                  {item.delta}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <Link
        href="/dashboard/constituencies"
        className="relative z-[1] mt-5 inline-flex items-center gap-1.5 self-start text-sm font-bold text-brand transition hover:gap-2"
      >
        View 5 theatres
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
