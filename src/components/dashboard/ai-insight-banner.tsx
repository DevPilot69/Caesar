import { Sparkles } from "lucide-react";

export function AiInsightBanner() {
  return (
    <article className="dash-card relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-soft/90 via-white to-teal-soft/50" />
      <div className="pointer-events-none absolute -right-8 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-brand/20 blur-3xl" />
      <div className="pointer-events-none absolute right-8 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-gradient-to-br from-brand-light/40 to-teal/30 blur-2xl" />

      <div className="relative flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 lg:p-7">
        <div className="max-w-2xl">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
            <Sparkles className="h-3 w-3" />
            AI Assisted Insight
          </div>
          <h3 className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
            Smart Analysis. Stronger Strategies.
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-[15px]">
            Caesar scans thousands of data points — news, ECI, social, and field
            reports — to surface what matters with evidence and confidence, while
            humans stay in control.
          </p>
        </div>

        <div className="relative mx-auto flex h-28 w-28 shrink-0 items-center justify-center sm:mx-0 sm:h-32 sm:w-32">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand/25 to-teal/20 blur-md" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand to-teal shadow-[0_12px_40px_rgba(10,143,108,0.45)] sm:h-24 sm:w-24">
            <div className="h-10 w-10 rounded-full bg-white/25 backdrop-blur-sm sm:h-12 sm:w-12" />
          </div>
          <div className="absolute bottom-1 h-3 w-16 rounded-full bg-brand-dark/20 blur-[2px]" />
        </div>
      </div>
    </article>
  );
}
