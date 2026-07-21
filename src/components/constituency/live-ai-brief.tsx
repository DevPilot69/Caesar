import { Bot, Check, Zap } from "lucide-react";

export function LiveAiBriefCard({
  checklist,
}: {
  checklist: readonly string[];
}) {
  return (
    <article className="dash-card relative flex h-full flex-col overflow-hidden p-5">
      <div className="pointer-events-none absolute -right-10 top-0 h-28 w-28 rounded-full bg-[#3b82f6]/12 blur-2xl" />
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#eff6ff] text-[#2563eb]">
        <Bot className="h-5 w-5" />
      </div>
      <h3 className="relative mt-3 font-display text-base font-bold text-ink">
        AI Assisted Brief
      </h3>
      <p className="relative mt-1.5 text-xs leading-relaxed text-ink-muted">
        Generate a full evidence-backed brief for Agra North from live signals,
        emotion radar, and recommendation priority.
      </p>
      <ul className="relative mt-3 space-y-1.5">
        {checklist.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 text-xs font-semibold text-ink/80"
          >
            <Check className="h-3.5 w-3.5 text-brand" />
            {item}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="relative mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-4 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(37,99,235,0.3)] transition hover:brightness-110"
      >
        <Zap className="h-4 w-4 fill-current" />
        Generate Brief
      </button>
    </article>
  );
}
