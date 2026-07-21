"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, GripVertical } from "lucide-react";
import { SuccessToast } from "@/components/dashboard/ui-states";
import { campaignData } from "@/data/uttar-pradesh/dashboard-modules";

export type CampaignStatus =
  | "Queued"
  | "Scheduled"
  | "In progress"
  | "Done";

type CampaignCard = (typeof campaignData.items)[number] & {
  status: CampaignStatus;
};

const COLUMNS: CampaignStatus[] = [
  "Queued",
  "Scheduled",
  "In progress",
  "Done",
];

const DONE_SEED: CampaignCard[] = [
  {
    id: "c7",
    action: "Publish tanker roster — Indirapuram societies",
    theatre: "Ghaziabad",
    owner: "NCR Desk",
    due: "Mon",
    priority: "P1",
    status: "Done",
    linkedAlert: "a3",
    successMetric: "Petition chatter cooled for 48h",
    blockers: "None",
    evidence: ["Ground g2"],
  },
  {
    id: "c8",
    action: "Counter FAQ pack — night patrol rumors",
    theatre: "Meerut South",
    owner: "Comms",
    due: "Sun",
    priority: "P0",
    status: "Done",
    linkedAlert: "a2",
    successMetric: "Booth captains briefed same night",
    blockers: "None",
    evidence: ["Alert a2", "Brief b2"],
  },
];

const priorityTone: Record<string, string> = {
  P0: "bg-coral-soft text-coral",
  P1: "bg-amber-100 text-amber-800",
  P2: "bg-brand-mist text-brand",
};

const columnHint: Record<CampaignStatus, string> = {
  Queued: "Backlog",
  Scheduled: "Locked date",
  "In progress": "Active now",
  Done: "Closed",
};

