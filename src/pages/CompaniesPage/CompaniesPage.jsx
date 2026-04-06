import { lazy, Suspense, useEffect } from 'react';
import SmoothScroll from '../../components/SmoothScroll';
import CustomCursor from '../../components/CustomCursor';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

import './CompaniesPage.css';

/* ─── Lazy load cinematic sections ─── */
const CompaniesHero = lazy(() => import('../../components/Companies/CompaniesHero'));
const BrandStatement = lazy(() => import('../../components/Companies/BrandStatement'));
const CompanyShowcase = lazy(() => import('../../components/Companies/CompanyShowcase'));
const EcosystemSection = lazy(() => import('../../components/Companies/EcosystemSection'));
const CompanySelector = lazy(() => import('../../components/Companies/CompanySelector'));
const SignatureStatement = lazy(() => import('../../components/Companies/SignatureStatement'));
const CompaniesCTA = lazy(() => import('../../components/Companies/CompaniesCTA'));

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
          {/* 1. Hero — "The Elcardo Group" */}
          <CompaniesHero />

          {/* 2. Origin → Expansion (Scroll-driven node expansion) */}
          <BrandStatement />

          {/* 3. Sticky Storytelling (Left sticky text + Right scrolling images) */}
          <CompanyShowcase />

          {/* 4. Interactive Ecosystem Diagram */}
          <EcosystemSection />

          {/* 5. Full‑Screen Dark Statement Reveals */}
          <CompanySelector />

          {/* 6. Mini Company Grid */}
          <SignatureStatement />

          {/* 7. Final CTA */}
          <CompaniesCTA />
        </Suspense>
      </main>

      <Footer />
    </SmoothScroll>
  );
}
