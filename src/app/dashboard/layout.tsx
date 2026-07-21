"use client";

import { RequireAuth } from "@/components/auth/require-auth";

/** Dashboard is under root AuthProvider — gate access only. */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RequireAuth>{children}</RequireAuth>;
}
