import type { StateCode } from "@/data/tenancy/seed";
import {
  findAgencyByEmail,
  caesarStates,
} from "@/data/tenancy/seed";

export const SESSION_KEY = "caesar.session.v3";

export type AuthSession = {
  agencyId: string;
  agencyName: string;
  email: string;
  name: string;
  initials: string;
  accessCode: string;
  /** Single dedicated state for this login — no switcher */
  stateCode: StateCode;
  allowedStateCodes: StateCode[];
  activeStateCode: StateCode;
};

export type LoginResult =
  | { ok: true; session: AuthSession }
  | { ok: false; error: string };

export function authenticate(
  email: string,
  password: string,
  accessCode: string,
): LoginResult {
  const agency = findAgencyByEmail(email);
  if (!agency || agency.password !== password) {
    return { ok: false, error: "Invalid email or password." };
  }

  const code = accessCode.trim();
  if (!code) {
    return { ok: false, error: "Access code is required." };
  }

  if (agency.accessCode.toUpperCase() !== code.toUpperCase()) {
    return {
      ok: false,
      error: "Access code does not match this login.",
    };
  }

  const stateCode = agency.stateCode;

  return {
    ok: true,
    session: {
      agencyId: agency.id,
      agencyName: agency.name,
      email: agency.email,
      name: agency.contactName,
      initials: agency.initials,
      accessCode: agency.accessCode,
      stateCode,
      allowedStateCodes: [stateCode],
      activeStateCode: stateCode,
    },
  };
}

export function readSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthSession;
    if (!parsed?.agencyId || !parsed.stateCode) return null;
    // normalize older dual-state sessions
    return {
      ...parsed,
      allowedStateCodes: [parsed.stateCode],
      activeStateCode: parsed.stateCode,
    };
  } catch {
    return null;
  }
}

export function writeSession(session: AuthSession) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  window.localStorage.removeItem(SESSION_KEY);
  window.localStorage.removeItem("caesar.session.v1");
  window.localStorage.removeItem("caesar.session.v2");
}

export function canAccessState(session: AuthSession, code: StateCode) {
  return session.stateCode === code;
}

export function activeStateMeta(session: AuthSession) {
  return caesarStates[session.stateCode];
}
