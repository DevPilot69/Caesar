"use client";

import { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { X, Maximize2 } from "lucide-react";

export function MapZoomModal({
  open,
  onClose,
  title = "Theatre map",
  subtitle,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-[#0a1a14]/55 backdrop-blur-md transition"
        aria-label="Close map"
        onClick={onClose}
      />
      <div className="animate-float-in relative z-[1] flex h-[min(92dvh,920px)] w-full max-w-6xl flex-col overflow-hidden rounded-t-3xl border border-white/70 bg-gradient-to-br from-[#e8f6f0] via-[#f7fcfa] to-[#dff3eb] shadow-[0_30px_80px_rgba(4,92,71,0.35)] sm:rounded-3xl">
        <header className="relative z-[2] flex shrink-0 items-start justify-between gap-3 border-b border-brand/10 bg-white/55 px-4 py-3 backdrop-blur-md sm:px-5">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
              <Maximize2 className="h-3 w-3" />
              Zoom theatre
            </div>
            <h2
              id={titleId}
              className="font-display mt-0.5 truncate text-lg font-bold text-ink sm:text-xl"
            >
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-0.5 text-xs text-ink-muted">{subtitle}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/80 bg-white/80 text-ink transition hover:bg-white hover:text-brand"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </header>
        <div className="relative min-h-0 flex-1 p-2 sm:p-3">{children}</div>
        <p className="shrink-0 px-4 pb-3 text-center text-[10px] text-ink-muted sm:px-5">
          Scroll or use + / − to zoom · drag to pan when zoomed · Esc to close
        </p>
      </div>
    </div>,
    document.body,
  );
}
