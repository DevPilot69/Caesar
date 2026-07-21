"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MapPinned,
  Megaphone,
  Swords,
  Newspaper,
  Settings,
  Sparkles,
  Shield,
  TrendingUp,
  MessageSquare,
  ClipboardList,
  PieChart,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";

const mainNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  {
    href: "/dashboard/constituencies",
    label: "Constituencies",
    icon: MapPinned,
  },
  {
    href: "/dashboard/campaign",
    label: "Campaign Actions",
    icon: Megaphone,
  },
  {
    href: "/dashboard/opposition",
    label: "Opposition Tracker",
    icon: Swords,
  },
  {
    href: "/dashboard/media",
    label: "Media Monitoring",
    icon: Newspaper,
  },
  {
    href: "/dashboard/voter-insights",
    label: "Voter Insights",
    icon: PieChart,
  },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const quickActions = [
  { href: "/dashboard/briefs", label: "Generate Brief", icon: Sparkles },
  { href: "/dashboard/trends", label: "Trends", icon: TrendingUp },
  { href: "/dashboard/chat", label: "AI War Room Chat", icon: MessageSquare },
  {
    href: "/dashboard/ground",
    label: "Ground Report Tracker",
    icon: ClipboardList,
  },
];

function NavLink({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
        active
          ? "bg-gradient-to-r from-brand-soft to-teal-soft/60 text-brand-dark shadow-[0_4px_14px_rgba(10,143,108,0.12)] ring-1 ring-brand/10"
          : "text-ink-muted hover:bg-white/55 hover:text-ink"
      }`}
    >
      <Icon className="h-[18px] w-[18px]" strokeWidth={active ? 2.2 : 1.85} />
      <span className="flex-1">{label}</span>
      {active && (
        <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_8px_rgba(10,143,108,0.8)]" />
      )}
    </Link>
  );
}

export function DashboardSidebar({
  electionDays,
  electionTitle,
}: {
  electionDays?: number;
  electionTitle?: string;
}) {
  const pathname = usePathname();
  const { session, activeState, logout } = useAuth();

  const days = electionDays ?? activeState?.electionDays ?? 216;
  const title =
    electionTitle ?? activeState?.electionTitle ?? "State assembly cycle";
  const displayName = session?.agencyName ?? "Agency";
  const initials = session?.initials ?? "CA";

  return (
    <aside className="dash-sidebar flex h-full w-[272px] shrink-0 flex-col border-r border-brand/10">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand via-brand-light to-teal text-white shadow-[0_6px_18px_rgba(10,143,108,0.35)]">
          <Shield className="h-5 w-5" strokeWidth={2.2} />
        </span>
        <div className="leading-tight">
          <p className="font-display text-[15px] font-bold tracking-tight text-ink">
            Caesar
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand">
            Agency war room
          </p>
        </div>
      </div>

      {session ? (
        <div className="mx-3 mb-2 rounded-xl border border-brand/10 bg-white/50 px-3 py-2 backdrop-blur-sm">
          <p className="text-[10px] font-bold uppercase tracking-wide text-ink-muted">
            Active interface
          </p>
          <p className="mt-0.5 text-xs font-bold text-ink">
            {activeState?.name ?? "—"}
          </p>
          <p className="mt-0.5 font-mono text-[10px] text-brand">
            {session.accessCode}
          </p>
        </div>
      ) : null}

      <div className="flex-1 space-y-5 overflow-y-auto px-3 pb-3">
        <nav className="space-y-0.5" aria-label="Main">
          <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-ink-muted/80">
            Main menu
          </p>
          {mainNav.map((item) => {
            const active =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            return <NavLink key={item.href} {...item} active={active} />;
          })}
        </nav>

        <nav className="space-y-0.5" aria-label="Quick actions">
          <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-ink-muted/80">
            Quick actions
          </p>
          {quickActions.map((item) => (
            <NavLink
              key={item.href}
              {...item}
              active={pathname.startsWith(item.href)}
            />
          ))}
        </nav>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#045c47] via-brand-dark to-brand p-4 text-white shadow-[0_12px_28px_rgba(5,107,82,0.4)]">
          <div className="pointer-events-none absolute -right-6 bottom-0 h-28 w-28 opacity-20">
            <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden>
              <path
                d="M10 70 L40 20 L70 70 Z M25 70 L40 40 L55 70"
                fill="none"
                stroke="white"
                strokeWidth="2"
              />
              <rect x="34" y="48" width="12" height="22" fill="white" opacity="0.5" />
            </svg>
          </div>
          <p className="relative text-[10px] font-bold uppercase tracking-[0.14em] text-white/70">
            Election countdown
          </p>
          <p className="relative mt-1 text-xs font-medium text-white/85">
            {title}
          </p>
          <p className="relative mt-3 font-display text-3xl font-bold leading-none">
            {days}
          </p>
          <p className="relative mt-1 text-sm font-semibold text-white/90">
            Days to go
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-brand/10 px-4 py-4">
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-soft to-teal-soft font-display text-sm font-bold text-brand-dark">
            {initials}
          </div>
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-brand" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-ink">{displayName}</p>
          <p className="truncate text-[11px] font-medium text-ink-muted">
            Agency · Online
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            logout();
            window.location.href = "/login";
          }}
          className="rounded-lg p-1.5 text-ink-muted transition hover:bg-brand-mist hover:text-coral"
          aria-label="Sign out"
          title="Sign out"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
