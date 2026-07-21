export type ConstituencyBadge = "Live" | "Overview" | "Sample";

export type UpConstituencyListItem = {
  slug: string;
  name: string;
  district: string;
  summary: string;
  enabled: boolean;
  badge: ConstituencyBadge | null;
  dedicated?: boolean;
  voters: string;
  lastWinner: string;
  margin: string;
  swing: "High" | "Medium" | "Low";
  mood: "Stable" | "Heating" | "Volatile";
  risk: "Low" | "Moderate" | "High";
  accent: string;
};

export type SampleConstituency = {
  slug: string;
  name: string;
  district: string;
  state: string;
  summary: string;
  election: { title: string; daysToGo: number };
  mood: "Stable" | "Heating" | "Volatile";
  risk: "Low" | "Moderate" | "High";
  voteShare: { party: string; percent: number; color: string }[];
  profile: {
    id: string;
    label: string;
    value: string;
    icon: "users" | "vote" | "percent" | "trophy" | "gap";
  }[];
  booths: { name: string; status: "Strong" | "Swing" | "Watch" }[];
  keyIssues: { label: string; percent: number }[];
  signals: {
    id: string;
    source: string;
    text: string;
    sentiment: "Positive" | "Neutral" | "Negative";
    ago: string;
  }[];
  takeaways: string[];
  actions: string[];
};

/** Five flagship UP theatres for the Caesar demo */
export const upConstituencyIndex: UpConstituencyListItem[] = [
  {
    slug: "agra-north",
    name: "Agra North",
    district: "Agra",
    summary:
      "Live war-room theatre — emotion radar, ground signals, and ranked actions.",
    enabled: true,
    badge: "Live",
    dedicated: true,
    voters: "12.4 Lakh",
    lastWinner: "BJP",
    margin: "+51,080",
    swing: "Medium",
    mood: "Heating",
    risk: "Moderate",
    accent: "#0a8f6c",
  },
  {
    slug: "lucknow-central",
    name: "Lucknow Central",
    district: "Lucknow",
    summary:
      "Capital urban seat — governance delivery and middle-class swing pockets.",
    enabled: true,
    badge: "Sample",
    voters: "4.1 Lakh",
    lastWinner: "BJP",
    margin: "+28,940",
    swing: "Medium",
    mood: "Stable",
    risk: "Moderate",
    accent: "#0e9aa7",
  },
  {
    slug: "varanasi-cantt",
    name: "Varanasi Cantt",
    district: "Varanasi",
    summary:
      "High-visibility corridor — pilgrim economy, weaver livelihoods, civic proof.",
    enabled: true,
    badge: "Sample",
    voters: "3.6 Lakh",
    lastWinner: "BJP",
    margin: "+61,220",
    swing: "Low",
    mood: "Stable",
    risk: "Low",
    accent: "#c4a35a",
  },
  {
    slug: "meerut-south",
    name: "Meerut South",
    district: "Meerut",
    summary:
      "Western UP swing pocket — community balance, mandi prices, law & order.",
    enabled: true,
    badge: "Sample",
    voters: "3.4 Lakh",
    lastWinner: "SP",
    margin: "+12,480",
    swing: "High",
    mood: "Volatile",
    risk: "High",
    accent: "#e07a5f",
  },
  {
    slug: "ghaziabad",
    name: "Ghaziabad",
    district: "Ghaziabad",
    summary:
      "NCR peri-urban pressure — transit, housing, RWAs, and migrant turnout.",
    enabled: true,
    badge: "Sample",
    voters: "4.8 Lakh",
    lastWinner: "BJP",
    margin: "+33,500",
    swing: "Medium",
    mood: "Heating",
    risk: "Moderate",
    accent: "#056b52",
  },
];

