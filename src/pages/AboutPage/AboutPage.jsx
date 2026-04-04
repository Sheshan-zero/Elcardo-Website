import React, { lazy, Suspense, useEffect, useRef } from 'react';
import { useScroll, motion, useSpring } from 'framer-motion';
import SmoothScroll from '../../components/SmoothScroll';
import CustomCursor from '../../components/CustomCursor';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

import './AboutPage.css';

const AboutHero = lazy(() => import('./AboutHero'));
const AboutIntro = lazy(() => import('./AboutIntro'));
const AboutTimeline = lazy(() => import('./AboutTimeline'));
const AboutExpansion = lazy(() => import('./AboutExpansion'));
const AboutFoundations = lazy(() => import('./AboutFoundations'));
const AboutCinematic = lazy(() => import('./AboutCinematic'));
const AboutLeadership = lazy(() => import('./AboutLeadership'));
const AboutVision = lazy(() => import('./AboutVision'));
const AboutToday = lazy(() => import('./AboutToday'));
const AboutCTA = lazy(() => import('./AboutCTA'));

function SectionLoader() {
  return (
    <div className="about-section-loader">
      <div className="about-loader-spinner" />
    </div>
  );
}

export default function AboutPage() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />

      <motion.div
        className="about-scroll-progress"
        style={{ scaleX }}
      />

      <main ref={containerRef} className="about-page-main">
        <Suspense fallback={<SectionLoader />}>
          <AboutHero />
          <AboutIntro />
          <AboutTimeline />
          <AboutExpansion />
          <AboutFoundations />
          <AboutCinematic />
          <AboutLeadership />
          <AboutVision />
          <AboutToday />
          <AboutCTA />
        </Suspense>
      </main>

      <Footer />
    </SmoothScroll>
  );
}
