import { notFound } from "next/navigation";
import { SampleConstituencyPage } from "@/components/constituency/sample-constituency-page";
import {
  getSampleConstituency,
  sampleConstituencies,
} from "@/data/uttar-pradesh/constituencies";

export function generateStaticParams() {
  return Object.keys(sampleConstituencies).map((slug) => ({ slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getSampleConstituency(slug);
  if (!data) notFound();
  return <SampleConstituencyPage data={data} />;
}
