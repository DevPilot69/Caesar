import Image from "next/image";
import type { NewsItem } from "@/data/uttar-pradesh/agra";

export function LatestNewsCard({ news }: { news: readonly NewsItem[] }) {
  return (
    <article className="dash-card flex h-full flex-col p-5">
      <h3 className="font-display text-base font-bold text-ink">Latest News</h3>
      <ul className="mt-4 flex-1 space-y-3 overflow-y-auto">
        {news.map((item) => (
          <li key={item.id} className="flex gap-3">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
              <Image
                src={item.image}
                alt=""
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wide text-brand">
                {item.source}
              </p>
              <p className="mt-0.5 line-clamp-2 text-xs font-semibold leading-snug text-ink">
                {item.headline}
              </p>
              <p className="mt-1 text-[10px] text-ink-muted">{item.ago}</p>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
