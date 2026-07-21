"use client";

import { Check, Inbox, Loader2, SearchX } from "lucide-react";

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-gradient-to-r from-brand-mist via-white/70 to-brand-mist bg-[length:200%_100%] skeleton-shimmer ${className}`}
    />
  );
}

export function EmptyState({
  title,
  description,
  icon = "search",
}: {
  title: string;
  description: string;
  icon?: "search" | "inbox";
}) {
  const Icon = icon === "inbox" ? Inbox : SearchX;
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-brand/20 bg-white/35 px-6 py-12 text-center backdrop-blur-sm">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand">
        <Icon className="h-5 w-5" />
      </span>
      <p className="font-display mt-4 text-base font-bold text-ink">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-ink-muted">{description}</p>
    </div>
  );
}

export function LoadingBlock({ label = "Loading intelligence…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-2xl border border-white/70 bg-white/45 px-4 py-10 text-sm font-semibold text-ink-muted backdrop-blur-md">
      <Loader2 className="h-4 w-4 animate-spin text-brand" />
      {label}
    </div>
  );
}

export function SuccessToast({
  message,
  onDismiss,
}: {
  message: string;
  onDismiss?: () => void;
}) {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-2xl border border-white/80 bg-ink/90 px-4 py-3 text-sm font-semibold text-white shadow-2xl backdrop-blur-xl animate-float-in">
      <Check className="h-4 w-4 text-brand-light" />
      <span>{message}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="ml-2 text-xs font-bold text-white/70 hover:text-white"
        >
          Dismiss
        </button>
      )}
    </div>
  );
}
