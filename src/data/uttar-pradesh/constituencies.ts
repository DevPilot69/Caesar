export type ConstituencyBadge = "Live" | "Overview" | "Sample";

export type UpConstituencyListItem = {
  slug: string;
  name: string;
  district: string;
  summary: string;
  enabled: boolean;
  badge: ConstituencyBadge | null;
  /** Dedicated rich page (not the generic sample route) */
  dedicated?: boolean;
  voters: string;
  lastWinner: string;
  margin: string;
  swing: "High" | "Medium" | "Low";
};

export type SampleConstituency = {
  slug: string;
  name: string;
  district: string;
  state: string;
  summary: string;
  election: { title: string; daysToGo: number };
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

export const upConstituencyIndex: UpConstituencyListItem[] = [
  {
    slug: "agra-north",
    name: "Agra North",
    district: "Agra",
    summary: "Live war-room view — signals, emotion radar, alerts",
    enabled: true,
    badge: "Live",
    dedicated: true,
    voters: "12.4 Lakh",
    lastWinner: "BJP",
    margin: "+51,080",
    swing: "Medium",
  },
  {
    slug: "agra",
    name: "Agra (District overview)",
    district: "Agra",
    summary: "Moderate — BJP historically strong, now fragmenting.",
    enabled: true,
    badge: "Overview",
    dedicated: true,
    voters: "12.4 Lakh",
    lastWinner: "BJP",
    margin: "+42,316",
    swing: "Medium",
  },
  {
    slug: "lucknow-central",
    name: "Lucknow Central",
    district: "Lucknow",
    summary: "Urban capital seat — governance narrative, middle-class swing.",
    enabled: true,
    badge: "Sample",
    voters: "4.1 Lakh",
    lastWinner: "BJP",
    margin: "+28,940",
    swing: "Medium",
  },
  {
    slug: "varanasi-cantt",
    name: "Varanasi Cantt",
    district: "Varanasi",
    summary: "High visibility corridor — pilgrim economy + civic delivery.",
    enabled: true,
    badge: "Sample",
    voters: "3.6 Lakh",
    lastWinner: "BJP",
    margin: "+61,220",
    swing: "Low",
  },
  {
    slug: "gorakhpur-urban",
    name: "Gorakhpur Urban",
    district: "Gorakhpur",
    summary: "Stronghold pressure test — youth jobs & urban services.",
    enabled: true,
    badge: "Sample",
    voters: "3.9 Lakh",
    lastWinner: "BJP",
    margin: "+44,110",
    swing: "Medium",
  },
  {
    slug: "meerut-south",
    name: "Meerut South",
    district: "Meerut",
    summary: "Western UP swing pocket — community clusters + price stress.",
    enabled: true,
    badge: "Sample",
    voters: "3.4 Lakh",
    lastWinner: "SP",
    margin: "+12,480",
    swing: "High",
  },
  {
    slug: "prayagraj-west",
    name: "Prayagraj West",
    district: "Prayagraj",
    summary: "Riverine urban mix — festival economy, sanitation, water.",
    enabled: true,
    badge: "Sample",
    voters: "3.7 Lakh",
    lastWinner: "BJP",
    margin: "+19,760",
    swing: "High",
  },
  {
    slug: "kanpur-cantt",
    name: "Kanpur Cantt",
    district: "Kanpur Nagar",
    summary: "Industrial belt seat — MSME distress & employment pulse.",
    enabled: true,
    badge: "Sample",
    voters: "3.2 Lakh",
    lastWinner: "BJP",
    margin: "+8,940",
    swing: "High",
  },
  {
    slug: "ghaziabad",
    name: "Ghaziabad",
    district: "Ghaziabad",
    summary: "NCR peri-urban — migration, transit, and housing pressure.",
    enabled: true,
    badge: "Sample",
    voters: "4.8 Lakh",
    lastWinner: "BJP",
    margin: "+33,500",
    swing: "Medium",
  },
];

export const sampleConstituencies: Record<string, SampleConstituency> = {
  "lucknow-central": {
    slug: "lucknow-central",
    name: "Lucknow Central",
    district: "Lucknow",
    state: "Uttar Pradesh",
    summary: "Urban capital seat — governance narrative, middle-class swing.",
    election: { title: "Uttar Pradesh Assembly 2027", daysToGo: 216 },
    profile: [
      { id: "voters", label: "Total Voters", value: "4.1 Lakh", icon: "vote" },
      { id: "turnout", label: "Turnout 2022", value: "58.4%", icon: "percent" },
      { id: "community", label: "Dominant Mix", value: "Urban Hindu / Kayastha", icon: "users" },
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
      "Middle-class swing is sensitive to visible civic delivery this quarter.",
      "Trader corridors (Aminabad / Chowk) need consistent follow-through.",
      "Capital visibility helps — but booth heat is uneven across wards.",
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
    summary: "High visibility corridor — pilgrim economy + civic delivery.",
    election: { title: "Uttar Pradesh Assembly 2027", daysToGo: 216 },
    profile: [
      { id: "voters", label: "Total Voters", value: "3.6 Lakh", icon: "vote" },
      { id: "turnout", label: "Turnout 2022", value: "62.1%", icon: "percent" },
      { id: "community", label: "Dominant Mix", value: "Urban Hindu / Weavers", icon: "users" },
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
    ],
    takeaways: [
      "Margin is large, but livelihood messaging still matters in weaver belts.",
      "Pilgrim-season logistics are a reputation risk if delayed.",
      "Keep sanitation wins highly visible on ground and WhatsApp desks.",
    ],
    actions: [
      "Brief weaver associations on festival procurement window",
      "Deploy pilgrim-help desks at 3 Cantt choke points",
      "Amplify sanitation before/after visuals weekly",
    ],
  },
  "gorakhpur-urban": {
    slug: "gorakhpur-urban",
    name: "Gorakhpur Urban",
    district: "Gorakhpur",
    state: "Uttar Pradesh",
    summary: "Stronghold pressure test — youth jobs & urban services.",
    election: { title: "Uttar Pradesh Assembly 2027", daysToGo: 216 },
    profile: [
      { id: "voters", label: "Total Voters", value: "3.9 Lakh", icon: "vote" },
      { id: "turnout", label: "Turnout 2022", value: "59.8%", icon: "percent" },
      { id: "community", label: "Dominant Mix", value: "Urban OBCs / Traders", icon: "users" },
      { id: "winner", label: "Past Winner", value: "BJP 2022", icon: "trophy" },
      { id: "margin", label: "Margin", value: "+44,110", icon: "gap" },
    ],
    booths: [
      { name: "Civil Lines", status: "Strong" },
      { name: "Rustampur Edge", status: "Swing" },
      { name: "Medical College Belt", status: "Watch" },
      { name: "Railway Colony", status: "Swing" },
    ],
    keyIssues: [
      { label: "Youth Employment", percent: 61 },
      { label: "Urban Drainage", percent: 47 },
      { label: "Healthcare Access", percent: 40 },
      { label: "Street Lighting", percent: 31 },
    ],
    signals: [
      {
        id: "gu1",
        source: "Campus Desk",
        text: "Medical College belt youth discussing private-job scarcity.",
        sentiment: "Negative",
        ago: "55m ago",
      },
      {
        id: "gu2",
        source: "Ward Coordinator",
        text: "Drainage desilting completed in two Civil Lines wards.",
        sentiment: "Positive",
        ago: "2h ago",
      },
    ],
    takeaways: [
      "Stronghold optics need youth employment proof points, not slogans.",
      "Drainage delivery in Civil Lines is transferable to swing edges.",
      "Campus-adjacent booths are the early warning layer.",
    ],
    actions: [
      "Host skill-fair micro-event near Medical College belt",
      "Publish drainage completion map for 6 wards",
      "Assign youth cell leads to Rustampur swing booths",
    ],
  },
  "meerut-south": {
    slug: "meerut-south",
    name: "Meerut South",
    district: "Meerut",
    state: "Uttar Pradesh",
    summary: "Western UP swing pocket — community clusters + price stress.",
    election: { title: "Uttar Pradesh Assembly 2027", daysToGo: 216 },
    profile: [
      { id: "voters", label: "Total Voters", value: "3.4 Lakh", icon: "vote" },
      { id: "turnout", label: "Turnout 2022", value: "64.2%", icon: "percent" },
      { id: "community", label: "Dominant Mix", value: "Jat / Muslim / SC mix", icon: "users" },
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
    ],
    takeaways: [
      "High-swing seat — price narrative can flip booth clusters quickly.",
      "Community balance requires careful, evidence-backed outreach.",
      "Lalkurti is a watch zone for law-and-order perception.",
    ],
    actions: [
      "Counter price narrative with local relief / PDS check visits",
      "Increase night patrol visibility in Lalkurti for 7 days",
      "Map mandi influencer network for rapid rumor response",
    ],
  },
  "prayagraj-west": {
    slug: "prayagraj-west",
    name: "Prayagraj West",
    district: "Prayagraj",
    state: "Uttar Pradesh",
    summary: "Riverine urban mix — festival economy, sanitation, water.",
    election: { title: "Uttar Pradesh Assembly 2027", daysToGo: 216 },
    profile: [
      { id: "voters", label: "Total Voters", value: "3.7 Lakh", icon: "vote" },
      { id: "turnout", label: "Turnout 2022", value: "60.5%", icon: "percent" },
      { id: "community", label: "Dominant Mix", value: "Urban mixed / SC pockets", icon: "users" },
      { id: "winner", label: "Past Winner", value: "BJP 2022", icon: "trophy" },
      { id: "margin", label: "Margin", value: "+19,760", icon: "gap" },
    ],
    booths: [
      { name: "Civil Lines West", status: "Strong" },
      { name: "Katra Belt", status: "Swing" },
      { name: "Ganga Side Wards", status: "Watch" },
      { name: "Colony Clusters", status: "Swing" },
    ],
    keyIssues: [
      { label: "Sanitation", percent: 57 },
      { label: "Drinking Water", percent: 52 },
      { label: "Festival Logistics", percent: 45 },
      { label: "Unemployment", percent: 37 },
    ],
    signals: [
      {
        id: "pw1",
        source: "Colony Volunteer",
        text: "Water tanker roster disputes rising in two western colonies.",
        sentiment: "Negative",
        ago: "33m ago",
      },
      {
        id: "pw2",
        source: "Event Desk",
        text: "Pre-festival prep meeting turnout solid among ward captains.",
        sentiment: "Positive",
        ago: "2h ago",
      },
    ],
    takeaways: [
      "Water reliability is the quiet swing driver between festivals.",
      "Sanitation wins compound with pilgrim-season reputation.",
      "Keep colony-level grievance loops under 48 hours.",
    ],
    actions: [
      "Publish tanker roster with ward captain contacts",
      "Audit sanitation blackspots along Ganga-side wards",
      "Run colony grievance camp this weekend",
    ],
  },
  "kanpur-cantt": {
    slug: "kanpur-cantt",
    name: "Kanpur Cantt",
    district: "Kanpur Nagar",
    state: "Uttar Pradesh",
    summary: "Industrial belt seat — MSME distress & employment pulse.",
    election: { title: "Uttar Pradesh Assembly 2027", daysToGo: 216 },
    profile: [
      { id: "voters", label: "Total Voters", value: "3.2 Lakh", icon: "vote" },
      { id: "turnout", label: "Turnout 2022", value: "57.9%", icon: "percent" },
      { id: "community", label: "Dominant Mix", value: "Workers / Traders", icon: "users" },
      { id: "winner", label: "Past Winner", value: "BJP 2022", icon: "trophy" },
      { id: "margin", label: "Margin", value: "+8,940", icon: "gap" },
    ],
    booths: [
      { name: "Factory Line East", status: "Watch" },
      { name: "Cantt Market", status: "Swing" },
      { name: "Labour Colonies", status: "Swing" },
      { name: "Officer Enclave", status: "Strong" },
    ],
    keyIssues: [
      { label: "MSME Credit", percent: 66 },
      { label: "Job Losses", percent: 58 },
      { label: "Air Quality", percent: 41 },
      { label: "Public Transport", percent: 34 },
    ],
    signals: [
      {
        id: "kc1",
        source: "Trade Union Desk",
        text: "Two MSME units reported delayed wages this week.",
        sentiment: "Negative",
        ago: "25m ago",
      },
      {
        id: "kc2",
        source: "Local Reporter",
        text: "Skill centre inauguration generated short positive buzz.",
        sentiment: "Positive",
        ago: "3h ago",
      },
    ],
    takeaways: [
      "Thin margin — labour colony mood is decisive.",
      "MSME credit stories outperform generic growth claims here.",
      "Pair employment messaging with tangible skill-centre outcomes.",
    ],
    actions: [
      "Open MSME grievance desk at Cantt Market for 5 days",
      "Document wage-delay cases for rapid escalation path",
      "Tour skill centre with local youth influencers",
    ],
  },
  ghaziabad: {
    slug: "ghaziabad",
    name: "Ghaziabad",
    district: "Ghaziabad",
    state: "Uttar Pradesh",
    summary: "NCR peri-urban — migration, transit, and housing pressure.",
    election: { title: "Uttar Pradesh Assembly 2027", daysToGo: 216 },
    profile: [
      { id: "voters", label: "Total Voters", value: "4.8 Lakh", icon: "vote" },
      { id: "turnout", label: "Turnout 2022", value: "55.6%", icon: "percent" },
      { id: "community", label: "Dominant Mix", value: "Migrant urban / OBC", icon: "users" },
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
