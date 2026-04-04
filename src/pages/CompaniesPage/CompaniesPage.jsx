import { lazy, Suspense, useEffect } from 'react';
import SmoothScroll from '../../components/SmoothScroll';
import CustomCursor from '../../components/CustomCursor';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

import './CompaniesPage.css';

/* ─── Lazy load sections ─── */
const CompaniesHero = lazy(() => import('../../components/Companies/CompaniesHero'));
const BrandStatement = lazy(() => import('../../components/Companies/BrandStatement'));
const CompanyShowcase = lazy(() => import('../../components/Companies/CompanyShowcase'));
const CompanySelector = lazy(() => import('../../components/Companies/CompanySelector'));
const EcosystemSection = lazy(() => import('../../components/Companies/EcosystemSection'));
const ProjectsPreview = lazy(() => import('../../components/Companies/ProjectsPreview'));
const SignatureStatement = lazy(() => import('../../components/Companies/SignatureStatement'));
const CompaniesCTA = lazy(() => import('../../components/Companies/CompaniesCTA'));

/* ─── Loader ─── */
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
          <CompaniesHero />
          <BrandStatement />
          <CompanyShowcase />
          <CompanySelector />
          <EcosystemSection />
          <ProjectsPreview />
          <SignatureStatement />
          <CompaniesCTA />
        </Suspense>
      </main>

      <Footer />
    </SmoothScroll>
  );
}
