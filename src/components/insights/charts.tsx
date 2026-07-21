"use client";

import { useId, useState } from "react";

type Series = {
  party: string;
  color: string;
  values: readonly number[];
};

export function VoteShareTrendChart({
  years,
  series,
}: {
  years: readonly number[];
  series: readonly Series[];
}) {
  const uid = useId();
  const [hover, setHover] = useState<{
    year: number;
    party: string;
    value: number;
    x: number;
    y: number;
  } | null>(null);

  const w = 420;
  const h = 210;
  const pad = { t: 18, r: 18, b: 34, l: 38 };
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;
  const maxY = 60;

  const xAt = (i: number) =>
    pad.l + (years.length === 1 ? innerW / 2 : (i / (years.length - 1)) * innerW);
  const yAt = (v: number) => pad.t + innerH - (v / maxY) * innerH;

  return (
    <div className="relative">
      <div className="mb-3 flex flex-wrap gap-2.5">
        {series.map((s) => (
          <span
            key={s.party}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/45 px-2.5 py-1 text-[11px] font-bold text-ink-muted backdrop-blur-sm"
          >
            <span
              className="h-2 w-2 rounded-full shadow-sm"
              style={{ backgroundColor: s.color, boxShadow: `0 0 0 3px ${s.color}22` }}
            />
            {s.party}
          </span>
        ))}
      </div>

      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="h-auto w-full"
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          {series.map((s) => (
            <linearGradient
              key={`${uid}-${s.party}`}
              id={`${uid}-fill-${s.party}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={s.color} stopOpacity="0.22" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        {[0, 15, 30, 45, 60].map((tick) => (
          <g key={tick}>
            <line
              x1={pad.l}
              x2={w - pad.r}
              y1={yAt(tick)}
              y2={yAt(tick)}
              stroke="rgba(16,60,48,0.07)"
              strokeWidth="1"
              strokeDasharray={tick === 0 ? undefined : "3 4"}
            />
            <text
              x={pad.l - 8}
              y={yAt(tick)}
              textAnchor="end"
              dominantBaseline="middle"
              className="fill-ink-muted text-[9px]"
            >
              {tick}%
            </text>
          </g>
        ))}

        {series.map((s, si) => {
          const line = s.values
            .map((v, i) => `${i === 0 ? "M" : "L"} ${xAt(i)} ${yAt(v)}`)
            .join(" ");
          const area = `${line} L ${xAt(s.values.length - 1)} ${yAt(0)} L ${xAt(0)} ${yAt(0)} Z`;
          return (
            <g key={s.party}>
              <path
                d={area}
                fill={`url(#${uid}-fill-${s.party})`}
                className="opacity-80"
                style={{ animationDelay: `${si * 0.08}s` }}
              />
              <path
                d={line}
                fill="none"
                stroke={s.color}
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                className="chart-line"
                style={{ animationDelay: `${0.12 + si * 0.1}s` }}
              />
              {s.values.map((v, i) => (
                <g key={`${s.party}-${i}`}>
                  <circle
                    cx={xAt(i)}
                    cy={yAt(v)}
                    r="10"
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() =>
                      setHover({
                        year: years[i],
                        party: s.party,
                        value: v,
                        x: xAt(i),
                        y: yAt(v),
                      })
                    }
                  />
                  <circle
                    cx={xAt(i)}
                    cy={yAt(v)}
                    r="4"
                    fill="#fff"
                    stroke={s.color}
                    strokeWidth="2.25"
                    className="pointer-events-none drop-shadow-sm"
                  />
                </g>
              ))}
            </g>
          );
        })}

        {years.map((y, i) => (
          <text
            key={y}
            x={xAt(i)}
            y={h - 10}
            textAnchor="middle"
            className="fill-ink-muted text-[10px] font-semibold"
          >
            {y}
          </text>
        ))}

        {hover && (
          <g pointerEvents="none">
            <line
              x1={hover.x}
              x2={hover.x}
              y1={pad.t}
              y2={h - pad.b}
              stroke="rgba(10,143,108,0.25)"
              strokeDasharray="3 3"
            />
            <rect
              x={Math.min(hover.x - 42, w - 96)}
              y={Math.max(hover.y - 38, 4)}
              width="84"
              height="28"
              rx="8"
              fill="rgba(16,28,24,0.88)"
            />
            <text
              x={Math.min(hover.x - 42, w - 96) + 42}
              y={Math.max(hover.y - 38, 4) + 18}
              textAnchor="middle"
              className="fill-white text-[10px] font-bold"
            >
              {hover.party} {hover.value}% · {hover.year}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}

export function TurnoutBarChart({
  data,
}: {
  data: readonly { year: number; percent: number }[];
}) {
  const max = 70;
  return (
    <div className="flex h-44 items-end justify-around gap-3 px-1 pt-2">
      {data.map((d, i) => (
        <div key={d.year} className="flex flex-1 flex-col items-center gap-2">
          <span className="rounded-md bg-brand-soft/80 px-1.5 py-0.5 text-[11px] font-bold text-brand">
            {d.percent}%
          </span>
          <div className="flex h-28 w-full max-w-[52px] items-end overflow-hidden rounded-xl border border-white/70 bg-white/35 p-1 backdrop-blur-sm">
            <div
              className="bar-rise w-full rounded-lg bg-gradient-to-t from-brand-dark via-brand to-brand-light shadow-[0_0_16px_rgba(10,143,108,0.25)]"
              style={{
                height: `${(d.percent / max) * 100}%`,
                animationDelay: `${0.15 + i * 0.12}s`,
              }}
            />
          </div>
          <span className="text-[11px] font-semibold text-ink-muted">{d.year}</span>
        </div>
      ))}
    </div>
  );
}

export function AgeDonutChart({
  segments,
  centerLabel,
  centerValue,
}: {
  segments: readonly { label: string; percent: number; color: string }[];
  centerLabel: string;
  centerValue: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const size = 188;
  const stroke = 24;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
      <div className="relative">
        <div className="absolute inset-3 rounded-full bg-white/40 shadow-[inset_0_0_24px_rgba(255,255,255,0.6)] backdrop-blur-sm" />
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="rgba(16,60,48,0.06)"
            strokeWidth={stroke}
          />
          {segments.map((s, i) => {
            const len = (s.percent / 100) * c;
            const isActive = active === s.label;
            const el = (
              <circle
                key={s.label}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={s.color}
                strokeWidth={isActive ? stroke + 4 : stroke}
                strokeDasharray={`${len} ${c - len}`}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
                className="donut-seg cursor-pointer transition-[stroke-width] duration-200"
                style={{
                  animationDelay: `${0.08 + i * 0.1}s`,
                  filter: isActive
                    ? `drop-shadow(0 0 6px ${s.color}88)`
                    : undefined,
                }}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                onMouseEnter={() => setActive(s.label)}
                onMouseLeave={() => setActive(null)}
              />
            );
            offset += len;
            return el;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-[10px] font-bold uppercase tracking-wide text-ink-muted">
            {active
              ? segments.find((s) => s.label === active)?.label
              : centerLabel}
          </p>
          <p className="font-display text-lg font-bold text-ink">
            {active
              ? `${segments.find((s) => s.label === active)?.percent}%`
              : centerValue}
          </p>
        </div>
      </div>
      <ul className="w-full space-y-2 sm:w-auto">
        {segments.map((s) => (
          <li key={s.label}>
            <button
              type="button"
              onMouseEnter={() => setActive(s.label)}
              onMouseLeave={() => setActive(null)}
              className={`flex w-full items-center gap-2.5 rounded-xl border px-2.5 py-2 text-left text-xs transition ${
                active === s.label
                  ? "border-brand/20 bg-white/70 shadow-sm"
                  : "border-transparent bg-white/30 hover:bg-white/55"
              }`}
            >
              <span
                className="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: s.color }}
              />
              <span className="flex-1 font-semibold text-ink">{s.label}</span>
              <span className="font-bold text-ink-muted">{s.percent}%</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
