/**
 * Punjab independent state pack — same UI contracts as UP, separate data.
 */
export const punjabMeta = {
  code: "PB" as const,
  name: "Punjab",
  electionTitle: "Punjab Assembly cycle",
  electionDays: 312,
  insight:
    "Punjab desk is an independent theatre pack. Ludhiana East is the live priority; Amritsar South and Mohali watch for farmer-corridor narratives.",
};

export const punjabTheatres = [
  {
    slug: "ludhiana-east",
    name: "Ludhiana East",
    district: "Ludhiana",
    lastWinner: "INC",
    margin: "+12,400",
    swing: "Medium",
    mood: "Competitive",
    risk: "High",
    summary:
      "Industrial belt with youth + trader pressure. Independent from UP graph.",
  },
  {
    slug: "amritsar-south",
    name: "Amritsar South",
    district: "Amritsar",
    lastWinner: "AAP",
    margin: "+8,920",
    swing: "High",
    mood: "Volatile",
    risk: "High",
    summary: "Pilgrim-city optics + local service delivery fights.",
  },
  {
    slug: "mohali",
    name: "Mohali",
    district: "SAS Nagar",
    lastWinner: "AAP",
    margin: "+15,210",
    swing: "Low",
    mood: "Watch",
    risk: "Medium",
    summary: "Urban-suburban hold with IT corridor messaging.",
  },
];

export const punjabMapPins = [
  { slug: "ludhiana-east", label: "Ludhiana East", x: 218, y: 198 },
  { slug: "amritsar-south", label: "Amritsar South", x: 198, y: 188 },
  { slug: "mohali", label: "Mohali", x: 228, y: 208 },
];

export const punjabGlance = {
  alertsOpen: 4,
  briefsReady: 2,
  mediaHeat: "Elevated",
  oppositionMoves: 3,
};

export const punjabBreaking = [
  "Ludhiana East: trader association meet scheduled — counter pack ready",
  "Amritsar South: waterlogging clips circulating in local groups",
  "Mohali: campus volunteer density above baseline",
];
