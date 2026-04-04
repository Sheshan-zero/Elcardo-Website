import React, { lazy, Suspense, useEffect, useRef } from 'react';
import { useScroll, motion, useSpring } from 'framer-motion';
import SmoothScroll from '../../components/SmoothScroll';
import CustomCursor from '../../components/CustomCursor';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

import './ProjectsPage.css';

const ProjectsHero = lazy(() => import('./ProjectsHero'));
const ProjectsFeatured = lazy(() => import('./ProjectsFeatured'));
const ProjectsTransition3D = lazy(() => import('./ProjectsTransition3D'));
const ProjectsGrid = lazy(() => import('./ProjectsGrid'));
const ProjectsStats = lazy(() => import('./ProjectsStats'));
const ProjectsCTA = lazy(() => import('./ProjectsCTA'));

function SectionLoader() {
  return (
    <div className="projects-section-loader">
      <div className="projects-loader-spinner" />
    </div>
  );
}

export default function ProjectsPage() {
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
        className="projects-scroll-progress"
        style={{ scaleX }}
      />

      <main ref={containerRef} className="projects-page-main">
        <Suspense fallback={<SectionLoader />}>
          <ProjectsHero />
          <ProjectsFeatured />
          <ProjectsTransition3D />
          <ProjectsGrid />
          <ProjectsStats />
          <ProjectsCTA />
        </Suspense>
      </main>

      <Footer />
    </SmoothScroll>
  );
}
