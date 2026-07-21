import type { GroundSignal } from "@/data/uttar-pradesh/agra";

const sentimentStyle = {
  Positive: "bg-brand-soft text-brand",
  Neutral: "bg-[#eef0ef] text-ink-muted",
  Negative: "bg-coral-soft text-coral",
} as const;

export function GroundSignalsCard({
  title,
  signals,
}: {
  title: string;
  signals: readonly GroundSignal[];
}) {
  return (
    <article className="dash-card flex h-full flex-col p-5">
      <h3 className="font-display text-base font-bold text-ink">{title}</h3>
      <ul className="mt-4 flex-1 space-y-3">
        {signals.map((s) => (
          <li
            key={s.id}
            className="rounded-xl border border-brand/8 bg-white/70 px-3 py-3"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] font-bold text-ink">{s.source}</p>
              <span
                className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${sentimentStyle[s.sentiment]}`}
              >
                {s.sentiment}
              </span>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-ink/90">{s.text}</p>
            <p className="mt-1.5 text-[10px] text-ink-muted">{s.ago}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
