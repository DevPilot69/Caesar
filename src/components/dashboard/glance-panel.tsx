import {
  ArrowRight,
  ArrowUpRight,
  Megaphone,
  Newspaper,
  Radio,
  Siren,
} from "lucide-react";

const glances = [
  {
    icon: Radio,
    label: "New Signals",
    value: 28,
    delta: "+12%",
    up: true,
    wrap: "bg-brand-soft text-brand",
  },
  {
    icon: Siren,
    label: "Critical Alerts",
    value: 16,
    delta: "+8%",
    up: false,
    wrap: "bg-coral-soft text-coral",
  },
  {
    icon: Megaphone,
    label: "Opposition Moves",
    value: 7,
    delta: "+5%",
    up: true,
    wrap: "bg-accent-soft text-[#8a6f2e]",
  },
  {
    icon: Newspaper,
    label: "Media Mentions",
    value: 5,
    delta: "+15%",
    up: true,
    wrap: "bg-teal-soft text-teal",
  },
];

export function GlancePanel() {
  return (
    <article className="dash-card flex h-full flex-col p-5 sm:p-6">
      <h3 className="font-display text-lg font-bold text-ink">
        Today at a Glance
      </h3>
      <p className="mt-1 text-xs text-ink-muted">Live theatre pulse</p>

      <ul className="mt-5 flex-1 space-y-3">
        {glances.map((item) => (
          <li
            key={item.label}
            className="flex items-center gap-3 rounded-xl border border-brand/8 bg-brand-mist/35 px-3 py-3 transition hover:bg-white"
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.wrap}`}
            >
              <item.icon className="h-5 w-5" strokeWidth={2} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-xl font-bold leading-none text-ink">
                {item.value}
              </p>
              <p className="mt-1 text-xs font-medium text-ink-muted">
                {item.label}
              </p>
            </div>
            <span
              className={`inline-flex items-center gap-0.5 text-xs font-bold ${
                item.up ? "text-brand" : "text-coral"
              }`}
            >
              <ArrowUpRight
                className={`h-3.5 w-3.5 ${item.up ? "" : "rotate-90"}`}
              />
              {item.delta}
            </span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-bold text-brand transition hover:gap-2"
      >
        View All Insights
        <ArrowRight className="h-4 w-4" />
      </button>
    </article>
  );
}
