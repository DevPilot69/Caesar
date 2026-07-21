import {
  ArrowRight,
  Award,
  Percent,
  Users,
  Vote,
  GitCommitHorizontal,
} from "lucide-react";

const icons = {
  users: Users,
  vote: Vote,
  percent: Percent,
  trophy: Award,
  gap: GitCommitHorizontal,
} as const;

export function ConstituencyProfileCard({
  items,
}: {
  items: readonly {
    id: string;
    label: string;
    value: string;
    icon: keyof typeof icons;
  }[];
}) {
  return (
    <article className="dash-card flex h-full flex-col p-5">
      <h3 className="font-display text-base font-bold text-ink">
        Constituency Profile
      </h3>
      <ul className="mt-4 flex-1 space-y-2.5">
        {items.map((item) => {
          const Icon = icons[item.icon] ?? Users;
          return (
            <li
              key={item.id}
              className="flex items-center gap-3 rounded-xl border border-brand/8 bg-brand-mist/40 px-3 py-2.5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-brand shadow-sm">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium text-ink-muted">
                  {item.label}
                </p>
                <p className="font-display text-sm font-bold text-ink">
                  {item.value}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand hover:gap-1.5"
      >
        View Full Profile
        <ArrowRight className="h-4 w-4" />
      </button>
    </article>
  );
}
