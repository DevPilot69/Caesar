import Link from "next/link";
import { SiteHeader } from "@/components/landing/site-header";

export default function LoginPage() {
  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main className="mx-auto flex max-w-md flex-col px-4 py-14 sm:px-6">
        <div className="glass-premium rounded-[28px] p-8 shadow-[0_20px_60px_rgba(16,60,48,0.12)]">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
            Secure access
          </p>
          <h1 className="font-display mt-2 text-2xl font-bold text-ink">
            Login to Caesar
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            For campaign directors, war rooms, and research analysts. Demo mode
            continues to theatre selection.
          </p>

          <form className="mt-8 space-y-4" action="/#regions">
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-muted">
                Work email
              </span>
              <input
                type="email"
                required
                placeholder="you@party.org"
                className="w-full rounded-xl border border-brand/15 bg-white/85 px-3.5 py-2.5 text-sm outline-none ring-brand/30 transition focus:ring-2"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-muted">
                Password
              </span>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full rounded-xl border border-brand/15 bg-white/85 px-3.5 py-2.5 text-sm outline-none ring-brand/30 transition focus:ring-2"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-brand to-teal py-3 text-sm font-bold text-white shadow-[0_8px_22px_rgba(10,143,108,0.3)] transition hover:brightness-105"
            >
              Continue to theatres
            </button>
          </form>

          <div className="mt-6 rounded-xl border border-brand/10 bg-brand-soft/50 px-3 py-2.5 text-center text-[11px] font-medium text-ink-muted">
            Auth is demo-only in this build — no credentials are stored.
          </div>

          <p className="mt-5 text-center text-xs text-ink-muted">
            Need a seat?{" "}
            <Link href="/#contact" className="font-semibold text-brand">
              Request access
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