export function CampaignBoard() {
  const [cards, setCards] = useState<CampaignCard[]>(() => [
    ...(campaignData.items as CampaignCard[]),
    ...DONE_SEED,
  ]);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overColumn, setOverColumn] = useState<CampaignStatus | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(t);
  }, [toast]);

  const byColumn = useMemo(() => {
    const map: Record<CampaignStatus, CampaignCard[]> = {
      Queued: [],
      Scheduled: [],
      "In progress": [],
      Done: [],
    };
    for (const card of cards) {
      map[card.status].push(card);
    }
    return map;
  }, [cards]);

  const liveStats = useMemo(
    () => [
      {
        label: "In progress",
        value: String(byColumn["In progress"].length),
      },
      {
        label: "Due today",
        value: String(cards.filter((c) => c.due === "Today" && c.status !== "Done").length),
      },
      { label: "Done", value: String(byColumn.Done.length) },
    ],
    [byColumn, cards],
  );

  function moveCard(id: string, to: CampaignStatus, beforeId?: string | null) {
    setCards((prev) => {
      const moving = prev.find((c) => c.id === id);
      if (!moving) return prev;

      const without = prev.filter((c) => c.id !== id);
      const updated = { ...moving, status: to };

      if (beforeId) {
        const idx = without.findIndex((c) => c.id === beforeId);
        if (idx >= 0) {
          const next = [...without];
          next.splice(idx, 0, updated);
          return next;
        }
      }

      let lastInCol = -1;
      without.forEach((c, i) => {
        if (c.status === to) lastInCol = i;
      });
      const insertAt = lastInCol >= 0 ? lastInCol + 1 : without.length;
      const next = [...without];
      next.splice(insertAt, 0, updated);
      return next;
    });

    const from = cards.find((c) => c.id === id)?.status;
    if (from && from !== to) {
      setToast(`Moved to ${to}`);
    }
  }

  function onDragStart(e: React.DragEvent, id: string) {
    setDraggingId(id);
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
  }

  function onDragEnd() {
    setDraggingId(null);
    setOverColumn(null);
  }

  function onColumnDragOver(e: React.DragEvent, col: CampaignStatus) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (overColumn !== col) setOverColumn(col);
  }

  function onColumnDrop(e: React.DragEvent, col: CampaignStatus) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain") || draggingId;
    if (id) moveCard(id, col);
    setDraggingId(null);
    setOverColumn(null);
  }

  function onCardDragOver(e: React.DragEvent, col: CampaignStatus, beforeId: string) {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
    if (overColumn !== col) setOverColumn(col);
    // store beforeId via data attribute handled on drop
    void beforeId;
  }

  function onCardDrop(
    e: React.DragEvent,
    col: CampaignStatus,
    beforeId: string,
  ) {
    e.preventDefault();
    e.stopPropagation();
    const id = e.dataTransfer.getData("text/plain") || draggingId;
    if (!id || id === beforeId) return;
    moveCard(id, col, beforeId);
    setDraggingId(null);
    setOverColumn(null);
  }

  return (
    <>
      {/* Live stats override strip under Shell header is passed via children only —
          Shell owns static stats, so we show a compact board meta row here */}
      <div className="mb-1 flex flex-wrap items-center justify-between gap-2 px-0.5">
        <p className="text-xs text-ink-muted">
          Drag cards across columns · drop to update status
        </p>
        <div className="flex flex-wrap gap-1.5">
          {liveStats.map((s) => (
            <span
              key={s.label}
              className="rounded-lg border border-white/70 bg-white/55 px-2.5 py-1 text-[10px] font-bold text-ink backdrop-blur-md"
            >
              <span className="text-ink-muted">{s.label}</span>{" "}
              <span className="tabular-nums text-brand">{s.value}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="stagger-in grid gap-3 lg:grid-cols-4">
        {COLUMNS.map((col) => {
          const items = byColumn[col];
          const isOver = overColumn === col;
          return (
            <section
              key={col}
              onDragOver={(e) => onColumnDragOver(e, col)}
              onDragLeave={() => {
                if (overColumn === col) setOverColumn(null);
              }}
              onDrop={(e) => onColumnDrop(e, col)}
              className={`dash-card flex min-h-[420px] flex-col p-3 transition ${
                isOver
                  ? "ring-2 ring-brand/45 ring-offset-2 ring-offset-transparent"
                  : ""
              }`}
            >
              <div className="relative z-[1] mb-3 flex items-center justify-between gap-2 px-1">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wide text-ink">
                    {col}
                  </h3>
                  <p className="text-[10px] font-semibold text-ink-muted">
                    {columnHint[col]}
                  </p>
                </div>
                <span className="rounded-full bg-brand-mist px-2 py-0.5 text-[10px] font-bold text-brand">
                  {items.length}
                </span>
              </div>

              <ul className="relative z-[1] flex flex-1 flex-col gap-2">
                {items.length === 0 ? (
                  <li
                    className={`flex flex-1 items-center justify-center rounded-xl border border-dashed px-3 py-10 text-center text-xs ${
                      isOver
                        ? "border-brand/40 bg-brand-soft/50 text-brand"
                        : "border-brand/15 bg-white/30 text-ink-muted"
                    }`}
                  >
                    {isOver ? "Drop card here" : `No actions in ${col.toLowerCase()}`}
                  </li>
                ) : (
                  items.map((item) => {
                    const isDragging = draggingId === item.id;
                    return (
                      <li
                        key={item.id}
                        draggable
                        onDragStart={(e) => onDragStart(e, item.id)}
                        onDragEnd={onDragEnd}
                        onDragOver={(e) => onCardDragOver(e, col, item.id)}
                        onDrop={(e) => onCardDrop(e, col, item.id)}
                        className={`group cursor-grab rounded-xl border border-white/70 bg-white/70 p-3 shadow-sm backdrop-blur-sm transition active:cursor-grabbing ${
                          isDragging
                            ? "scale-[0.98] opacity-40 ring-2 ring-brand/30"
                            : "hover:border-brand/25 hover:shadow-md"
                        } ${col === "Done" ? "opacity-85" : ""}`}
                      >
                        <div className="flex items-start gap-2">
                          <span
                            className="mt-0.5 shrink-0 text-ink-muted/70 transition group-hover:text-brand"
                            aria-hidden
                          >
                            <GripVertical className="h-4 w-4" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold">
                              <span
                                className={`rounded-md px-1.5 py-0.5 ${
                                  priorityTone[item.priority] ??
                                  priorityTone.P2
                                }`}
                              >
                                {item.priority}
                              </span>
                              <span className="text-brand">{item.theatre}</span>
                              <span className="text-ink-muted">
                                Due {item.due}
                              </span>
                              {col === "Done" ? (
                                <span className="inline-flex items-center gap-0.5 text-brand">
                                  <CheckCircle2 className="h-3 w-3" />
                                  Done
                                </span>
                              ) : null}
                            </div>
                            <p className="mt-2 text-sm font-semibold leading-snug text-ink">
                              {item.action}
                            </p>
                            <p className="mt-2 line-clamp-2 text-[11px] font-semibold text-brand-dark">
                              Success · {item.successMetric}
                            </p>
                            <p className="mt-1 line-clamp-1 text-[11px] text-ink-muted">
                              Linked · {item.linkedAlert}
                            </p>
                            <p className="mt-1 line-clamp-1 text-[11px] text-ink-muted">
                              Blockers · {item.blockers}
                            </p>
                            <p className="mt-2 text-[11px] font-semibold text-ink-muted">
                              {item.owner}
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })
                )}
                {items.length > 0 && isOver ? (
                  <li className="rounded-xl border border-dashed border-brand/35 bg-brand-soft/40 px-3 py-4 text-center text-[11px] font-semibold text-brand">
                    Drop to move here
                  </li>
                ) : null}
              </ul>
            </section>
          );
        })}
      </div>

      {toast ? (
        <SuccessToast message={toast} onDismiss={() => setToast(null)} />
      ) : null}
    </>
  );
}
