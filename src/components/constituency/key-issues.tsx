import type { KeyIssue } from "@/data/uttar-pradesh/agra";

export function KeyIssuesCard({ issues }: { issues: readonly KeyIssue[] }) {
  return (
    <article className="dash-card flex h-full flex-col p-5">
      <h3 className="font-display text-base font-bold text-ink">Key Issues</h3>
      <p className="mt-1 text-xs text-ink-muted">Share of voter concern</p>
      <ul className="mt-5 flex-1 space-y-4">
        {issues.map((issue) => (
          <li key={issue.label}>
            <div className="mb-1.5 flex items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-ink">{issue.label}</span>
              <span className="font-bold text-brand">{issue.percent}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-brand-mist">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand to-teal transition-all duration-700"
                style={{ width: `${issue.percent}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
