"use client";

import { useCallback, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import india from "@svg-maps/india";
import {
  ArrowUpRight,
  MapPin,
  Maximize2,
  Minus,
  Plus,
  RotateCcw,
} from "lucide-react";
import { MapZoomModal } from "@/components/dashboard/map-zoom-modal";
import { upConstituencyIndex, mapPins } from "@/data/uttar-pradesh/constituencies";

/** Crop tightly to Uttar Pradesh in the India SVG projection */
const UP_VIEWBOX = "168 148 240 210";
const UP_CX = 285;
const UP_CY = 245;

const ZOOM_MIN = 1;
const ZOOM_MAX = 2.8;
const ZOOM_STEP = 0.2;
const EXTRUDE_LAYERS = 14;

type MapMode = "card" | "lightbox";

function UpStateMapCanvas({
  mode,
  selectedSlug,
  onSelect,
  onRequestZoom,
}: {
  mode: MapMode;
  selectedSlug?: string | null;
  onSelect?: (slug: string) => void;
  /** Card mode: any zoom intent opens the modal */
  onRequestZoom?: () => void;
}) {
  const gid = useId().replace(/:/g, "");
  const router = useRouter();
  const dragRef = useRef<{ x: number; y: number; panX: number; panY: number } | null>(
    null,
  );
  const [hovered, setHovered] = useState<string | null>(null);
  const [hoverState, setHoverState] = useState<string | null>(null);
  const [zoom, setZoom] = useState(mode === "lightbox" ? 1.35 : 1.12);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const up = useMemo(
    () => india.locations.find((l) => l.id === "up")!,
    [],
  );
  const neighbors = useMemo(
    () =>
      india.locations.filter((l) =>
        ["ut", "dl", "hr", "rj", "mp", "br", "jh", "ct", "pb", "hp"].includes(
          l.id,
        ),
      ),
    [],
  );

  const activeSlug = selectedSlug ?? hovered;
  const zoomPct = Math.round(zoom * 100);
  const interactive = mode === "lightbox";

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
    setZoom(1.35);
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
    if (!interactive || zoom <= 1.05) return;
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
      x: dragRef.current.panX + dx * 0.45,
      y: dragRef.current.panY + dy * 0.45,
    });
  };

  const onPointerUp = () => {
    dragRef.current = null;
  };

  const camera = `translate(${UP_CX + pan.x} ${UP_CY + pan.y}) scale(${zoom}) translate(${-UP_CX} ${-UP_CY})`;

  return (
    <div className="relative flex h-full min-h-[280px] w-full flex-col">
      <div className="absolute left-3 top-3 z-20 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/75 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand shadow-sm backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
          </span>
          State theatre · UP
        </span>
      </div>

      <div className="absolute right-3 top-3 z-20 flex flex-col overflow-hidden rounded-xl border border-white/80 bg-white/80 shadow-sm backdrop-blur-md">
        {mode === "card" ? (
          <button
            type="button"
            onClick={() => onRequestZoom?.()}
            className="flex h-10 w-10 items-center justify-center text-brand transition hover:bg-brand-soft"
            aria-label="Open zoomed map"
            title="Zoom map"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        ) : null}
        <button
          type="button"
          onClick={zoomIn}
          disabled={interactive && zoom >= ZOOM_MAX}
          className="flex h-9 w-9 items-center justify-center text-brand transition hover:bg-brand-soft disabled:opacity-35"
          aria-label="Zoom in"
        >
          <Plus className="h-4 w-4" />
        </button>
        <div className="border-y border-brand/10 px-1 py-1.5 text-center text-[10px] font-bold tabular-nums text-ink">
          {interactive ? `${zoomPct}%` : "Zoom"}
        </div>
        <button
          type="button"
          onClick={zoomOut}
          disabled={interactive && zoom <= ZOOM_MIN}
          className="flex h-9 w-9 items-center justify-center text-brand transition hover:bg-brand-soft disabled:opacity-35"
          aria-label="Zoom out"
        >
          <Minus className="h-4 w-4" />
        </button>
        {interactive ? (
          <button
            type="button"
            onClick={resetView}
            className="flex h-8 w-9 items-center justify-center border-t border-brand/10 text-ink-muted transition hover:bg-brand-mist hover:text-brand"
            aria-label="Reset view"
            title="Reset"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        ) : null}
      </div>

      <div
        className={`relative flex-1 overflow-hidden ${
          interactive && zoom > 1.05
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
        style={{ perspective: "900px" }}
      >
        <svg
          viewBox={UP_VIEWBOX}
          className="relative z-[1] h-full w-full"
          role="img"
          aria-label="Uttar Pradesh state map with constituency theatres"
          style={{
            maxHeight: mode === "lightbox" ? undefined : 420,
            height: mode === "lightbox" ? "100%" : undefined,
            transform: "rotateX(10deg) rotateZ(-2deg)",
            transformOrigin: "50% 55%",
            transition: "transform 0.4s ease",
          }}
        >
          <defs>
            <linearGradient id={`${gid}-nbr`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e4f2eb" />
              <stop offset="100%" stopColor="#d0e6db" />
            </linearGradient>
            <linearGradient id={`${gid}-up`} x1="0" y1="0" x2="0.15" y2="1">
              <stop offset="0%" stopColor="#2dd4a0" />
              <stop offset="35%" stopColor="#0a8f6c" />
              <stop offset="100%" stopColor="#034d3b" />
            </linearGradient>
            <linearGradient id={`${gid}-side`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#056b52" />
              <stop offset="100%" stopColor="#022e24" />
            </linearGradient>
            <filter
              id={`${gid}-ground`}
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feDropShadow
                dx="0"
                dy="18"
                stdDeviation="14"
                floodColor="#045c47"
                floodOpacity="0.35"
              />
            </filter>
            <filter id={`${gid}-top`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="2"
                floodColor="#000"
                floodOpacity="0.15"
              />
            </filter>
          </defs>

          <g
            style={{
              transform: camera,
              transformOrigin: "center",
              transition: dragRef.current
                ? "none"
                : "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <g opacity={0.28}>
              {neighbors.map((loc) => (
                <path
                  key={loc.id}
                  d={loc.path}
                  fill={`url(#${gid}-nbr)`}
                  stroke="#9fc4b2"
                  strokeWidth={0.5}
                  strokeLinejoin="round"
                  onMouseEnter={() => setHoverState(loc.name)}
                  onMouseLeave={() => setHoverState(null)}
                >
                  <title>{loc.name}</title>
                </path>
              ))}
            </g>

            <ellipse
              cx={UP_CX}
              cy={UP_CY + 48}
              rx="108"
              ry="28"
              fill="rgba(4,92,71,0.18)"
              className="pointer-events-none"
              filter={`url(#${gid}-ground)`}
            />

            <g className="pointer-events-none">
              {Array.from({ length: EXTRUDE_LAYERS }, (_, i) => {
                const step = EXTRUDE_LAYERS - i;
                return (
                  <path
                    key={step}
                    d={up.path}
                    fill={`url(#${gid}-side)`}
                    opacity={0.55 + (i / EXTRUDE_LAYERS) * 0.35}
                    transform={`translate(${step * 0.55} ${step * 0.95})`}
                  />
                );
              })}
            </g>

            <g filter={`url(#${gid}-top)`}>
              <path
                d={up.path}
                fill={`url(#${gid}-up)`}
                stroke="#022e24"
                strokeWidth={1.35}
                strokeLinejoin="round"
                onMouseEnter={() => setHoverState("Uttar Pradesh")}
                onMouseLeave={() => setHoverState(null)}
              >
                <title>Uttar Pradesh</title>
              </path>
              <path
                d={up.path}
                fill="none"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth={1}
                className="pointer-events-none"
              />
              <path
                d={up.path}
                fill="rgba(255,255,255,0.08)"
                className="pointer-events-none"
                transform="translate(-1.2 -1.5)"
              />
            </g>

            {mapPins.map((pin) => {
              const meta = upConstituencyIndex.find((c) => c.slug === pin.slug);
              const active = activeSlug === pin.slug;
              return (
                <g
                  key={pin.slug}
                  transform={`translate(${pin.x} ${pin.y})`}
                  className="cursor-pointer"
                  onMouseEnter={() => {
                    setHovered(pin.slug);
                    setHoverState(pin.label);
                  }}
                  onMouseLeave={() => {
                    setHovered(null);
                    setHoverState(null);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect?.(pin.slug);
                    if (mode === "card") {
                      router.push(`/dashboard/constituencies/${pin.slug}`);
                    }
                  }}
                >
                  <ellipse
                    cx="0"
                    cy="7"
                    rx={active ? 6 : 4.5}
                    ry={active ? 2.2 : 1.6}
                    fill="rgba(2,46,36,0.35)"
                    className="pointer-events-none"
                  />
                  {active && (
                    <circle
                      r="15"
                      fill="rgba(255,255,255,0.22)"
                      className="animate-ping"
                      style={{ animationDuration: "2s" }}
                    />
                  )}
                  <circle
                    r={active ? 7.5 : 6}
                    fill={active ? "#fff" : "rgba(255,255,255,0.95)"}
                    stroke={active ? "#045c47" : "#0a8f6c"}
                    strokeWidth={active ? 2.4 : 1.9}
                  />
                  <circle
                    r={active ? 3 : 2.4}
                    fill={active ? "#045c47" : "#0a8f6c"}
                  />
                  {(active || hovered === pin.slug) && (
                    <g transform="translate(10 -20)">
                      <rect
                        x="0"
                        y="0"
                        rx="5"
                        width={Math.max(70, pin.label.length * 7 + 18)}
                        height="22"
                        fill="rgba(16,28,24,0.92)"
                      />
                      <text
                        x="8"
                        y="14.5"
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
      </div>

      <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2">
        <div className="inline-flex items-center gap-2 rounded-xl border border-white/80 bg-white/80 px-3 py-2 text-xs shadow-sm backdrop-blur-md">
          <MapPin className="h-3.5 w-3.5 text-brand" />
          <span className="font-bold text-brand-dark">Uttar Pradesh</span>
          <span className="text-ink-muted">
            {hoverState ?? `${mapPins.length} theatres`}
          </span>
          {interactive ? (
            <span className="rounded-md bg-brand-mist px-1.5 py-0.5 text-[10px] font-bold text-brand">
              {zoomPct}%
            </span>
          ) : (
            <span className="rounded-md bg-brand-mist px-1.5 py-0.5 text-[10px] font-bold text-brand">
              Tap zoom
            </span>
          )}
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
  );
}

export function UpStateTheatreMap({
  selectedSlug,
  onSelect,
  mode = "card",
}: {
  selectedSlug?: string | null;
  onSelect?: (slug: string) => void;
  mode?: MapMode;
}) {
  const [zoomOpen, setZoomOpen] = useState(false);

  if (mode === "lightbox") {
    return (
      <UpStateMapCanvas
        mode="lightbox"
        selectedSlug={selectedSlug}
        onSelect={onSelect}
      />
    );
  }

  return (
    <>
      <UpStateMapCanvas
        mode="card"
        selectedSlug={selectedSlug}
        onSelect={onSelect}
        onRequestZoom={() => setZoomOpen(true)}
      />
      <MapZoomModal
        open={zoomOpen}
        onClose={() => setZoomOpen(false)}
        title="Uttar Pradesh"
        subtitle="Zoom in and out · pan when zoomed · pin a theatre"
      >
        <UpStateMapCanvas
          mode="lightbox"
          selectedSlug={selectedSlug}
          onSelect={(slug) => {
            onSelect?.(slug);
          }}
        />
      </MapZoomModal>
    </>
  );
}
