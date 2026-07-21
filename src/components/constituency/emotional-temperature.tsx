import type { EmotionPoint } from "@/data/uttar-pradesh/agra-north";

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

export function EmotionalTemperature({
  emotions,
  volatility,
}: {
  emotions: readonly EmotionPoint[];
  volatility: number;
}) {
  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = 78;
  const n = emotions.length;
  const rings = [0.25, 0.5, 0.75, 1];

  const grid = rings.map((t) =>
    emotions
      .map((_, i) => {
        const p = polar(cx, cy, maxR * t, (360 / n) * i);
        return `${p.x},${p.y}`;
      })
      .join(" "),
  );

  const dataPoly = emotions
    .map((e, i) => {
      const p = polar(cx, cy, maxR * (e.value / 100), (360 / n) * i);
      return `${p.x},${p.y}`;
    })
    .join(" ");

  const labels = emotions.map((e, i) => {
    const p = polar(cx, cy, maxR + 22, (360 / n) * i);
    return { ...e, ...p };
  });

  return (
    <article className="dash-card flex h-full flex-col p-5">
      <h3 className="font-display text-base font-bold text-ink">
        Emotional Temperature
      </h3>
      <p className="text-xs text-ink-muted">Constituency sentiment radar</p>

      <div className="relative mx-auto mt-2 flex flex-1 items-center justify-center">
        <svg viewBox={`0 0 ${size} ${size}`} className="h-[220px] w-[220px]">
          <defs>
            <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0a8f6c" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0e9aa7" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {grid.map((pts, i) => (
            <polygon
              key={i}
              points={pts}
              fill="none"
              stroke="#cfe3da"
              strokeWidth="1"
            />
          ))}
          {emotions.map((_, i) => {
            const p = polar(cx, cy, maxR, (360 / n) * i);
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={p.x}
                y2={p.y}
                stroke="#d7e8e0"
                strokeWidth="1"
              />
            );
          })}
          <polygon
            points={dataPoly}
            fill="url(#radarFill)"
            stroke="#0a8f6c"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {emotions.map((e, i) => {
            const p = polar(cx, cy, maxR * (e.value / 100), (360 / n) * i);
            return (
              <circle key={e.label} cx={p.x} cy={p.y} r="3.5" fill="#056b52" />
            );
          })}
          {labels.map((l) => (
            <text
              key={l.label}
              x={l.x}
              y={l.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-ink text-[9px] font-bold"
            >
              {l.label}
            </text>
          ))}
        </svg>
      </div>

      <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1">
        {emotions.map((e) => (
          <span key={e.label} className="text-[11px] font-semibold text-ink-muted">
            {e.label}{" "}
            <span className="text-brand">{e.value}%</span>
          </span>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-brand/10 bg-brand-mist/50 px-3 py-3">
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="font-semibold text-ink">Volatility Index</span>
          <span className="font-bold text-brand">{volatility}/100</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-white">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand to-teal"
            style={{ width: `${volatility}%` }}
          />
        </div>
      </div>
    </article>
  );
}
