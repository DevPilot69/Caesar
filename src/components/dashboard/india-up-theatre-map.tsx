"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import india from "@svg-maps/india";
import { ArrowUpRight, MapPin, Maximize2 } from "lucide-react";
import { MapZoomModal } from "@/components/dashboard/map-zoom-modal";
import { UpStateTheatreMap } from "@/components/dashboard/up-state-theatre-map";
import { PunjabStateTheatreMap } from "@/components/dashboard/punjab-state-theatre-map";
import { useStatePack } from "@/lib/use-state-pack";
import { useAuth } from "@/lib/auth/auth-context";

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
  const { activeState, allowedStates } = useAuth();
  const pack = useStatePack();
  const [zoomOpen, setZoomOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const licensedMapIds = useMemo(
    () => new Set(allowedStates.map((s) => s.mapId)),
    [allowedStates],
  );
  const activeMapId = activeState?.mapId ?? "up";

  const licensedLocs = useMemo(
    () => india.locations.filter((l) => licensedMapIds.has(l.id)),
    [licensedMapIds],
  );
  const others = useMemo(
    () => india.locations.filter((l) => !licensedMapIds.has(l.id)),
    [licensedMapIds],
  );

  const q = query.trim().toLowerCase();
  const pins = pack.mapPins;
  const visiblePins = useMemo(() => {
    if (!q) return [...pins];
    return pins.filter(
      (p) =>
        p.label.toLowerCase().includes(q) ||
        p.slug.includes(q.replace(/\s+/g, "-")),
    );
  }, [q, pins]);

  const zoomLabel =
    pack.code === "PB" ? "Zoom Punjab" : "Zoom UP";

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
            {zoomLabel}
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
          aria-label={`India map — licensed: ${allowedStates.map((s) => s.shortName).join(", ")}`}
          style={{ maxHeight: 440 }}
          onDoubleClick={() => setZoomOpen(true)}
        >
          <defs>
            <linearGradient id={`${gid}-land`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#d7eee4" />
              <stop offset="100%" stopColor="#b8dccf" />
            </linearGradient>
            <linearGradient id={`${gid}-lic`} x1="0" y1="0" x2="0.25" y2="1">
              <stop offset="0%" stopColor="#24c793" />
              <stop offset="40%" stopColor="#0a8f6c" />
              <stop offset="100%" stopColor="#045c47" />
            </linearGradient>
            <linearGradient id={`${gid}-dim`} x1="0" y1="0" x2="0.25" y2="1">
              <stop offset="0%" stopColor="#7dbea6" />
              <stop offset="100%" stopColor="#4a8f78" />
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
            <g style={{ opacity: 0.55 }}>
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

            {licensedLocs.map((loc) => {
              const isActive = loc.id === activeMapId;
              return (
                <g
                  key={loc.id}
                  style={{ filter: isActive ? `url(#${gid}-rise)` : undefined }}
                  onClick={() => setZoomOpen(true)}
                  className="cursor-zoom-in"
                  opacity={isActive ? 1 : 0.72}
                >
                  <path
                    d={loc.path}
                    fill={
                      isActive ? `url(#${gid}-lic)` : `url(#${gid}-dim)`
                    }
                    stroke="#033d30"
                    strokeWidth={isActive ? 1.15 : 0.85}
                    strokeLinejoin="round"
                    filter={isActive ? `url(#${gid}-glow)` : undefined}
                  >
                    <title>
                      {loc.name}
                      {isActive ? " — active scope" : " — licensed"}
                    </title>
                  </path>
                </g>
              );
            })}

            {visiblePins.map((pin) => {
                const meta = pack.constituencies.find((c) => c.slug === pin.slug);
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
            <span className="font-bold text-brand-dark">
              {activeState?.name ?? "State"}
            </span>
            <span className="text-ink-muted">
              Licensed{" "}
              {allowedStates.map((s) => s.shortName).join(" · ") || "—"}
            </span>
          </div>
          {selectedSlug && activeState?.code === "UP" && (
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
        title={pack.state.name}
        subtitle={
          pack.code === "PB"
            ? "Punjab map · 5 sample constituencies · no UP data"
            : "Uttar Pradesh map · zoom, pan, pin theatres"
        }
      >
        {pack.code === "PB" ? (
          <PunjabStateTheatreMap
            mode="lightbox"
            selectedSlug={selectedSlug}
            onSelect={onSelect}
          />
        ) : (
          <UpStateTheatreMap
            mode="lightbox"
            selectedSlug={selectedSlug}
            onSelect={onSelect}
          />
        )}
      </MapZoomModal>
    </>
  );
}
