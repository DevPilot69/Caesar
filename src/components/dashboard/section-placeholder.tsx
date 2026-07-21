import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default function DashboardSectionPlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="dash-shell flex min-h-screen">
      <div className="sticky top-0 hidden h-screen lg:block">
        <DashboardSidebar />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex flex-1 flex-col items-start justify-center px-6 py-16 lg:px-12">
          <Link
            href="/dashboard"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="dash-card max-w-lg p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
              Caesar module
            </p>
            <h1 className="font-display mt-2 text-2xl font-bold text-ink">
              {title}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              {description}
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
