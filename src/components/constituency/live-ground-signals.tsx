import { MapPin } from "lucide-react";
import type { LiveSignal } from "@/data/uttar-pradesh/agra-north";

const categoryTone: Record<string, string> = {
  Water: "bg-teal-soft text-teal",
  Opposition: "bg-coral-soft text-coral",
  Agriculture: "bg-accent-soft text-[#8a6f2e]",
  Jobs: "bg-brand-soft text-brand",
  "Law & Order": "bg-brand-soft text-brand-dark",
};

export function LiveGroundSignals({
  signals,
}: {
  signals: readonly LiveSignal[];
}) {
  return (
    <article className="dash-card flex h-full flex-col overflow-hidden">
      <div className="border-b border-brand/8 px-5 py-4">
        <h3 className="font-display text-base font-bold text-ink">
          Ground Signals
        </h3>
        <p className="text-xs text-ink-muted">Live ward & booth feed</p>
      </div>
      <ul className="flex-1 space-y-0 divide-y divide-brand/8 overflow-y-auto">
        {signals.map((s) => (
          <li key={s.id} className="px-5 py-3.5 transition hover:bg-brand-mist/50">
            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                <MapPin className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-ink">{s.location}</p>
                <p className="mt-1 text-sm leading-snug text-ink/85">{s.text}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                      categoryTone[s.category] ?? "bg-[#eef0ef] text-ink-muted"
                    }`}
                  >
                    {s.category}
                  </span>
                  <span className="text-[10px] text-ink-muted">{s.ago}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
