"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { Loader2 } from "lucide-react";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { session, ready } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!ready) return;
    if (!session) {
      router.replace(`/login?next=${encodeURIComponent(pathname || "/dashboard")}`);
    }
  }, [ready, session, router, pathname]);

  if (!ready || !session) {
    return (
      <div className="dash-shell flex min-h-screen items-center justify-center">
        <div className="inline-flex items-center gap-2 rounded-2xl border border-white/70 bg-white/60 px-4 py-3 text-sm font-semibold text-ink-muted backdrop-blur-md">
          <Loader2 className="h-4 w-4 animate-spin text-brand" />
          Checking access…
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
