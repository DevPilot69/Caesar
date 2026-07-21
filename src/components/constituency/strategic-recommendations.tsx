import type { LiveRecommendation } from "@/data/uttar-pradesh/agra-north";

const priorityStyle = {
  Critical: {
    badge: "bg-coral text-white",
    card: "border-coral/25 bg-coral-soft/40",
  },
  High: {
    badge: "bg-accent text-white",
    card: "border-accent/25 bg-accent-soft/50",
  },
  Low: {
    badge: "bg-brand text-white",
    card: "border-brand/20 bg-brand-soft/50",
  },
} as const;

export function StrategicRecommendations({
  items,
}: {
  items: readonly LiveRecommendation[];
}) {
  return (
    <article className="dash-card flex h-full flex-col overflow-hidden">
      <div className="border-b border-brand/8 px-5 py-4">
        <h3 className="font-display text-base font-bold text-ink">
          Strategic Recommendations
        </h3>
        <p className="text-xs text-ink-muted">Prioritized by urgency</p>
      </div>
      <ul className="flex-1 space-y-3 overflow-y-auto p-4">
        {items.map((item) => {
          const style = priorityStyle[item.priority];
          return (
            <li
              key={item.id}
              className={`rounded-xl border p-3.5 ${style.card}`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${style.badge}`}
                >
                  {item.priority}
                </span>
                <span className="rounded-md bg-white/80 px-1.5 py-0.5 text-[10px] font-semibold text-ink-muted">
                  {item.window}
                </span>
              </div>
              <p className="mt-2 text-sm font-bold leading-snug text-ink">
                {item.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-ink/75">
                {item.detail}
              </p>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-wide text-brand">
                {item.audience}
              </p>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
