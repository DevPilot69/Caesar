"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, KeyRound, Lock, Mail } from "lucide-react";
import { loginSeedHint } from "@/data/tenancy/seed";
import { useAuth } from "@/lib/auth/auth-context";

export function LoginForm() {
  const { login, session, ready } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/dashboard";

  const [email, setEmail] = useState<string>(loginSeedHint[0].email);
  const [password, setPassword] = useState<string>(loginSeedHint[0].password);
  const [accessCode, setAccessCode] = useState<string>(
    loginSeedHint[0].accessCode,
  );
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (ready && session) {
      router.replace(next.startsWith("/") ? next : "/dashboard");
    }
  }, [ready, session, router, next]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const result = login(email, password, accessCode);
    setBusy(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.replace(next.startsWith("/") ? next : "/dashboard");
  }

  function fillSeed(
    emailValue: string,
    passwordValue: string,
    codeValue: string,
  ) {
    setEmail(emailValue);
    setPassword(passwordValue);
    setAccessCode(codeValue);
    setError(null);
  }

  return (
    <div className="space-y-5">
      <form className="space-y-4" onSubmit={onSubmit}>
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-muted">
            Agency email
          </span>
          <span className="relative block">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="access@agency.in"
              className="w-full rounded-xl border border-brand/15 bg-white/85 py-2.5 pl-10 pr-3.5 text-sm outline-none ring-brand/30 transition focus:ring-2"
            />
          </span>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-muted">
            Password
          </span>
          <span className="relative block">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              type={showPw ? "text" : "password"}
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-brand/15 bg-white/85 py-2.5 pl-10 pr-10 text-sm outline-none ring-brand/30 transition focus:ring-2"
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-1 text-ink-muted hover:text-brand"
              aria-label={showPw ? "Hide password" : "Show password"}
            >
              {showPw ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </span>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-muted">
            Access code
          </span>
          <span className="relative block">
            <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              type="text"
              required
              autoComplete="off"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              placeholder="e.g. RJN-UP-2027"
              className="w-full rounded-xl border border-brand/15 bg-white/85 py-2.5 pl-10 pr-3.5 font-mono text-sm outline-none ring-brand/30 transition focus:ring-2"
            />
          </span>
          <span className="mt-1.5 block text-[10px] font-medium text-ink-muted">
            Each code opens one dedicated state war room — no mixing, no
            switcher.
          </span>
        </label>

        {error ? (
          <p className="rounded-xl border border-coral/30 bg-coral-soft px-3 py-2 text-xs font-semibold text-coral">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-xl bg-gradient-to-r from-brand to-teal py-3 text-sm font-bold text-white shadow-[0_8px_22px_rgba(10,143,108,0.3)] transition hover:brightness-105 disabled:opacity-70"
        >
          {busy ? "Signing in…" : "Enter war room"}
        </button>
      </form>

      <div className="rounded-2xl border border-brand/10 bg-brand-soft/40 p-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
          3 access codes · 3 dedicated views
        </p>
        <ul className="mt-2 space-y-1.5">
          {loginSeedHint.map((seed) => (
            <li key={seed.accessCode}>
              <button
                type="button"
                onClick={() =>
                  fillSeed(seed.email, seed.password, seed.accessCode)
                }
                className="flex w-full flex-col rounded-xl border border-white/70 bg-white/70 px-3 py-2 text-left transition hover:border-brand/25 hover:bg-white"
              >
                <span className="text-[11px] font-bold text-ink">
                  {seed.label}
                </span>
                <span className="mt-0.5 font-mono text-[10px] text-ink-muted">
                  {seed.email} · {seed.password}
                </span>
                <span className="mt-0.5 font-mono text-[10px] font-bold text-brand">
                  {seed.accessCode} → {seed.opens}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[10px] leading-relaxed text-ink-muted">
          Want Punjab? Sign out and login with code 3. Want UP? Use code 1 or 2.
          The interface stays one clean state at a time.
        </p>
      </div>
    </div>
  );
}
