import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/landing/site-header";
import { WarRoomDashboard } from "@/components/war-room/war-room-dashboard";
import { findState } from "@/lib/regions";

type PageProps = {
  params: Promise<{ country: string; state: string }>;
};

export default async function WarRoomPage({ params }: PageProps) {
  const { country: countryId, state: stateSlug } = await params;
  const { country, state } = findState(countryId, stateSlug);

  if (!country || !state || !state.enabled) {
    notFound();
  }

  return (
    <div className="page-shell min-h-screen pb-12">
      <SiteHeader />
      <WarRoomDashboard country={country} state={state} />
    </div>
  );
}
