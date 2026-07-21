"use client";

import { Suspense } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/landing/site-header";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main className="mx-auto flex max-w-md flex-col px-4 py-14 sm:px-6">
        <div className="glass-premium rounded-[28px] p-8 shadow-[0_20px_60px_rgba(16,60,48,0.12)]">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
            Agency access
          </p>
          <h1 className="font-display mt-2 text-2xl font-bold text-ink">
            Login to Caesar
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            Email, password, and access code. Each code opens one dedicated
            state war room — clean, separate, no in-app switching.
          </p>

          <div className="mt-8">
            <Suspense
              fallback={
                <p className="text-sm text-ink-muted">Loading sign-in…</p>
              }
            >
              <LoginForm />
            </Suspense>
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
