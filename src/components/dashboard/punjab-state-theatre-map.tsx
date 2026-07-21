"use client";

import { useCallback, useId, useMemo, useRef, useState } from "react";
import { MapPin, Maximize2, Minus, Plus, RotateCcw } from "lucide-react";
import india from "@svg-maps/india";
import { MapZoomModal } from "@/components/dashboard/map-zoom-modal";
import {
  punjabConstituencyIndex,
  punjabMapPins,
} from "@/data/punjab/constituencies";

/**
 * Tight crop on Punjab only (bbox ~119–183 × 115–189).
 * No pan of whole India — clean state theatre.
 */
const PB_VIEWBOX = "112 108 82 92";
const PB_CX = 151;
const PB_CY = 152;

const ZOOM_MIN = 1;
const ZOOM_MAX = 2.4;
const ZOOM_STEP = 0.2;

function PunjabMapCanvas({
  mode,
  selectedSlug,
  onSelect,
  onRequestZoom,
}: {
  mode: "card" | "lightbox";
  selectedSlug?: string | null;
  onSelect?: (slug: string) => void;
  onRequestZoom?: () => void;
}) {
  const gid = useId().replace(/:/g, "");
  const dragRef = useRef<{
    x: number;
    y: number;
    panX: number;
    panY: number;
  } | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const pb = useMemo(
    () => india.locations.find((l) => l.id === "pb")!,
    [],
  );
  /** Immediate neighbors only — keep frame quiet */
  const neighbors = useMemo(
    () =>
      india.locations.filter((l) =>
        ["hp", "hr", "ch", "rj"].includes(l.id),
      ),
    [],
  );

  const interactive = mode === "lightbox";
  const zoomPct = Math.round(zoom * 100);
  const activeSlug = selectedSlug ?? hovered;

  const clampZoom = useCallback((z: number) => {
    return Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.round(z * 100) / 100));
  }, []);

  const zoomIn = () => {
    if (!interactive) {
      onRequestZoom?.();
      return;
    }
    setZoom((z) => clampZoom(z + ZOOM_STEP));
  };
  const zoomOut = () => {
    if (!interactive) {
      onRequestZoom?.();
      return;
    }
    setZoom((z) => clampZoom(z - ZOOM_STEP));
  };
  const resetView = () => {
    if (!interactive) {
      onRequestZoom?.();
      return;
    }
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const onWheel = (e: React.WheelEvent) => {
    if (!interactive) {
      e.preventDefault();
      onRequestZoom?.();
      return;
    }
    e.preventDefault();
    const delta = e.deltaY > 0 ? -ZOOM_STEP / 2 : ZOOM_STEP / 2;
    setZoom((z) => clampZoom(z + delta));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (!interactive || zoom <= 1.02) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = (e.clientX - dragRef.current.x) / zoom;
    const dy = (e.clientY - dragRef.current.y) / zoom;
    setPan({
      x: dragRef.current.panX + dx * 0.4,
      y: dragRef.current.panY + dy * 0.4,
    });
  };

  const onPointerUp = () => {
    dragRef.current = null;
  };

  const camera = `translate(${PB_CX + pan.x} ${PB_CY + pan.y}) scale(${zoom}) translate(${-PB_CX} ${-PB_CY})`;

  return (
    <div className="relative flex h-full min-h-[300px] w-full flex-col">
      <div className="absolute left-3 top-3 z-20">
        <span className="rounded-full border border-white/80 bg-white/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand shadow-sm backdrop-blur-md">
          Punjab
        </span>
      </div>

      <div className="absolute right-3 top-3 z-20 flex flex-col overflow-hidden rounded-xl border border-white/80 bg-white/85 shadow-sm backdrop-blur-md">
        {mode === "card" ? (
          <button
            type="button"
            onClick={() => onRequestZoom?.()}
            className="flex h-9 w-9 items-center justify-center text-brand transition hover:bg-brand-soft"
            aria-label="Expand map"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
        ) : null}
        <button
          type="button"
          onClick={zoomIn}
          className="flex h-9 w-9 items-center justify-center text-brand transition hover:bg-brand-soft"
          aria-label="Zoom in"
        >
          <Plus className="h-4 w-4" />
        </button>
        {interactive ? (
          <>
            <div className="border-y border-brand/10 px-1 py-1 text-center text-[10px] font-bold tabular-nums text-ink">
              {zoomPct}%
            </div>
            <button
              type="button"
              onClick={zoomOut}
              className="flex h-9 w-9 items-center justify-center text-brand transition hover:bg-brand-soft"
              aria-label="Zoom out"
            >
              <Minus className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={resetView}
              className="flex h-8 w-9 items-center justify-center border-t border-brand/10 text-ink-muted transition hover:bg-brand-mist hover:text-brand"
              aria-label="Reset view"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={zoomOut}
            className="flex h-9 w-9 items-center justify-center border-t border-brand/10 text-brand transition hover:bg-brand-soft"
            aria-label="Zoom out"
          >
            <Minus className="h-4 w-4" />
          </button>
        )}
      </div>

      <div
        className={`relative flex-1 overflow-hidden ${
          interactive && zoom > 1.02
            ? "cursor-grab active:cursor-grabbing"
            : mode === "card"
              ? "cursor-zoom-in"
              : ""
        }`}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={() => {
          if (!interactive) onRequestZoom?.();
        }}
      >
        <svg
          viewBox={PB_VIEWBOX}
          className="relative z-[1] h-full w-full"
          role="img"
          aria-label="Punjab state map with five constituency theatres"
          style={{
            maxHeight: mode === "lightbox" ? undefined : 380,
            height: mode === "lightbox" ? "100%" : undefined,
          }}
        >
          <defs>
            <linearGradient id={`${gid}-nbr`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e8f3ed" />
              <stop offset="100%" stopColor="#d5e8de" />
            </linearGradient>
            <linearGradient id={`${gid}-pb`} x1="0" y1="0" x2="0.2" y2="1">
              <stop offset="0%" stopColor="#2dd4a0" />
              <stop offset="45%" stopColor="#0a8f6c" />
              <stop offset="100%" stopColor="#045c47" />
            </linearGradient>
            <clipPath id={`${gid}-frame`}>
              <rect
                x={112}
                y={108}
                width={82}
                height={92}
                rx={2}
              />
            </clipPath>
          </defs>

          <g clipPath={`url(#${gid}-frame)`}>
            <g
              style={{
                transform: camera,
                transformOrigin: "center",
                transition: dragRef.current
                  ? "none"
                  : "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <g opacity={0.22}>
                {neighbors.map((loc) => (
                  <path
                    key={loc.id}
                    d={loc.path}
                    fill={`url(#${gid}-nbr)`}
                    stroke="#a8c9b8"
                    strokeWidth={0.4}
                    strokeLinejoin="round"
                  />
                ))}
              </g>

              <path
                d={pb.path}
                fill={`url(#${gid}-pb)`}
                stroke="#022e24"
                strokeWidth={1.1}
                strokeLinejoin="round"
              >
                <title>Punjab</title>
              </path>
              <path
                d={pb.path}
                fill="none"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth={0.8}
                className="pointer-events-none"
              />

              {punjabMapPins.map((pin) => {
                const meta = punjabConstituencyIndex.find(
                  (c) => c.slug === pin.slug,
                );
                const active = activeSlug === pin.slug;
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
                        r="9"
                        fill="rgba(255,255,255,0.25)"
                        className="animate-ping"
                        style={{ animationDuration: "2s" }}
                      />
                    )}
                    <circle
                      r={active ? 5.5 : 4.5}
                      fill="#fff"
                      stroke={active ? "#045c47" : "#0a8f6c"}
                      strokeWidth={active ? 2 : 1.6}
                    />
                    <circle
                      r={active ? 2.2 : 1.8}
                      fill={active ? "#045c47" : "#0a8f6c"}
                    />
                    {(active || hovered === pin.slug) && (
                      <g transform="translate(8 -14)">
                        <rect
                          x="0"
                          y="0"
                          rx="4"
                          width={Math.max(64, pin.label.length * 5.8 + 14)}
                          height="18"
                          fill="rgba(16,28,24,0.92)"
                        />
                        <text
                          x="7"
                          y="12.5"
                          fill="#fff"
                          fontSize="8"
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
          </g>
        </svg>
      </div>

      <div className="absolute bottom-3 left-3 z-20">
        <div className="inline-flex items-center gap-2 rounded-xl border border-white/80 bg-white/90 px-3 py-2 text-xs shadow-sm backdrop-blur-md">
          <MapPin className="h-3.5 w-3.5 text-brand" />
          <span className="font-bold text-brand-dark">5 theatres</span>
        </div>
      </div>
    </div>
  );
}

export function PunjabStateTheatreMap({
  selectedSlug,
  onSelect,
  mode = "card",
}: {
  selectedSlug?: string | null;
  onSelect?: (slug: string) => void;
  mode?: "card" | "lightbox";
}) {
  const [zoomOpen, setZoomOpen] = useState(false);

  if (mode === "lightbox") {
    return (
      <PunjabMapCanvas
        mode="lightbox"
        selectedSlug={selectedSlug}
        onSelect={onSelect}
      />
    );
  }

  return (
    <>
      <PunjabMapCanvas
        mode="card"
        selectedSlug={selectedSlug}
        onSelect={onSelect}
        onRequestZoom={() => setZoomOpen(true)}
      />
      <MapZoomModal
        open={zoomOpen}
        onClose={() => setZoomOpen(false)}
        title="Punjab"
        subtitle="Five sample constituencies · dedicated state view"
      >
        <PunjabMapCanvas
          mode="lightbox"
          selectedSlug={selectedSlug}
          onSelect={onSelect}
        />
      </MapZoomModal>
    </>
  );
}
