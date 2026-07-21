import { Bot, Zap } from "lucide-react";

export function AiBriefCard({ teaser }: { teaser: string }) {
  return (
    <article className="dash-card relative flex h-full flex-col overflow-hidden p-5">
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#3b82f6]/15 blur-2xl" />
      <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-[#eff6ff] text-[#2563eb]">
        <Bot className="h-5 w-5" />
      </div>
      <h3 className="relative mt-4 font-display text-base font-bold text-ink">
        AI Assisted Brief
      </h3>
      <p className="relative mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
        {teaser}
      </p>
      <button
        type="button"
        className="relative mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-4 py-3 text-sm font-bold text-white shadow-[0_10px_24px_rgba(37,99,235,0.35)] transition hover:brightness-110"
      >
        <Zap className="h-4 w-4 fill-current" />
        Generate Brief
      </button>
    </article>
  );
}
