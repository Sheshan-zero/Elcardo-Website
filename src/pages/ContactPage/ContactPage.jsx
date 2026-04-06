import React, { lazy, Suspense, useEffect, useRef } from 'react';
import { useScroll, motion, useSpring } from 'framer-motion';
import SmoothScroll from '../../components/SmoothScroll';
import CustomCursor from '../../components/CustomCursor';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

import './ContactPage.css';

const ContactHero = lazy(() => import('./ContactHero'));
const ContactMap = lazy(() => import('./ContactMap'));
const ContactBranches = lazy(() => import('./ContactBranches'));
const ContactForm = lazy(() => import('./ContactForm'));

function SectionLoader() {
  return (
    <div className="contact-section-loader">
      <div className="contact-loader-spinner" />
    </div>
  );
}

export default function ContactPage() {
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
        className="contact-scroll-progress"
        style={{ scaleX }}
      />

      <main ref={containerRef} className="contact-page-main">
        <Suspense fallback={<SectionLoader />}>
          <ContactHero />
          <ContactMap />
          <ContactBranches />
          <ContactForm />
        </Suspense>
      </main>

      <Footer />
    </SmoothScroll>
  );
}
