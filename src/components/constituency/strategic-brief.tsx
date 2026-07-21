import { CheckSquare, Megaphone, Radio, Users } from "lucide-react";

const actionIcons = [Users, Radio, Megaphone] as const;

export function StrategicBriefCard({
  brief,
}: {
  brief: {
    keyTakeaways: readonly string[];
    focusOn: readonly string[];
    whatToPost: readonly string[];
    recommendedActions: readonly {
      id: string;
      label: string;
      tone: string;
    }[];
  };
}) {
  const toneClass: Record<string, string> = {
    brand: "bg-brand-soft text-brand border-brand/15 hover:bg-brand hover:text-white",
    teal: "bg-teal-soft text-teal border-teal/20 hover:bg-teal hover:text-white",
    accent:
      "bg-accent-soft text-[#8a6f2e] border-accent/25 hover:bg-accent hover:text-white",
  };

  return (
    <article className="dash-card overflow-hidden">
      <div className="border-b border-brand/8 px-5 py-4">
        <h3 className="font-display text-base font-bold text-ink">
          Strategic Brief
        </h3>
        <p className="text-xs text-ink-muted">
          Evidence-backed guidance for this theatre
        </p>
      </div>

      <div className="grid gap-0 lg:grid-cols-4">
        <section className="border-b border-brand/8 p-5 lg:border-b-0 lg:border-r">
          <h4 className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand">
            Key Takeaways
          </h4>
          <ul className="mt-3 space-y-2.5">
            {brief.keyTakeaways.map((t) => (
              <li
                key={t}
                className="flex gap-2 text-xs leading-relaxed text-ink/85"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {t}
              </li>
            ))}
          </ul>
        </section>

        <section className="border-b border-brand/8 p-5 lg:border-b-0 lg:border-r">
          <h4 className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand">
            What to Focus On
          </h4>
          <ul className="mt-3 space-y-2.5">
            {brief.focusOn.map((t) => (
              <li
                key={t}
                className="flex gap-2 text-xs leading-relaxed text-ink/85"
              >
                <CheckSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                {t}
              </li>
            ))}
          </ul>
        </section>

        <section className="border-b border-brand/8 p-5 lg:border-b-0 lg:border-r">
          <h4 className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand">
            What to Post
          </h4>
          <ul className="mt-3 space-y-2.5">
            {brief.whatToPost.map((t) => (
              <li
                key={t}
                className="flex gap-2 text-xs leading-relaxed text-ink/85"
              >
                <CheckSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal" />
                {t}
              </li>
            ))}
          </ul>
        </section>

        <section className="p-5">
          <h4 className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand">
            Recommended Actions
          </h4>
          <div className="mt-3 space-y-2.5">
            {brief.recommendedActions.map((action, i) => {
              const Icon = actionIcons[i] ?? Users;
              return (
                <button
                  key={action.id}
                  type="button"
                  className={`flex w-full items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-xs font-bold transition ${
                    toneClass[action.tone] ?? toneClass.brand
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {action.label}
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </article>
  );
}
