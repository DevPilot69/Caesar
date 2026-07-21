"use client";

import { MapPin } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";

/** Single dedicated state badge — no switcher. Code at login picks the view. */
export function StateScopeSwitcher({ compact = false }: { compact?: boolean }) {
  const { session, activeState } = useAuth();

  if (!session || !activeState) return null;

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-xl border border-brand/20 bg-brand-mist/80 font-semibold text-brand-dark shadow-sm ${
        compact ? "px-2.5 py-1.5 text-xs" : "px-3 py-2 text-sm"
      }`}
    >
      <MapPin className="h-4 w-4 text-brand" />
      {activeState.name}
      <span className="font-normal text-ink-muted">
        · dedicated view
      </span>
    </div>
  );
}