export const sampleConstituencies: Record<string, SampleConstituency> = {
  "lucknow-central": {
    slug: "lucknow-central",
    name: "Lucknow Central",
    district: "Lucknow",
    state: "Uttar Pradesh",
    summary:
      "Capital urban seat — governance delivery and middle-class swing pockets.",
    election: { title: "Uttar Pradesh Assembly 2027", daysToGo: 216 },
    mood: "Stable",
    risk: "Moderate",
    voteShare: [
      { party: "BJP", percent: 48, color: "#f59e0b" },
      { party: "SP", percent: 32, color: "#ef4444" },
      { party: "Others", percent: 20, color: "#94a3b8" },
    ],
    profile: [
      { id: "voters", label: "Total Voters", value: "4.1 Lakh", icon: "vote" },
      { id: "turnout", label: "Turnout 2022", value: "58.4%", icon: "percent" },
      {
        id: "community",
        label: "Dominant Mix",
        value: "Urban Hindu / Kayastha",
        icon: "users",
      },
      { id: "winner", label: "Past Winner", value: "BJP 2022", icon: "trophy" },
      { id: "margin", label: "Margin", value: "+28,940", icon: "gap" },
    ],
    booths: [
      { name: "Hazratganj Core", status: "Strong" },
      { name: "Aminabad Belt", status: "Swing" },
      { name: "Chowk Wards", status: "Watch" },
      { name: "Lalbagh Pocket", status: "Swing" },
    ],
    keyIssues: [
      { label: "Traffic & Parking", percent: 64 },
      { label: "Encroachments", percent: 51 },
      { label: "Unemployment", percent: 44 },
      { label: "Water Logging", percent: 36 },
    ],
    signals: [
      {
        id: "lc1",
        source: "Field Desk · Ward 7",
        text: "Aminabad traders flag encroachment drive inconsistency.",
        sentiment: "Negative",
        ago: "28m ago",
      },
      {
        id: "lc2",
        source: "Local Desk",
        text: "Night market lighting upgrade drawing positive chatter.",
        sentiment: "Positive",
        ago: "1h ago",
      },
      {
        id: "lc3",
        source: "Booth Volunteer",
        text: "Youth walk-in at employment booth — average footfall.",
        sentiment: "Neutral",
        ago: "2h ago",
      },
    ],
    takeaways: [
      "Middle-class swing tracks visible civic delivery this quarter.",
      "Trader corridors need consistent follow-through, not one-off drives.",
      "Capital optics help — but booth heat is uneven across wards.",
    ],
    actions: [
      "Schedule trader roundtable in Aminabad within 72h",
      "Publish ward-wise parking plan with timelines",
      "Activate youth volunteer cells in Lalbagh swing booths",
    ],
  },
  "varanasi-cantt": {
    slug: "varanasi-cantt",
    name: "Varanasi Cantt",
    district: "Varanasi",
    state: "Uttar Pradesh",
    summary:
      "High-visibility corridor — pilgrim economy, weaver livelihoods, civic proof.",
    election: { title: "Uttar Pradesh Assembly 2027", daysToGo: 216 },
    mood: "Stable",
    risk: "Low",
    voteShare: [
      { party: "BJP", percent: 56, color: "#f59e0b" },
      { party: "SP", percent: 24, color: "#ef4444" },
      { party: "Others", percent: 20, color: "#94a3b8" },
    ],
    profile: [
      { id: "voters", label: "Total Voters", value: "3.6 Lakh", icon: "vote" },
      { id: "turnout", label: "Turnout 2022", value: "62.1%", icon: "percent" },
      {
        id: "community",
        label: "Dominant Mix",
        value: "Urban Hindu / Weavers",
        icon: "users",
      },
      { id: "winner", label: "Past Winner", value: "BJP 2022", icon: "trophy" },
      { id: "margin", label: "Margin", value: "+61,220", icon: "gap" },
    ],
    booths: [
      { name: "Cantt Market", status: "Strong" },
      { name: "Sigra Corridor", status: "Strong" },
      { name: "Weaver Clusters", status: "Swing" },
      { name: "Ghat Access Wards", status: "Watch" },
    ],
    keyIssues: [
      { label: "Pilgrim Facilities", percent: 58 },
      { label: "Handloom Livelihoods", percent: 49 },
      { label: "Sanitation", percent: 42 },
      { label: "Traffic Congestion", percent: 39 },
    ],
    signals: [
      {
        id: "vc1",
        source: "Ground Agent",
        text: "Weaver cooperatives asking for procurement clarity before festivals.",
        sentiment: "Neutral",
        ago: "40m ago",
      },
      {
        id: "vc2",
        source: "Local Media Desk",
        text: "Cantt cleanliness drive photographed widely — positive local share.",
        sentiment: "Positive",
        ago: "1h ago",
      },
      {
        id: "vc3",
        source: "Volunteer · Sigra",
        text: "Pilgrim queue management praised near two choke points.",
        sentiment: "Positive",
        ago: "3h ago",
      },
    ],
    takeaways: [
      "Margin is large, but livelihood messaging still matters in weaver belts.",
      "Pilgrim-season logistics remain a reputation risk if delayed.",
      "Sanitation wins compound when made highly visible on ground desks.",
    ],
    actions: [
      "Brief weaver associations on festival procurement window",
      "Deploy pilgrim-help desks at 3 Cantt choke points",
      "Amplify sanitation before/after visuals weekly",
    ],
  },
  "meerut-south": {
    slug: "meerut-south",
    name: "Meerut South",
    district: "Meerut",
    state: "Uttar Pradesh",
    summary:
      "Western UP swing pocket — community balance, mandi prices, law & order.",
    election: { title: "Uttar Pradesh Assembly 2027", daysToGo: 216 },
    mood: "Volatile",
    risk: "High",
    voteShare: [
      { party: "SP", percent: 41, color: "#ef4444" },
      { party: "BJP", percent: 38, color: "#f59e0b" },
      { party: "Others", percent: 21, color: "#94a3b8" },
    ],
    profile: [
      { id: "voters", label: "Total Voters", value: "3.4 Lakh", icon: "vote" },
      { id: "turnout", label: "Turnout 2022", value: "64.2%", icon: "percent" },
      {
        id: "community",
        label: "Dominant Mix",
        value: "Jat / Muslim / SC mix",
        icon: "users",
      },
      { id: "winner", label: "Past Winner", value: "SP 2022", icon: "trophy" },
      { id: "margin", label: "Margin", value: "+12,480", icon: "gap" },
    ],
    booths: [
      { name: "Shastri Nagar", status: "Swing" },
      { name: "Lalkurti", status: "Watch" },
      { name: "Rural Fringe South", status: "Strong" },
      { name: "Mandi Corridor", status: "Swing" },
    ],
    keyIssues: [
      { label: "Price Rise", percent: 69 },
      { label: "Law & Order", percent: 54 },
      { label: "Farm Mandi Access", percent: 46 },
      { label: "Power Cuts", percent: 38 },
    ],
    signals: [
      {
        id: "ms1",
        source: "Mandi Desk",
        text: "Vegetable price spike dominating WhatsApp forwards tonight.",
        sentiment: "Negative",
        ago: "18m ago",
      },
      {
        id: "ms2",
        source: "Field Agent · Lalkurti",
        text: "Women groups requesting more beat patrol presence after dark.",
        sentiment: "Neutral",
        ago: "1h ago",
      },
      {
        id: "ms3",
        source: "Booth Captain",
        text: "Rural fringe south still solid — volunteer attendance high.",
        sentiment: "Positive",
        ago: "2h ago",
      },
    ],
    takeaways: [
      "High-swing seat — price narrative can flip booth clusters quickly.",
      "Community balance requires careful, evidence-backed outreach.",
      "Lalkurti is the early-warning zone for law-and-order perception.",
    ],
    actions: [
      "Counter price narrative with local relief / PDS check visits",
      "Increase night patrol visibility in Lalkurti for 7 days",
      "Map mandi influencer network for rapid rumor response",
    ],
  },
  ghaziabad: {
    slug: "ghaziabad",
    name: "Ghaziabad",
    district: "Ghaziabad",
    state: "Uttar Pradesh",
    summary:
      "NCR peri-urban pressure — transit, housing, RWAs, and migrant turnout.",
    election: { title: "Uttar Pradesh Assembly 2027", daysToGo: 216 },
    mood: "Heating",
    risk: "Moderate",
    voteShare: [
      { party: "BJP", percent: 47, color: "#f59e0b" },
      { party: "SP", percent: 29, color: "#ef4444" },
      { party: "Others", percent: 24, color: "#94a3b8" },
    ],
    profile: [
      { id: "voters", label: "Total Voters", value: "4.8 Lakh", icon: "vote" },
      { id: "turnout", label: "Turnout 2022", value: "55.6%", icon: "percent" },
      {
        id: "community",
        label: "Dominant Mix",
        value: "Migrant urban / OBC",
        icon: "users",
      },
      { id: "winner", label: "Past Winner", value: "BJP 2022", icon: "trophy" },
      { id: "margin", label: "Margin", value: "+33,500", icon: "gap" },
    ],
    booths: [
      { name: "Indirapuram", status: "Swing" },
      { name: "Vasundhara", status: "Strong" },
      { name: "Transit Belts", status: "Watch" },
      { name: "Old Ghaziabad", status: "Swing" },
    ],
    keyIssues: [
      { label: "Metro / Transit", percent: 63 },
      { label: "Housing & Rents", percent: 55 },
      { label: "Pollution", percent: 48 },
      { label: "Water Supply", percent: 40 },
    ],
    signals: [
      {
        id: "gz1",
        source: "RWAs Desk",
        text: "Indirapuram RWAs circulating petition on water pressure drops.",
        sentiment: "Negative",
        ago: "50m ago",
      },
      {
        id: "gz2",
        source: "Transit Volunteer",
        text: "Last-mile e-rickshaw coordination improved near two metro gates.",
        sentiment: "Positive",
        ago: "2h ago",
      },
      {
        id: "gz3",
        source: "Colony Admin",
        text: "Pollution advisory share rate spiked after evening AQI jump.",
        sentiment: "Neutral",
        ago: "3h ago",
      },
    ],
    takeaways: [
      "NCR migrants vote delivery & commute first; ideology second.",
      "RWA networks are the fastest rumor and grievance channel.",
      "Transit last-mile wins are highly shareable locally.",
    ],
    actions: [
      "Meet top 8 RWAs on water pressure this week",
      "Map metro last-mile gaps for a 14-day fix list",
      "Run pollution-response micro-brief for colony WhatsApp admins",
    ],
  },
};

export function getSampleConstituency(slug: string) {
  return sampleConstituencies[slug] ?? null;
}

export const upConstituencyNames = upConstituencyIndex.map((c) => c.name);

export const mapPins = [
  { slug: "meerut-south", label: "Meerut", x: 214, y: 198 },
  { slug: "ghaziabad", label: "Ghaziabad", x: 198, y: 208 },
  { slug: "agra-north", label: "Agra North", x: 222, y: 258 },
  { slug: "lucknow-central", label: "Lucknow", x: 278, y: 232 },
  { slug: "varanasi-cantt", label: "Varanasi", x: 342, y: 278 },
] as const;
