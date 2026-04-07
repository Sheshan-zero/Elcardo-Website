import { lazy, Suspense, useEffect } from 'react';
import SmoothScroll from '../../components/SmoothScroll';
import CustomCursor from '../../components/CustomCursor';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

import './CompaniesPage.css';

/* ─── Lazy load cinematic sections ─── */
const CompaniesHero = lazy(() => import('../../components/Companies/CompaniesHero'));
const OriginSection = lazy(() => import('../../components/Companies/OriginSection'));
const ExpansionTransition = lazy(() => import('../../components/Companies/ExpansionTransition'));
const EcosystemStorytelling = lazy(() => import('../../components/Companies/EcosystemStorytelling'));

/* ─── Post-Ecosystem Cinematic Editorial Sections ─── */
const StickyCompanyStory = lazy(() => import('../../components/Companies/StickyCompanyStory'));
const HorizontalCompanyStrip = lazy(() => import('../../components/Companies/HorizontalCompanyStrip'));
const UnitySection = lazy(() => import('../../components/Companies/UnitySection'));

const VisualProofRail = lazy(() => import('../../components/Companies/VisualProofRail'));
const FinalCTA = lazy(() => import('../../components/Companies/FinalCTA'));

/* ─── Premium Loader ─── */
function SectionLoader() {
  return (
    <div className="companies-section-loader">
      <div className="companies-loader-spinner" />
    </div>
  );
}

export default function CompaniesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />

      <main className="companies-page-main">
        <Suspense fallback={<SectionLoader />}>
          {/* 1. HERO — Set expectation immediately */}
          <CompaniesHero />

          {/* 2. ORIGIN — Ground the story */}
          <OriginSection />

          {/* 3. EXPANSION — Bridge before ecosystem */}
          <ExpansionTransition />

          {/* 4. NODE ECOSYSTEM — Contextual company intro */}
          <EcosystemStorytelling />

          {/* 5. STICKY STORY — Specific company identities */}
          <StickyCompanyStory />

          {/* 6. HORIZONTAL STRIP — "What we do across industries" */}
          <HorizontalCompanyStrip />

          {/* 7. UNITY SECTION — "One Group. Multiple Disciplines." */}
          <UnitySection />

          {/* 8. VISUAL PROOF — Build credibility */}
          <VisualProofRail />

          {/* 9. FINAL CTA */}
          <FinalCTA />
        </Suspense>
      </main>

      <Footer />
    </SmoothScroll>
  );
}
