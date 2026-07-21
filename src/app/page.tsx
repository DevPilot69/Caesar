import { HeroSection } from "@/components/landing/hero-section";
import { PillarsStrip } from "@/components/landing/pillars-strip";
import { RegionSelector } from "@/components/landing/region-selector";
import { SiteHeader } from "@/components/landing/site-header";
import { StatsBar } from "@/components/landing/stats-bar";

export default function Home() {
  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main>
        <HeroSection />
        <PillarsStrip />
        <RegionSelector />
        <StatsBar />
        <footer
          id="contact"
          className="mx-auto max-w-[1280px] px-4 pb-10 pt-2 text-center sm:px-6 lg:px-10"
        >
          <div id="about" className="glass-panel rounded-2xl px-6 py-8">
            <p className="font-display text-lg font-semibold text-ink">
              Caesar is the Political Intelligence OS
            </p>
            <p className="mx-auto mt-2 max-w-xl text-sm text-ink-muted">
              Built for campaign directors, war rooms, and strategists who need
              evidence-backed decisions — not another CRM.
            </p>
            <a
              href="mailto:ops@caesar.intelligence"
              className="mt-5 inline-flex rounded-xl bg-gradient-to-r from-brand to-teal px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_22px_rgba(10,143,108,0.28)]"
            >
              Request access
            </a>
          </div>
          <p className="mt-6 text-xs text-ink-muted">
            © {new Date().getFullYear()} Caesar — Political Intelligence OS
          </p>
        </footer>
      </main>
    </div>
  );
}
