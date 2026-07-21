export type Country = {
  id: string;
  name: string;
  flag: string;
};

export type StateItem = {
  id: string;
  name: string;
  enabled: boolean;
  image: string;
  slug: string;
};

export const countries: Country[] = [
  { id: "in", name: "India", flag: "🇮🇳" },
  { id: "us", name: "USA", flag: "🇺🇸" },
  { id: "uk", name: "UK", flag: "🇬🇧" },
  { id: "can", name: "Canada", flag: "🇨🇦" },
  { id: "de", name: "Germany", flag: "🇩🇪" },
];

export const statesByCountry: Record<string, StateItem[]> = {
  in: [
    {
      id: "pb",
      name: "Punjab",
      slug: "punjab",
      enabled: true,
      // Golden Temple, Amritsar
      image:
        "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=85",
    },
    {
      id: "up",
      name: "Uttar Pradesh",
      slug: "uttar-pradesh",
      enabled: true,
      // Taj Mahal
      image:
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=85",
    },
    {
      id: "ap",
      name: "Andhra Pradesh",
      slug: "andhra-pradesh",
      enabled: true,
      // Coastal / temple India
      image:
        "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=85",
    },
    {
      id: "jk",
      name: "Jammu & Kashmir",
      slug: "jammu-kashmir",
      enabled: false,
      image:
        "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=85",
    },
    {
      id: "mh",
      name: "Maharashtra",
      slug: "maharashtra",
      enabled: false,
      // Mumbai / Gateway
      image:
        "https://images.unsplash.com/photo-1570168007204-e0e0f08a3b21?auto=format&fit=crop&w=1200&q=85",
    },
    {
      id: "ka",
      name: "Karnataka",
      slug: "karnataka",
      enabled: false,
      image:
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85",
    },
    {
      id: "tn",
      name: "Tamil Nadu",
      slug: "tamil-nadu",
      enabled: false,
      image:
        "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=1200&q=85",
    },
    {
      id: "gj",
      name: "Gujarat",
      slug: "gujarat",
      enabled: false,
      image:
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=85",
    },
    {
      id: "rj",
      name: "Rajasthan",
      slug: "rajasthan",
      enabled: false,
      // Desert / fort
      image:
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=85",
    },
  ],
  us: [
    {
      id: "ca",
      name: "California",
      slug: "california",
      enabled: true,
      image:
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=85",
    },
    {
      id: "ny",
      name: "New York",
      slug: "new-york",
      enabled: true,
      image:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=85",
    },
    {
      id: "tx",
      name: "Texas",
      slug: "texas",
      enabled: false,
      image:
        "https://images.unsplash.com/photo-1531218150217-54595bc2b934?auto=format&fit=crop&w=1200&q=85",
    },
  ],
  uk: [
    {
      id: "eng",
      name: "England",
      slug: "england",
      enabled: true,
      image:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=85",
    },
    {
      id: "sct",
      name: "Scotland",
      slug: "scotland",
      enabled: false,
      image:
        "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=85",
    },
  ],
  can: [
    {
      id: "on",
      name: "Ontario",
      slug: "ontario",
      enabled: true,
      image:
        "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1200&q=85",
    },
    {
      id: "bc",
      name: "British Columbia",
      slug: "british-columbia",
      enabled: false,
      image:
        "https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&w=1200&q=85",
    },
    {
      id: "qc",
      name: "Quebec",
      slug: "quebec",
      enabled: false,
      image:
        "https://images.unsplash.com/photo-1519178614-68673b201f36?auto=format&fit=crop&w=1200&q=85",
    },
  ],
  de: [
    {
      id: "be",
      name: "Berlin",
      slug: "berlin",
      enabled: true,
      image:
        "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1200&q=85",
    },
    {
      id: "by",
      name: "Bavaria",
      slug: "bavaria",
      enabled: false,
      image:
        "https://images.unsplash.com/photo-1595867818082-083882f36d3f?auto=format&fit=crop&w=1200&q=85",
    },
    {
      id: "nw",
      name: "North Rhine-Westphalia",
      slug: "nrw",
      enabled: false,
      image:
        "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=85",
    },
  ],
};

export function findState(countryId: string, stateSlug: string) {
  const country = countries.find((c) => c.id === countryId);
  const state = statesByCountry[countryId]?.find((s) => s.slug === stateSlug);
  return { country, state };
}

export type BriefItem = {
  tag: string;
  title: string;
  detail: string;
  confidence: number;
  source: string;
};

export type RecItem = {
  priority: "High" | "Medium";
  title: string;
  evidence: string;
  action: string;
};

export function getTheatreIntel(stateSlug: string, stateName: string) {
  if (stateSlug === "punjab") {
    return {
      health: 72,
      momentum: "Rising",
      seatsAtRisk: 14,
      brief: [
        {
          tag: "Issue spike",
          title: "Farm procurement narrative accelerating in Malwa",
          detail:
            "Regional press + social volume up 38% vs 7-day baseline. Cross-check with constituency memory for Bathinda & Mansa.",
          confidence: 86,
          source: "News · Social · Field notes",
        },
        {
          tag: "Leader move",
          title: "Opposition visit cluster detected — Ludhiana belt",
          detail:
            "Three overlapping events in 48h. Strategy feed recommends counter-brief within morning window.",
          confidence: 79,
          source: "News · Party calendar",
        },
        {
          tag: "Governance",
          title: "Scheme delivery complaints trending in Doaba",
          detail:
            "Evidence chain links PIB release → local grievance posts → booth-level sentiment dip.",
          confidence: 74,
          source: "Govt · Social · Surveys",
        },
      ] satisfies BriefItem[],
      recs: [
        {
          priority: "High",
          title: "Prioritize Malwa messaging on procurement timelines",
          evidence: "12 linked observations · ECI margin history · 4 press clips",
          action: "Push to Strategy Feed",
        },
        {
          priority: "High",
          title: "Rebalance volunteer coverage — 6 under-resourced booths",
          evidence: "Coverage score < target in AC cluster",
          action: "Open constituency map",
        },
        {
          priority: "Medium",
          title: "Prep rebuttal pack for Ludhiana narrative",
          evidence: "3 event nodes · 2 opponent statements",
          action: "Attach evidence pack",
        },
      ] satisfies RecItem[],
    };
  }

  return {
    health: 68,
    momentum: "Stable",
    seatsAtRisk: 8,
    brief: [
      {
        tag: "Signal",
        title: `Overnight change detected across ${stateName}`,
        detail:
          "Caesar fused public sources into constituency-linked observations with ranked evidence.",
        confidence: 81,
        source: "Multi-source graph",
      },
      {
        tag: "Issue",
        title: "Local narrative pressure rising in swing seats",
        detail:
          "Issue Pressure Index elevated vs prior week. Human review recommended before message shift.",
        confidence: 76,
        source: "News · Social",
      },
      {
        tag: "Decision",
        title: "Strategy feed ready for war-room review",
        detail:
          "Recommendations include evidence links, confidence, and freshness timestamps.",
        confidence: 88,
        source: "Reasoning engine",
      },
    ] satisfies BriefItem[],
    recs: [
      {
        priority: "High",
        title: `Review top 5 at-risk constituencies in ${stateName}`,
        evidence: "Competitiveness signals · historical margins",
        action: "Open brief",
      },
      {
        priority: "Medium",
        title: "Validate new issue cluster before narrative pivot",
        evidence: "Observation confidence mixed — human gate",
        action: "Inspect evidence",
      },
    ] satisfies RecItem[],
  };
}
