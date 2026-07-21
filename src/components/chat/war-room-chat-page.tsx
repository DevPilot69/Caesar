"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bell,
  Bot,
  CheckCheck,
  FileText,
  Menu,
  MessageSquarePlus,
  Search,
  Send,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import {
  warRoomChatMock,
  type ChatMessage,
  type SavedChat,
} from "@/data/uttar-pradesh/war-room-chat";

function groupChats(chats: readonly SavedChat[]) {
  const order = ["Today", "Yesterday", "Previous 7 Days"] as const;
  return order
    .map((group) => ({
      group,
      items: chats.filter((c) => c.group === group),
    }))
    .filter((g) => g.items.length > 0);
}

function AssistantBubble({
  message,
}: {
  message: ChatMessage;
}) {
  return (
    <div className="flex max-w-[min(100%,640px)] gap-3">
      <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-teal text-white shadow-sm">
        <Bot className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="rounded-2xl rounded-tl-md border border-brand/10 bg-gradient-to-br from-brand-mist to-white px-4 py-3.5 shadow-sm">
          <p className="text-sm leading-relaxed text-ink/90">{message.content}</p>
          {message.sections?.map((section) => (
            <div key={section.title} className="mt-3">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-brand">
                {section.title}
              </p>
              <ul className="mt-1.5 space-y-1.5">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-snug text-ink/85"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-1.5 flex items-center gap-3 px-1">
          <span className="text-[10px] text-ink-muted">{message.time}</span>
          <button
            type="button"
            className="rounded p-1 text-ink-muted transition hover:bg-brand-soft hover:text-brand"
            aria-label="Helpful"
          >
            <ThumbsUp className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            className="rounded p-1 text-ink-muted transition hover:bg-coral-soft hover:text-coral"
            aria-label="Not helpful"
          >
            <ThumbsDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function UserBubble({ message }: { message: ChatMessage }) {
  return (
    <div className="ml-auto flex max-w-[min(100%,560px)] flex-col items-end gap-1">
      <div className="rounded-2xl rounded-tr-md border border-[#e8d9a8]/80 bg-gradient-to-br from-[#fbf6e8] to-[#f7f0de] px-4 py-3.5 text-sm leading-relaxed text-ink shadow-sm">
        {message.content}
      </div>
      <div className="flex items-center gap-1.5 px-1 text-[10px] text-ink-muted">
        <span>{message.time}</span>
        <CheckCheck className="h-3.5 w-3.5 text-brand" />
      </div>
    </div>
  );
}

export function WarRoomChatPage() {
  const data = warRoomChatMock;
  const [mobileNav, setMobileNav] = useState(false);
  const [activeId, setActiveId] = useState<string>(data.activeChatId);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([...data.messages]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const grouped = useMemo(() => {
    const filtered = data.savedChats.filter(
      (c) =>
        !query.trim() ||
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.preview.toLowerCase().includes(query.toLowerCase()),
    );
    return groupChats(filtered);
  }, [data.savedChats, query]);

  const activeChat = data.savedChats.find((c) => c.id === activeId);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage() {
    const text = draft.trim();
    if (!text) return;
    const now = new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
      time: now,
    };
    const assistantMsg: ChatMessage = {
      id: `a-${Date.now()}`,
      role: "assistant",
      content:
        "Noted. Pulling Agra North evidence graph and ranking recommendations…",
      time: now,
      sections: [
        {
          title: "Next steps (draft)",
          items: [
            "Validate against latest ground signals",
            "Attach evidence links before war-room accept",
            "Keep humans in the decision loop",
          ],
        },
      ],
    };
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setDraft("");
  }

  return (
    <div className="dash-shell flex h-screen overflow-hidden">
      <div className="hidden h-full lg:block">
        <DashboardSidebar
          electionDays={data.election.daysToGo}
          electionTitle={data.election.title}
        />
      </div>

      {mobileNav && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={() => setMobileNav(false)}
          />
          <div className="relative h-full w-[280px] shadow-2xl">
            <DashboardSidebar
              electionDays={data.election.daysToGo}
              electionTitle={data.election.title}
            />
            <button
              type="button"
              className="absolute right-3 top-4 rounded-lg bg-white/80 p-2 text-ink"
              onClick={() => setMobileNav(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Saved chats column */}
      <aside className="hidden w-[300px] shrink-0 flex-col border-r border-brand/10 bg-white/70 backdrop-blur-xl md:flex">
        <div className="border-b border-brand/8 px-4 py-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-display text-base font-bold text-ink">
              Saved Chats
            </h2>
            <button
              type="button"
              className="rounded-xl border border-brand/15 bg-brand-soft p-2 text-brand transition hover:bg-brand hover:text-white"
              aria-label="New chat"
              onClick={() => {
                setMessages([]);
                setActiveId("new");
              }}
            >
              <MessageSquarePlus className="h-4 w-4" />
            </button>
          </div>
          <label className="relative mt-3 block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search chats..."
              className="w-full rounded-xl border border-brand/12 bg-white py-2.5 pl-10 pr-3 text-sm outline-none ring-brand/25 focus:ring-2"
            />
          </label>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
          {grouped.map(({ group, items }) => (
            <div key={group}>
              <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.14em] text-ink-muted">
                {group}
              </p>
              <ul className="space-y-1">
                {items.map((chat) => {
                  const active = chat.id === activeId;
                  return (
                    <li key={chat.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveId(chat.id);
                          if (chat.id === data.activeChatId) {
                            setMessages([...data.messages]);
                          }
                        }}
                        className={`w-full rounded-xl px-3 py-3 text-left transition ${
                          active
                            ? "border border-brand/20 bg-brand-soft shadow-sm"
                            : "border border-transparent hover:bg-brand-mist"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-bold text-ink">
                            {chat.title}
                          </p>
                          <span className="shrink-0 text-[10px] text-ink-muted">
                            {chat.time}
                          </span>
                        </div>
                        <p className="mt-1 line-clamp-1 text-xs text-ink-muted">
                          {chat.preview}
                        </p>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* Main chat */}
      <div className="flex min-w-0 flex-1 flex-col bg-gradient-to-b from-white/40 to-transparent">
        <header className="flex items-center gap-3 border-b border-brand/8 bg-white/70 px-4 py-3 backdrop-blur-md sm:px-6">
          <button
            type="button"
            className="rounded-xl border border-brand/15 bg-white p-2 text-ink lg:hidden"
            onClick={() => setMobileNav(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <label className="relative hidden min-w-0 flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              placeholder="Search anything..."
              className="w-full max-w-md rounded-xl border border-brand/12 bg-white py-2.5 pl-10 pr-3 text-sm outline-none ring-brand/25 focus:ring-2"
            />
          </label>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-brand/15 bg-white px-3 py-2 text-sm font-semibold text-ink shadow-sm"
            >
              <Bot className="h-4 w-4 text-brand" />
              <span className="hidden sm:inline">AI Assistant</span>
            </button>
            <button
              type="button"
              className="relative rounded-xl border border-brand/15 bg-white p-2.5 text-ink shadow-sm"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-coral" />
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-brand/15 bg-brand-soft font-display text-xs font-bold text-brand-dark">
              NV
            </div>
          </div>
        </header>

        <div className="border-b border-brand/8 bg-white/50 px-4 py-4 sm:px-6">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-dark to-teal text-white shadow-[0_8px_20px_rgba(5,107,82,0.3)]">
              <Bot className="h-5 w-5" />
            </span>
            <div>
              <h1 className="font-display text-lg font-bold text-ink sm:text-xl">
                AI War Room Assistant
              </h1>
              <p className="mt-0.5 text-sm text-ink-muted">
                Your intelligence partner for real-time insights and actionable
                strategies.
                {activeChat ? (
                  <>
                    {" "}
                    · <span className="font-semibold text-brand">{activeChat.title}</span>
                  </>
                ) : null}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8">
          {messages.length === 0 && (
            <div className="mx-auto flex max-w-lg flex-col items-center py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                <Bot className="h-7 w-7" />
              </div>
              <h2 className="font-display mt-4 text-xl font-bold text-ink">
                Start a war-room thread
              </h2>
              <p className="mt-2 text-sm text-ink-muted">
                Ask about Agra North signals, messaging, or booth instructions.
                Caesar assists — you decide.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {data.starterPrompts.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setDraft(p)}
                    className="rounded-full border border-brand/15 bg-white px-3 py-1.5 text-xs font-semibold text-ink transition hover:border-brand hover:bg-brand-soft"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) =>
            m.role === "user" ? (
              <UserBubble key={m.id} message={m} />
            ) : (
              <AssistantBubble key={m.id} message={m} />
            ),
          )}
          <div ref={bottomRef} />
        </div>

        <div className="border-t border-brand/8 bg-white/80 px-4 py-4 backdrop-blur-md sm:px-6">
          <div className="mx-auto flex max-w-4xl flex-col gap-3 rounded-2xl border border-brand/12 bg-white p-3 shadow-[0_12px_40px_rgba(16,60,48,0.08)] sm:flex-row sm:items-end">
            <button
              type="button"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-brand/12 bg-brand-mist px-3 py-2.5 text-xs font-bold text-brand"
            >
              <FileText className="h-4 w-4" />
              Browse Docs
            </button>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              rows={2}
              placeholder="Type your message..."
              className="min-h-[44px] w-full flex-1 resize-none bg-transparent px-2 py-2 text-sm text-ink outline-none placeholder:text-ink-muted"
            />
            <button
              type="button"
              onClick={sendMessage}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-dark to-brand px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(5,107,82,0.3)] transition hover:brightness-105 disabled:opacity-40"
              disabled={!draft.trim()}
            >
              <Send className="h-4 w-4" />
              Send
            </button>
          </div>
          <p className="mx-auto mt-2 max-w-4xl text-center text-[10px] text-ink-muted">
            Caesar recommends with evidence. Humans remain in control.
          </p>
        </div>
      </div>
    </div>
  );
}
