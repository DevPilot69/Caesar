export const voterInsightsAgraNorth = {
  location: {
    state: "Uttar Pradesh",
    district: "Agra",
    constituency: "Agra North",
  },
  election: {
    title: "Uttar Pradesh Assembly 2027",
    daysToGo: 216,
  },
  totalVoters: "12.4 Lakh",
  voteShareTrends: {
    years: [2012, 2017, 2022] as const,
    series: [
      { party: "BJP", color: "#f59e0b", values: [28, 44, 48] },
      { party: "SP", color: "#ef4444", values: [32, 26, 24] },
      { party: "BSP", color: "#3b82f6", values: [22, 18, 15] },
      { party: "OTH", color: "#94a3b8", values: [18, 12, 13] },
    ],
  },
  previousWinners: [
    { year: 2012, winner: "Ramesh Baghel", party: "SP", margin: "+18,420" },
    { year: 2017, winner: "Purushottam Khandelwal", party: "BJP", margin: "+42,316" },
    { year: 2022, winner: "Purushottam Khandelwal", party: "BJP", margin: "+51,080" },
  ],
  turnoutHistory: [
    { year: 2012, percent: 58 },
    { year: 2017, percent: 61 },
    { year: 2022, percent: 64 },
  ],
  swingAnalysis: [
    { segment: "Youth", level: "High Swing" as const },
    { segment: "Women", level: "Medium Swing" as const },
    { segment: "Rural", level: "High Swing" as const },
    { segment: "Minority", level: "Medium Swing" as const },
  ],
  overallSwing: "+4.2% towards BJP (2022 vs 2017)",
  ageGroups: [
    { label: "18–25", percent: 22, color: "#0a8f6c" },
    { label: "26–40", percent: 34, color: "#0e9aa7" },
    { label: "41–60", percent: 28, color: "#c4a35a" },
    { label: "60+", percent: 16, color: "#94a3b8" },
  ],
  communities: [
    { label: "Hindu", percent: 62 },
    { label: "Muslim", percent: 28 },
    { label: "SC/ST", percent: 7 },
    { label: "Others", percent: 3 },
  ],
  womenVoters: {
    count: "5.8 Lakh",
    share: "46.7%",
    note: "5% increase vs 2017",
  },
  youthVoters: {
    count: "2.7 Lakh",
    share: "22%",
    note: "High potential segment",
  },
  urbanRural: {
    urban: { percent: 38, count: "4.7 Lakh" },
    rural: { percent: 62, count: "7.7 Lakh" },
  },
  aiInsights: [
    "BJP holds a widening lead since 2017; margin expanded again in 2022.",
    "Youth and rural segments show high swing — prioritize booth coverage there.",
    "Women voters grew 5% vs 2017; messaging on safety and services will matter.",
    "Turnout is trending up (58% → 64%); mobilization ops have compounding returns.",
  ],
  briefChecklist: [
    "Historical summary",
    "Demographics pack",
    "Swing segment map",
    "Recommended outreach",
  ],
} as const;
