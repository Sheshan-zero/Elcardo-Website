import React, { lazy, Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { View } from '@react-three/drei';
import SmoothScroll from '../components/SmoothScroll';
import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import './RollerGatesPage.css';
import './RollerGatesPageExtras.css';

/* ─── Lazy load all sections ─── */
const HeroSection = lazy(() => import('../components/RollerGates3D/HeroSection'));
const ProductIntro = lazy(() => import('../components/RollerGates3D/ProductIntro'));
const InteractiveModel = lazy(() => import('../components/RollerGates3D/InteractiveModel'));
const ScrollStorytelling = lazy(() => import('../components/RollerGates3D/ScrollStorytelling'));
const XRaySection = lazy(() => import('../components/RollerGates3D/XRaySection'));
const MaterialsSection = lazy(() => import('../components/RollerGates3D/MaterialsSection'));
const FeaturesBlocks = lazy(() => import('../components/RollerGates3D/FeaturesBlocks'));
const VariantsSection = lazy(() => import('../components/RollerGates3D/VariantsSection'));
const GalleryParallax = lazy(() => import('../components/RollerGates3D/GalleryParallax'));
const StatsSection = lazy(() => import('../components/RollerGates3D/StatsSection'));
const CtaSection = lazy(() => import('../components/RollerGates3D/CtaSection'));

/* ─── Loading Fallback ─── */
function SectionLoader() {
  return (
    <div className="rg-section-loader" style={{ height: '300px' }}>
      <div className="rg-section-loader-spinner" />
    </div>
  );
}

/* ─── Main Page Component ─── */
export default function RollerGatesPage() {
  const containerRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={containerRef}>
      {/*
        GLOBAL CANVAS
        Only one WebGL Context is created for the entire page.
        Drei's <View> in the children will project into this canvas via <View.Port />
      */}
      <Canvas
        eventSource={containerRef}
        className="global-rg-canvas"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 0
        }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <View.Port />
      </Canvas>

      <SmoothScroll>
        <CustomCursor />
        {/* Global Navbar — replaces isolated rg-nav */}
        <Navbar />

        <div className="rg-page">
          {/* ===== 1. HERO ===== */}
          <Suspense fallback={<SectionLoader />}><HeroSection /></Suspense>

          {/* ===== 2. PRODUCT INTRO ===== */}
          <Suspense fallback={<SectionLoader />}><ProductIntro /></Suspense>

          {/* ===== 3. INTERACTIVE MODEL ===== */}
          <Suspense fallback={<SectionLoader />}><InteractiveModel /></Suspense>

          {/* ===== 4. SCROLL STORYTELLING ===== */}
          <Suspense fallback={<SectionLoader />}><ScrollStorytelling /></Suspense>

          {/* ===== 5. X-RAY SECTION ===== */}
          <Suspense fallback={<SectionLoader />}><XRaySection /></Suspense>

          {/* ===== 6. MATERIALS ===== */}
          <Suspense fallback={<SectionLoader />}><MaterialsSection /></Suspense>

          {/* ===== 7. FEATURES ===== */}
          <Suspense fallback={<SectionLoader />}><FeaturesBlocks /></Suspense>

          {/* ===== 8. VARIANTS ===== */}
          <Suspense fallback={<SectionLoader />}><VariantsSection /></Suspense>

          {/* ===== 9. GALLERY ===== */}
          <Suspense fallback={<SectionLoader />}><GalleryParallax /></Suspense>

          {/* ===== 10. STATS ===== */}
          <Suspense fallback={<SectionLoader />}><StatsSection /></Suspense>

          {/* ===== 11. CTA ===== */}
          <Suspense fallback={<SectionLoader />}><CtaSection /></Suspense>

          <Footer />
        </div>
      </SmoothScroll>
    </div>
  );
}
