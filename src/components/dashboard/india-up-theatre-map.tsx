"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import india from "@svg-maps/india";
import { ArrowUpRight, MapPin, Maximize2 } from "lucide-react";
import { MapZoomModal } from "@/components/dashboard/map-zoom-modal";
import { UpStateTheatreMap } from "@/components/dashboard/up-state-theatre-map";
import { upConstituencyIndex, mapPins } from "@/data/uttar-pradesh/constituencies";

export function IndiaUpTheatreMap({
  query = "",
  selectedSlug,
  onSelect,
}: {
  query?: string;
  selectedSlug?: string | null;
  onSelect?: (slug: string) => void;
}) {
  const gid = useId().replace(/:/g, "");
  const [zoomOpen, setZoomOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const up = useMemo(
    () => india.locations.find((l) => l.id === "up")!,
    [],
  );
  const others = useMemo(
    () => india.locations.filter((l) => l.id !== "up"),
    [],
  );

  const q = query.trim().toLowerCase();
  const visiblePins = useMemo(() => {
    if (!q) return [...mapPins];
    return mapPins.filter(
      (p) =>
        p.label.toLowerCase().includes(q) ||
        p.slug.includes(q.replace(/\s+/g, "-")),
    );
  }, [q]);

  return (
    <>
      <div className="relative flex h-full min-h-[320px] w-full flex-col">
        <div className="absolute left-3 top-3 z-20 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
            India
          </span>
          <button
            type="button"
            onClick={() => setZoomOpen(true)}
            className="inline-flex items-center gap-1 rounded-full border border-white/80 bg-white/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ink-muted backdrop-blur-md transition hover:bg-white hover:text-brand"
          >
            <Maximize2 className="h-3 w-3" />
            Zoom UP
          </button>
        </div>

        <div className="absolute right-3 top-3 z-20">
          <button
            type="button"
            onClick={() => setZoomOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/80 bg-white/80 text-brand shadow-sm backdrop-blur-md transition hover:bg-white"
            aria-label="Open zoomed map"
            title="Zoom map"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>

        <svg
          viewBox={india.viewBox}
          className="relative z-[1] h-full w-full flex-1 cursor-zoom-in"
          role="img"
          aria-label="India map with Uttar Pradesh highlighted"
          style={{ maxHeight: 440 }}
          onDoubleClick={() => setZoomOpen(true)}
        >
          <defs>
            <linearGradient id={`${gid}-land`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#d7eee4" />
              <stop offset="100%" stopColor="#b8dccf" />
            </linearGradient>
            <linearGradient id={`${gid}-up`} x1="0" y1="0" x2="0.25" y2="1">
              <stop offset="0%" stopColor="#24c793" />
              <stop offset="40%" stopColor="#0a8f6c" />
              <stop offset="100%" stopColor="#045c47" />
            </linearGradient>
            <filter
              id={`${gid}-rise`}
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feDropShadow
                dx="0"
                dy={4}
                stdDeviation={3}
                floodColor="#045c47"
                floodOpacity={0.28}
              />
            </filter>
            <filter id={`${gid}-glow`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.8" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g>
            <g style={{ opacity: 0.88 }}>
              {others.map((loc) => (
                <path
                  key={loc.id}
                  d={loc.path}
                  fill={`url(#${gid}-land)`}
                  stroke="#7fbfa6"
                  strokeWidth={0.55}
                  strokeLinejoin="round"
                >
                  <title>{loc.name}</title>
                </path>
              ))}
            </g>

            <g
              style={{ filter: `url(#${gid}-rise)` }}
              onClick={() => setZoomOpen(true)}
              className="cursor-zoom-in"
            >
              <path
                d={up.path}
                fill={`url(#${gid}-up)`}
                stroke="#033d30"
                strokeWidth={1.05}
                strokeLinejoin="round"
                filter={`url(#${gid}-glow)`}
              >
                <title>Uttar Pradesh — click to zoom</title>
              </path>
              <path
                d={up.path}
                fill="none"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth={0.7}
                className="pointer-events-none"
              />
            </g>

            {visiblePins.map((pin) => {
              const meta = upConstituencyIndex.find((c) => c.slug === pin.slug);
              const active =
                selectedSlug === pin.slug ||
                hovered === pin.slug ||
                (!!q && visiblePins.length === 1);
              return (
                <g
                  key={pin.slug}
                  transform={`translate(${pin.x} ${pin.y})`}
                  className="cursor-pointer"
                  onMouseEnter={() => setHovered(pin.slug)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect?.(pin.slug);
                  }}
                >
                  {active && (
                    <circle
                      r="14"
                      fill="rgba(10,143,108,0.22)"
                      className="animate-ping"
                      style={{ animationDuration: "2.2s" }}
                    />
                  )}
                  <circle
                    r={active ? 6.5 : 5}
                    fill={active ? "#056b52" : "#0a8f6c"}
                    stroke="#fff"
                    strokeWidth="1.6"
                  />
                  {(active || hovered === pin.slug) && (
                    <g transform="translate(9 -16)">
                      <rect
                        x="0"
                        y="0"
                        rx="5"
                        width={Math.max(58, pin.label.length * 6.8 + 12)}
                        height="20"
                        fill="rgba(16,28,24,0.92)"
                      />
                      <text
                        x="7"
                        y="13.5"
                        fill="#fff"
                        fontSize="9"
                        fontWeight="700"
                      >
                        {pin.label}
                        {meta ? ` · ${meta.lastWinner}` : ""}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </svg>

        <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 rounded-xl border border-white/80 bg-white/80 px-3 py-2 text-xs shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            <MapPin className="h-3.5 w-3.5 text-brand" />
            <span className="font-bold text-brand-dark">Republic of India</span>
            <span className="text-ink-muted">
              National overview · click UP to zoom
            </span>
          </div>
          {selectedSlug && (
            <Link
              href={`/dashboard/constituencies/${selectedSlug}`}
              className="inline-flex items-center gap-1 rounded-xl bg-brand px-3 py-2 text-xs font-bold text-white shadow-sm transition hover:brightness-105"
            >
              Open theatre
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>

      <MapZoomModal
        open={zoomOpen}
        onClose={() => setZoomOpen(false)}
        title="Uttar Pradesh"
        subtitle="Zoom in and out · pan when zoomed · pin a theatre"
      >
        <UpStateTheatreMap
          mode="lightbox"
          selectedSlug={selectedSlug}
          onSelect={onSelect}
        />
      </MapZoomModal>
    </>
  );
}
