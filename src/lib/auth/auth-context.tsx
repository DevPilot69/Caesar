"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { caesarStates } from "@/data/tenancy/seed";
import {
  authenticate,
  clearSession,
  readSession,
  writeSession,
  type AuthSession,
} from "@/lib/auth/session";

type AuthContextValue = {
  session: AuthSession | null;
  ready: boolean;
  login: (
    email: string,
    password: string,
    accessCode: string,
  ) => { ok: true } | { ok: false; error: string };
  logout: () => void;
  activeState: (typeof caesarStates)["UP"] | null;
  allowedStates: (typeof caesarStates)["UP"][];
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSession(readSession());
    setReady(true);
  }, []);

  const login = useCallback(
    (email: string, password: string, accessCode: string) => {
      const result = authenticate(email, password, accessCode);
      if (!result.ok) return { ok: false as const, error: result.error };
      writeSession(result.session);
      setSession(result.session);
      return { ok: true as const };
    },
    [],
  );

  const logout = useCallback(() => {
    clearSession();
    setSession(null);
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    const activeState = session ? caesarStates[session.stateCode] : null;
    const allowedStates = activeState ? [activeState] : [];
    return {
      session,
      ready,
      login,
      logout,
      activeState,
      allowedStates,
    };
  }, [session, ready, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
