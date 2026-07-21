export type ZoneStrength = "strong" | "swing" | "weak" | "none";

export type MapZone = {
  id: string;
  name: string;
  strength: ZoneStrength;
  path: string;
  sentiment?: number;
  sentimentLabel?: "Positive" | "Neutral" | "Negative";
  risk?: "Low" | "Moderate" | "High";
  keyIssue?: string;
  dominantCommunity?: string;
};

export type NewsItem = {
  id: string;
  source: string;
  headline: string;
  ago: string;
  image: string;
};

export type GroundSignal = {
  id: string;
  source: string;
  text: string;
  sentiment: "Positive" | "Neutral" | "Negative";
  ago: string;
};

export type KeyIssue = {
  label: string;
  percent: number;
};

export const agraConstituency = {
  id: "agra",
  name: "Agra",
  state: "Uttar Pradesh",
  stateCode: "UP",
  slug: "agra",
  summary: "Moderate — BJP historically strong, now fragmenting.",
  election: {
    title: "Uttar Pradesh Assembly 2027",
    daysToGo: 216,
  },
  profile: [
    { id: "pop", label: "Population", value: "18.7 Lakh", icon: "users" },
    { id: "voters", label: "Total Voters", value: "12.4 Lakh", icon: "vote" },
    { id: "turnout", label: "Turnout 2017", value: "61.3%", icon: "percent" },
    {
      id: "community",
      label: "Dominant Community",
      value: "SC 32%",
      icon: "users",
    },
    { id: "winner", label: "Past Winner", value: "BJP 2017", icon: "trophy" },
    { id: "margin", label: "Margin", value: "+42,316", icon: "gap" },
  ],
  mapZones: [
    {
      id: "agra-city",
      name: "Agra City",
      strength: "strong",
      path: "M120 95 h70 v55 h-70 z",
      sentiment: 72,
      sentimentLabel: "Positive",
      risk: "Moderate",
      keyIssue: "Law & Order",
      dominantCommunity: "SC 32%",
    },
    {
      id: "agra-cantt",
      name: "Agra Cantt",
      strength: "swing",
      path: "M190 95 h65 v55 h-65 z",
    },
    {
      id: "agra-south",
      name: "Agra South",
      strength: "weak",
      path: "M120 150 h70 v50 h-70 z",
    },
    {
      id: "agra-rural",
      name: "Agra Rural",
      strength: "swing",
      path: "M190 150 h65 v50 h-65 z",
    },
    {
      id: "fatehabad",
      name: "Fatehabad",
      strength: "strong",
      path: "M255 95 h55 v105 h-55 z",
    },
    {
      id: "etmadpur",
      name: "Etmadpur",
      strength: "none",
      path: "M120 200 h95 v45 h-95 z",
    },
    {
      id: "kheragarh",
      name: "Kheragarh",
      strength: "weak",
      path: "M215 200 h95 v45 h-95 z",
    },
    {
      id: "bah",
      name: "Bah",
      strength: "strong",
      path: "M120 245 h190 v40 h-190 z",
    },
  ] satisfies MapZone[],
  news: [
    {
      id: "n1",
      source: "Dainik Jagran",
      headline: "Agra civic body flags rising street crime complaints in Cantt",
      ago: "15m ago",
      image:
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: "n2",
      source: "India Today",
      headline: "Road repair delays spark local protest near Fatehabad road",
      ago: "42m ago",
      image:
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: "n3",
      source: "Hindustan Times",
      headline: "Opposition cadre meeting reported in Agra South booths",
      ago: "1h ago",
      image:
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: "n4",
      source: "Amar Ujala",
      headline: "Water supply disruption continues in three wards overnight",
      ago: "2h ago",
      image:
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=200&q=80",
    },
  ] satisfies NewsItem[],
  groundSignals: [
    {
      id: "g1",
      source: "Amar Ujala Agra",
      text: "कान्ट क्षेत्र में रात के समय सुरक्षा गश्त बढ़ाने की मांग तेज",
      sentiment: "Positive",
      ago: "22m ago",
    },
    {
      id: "g2",
      source: "Field Agent · Ward 14",
      text: "सड़क मरम्मत अधूरी — मतदाता असंतोष दिख रहा है",
      sentiment: "Negative",
      ago: "35m ago",
    },
    {
      id: "g3",
      source: "Local WhatsApp Desk",
      text: "रोजगार मेले की चर्चा बढ़ी, युवा जुड़ाव औसत",
      sentiment: "Neutral",
      ago: "1h ago",
    },
    {
      id: "g4",
      source: "Booth Volunteer",
      text: "कानून व्यवस्था पर सकारात्मक प्रतिक्रिया — शहर कोर",
      sentiment: "Positive",
      ago: "2h ago",
    },
  ] satisfies GroundSignal[],
  keyIssues: [
    { label: "Law & Order", percent: 68 },
    { label: "Road Infrastructure", percent: 52 },
    { label: "Unemployment", percent: 41 },
    { label: "Inflation / Prices", percent: 33 },
    { label: "Water Supply", percent: 28 },
  ] satisfies KeyIssue[],
  strategicBrief: {
    keyTakeaways: [
      "Law & Order is the top concern across Agra City and Cantt.",
      "BJP margin remains large historically, but swing wards are heating up.",
      "Opposition meetings in Agra South need counter-visibility this week.",
    ],
    focusOn: [
      "Focus on Law & Order messaging with evidence from recent patrols",
      "Complete visible road fixes on Fatehabad corridor",
      "Activate SC outreach in booths with rising grievance volume",
    ],
    whatToPost: [
      "Short videos on improved policing & night patrols",
      "Infographics on road repair progress by ward",
      "Community spotlights from Agra City volunteers",
    ],
    recommendedActions: [
      { id: "a1", label: "Plan Local Outreach", tone: "brand" },
      { id: "a2", label: "Deploy Ground Team", tone: "teal" },
      { id: "a3", label: "Media Engagement", tone: "accent" },
    ],
  },
  aiBriefTeaser:
    "Based on latest signals and trend analysis, here is your brief for Agra, Uttar Pradesh.",
} as const;

export type AgraConstituency = typeof agraConstituency;
