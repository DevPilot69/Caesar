import { Brain, Lock, Radio, Target } from "lucide-react";

const pillars = [
  {
    icon: Radio,
    title: "Ground signals",
    body: "News, ECI, social, and field reports fused into one feed.",
    wrap: "bg-brand-soft text-brand border-brand/15",
  },
  {
    icon: Brain,
    title: "AI-assisted analysis",
    body: "Models rank evidence — strategists stay in control.",
    wrap: "bg-teal-soft text-teal border-teal/20",
  },
  {
    icon: Target,
    title: "Strategy feed",
    body: "Prioritized actions with confidence and source links.",
    wrap: "bg-accent-soft text-[#8a6f2e] border-accent/25",
  },
  {
    icon: Lock,
    title: "Secure by design",
    body: "Role-based access, audit trails, private data lanes.",
    wrap: "bg-coral-soft text-coral border-coral/20",
  },
];

export function PillarsStrip() {
  return (
    <section
      id="how"
      className="mx-auto max-w-[1280px] px-4 pb-8 sm:px-6 lg:px-10"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map(({ icon: Icon, title, body, wrap }, i) => (
          <article
            key={title}
            className="glass-panel animate-float-in rounded-2xl p-4 sm:p-5"
            style={{ animationDelay: `${0.05 * i}s` }}
          >
            <span
              className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border shadow-sm ${wrap}`}
            >
              <Icon className="h-5 w-5" strokeWidth={2} />
            </span>
            <h3 className="font-display text-sm font-bold text-ink">{title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
              {body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
