"use client";

import { useMemo } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { getStatePack } from "@/lib/state-pack";
import type { StateCode } from "@/data/tenancy/seed";

export function useStatePack() {
  const { activeState } = useAuth();
  const code = (activeState?.code ?? "UP") as StateCode;
  return useMemo(() => getStatePack(code), [code]);
}
