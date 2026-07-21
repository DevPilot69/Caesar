import Link from "next/link";
import {
  BellPlus,
  ClipboardPlus,
  FilePlus2,
  FileBarChart,
  Newspaper,
  Swords,
} from "lucide-react";

const actions = [
  {
    icon: FilePlus2,
    label: "Create Brief",
    tone: "bg-brand-soft text-brand",
    href: "/dashboard/briefs",
  },
  {
    icon: ClipboardPlus,
    label: "Add Ground Report",
    tone: "bg-teal-soft text-teal",
    href: "/dashboard/ground",
  },
  {
    icon: BellPlus,
    label: "Set Alert",
    tone: "bg-coral-soft text-coral",
    href: "/dashboard/alerts",
  },
  {
    icon: Newspaper,
    label: "Media Monitor",
    tone: "bg-accent-soft text-[#8a6f2e]",
    href: "/dashboard/media",
  },
  {
    icon: Swords,
    label: "Opposition Tracker",
    tone: "bg-brand-soft text-brand-dark",
    href: "/dashboard/opposition",
  },
  {
    icon: FileBarChart,
    label: "View Reports",
    tone: "bg-teal-soft text-teal",
    href: "/dashboard/reports",
  },
];

export function QuickActions() {
  return (
    <section>
      <h3 className="mb-3 font-display text-base font-bold text-ink">
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {actions.map(({ icon: Icon, label, tone, href }) => (
          <Link
            key={label}
            href={href}
            className="dash-card group flex flex-col items-center gap-2.5 px-3 py-4 text-center transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(16,60,48,0.12)]"
          >
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone} transition group-hover:scale-105`}
            >
              <Icon className="h-5 w-5" strokeWidth={1.9} />
            </span>
            <span className="text-xs font-bold leading-snug text-ink">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
