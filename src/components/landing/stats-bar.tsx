import {
  FileSearch,
  GitBranch,
  MapPinned,
  Scale,
  Sparkles,
} from "lucide-react";

const stats = [
  {
    icon: FileSearch,
    value: "100%",
    label: "Evidence Traceability",
    wrap: "bg-brand-soft text-brand",
  },
  {
    icon: MapPinned,
    value: "117",
    label: "Constituencies Mapped",
    wrap: "bg-teal-soft text-teal",
  },
  {
    icon: GitBranch,
    value: "Live",
    label: "Political Knowledge Graph",
    wrap: "bg-accent-soft text-[#8a6f2e]",
  },
  {
    icon: Sparkles,
    value: "<60s",
    label: "Morning Brief Generation",
    wrap: "bg-brand-soft text-brand-dark",
  },
  {
    icon: Scale,
    value: "Human",
    label: "Decisions Stay in Control",
    wrap: "bg-coral-soft text-coral",
  },
];

export function StatsBar() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-12 sm:px-6 lg:px-10">
      <div className="glass-premium grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-3 lg:grid-cols-5">
        {stats.map(({ icon: Icon, value, label, wrap }, index) => (
          <div
            key={label}
            className={`flex flex-col items-center gap-2 bg-white/45 px-4 py-6 text-center backdrop-blur-sm ${
              index === stats.length - 1 ? "col-span-2 sm:col-span-1" : ""
            }`}
          >
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-xl shadow-sm ${wrap}`}
            >
              <Icon className="h-5 w-5" strokeWidth={1.85} />
            </span>
            <p className="font-display text-2xl font-bold tracking-tight text-ink">
              {value}
            </p>
            <p className="max-w-[9.5rem] text-xs font-medium leading-snug text-ink-muted">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
