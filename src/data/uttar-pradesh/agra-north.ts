export type LiveSignal = {
  id: string;
  location: string;
  text: string;
  category: string;
  ago: string;
};

export type EmotionPoint = {
  label: string;
  value: number;
};

export type LiveRecommendation = {
  id: string;
  priority: "Critical" | "High" | "Low";
  title: string;
  detail: string;
  window: string;
  audience: string;
};

export type LiveAlert = {
  id: string;
  level: "urgent" | "watch" | "info";
  text: string;
  ago: string;
};

export const agraNorthLive = {
  id: "agra-north",
  name: "Agra North",
  district: "Agra",
  state: "Uttar Pradesh",
  status: "Live" as const,
  greetingName: "Nikhil",
  election: {
    title: "Uttar Pradesh Assembly 2027",
    daysToGo: 216,
  },
  filters: {
    state: "Uttar Pradesh",
    district: "Agra",
    constituency: "Agra North",
  },
  groundSignals: [
    {
      id: "s1",
      location: "Ward 14, Kheria",
      text: "Water shortage issue rising — households reporting 2nd day without supply.",
      category: "Water",
      ago: "10m ago",
    },
    {
      id: "s2",
      location: "Lohamandi Market",
      text: "Opposition cadre distributing pamphlets near main chowk.",
      category: "Opposition",
      ago: "25m ago",
    },
    {
      id: "s3",
      location: "Rural belt · Trans-Yamuna",
      text: "Farmers discussing irrigation delays after recent canal maintenance.",
      category: "Agriculture",
      ago: "40m ago",
    },
    {
      id: "s4",
      location: "Booth 62, Shahganj",
      text: "Youth meetup planned Saturday — employment messaging opportunity.",
      category: "Jobs",
      ago: "1h ago",
    },
    {
      id: "s5",
      location: "Cantt Road",
      text: "Night patrol visibility praised in local WhatsApp groups.",
      category: "Law & Order",
      ago: "2h ago",
    },
  ] satisfies LiveSignal[],
  emotions: [
    { label: "Anger", value: 68 },
    { label: "Hope", value: 42 },
    { label: "Fear", value: 35 },
    { label: "Pride", value: 51 },
    { label: "Despair", value: 28 },
  ] satisfies EmotionPoint[],
  volatilityIndex: 68,
  recommendations: [
    {
      id: "r1",
      priority: "Critical",
      title: "Organize “Vikas ka Kaam” sabha in Kheria",
      detail:
        "Counter water grievance with visible action plan and ward-level attendance.",
      window: "Next 48 hours",
      audience: "Jatav · Urban poor",
    },
    {
      id: "r2",
      priority: "High",
      title: "Meet local leaders in Lohamandi",
      detail:
        "Neutralize pamphlet narrative before weekend market footfall peaks.",
      window: "This week",
      audience: "Traders · Muslim",
    },
    {
      id: "r3",
      priority: "Low",
      title: "Sustained outreach in Trans-Yamuna belt",
      detail:
        "Keep irrigation progress updates flowing through booth volunteers.",
      window: "This month",
      audience: "Farmers",
    },
  ] satisfies LiveRecommendation[],
  aiBriefChecklist: [
    "Actionable Steps",
    "Key Messages",
    "Voter Insights",
    "Risk Flags",
  ],
  strategicPlan: {
    recommendedActions: [
      "Hold targeted rally in rural belt",
      "Deploy rapid response on water complaints",
      "Activate booth captains in swing wards",
    ],
    leadersShouldSay: [
      "Talk about jobs & local employment",
      "Acknowledge water issues with a clear timeline",
      "Highlight night patrol improvements",
    ],
    socialPosts: [
      "Short videos on development work",
      "Infographics on canal / irrigation progress",
      "Community spotlights from Ward 14 volunteers",
    ],
    boothInstructions: [
      "Focus on weak & swing booths",
      "Log every grievance with photo evidence",
      "Share morning brief highlights in booth groups",
    ],
  },
  alerts: [
    {
      id: "a1",
      level: "urgent",
      text: "Opposition leader visiting Lohamandi — prepare counter brief",
      ago: "2h ago",
    },
    {
      id: "a2",
      level: "watch",
      text: "Social spike on water shortage in Ward 14",
      ago: "3h ago",
    },
    {
      id: "a3",
      level: "info",
      text: "Media request received for Agra North development story",
      ago: "5h ago",
    },
    {
      id: "a4",
      level: "watch",
      text: "Booth 62 youth meetup — opportunity for employment message",
      ago: "6h ago",
    },
  ] satisfies LiveAlert[],
} as const;

export type AgraNorthLive = typeof agraNorthLive;
