/**
 * Caesar agency access — simple model:
 * Each access code unlocks ONE dedicated state view.
 * No mid-session switching. Different code = entirely different interface.
 */

export type StateCode = "UP" | "PB";

export type CaesarState = {
  code: StateCode;
  name: string;
  shortName: string;
  mapId: string;
  electionTitle: string;
  electionDays: number;
  theatresLabel: string;
  accentNote: string;
};

export type AgencyAccess = {
  id: string;
  /** Display name on the war room */
  name: string;
  slug: string;
  email: string;
  password: string;
  /** Access code decides which single state view opens */
  accessCode: string;
  /** Exactly one state per code — dedicated interface */
  stateCode: StateCode;
  contactName: string;
  initials: string;
};

export const caesarStates: Record<StateCode, CaesarState> = {
  UP: {
    code: "UP",
    name: "Uttar Pradesh",
    shortName: "UP",
    mapId: "up",
    electionTitle: "Uttar Pradesh Assembly 2027",
    electionDays: 216,
    theatresLabel: "5 theatres",
    accentNote: "Dedicated UP war room",
  },
  PB: {
    code: "PB",
    name: "Punjab",
    shortName: "PB",
    mapId: "pb",
    electionTitle: "Punjab Assembly cycle",
    electionDays: 312,
    theatresLabel: "5 theatres",
    accentNote: "Dedicated Punjab war room",
  },
};

/**
 * Three access codes → three entirely different views.
 * Change the code at login; you never switch states inside the app.
 */
export const agencies: AgencyAccess[] = [
  {
    id: "access-rajneeti-up",
    name: "Rajneeti Consultancy",
    slug: "rajneeti-up",
    email: "access@rajneeti.in",
    password: "caesar-rajneeti",
    accessCode: "RJN-UP-2027",
    stateCode: "UP",
    contactName: "Rajneeti Ops",
    initials: "RJ",
  },
  {
    id: "access-ipsc-up",
    name: "IPSC Consultancy · UP",
    slug: "ipsc-up",
    email: "up@ipsc.in",
    password: "caesar-ipsc-up",
    accessCode: "IPSC-UP-2027",
    stateCode: "UP",
    contactName: "IPSC UP Ops",
    initials: "IU",
  },
  {
    id: "access-ipsc-pb",
    name: "IPSC Consultancy · Punjab",
    slug: "ipsc-pb",
    email: "punjab@ipsc.in",
    password: "caesar-ipsc-pb",
    accessCode: "IPSC-PB-2027",
    stateCode: "PB",
    contactName: "IPSC Punjab Ops",
    initials: "IP",
  },
];

export const loginSeedHint = [
  {
    label: "1 · Rajneeti → Uttar Pradesh view",
    email: "access@rajneeti.in",
    password: "caesar-rajneeti",
    accessCode: "RJN-UP-2027",
    opens: "UP war room only",
  },
  {
    label: "2 · IPSC → Uttar Pradesh view",
    email: "up@ipsc.in",
    password: "caesar-ipsc-up",
    accessCode: "IPSC-UP-2027",
    opens: "UP war room only",
  },
  {
    label: "3 · IPSC → Punjab view",
    email: "punjab@ipsc.in",
    password: "caesar-ipsc-pb",
    accessCode: "IPSC-PB-2027",
    opens: "Punjab war room only",
  },
] as const;

export function findAgencyByEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  return agencies.find((a) => a.email.toLowerCase() === normalized) ?? null;
}

export function resolveAgency(agencyId: string) {
  return agencies.find((a) => a.id === agencyId) ?? null;
}

export function resolveStates(codes: StateCode[]) {
  return codes.map((c) => caesarStates[c]);
}
