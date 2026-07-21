import type { StateCode } from "@/data/tenancy/seed";
import { caesarStates } from "@/data/tenancy/seed";
import {
  alertsData,
  briefsData,
  campaignData,
  dashboardMeta,
  groundData,
  mediaData,
  oppositionData,
  productVoice,
  reportsData,
  settingsData,
  trendsData,
  breakingTickerItems,
  glanceStats,
} from "@/data/uttar-pradesh/dashboard-modules";
import {
  upConstituencyIndex,
  mapPins as upMapPins,
} from "@/data/uttar-pradesh/constituencies";
import {
  punjabAlertsData,
  punjabBriefsData,
  punjabCampaignData,
  punjabDashboardMeta,
  punjabGroundData,
  punjabMediaData,
  punjabOppositionData,
  punjabReportsData,
  punjabSettingsData,
  punjabTrendsData,
  punjabBreakingTickerItems,
  punjabGlanceStats,
} from "@/data/punjab/dashboard-modules";
import {
  punjabConstituencyIndex,
  punjabMapPins,
} from "@/data/punjab/constituencies";

export function getStatePack(code: StateCode) {
  const state = caesarStates[code];

  if (code === "PB") {
    return {
      code,
      state,
      productVoice,
      meta: punjabDashboardMeta,
      constituencies: punjabConstituencyIndex,
      mapPins: punjabMapPins,
      alerts: punjabAlertsData,
      briefs: punjabBriefsData,
      campaign: punjabCampaignData,
      opposition: punjabOppositionData,
      media: punjabMediaData,
      ground: punjabGroundData,
      reports: punjabReportsData,
      trends: punjabTrendsData,
      settings: punjabSettingsData,
      breaking: punjabBreakingTickerItems,
      glance: punjabGlanceStats,
    };
  }

  return {
    code: "UP" as const,
    state,
    productVoice,
    meta: dashboardMeta,
    constituencies: upConstituencyIndex,
    mapPins: upMapPins,
    alerts: alertsData,
    briefs: briefsData,
    campaign: campaignData,
    opposition: oppositionData,
    media: mediaData,
    ground: groundData,
    reports: reportsData,
    trends: trendsData,
    settings: settingsData,
    breaking: breakingTickerItems,
    glance: glanceStats,
  };
}

export type StatePack = ReturnType<typeof getStatePack>;
