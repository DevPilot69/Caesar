"use client";

import { useMemo, useState } from "react";

const pins = [
  { id: "can", label: "Canada", x: 220, y: 130, tone: "#0e9aa7" },
  { id: "usa", label: "USA", x: 200, y: 200, tone: "#0a8f6c" },
  { id: "uk", label: "UK", x: 460, y: 140, tone: "#c4a35a" },
  { id: "de", label: "Germany", x: 500, y: 160, tone: "#e07a5f" },
  { id: "in", label: "India", x: 670, y: 240, tone: "#c4a35a", large: true },
];

function arcPath(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  const my = Math.min(y1, y2) - 40 - Math.abs(x2 - x1) * 0.08;
  return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
}

export function DottedWorldMap() {
  const [active, setActive] = useState("in");
  const arcs = useMemo(() => {
    const india = pins.find((p) => p.id === "in")!;
    return pins
      .filter((p) => p.id !== "in")
      .map((p) => ({
        id: `${p.id}-in`,
        d: arcPath(p.x, p.y, india.x, india.y),
        from: p.id,
      }));
  }, []);

  return (
    <div
      className="relative mx-auto w-full max-w-[720px]"
      role="img"
      aria-label="Global coverage map highlighting Canada, USA, UK, Germany, and India"
    >
      <div className="glass-premium relative overflow-hidden rounded-[32px] p-3 sm:p-5">
        <div className="pointer-events-none absolute inset-0">
          <div className="aurora-blob absolute -left-10 top-[8%] h-56 w-56 rounded-full bg-brand/35 blur-3xl" />
          <div className="aurora-blob-delay absolute -right-8 top-0 h-52 w-52 rounded-full bg-accent/40 blur-3xl" />
          <div className="absolute bottom-[8%] left-[25%] h-40 w-56 rounded-full bg-teal/30 blur-3xl" />
        </div>

        <div className="relative mb-2 flex items-center justify-between px-1 sm:px-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            Live coverage
          </span>
          <span className="text-[10px] font-semibold text-ink-muted">
            5 theatres · India primary
          </span>
        </div>

        <div className="relative mx-auto aspect-[950/620] w-full">
          {/* Ocean grid */}
          <div
            className="absolute inset-0 rounded-2xl opacity-50"
            style={{
              backgroundImage: `
                radial-gradient(circle, rgba(14,154,167,0.22) 1px, transparent 1.2px),
                radial-gradient(circle, rgba(196,163,90,0.12) 1px, transparent 1.2px)
              `,
              backgroundSize: "14px 14px, 20px 20px",
              backgroundPosition: "0 0, 7px 7px",
            }}
          />

          {/* Continent dots */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, #087a5c 1.7px, transparent 1.8px)",
              backgroundSize: "6.5px 6.5px",
              WebkitMaskImage: "url(/world-low.svg)",
              maskImage: "url(/world-low.svg)",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
            }}
          />
          <div
            className="absolute inset-0 opacity-65"
            style={{
              backgroundImage:
                "radial-gradient(circle, #14c896 1.25px, transparent 1.4px)",
              backgroundSize: "8px 8px",
              backgroundPosition: "2px 2px",
              WebkitMaskImage: "url(/world-low.svg)",
              maskImage: "url(/world-low.svg)",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
            }}
          />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse 40% 36% at 70% 48%, rgba(196,163,90,0.95), transparent 68%), radial-gradient(ellipse 30% 28% at 21% 40%, rgba(14,154,167,0.7), transparent 70%)",
              WebkitMaskImage: "url(/world-low.svg)",
              maskImage: "url(/world-low.svg)",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
            }}
          />

          <svg
            viewBox="0 0 950 620"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <defs>
              <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0e9aa7" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#0a8f6c" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#c4a35a" stopOpacity="0.75" />
              </linearGradient>
            </defs>
            {arcs.map((arc) => (
              <path
                key={arc.id}
                d={arc.d}
                fill="none"
                stroke="url(#arcGrad)"
                strokeWidth={active === arc.from || active === "in" ? 1.8 : 1.1}
                strokeDasharray="4 6"
                className="map-arc"
                opacity={active === arc.from || active === "in" ? 1 : 0.45}
              />
            ))}
          </svg>

          {pins.map((pin) => {
            const isActive = active === pin.id;
            const left = `${(pin.x / 950) * 100}%`;
            const top = `${(pin.y / 620) * 100}%`;
            return (
              <button
                key={pin.id}
                type="button"
                className={`pulse-marker absolute z-[2] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${
                  pin.large ? "pulse-marker--lg" : ""
                } ${isActive ? "scale-110" : "hover:scale-110"}`}
                style={{ left, top }}
                onMouseEnter={() => setActive(pin.id)}
                onFocus={() => setActive(pin.id)}
                onClick={() => setActive(pin.id)}
                aria-label={pin.label}
              >
                <span
                  className={`block rounded-full shadow-[0_0_0_5px_rgba(10,143,108,0.2)] ${
                    pin.large ? "h-[18px] w-[18px]" : "h-3 w-3"
                  }`}
                  style={{ backgroundColor: pin.tone }}
                />
                <span
                  className={`absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg border px-2 py-1 text-[10px] font-bold tracking-wide shadow-md backdrop-blur-sm transition ${
                    isActive
                      ? "border-brand/30 bg-white text-brand-dark"
                      : "border-white/80 bg-white/90 text-ink/80"
                  }`}
                >
                  {pin.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
