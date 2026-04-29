import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import SmoothScroll from '../components/SmoothScroll';
import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import './RollerDoorsPage.css';

/* ─── Lazy load all sections ─── */
const RD_Hero = lazy(() => import('../components/RollerDoors3D/RD_Hero'));
const RD_Intro = lazy(() => import('../components/RollerDoors3D/RD_Intro'));
const RD_Viewer3D = lazy(() => import('../components/RollerDoors3D/RD_Viewer3D'));
const RD_Mechanism = lazy(() => import('../components/RollerDoors3D/RD_Mechanism'));
const RD_Engineering = lazy(() => import('../components/RollerDoors3D/RD_Engineering'));
const RD_Motor = lazy(() => import('../components/RollerDoors3D/RD_Motor'));
const RD_Materials = lazy(() => import('../components/RollerDoors3D/RD_Materials'));
const RD_Variants = lazy(() => import('../components/RollerDoors3D/RD_Variants'));
const RD_Gallery = lazy(() => import('../components/RollerDoors3D/RD_Gallery'));
const RD_Specs = lazy(() => import('../components/RollerDoors3D/RD_Specs'));
const RD_CTA = lazy(() => import('../components/RollerDoors3D/RD_CTA'));

/* ─── Product Subnav Items ─── */
const SUBNAV_ITEMS = [
  { id: 'rd-overview', label: 'Overview' },
  { id: 'rd-studio', label: '3D Studio' },
  { id: 'rd-mechanism', label: 'Mechanism' },
  { id: 'rd-interior', label: 'Interior' },
  { id: 'rd-finishes', label: 'Finishes' },
  { id: 'rd-variants', label: 'Variants' },
  { id: 'rd-specs', label: 'Specs' },
  { id: 'rd-quote', label: 'Quote' },
];

/* ─── Loading Fallback ─── */
function SectionLoader() {
  return (
    <div className="rd-section-loader">
      <div className="rd-section-loader-spinner" />
    </div>
  );
}

/* ─── Product Subnav ─── */
function ProductSubnav({ activeSection }) {
  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="rd-product-subnav" id="rd-subnav">
      <div className="rd-subnav-inner">
        {SUBNAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`rd-subnav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => handleClick(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

/* ─── Main Page Component ─── */
export default function RollerDoorsPage() {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState('rd-overview');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
    );

    const sections = SUBNAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);
    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <div ref={containerRef} className="rd-page">
      <SmoothScroll>
        <CustomCursor />
        <Navbar />
        <ProductSubnav activeSection={activeSection} />

        <main className="rd-main">
          {/* 1. Hero — Dark cinematic fullscreen */}
          <Suspense fallback={<SectionLoader />}><RD_Hero /></Suspense>

          {/* 2. Intro — Category cards */}
          <Suspense fallback={<SectionLoader />}><RD_Intro /></Suspense>

          {/* 3. 3D Studio — Interactive model + ALL finish colors */}
          <Suspense fallback={<SectionLoader />}><RD_Viewer3D /></Suspense>

          {/* 4. Mechanism — Scroll-driven door animation */}
          <Suspense fallback={<SectionLoader />}><RD_Mechanism /></Suspense>

          {/* 5. Engineering — Cross-section exploded view */}
          <Suspense fallback={<SectionLoader />}><RD_Engineering /></Suspense>

          {/* 6. Motor & Automation */}
          <Suspense fallback={<SectionLoader />}><RD_Motor /></Suspense>

          {/* 7. Materials & Finishes */}
          <Suspense fallback={<SectionLoader />}><RD_Materials /></Suspense>

          {/* 8. Variants */}
          <Suspense fallback={<SectionLoader />}><RD_Variants /></Suspense>

          {/* 9. Gallery */}
          <Suspense fallback={<SectionLoader />}><RD_Gallery /></Suspense>

          {/* 10. Specs */}
          <Suspense fallback={<SectionLoader />}><RD_Specs /></Suspense>

          {/* 11. CTA */}
          <Suspense fallback={<SectionLoader />}><RD_CTA /></Suspense>
        </main>

        <Footer />
      </SmoothScroll>
    </div>
  );
}
