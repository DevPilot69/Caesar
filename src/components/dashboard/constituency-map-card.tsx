"use client";

import { useId, useState } from "react";
import {
  Brain,
  Filter,
  MapPin,
  Radio,
  Search,
  Siren,
  Target,
} from "lucide-react";

const pillars = [
  { icon: Radio, label: "Ground Intelligence" },
  { icon: Brain, label: "AI Assisted Analysis" },
  { icon: Target, label: "Actionable Strategies" },
  { icon: Siren, label: "Real-time Alerts" },
];

export function ConstituencyMapCard() {
  const [query, setQuery] = useState("");
  const gid = useId().replace(/:/g, "");

  return (
    <article className="dash-card flex min-h-[380px] flex-col overflow-hidden lg:min-h-[440px]">
      <div className="grid flex-1 gap-0 lg:grid-cols-[0.95fr_1.15fr]">
        <div className="flex flex-col border-b border-brand/8 p-5 sm:p-6 lg:border-b-0 lg:border-r">
          <h3 className="font-display text-lg font-bold text-ink">
            No constituency selected
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
            Search or click a region on the map to unlock constituency memory,
            briefs, and evidence-ranked insights.
          </p>

          <div className="mt-5 flex gap-2">
            <label className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search constituency..."
                className="w-full rounded-xl border border-brand/12 bg-brand-mist/60 py-2.5 pl-10 pr-3 text-sm text-ink outline-none ring-brand/25 placeholder:text-ink-muted/70 focus:bg-white focus:ring-2"
              />
            </label>
            <button
              type="button"
              className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-xl border border-brand/12 bg-white text-ink-muted transition hover:border-brand/30 hover:text-brand"
              aria-label="Filter constituencies"
            >
              <Filter className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-auto grid grid-cols-2 gap-3 pt-8">
            {pillars.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-start gap-2.5 rounded-xl border border-brand/8 bg-brand-mist/40 px-3 py-3"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-brand shadow-sm">
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </span>
                <span className="text-xs font-semibold leading-snug text-ink/85">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#e8f6f0] via-white to-[#e3f6f8] p-5 sm:p-7">
          <div className="pointer-events-none absolute inset-8 rounded-full bg-brand/10 blur-3xl" />
          <IndiaMap gid={gid} />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2 rounded-xl border border-white/80 bg-white/80 px-3 py-2 text-xs shadow-sm backdrop-blur-md sm:left-auto sm:right-5 sm:bottom-5 sm:max-w-[240px]">
            <span className="inline-flex items-center gap-1.5 font-semibold text-brand-dark">
              <MapPin className="h-3.5 w-3.5" />
              Uttar Pradesh
            </span>
            <span className="text-ink-muted">Meerut</span>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Stylized India silhouette with UP focus — designed for dashboard clarity */
function IndiaMap({ gid }: { gid: string }) {
  return (
    <svg
      viewBox="0 0 360 420"
      className="relative z-[1] h-auto w-full max-w-[320px]"
      role="img"
      aria-label="India map with Uttar Pradesh highlighted"
    >
      <defs>
        <linearGradient id={`base-${gid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#cfeadf" />
          <stop offset="100%" stopColor="#a8d9c6" />
        </linearGradient>
        <linearGradient id={`up-${gid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#12a07a" />
          <stop offset="100%" stopColor="#056b52" />
        </linearGradient>
        <filter id={`pinGlow-${gid}`} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#056b52" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Main landmass — recognizable India-like outline */}
      <path
        d="M178 36
           C210 40 248 58 262 92
           C278 88 302 102 308 128
           C318 150 308 178 288 190
           C302 210 312 240 300 268
           C292 292 268 308 248 318
           C252 348 238 378 210 392
           C186 404 158 398 142 378
           C128 392 98 388 84 366
           C70 348 76 318 92 300
           C70 288 58 258 68 232
           C76 210 98 198 118 202
           C112 178 118 150 138 132
           C128 110 140 82 164 68
           C168 52 172 40 178 36 Z"
        fill={`url(#base-${gid})`}
        stroke="#7fbfa6"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Kashmir / north tip */}
      <path
        d="M168 48 C178 28 198 24 210 36 C200 48 188 52 168 48 Z"
        fill={`url(#base-${gid})`}
        stroke="#7fbfa6"
        strokeWidth="1.5"
      />

      {/* Northeast */}
      <path
        d="M288 150 C318 142 338 158 342 182 C346 204 330 220 308 216 C300 198 294 172 288 150 Z"
        fill={`url(#base-${gid})`}
        stroke="#7fbfa6"
        strokeWidth="1.5"
      />

      {/* Gujarat west bulge */}
      <path
        d="M92 250 C70 255 58 275 66 292 C78 300 98 292 108 278 C102 265 98 255 92 250 Z"
        fill={`url(#base-${gid})`}
        stroke="#7fbfa6"
        strokeWidth="1.5"
      />

      {/* Uttar Pradesh — north-central highlight */}
      <path
        d="M155 145
           C185 132 225 136 250 155
           C268 170 272 198 258 218
           C240 236 205 240 178 228
           C155 218 142 190 148 168
           C150 158 152 150 155 145 Z"
        fill={`url(#up-${gid})`}
        stroke="#034d3b"
        strokeWidth="1.75"
        strokeLinejoin="round"
        filter={`url(#pinGlow-${gid})`}
      />

      {/* Location pin on UP */}
      <g filter={`url(#pinGlow-${gid})`}>
        <path
          d="M205 168 c0-14 11-26 26-26 s26 12 26 26 c0 18-26 40-26 40 s-26-22-26-40z"
          fill="#056b52"
        />
        <circle cx="231" cy="168" r="9" fill="#fff" />
        <circle cx="231" cy="168" r="5" fill="#0a8f6c" />
      </g>
    </svg>
  );
}
