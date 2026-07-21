import { CheckSquare } from "lucide-react";

export function StrategicSummaryPlan({
  plan,
}: {
  plan: {
    recommendedActions: readonly string[];
    leadersShouldSay: readonly string[];
    socialPosts: readonly string[];
    boothInstructions: readonly string[];
  };
}) {
  const columns = [
    { title: "Recommended Actions", items: plan.recommendedActions, tone: "brand" },
    {
      title: "What Leaders Should Say",
      items: plan.leadersShouldSay,
      tone: "teal",
    },
    {
      title: "What to Post on Social Media",
      items: plan.socialPosts,
      tone: "accent",
    },
    {
      title: "Booth Team Instructions",
      items: plan.boothInstructions,
      tone: "brand",
    },
  ] as const;

  const iconTone = {
    brand: "text-brand",
    teal: "text-teal",
    accent: "text-[#8a6f2e]",
  } as const;

  return (
    <article className="dash-card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand/8 px-5 py-4">
        <div>
          <h3 className="font-display text-base font-bold text-ink">
            Strategic Summary & Action Plan
          </h3>
          <p className="text-xs text-ink-muted">AI assisted · human gated</p>
        </div>
        <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand">
          Live synthesis
        </span>
      </div>
      <div className="grid gap-0 sm:grid-cols-2 xl:grid-cols-4">
        {columns.map((col, idx) => (
          <section
            key={col.title}
            className={`p-5 ${
              idx < columns.length - 1
                ? "border-b border-brand/8 sm:border-b-0 xl:border-r"
                : ""
            } ${idx % 2 === 0 ? "sm:border-r xl:border-r" : ""} ${
              idx < 2 ? "sm:border-b xl:border-b-0" : ""
            }`}
          >
            <h4 className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand">
              {col.title}
            </h4>
            <ul className="mt-3 space-y-2.5">
              {col.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-xs leading-relaxed text-ink/85"
                >
                  <CheckSquare
                    className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${iconTone[col.tone]}`}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}
