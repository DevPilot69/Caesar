export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
  /** Structured blocks for assistant replies */
  sections?: {
    title: string;
    items: string[];
  }[];
};

export type SavedChat = {
  id: string;
  title: string;
  preview: string;
  time: string;
  group: "Today" | "Yesterday" | "Previous 7 Days";
};

export const warRoomChatMock = {
  election: {
    title: "Uttar Pradesh Assembly 2027",
    daysToGo: 216,
  },
  savedChats: [
    {
      id: "c1",
      title: "Agra North strategy",
      preview: "Prioritize water tankers in worst-hit wards…",
      time: "10:30 AM",
      group: "Today",
    },
    {
      id: "c2",
      title: "Meerut booth coverage",
      preview: "6 under-resourced booths need volunteers…",
      time: "9:12 AM",
      group: "Today",
    },
    {
      id: "c3",
      title: "Opposition narrative watch",
      preview: "Pamphlet distribution detected in Lohamandi…",
      time: "Yesterday",
      group: "Yesterday",
    },
    {
      id: "c4",
      title: "Lucknow media brief",
      preview: "Draft talking points for evening presser…",
      time: "Yesterday",
      group: "Yesterday",
    },
    {
      id: "c5",
      title: "Farmers belt messaging",
      preview: "Irrigation progress updates for Trans-Yamuna…",
      time: "Mon",
      group: "Previous 7 Days",
    },
    {
      id: "c6",
      title: "SC outreach plan",
      preview: "Booth-level grievance volume rising in Ward 14…",
      time: "Sun",
      group: "Previous 7 Days",
    },
  ] satisfies SavedChat[],
  activeChatId: "c1",
  messages: [
    {
      id: "m1",
      role: "user",
      content:
        "What are the top issues in Agra North right now, and what should we do in the next 48 hours?",
      time: "10:28 AM",
    },
    {
      id: "m2",
      role: "assistant",
      content:
        "Based on live ground signals, news, and the emotion radar for Agra North, here is a concise war-room read.",
      time: "10:28 AM",
      sections: [
        {
          title: "Top issues (ranked)",
          items: [
            "Water Supply & Quality — Ward 14 / Kheria spike (critical)",
            "Unemployment — youth meetup opportunity in Booth 62",
            "Road Infrastructure — Fatehabad corridor delays",
          ],
        },
        {
          title: "48-hour strategic approach",
          items: [
            "Prioritize water tankers in worst-hit villages and publish a visible timeline",
            "Hold a “Vikas ka Kaam” sabha in Kheria with ward leaders present",
            "Pre-brief booth captains on talking points before Saturday youth meetup",
            "Counter Lohamandi pamphlet narrative with trader outreach today",
          ],
        },
        {
          title: "Evidence notes",
          items: [
            "Volatility Index: 68/100 — Anger elevated vs Hope",
            "3 linked observations from field + Amar Ujala Agra",
            "Recommendation confidence: High on water, Medium on jobs",
          ],
        },
      ],
    },
    {
      id: "m3",
      role: "user",
      content: "Draft the key messages leaders should say on water.",
      time: "10:31 AM",
    },
    {
      id: "m4",
      role: "assistant",
      content:
        "Here are human-gated message options — short, local, and evidence-ready.",
      time: "10:31 AM",
      sections: [
        {
          title: "What leaders should say",
          items: [
            "We hear you — tankers are moving into Ward 14 tonight, with a repair schedule by Friday.",
            "No family in Kheria should wait two days for water. Here’s the ward-wise plan.",
            "We’re fixing the pipeline stretch and publishing progress every morning.",
          ],
        },
        {
          title: "What to post",
          items: [
            "30-sec video: tanker arrival + ward map",
            "Carousel: before/after repair photos with timestamps",
            "Booth volunteer stories from Kheria residents",
          ],
        },
      ],
    },
  ] satisfies ChatMessage[],
  starterPrompts: [
    "Summarize Agra North overnight signals",
    "Who should we meet in Lohamandi this week?",
    "Draft a booth instruction for swing wards",
  ],
} as const;
