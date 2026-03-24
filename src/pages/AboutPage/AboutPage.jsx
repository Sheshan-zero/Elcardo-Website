import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import SmoothScroll from '../../components/SmoothScroll';
import CustomCursor from '../../components/CustomCursor';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

import './AboutPage.css';

/* ─── Lazy load sections ─── */
const AboutHero = lazy(() => import('./AboutHero'));
const AboutStory = lazy(() => import('./AboutStory'));
const AboutTimeline = lazy(() => import('./AboutTimeline'));
const AboutBusinesses = lazy(() => import('./AboutBusinesses'));
const AboutVisionMission = lazy(() => import('./AboutVisionMission'));
const AboutValues = lazy(() => import('./AboutValues'));
const AboutImpact = lazy(() => import('./AboutImpact'));
const AboutTeam = lazy(() => import('./AboutTeam'));
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
  
  // Apple-style smooth background color transition based on scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Interpolate between dark premium colors mapping to the timeline/industries
  // 0% -> Industrial Black (#050505)
  // 30% -> Deep Solar Blue (#020a14)
  // 60% -> Automotive Graphite (#101115)
  // 90% -> Hospitality Warm Dark (#110e08)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 0.9],
    ['#050505', '#020a14', '#101115', '#110e08']
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      
      <motion.main 
        ref={containerRef} 
        className="about-page-main"
        style={{ backgroundColor }}
      >
        <Suspense fallback={<SectionLoader />}>
          <AboutHero />
          <AboutStory />
          <AboutTimeline />
          <AboutBusinesses />
          <AboutVisionMission />
          <AboutValues />
          <AboutImpact />
          <AboutTeam />
          <AboutCTA />
        </Suspense>
      </motion.main>
      
      <Footer />
    </SmoothScroll>
  );
}
