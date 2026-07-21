import { AlertTriangle, Info, Eye } from "lucide-react";
import type { LiveAlert } from "@/data/uttar-pradesh/agra-north";

const levelMeta = {
  urgent: {
    icon: AlertTriangle,
    wrap: "bg-coral-soft text-coral",
    label: "Urgent",
  },
  watch: {
    icon: Eye,
    wrap: "bg-accent-soft text-[#8a6f2e]",
    label: "Watch",
  },
  info: {
    icon: Info,
    wrap: "bg-[#eff6ff] text-[#2563eb]",
    label: "Info",
  },
} as const;

export function AlertsWatchlist({ alerts }: { alerts: readonly LiveAlert[] }) {
  return (
    <article className="dash-card flex h-full flex-col overflow-hidden">
      <div className="border-b border-brand/8 px-5 py-4">
        <h3 className="font-display text-base font-bold text-ink">
          Alerts & Watchlist
        </h3>
        <p className="text-xs text-ink-muted">Priority events</p>
      </div>
      <ul className="flex-1 space-y-0 divide-y divide-brand/8 overflow-y-auto">
        {alerts.map((a) => {
          const meta = levelMeta[a.level];
          const Icon = meta.icon;
          return (
            <li key={a.id} className="flex gap-3 px-5 py-3.5 hover:bg-brand-mist/40">
              <span
                className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${meta.wrap}`}
              >
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-snug text-ink">
                  {a.text}
                </p>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${meta.wrap}`}>
                    {meta.label}
                  </span>
                  <span className="text-[10px] text-ink-muted">{a.ago}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
