"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Shield, X } from "lucide-react";

const navLinks = [
  { label: "About Us", href: "#about" },
  { label: "Features", href: "#how" },
  { label: "Theatres", href: "#regions" },
  { label: "Pricing", href: "#contact" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-10">
      <div className="glass-strong mx-auto flex max-w-[1280px] items-center justify-between gap-4 rounded-2xl px-4 py-3 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand via-brand-light to-teal text-white shadow-[0_6px_20px_rgba(10,143,108,0.4)]">
            <Shield className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <span className="leading-tight">
            <span className="font-display block text-[15px] font-semibold tracking-tight text-ink sm:text-base">
              Caesar
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.14em] text-brand">
              Political Intelligence OS
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-muted transition-colors hover:text-brand"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/login"
            className="hidden rounded-xl border border-brand/25 bg-white/50 px-3.5 py-2 text-sm font-semibold text-brand backdrop-blur-sm transition hover:border-brand hover:bg-brand-soft sm:inline-flex"
          >
            Login
          </Link>
          <a
            href="#regions"
            className="rounded-xl bg-gradient-to-r from-brand to-teal px-3.5 py-2 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(10,143,108,0.32)] transition hover:brightness-105"
          >
            Enter Theatre
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-brand/15 bg-white/60 text-ink lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="glass-premium fixed inset-x-4 top-[4.75rem] z-50 rounded-2xl p-4 shadow-xl lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-ink transition hover:bg-brand-soft hover:text-brand"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/login"
              className="mt-2 rounded-xl border border-brand/20 px-3 py-3 text-center text-sm font-semibold text-brand"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
