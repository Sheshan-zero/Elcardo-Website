import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

import imgGates from '../../assets/company_roller_gates.png';
import imgBattery from '../../assets/company_battery.png';
import imgHotel from '../../assets/company_hotel.png';
import imgAuto from '../../assets/company_automotive.png';
import imgEngineering from '../../assets/hero_engineering.png';
import imgSolar from '../../assets/company_solar.png';
import imgInnovation from '../../assets/innovation_engineering.png';

const ease = [0.16, 1, 0.3, 1];

const milestones = [
  {
    year: '2013',
    name: 'Elcardo Industries',
    desc: 'Founded with a singular vision — to engineer world-class industrial solutions from Sri Lanka.',
    era: 'The Beginning',
    img: imgEngineering,
  },
  {
    year: '2015',
    name: 'Roller Gates Division',
    desc: 'Pioneered high-security automated roller gate systems, establishing regional market leadership.',
    era: 'Foundation',
    img: imgGates,
  },
  {
    year: '2017',
    name: 'Pantry Cupboards',
    desc: 'Expanded into precision-crafted modular kitchen and storage solutions for modern living.',
    era: 'Diversification',
    img: imgInnovation,
  },
  {
    year: '2019',
    name: 'Elme Battery',
    desc: 'Entered automotive and industrial battery manufacturing, powering the nation\'s mobility.',
    era: 'Energy',
    img: imgBattery,
  },
  {
    year: '2021',
    name: 'Anilad Hotel',
    desc: 'Ventured into premium hospitality — redefining luxury with eco-conscious resort experiences.',
    era: 'Hospitality',
    img: imgHotel,
  },
  {
    year: '2023',
    name: 'Elme Cars',
    desc: 'Launched bespoke automotive modifications and specialized vehicle engineering services.',
    era: 'Future Mobility',
    img: imgAuto,
  },
  {
    year: '2025',
    name: 'The Group Today',
    desc: 'A multi-sector industrial group — building, powering, and shaping the future of Sri Lanka.',
    era: 'The Group Today',
    img: imgSolar,
  },
];

/* ─── Individual milestone with scroll-triggered image reveal ─── */
function Milestone({ milestone, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const visObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      },
      { threshold: 0.15 }
    );

    const activeObserver = new IntersectionObserver(
      ([entry]) => {
        entry.target.classList.toggle('is-active', entry.isIntersecting);
      },
      { threshold: 0.35, rootMargin: '-15% 0px -15% 0px' }
    );

    if (ref.current) {
      visObserver.observe(ref.current);
      activeObserver.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        visObserver.unobserve(ref.current);
        activeObserver.unobserve(ref.current);
      }
    };
  }, []);

  const isOdd = index % 2 === 0;

  /* Content block with image — always on the "content side" */
  const contentBlock = (
    <>
      <motion.h3
        className="about-milestone-name"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.1, ease }}
      >
        {milestone.name}
      </motion.h3>
      <motion.p
        className="about-milestone-desc"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.2, ease }}
      >
        {milestone.desc}
      </motion.p>
      <motion.div
        className="about-milestone-img"
        initial={{ opacity: 0, y: 30, scale: 0.92 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1, delay: 0.25, ease }}
      >
        <img src={milestone.img} alt={milestone.name} loading="lazy" decoding="async" />
      </motion.div>
    </>
  );

  /* Year block */
  const yearBlock = (
    <>
      <motion.div
        className="about-milestone-year"
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, delay: 0.05, ease }}
      >
        {milestone.year}
      </motion.div>
      <motion.div
        className="about-milestone-era"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.8 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.15, ease }}
      >
        {milestone.era}
      </motion.div>
    </>
  );

  return (
    <div ref={ref} className="about-milestone">
      {/* Left side */}
      <div className="about-milestone-left">
        {isOdd ? yearBlock : contentBlock}
      </div>

      {/* Center dot */}
      <div className="about-milestone-dot-col">
        <motion.div
          className="about-milestone-dot"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
        />
      </div>

      {/* Right side */}
      <div className="about-milestone-right">
        {isOdd ? contentBlock : yearBlock}
      </div>
    </div>
  );
}

export default function AboutTimeline() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 30%'],
  });

  /* Only animate height when the section is in view */
  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="about-timeline-section" ref={containerRef} id="about-timeline">
      <div className="about-timeline-header">
        <motion.p
          className="about-kicker"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          Our Journey
        </motion.p>
        <motion.h2
          className="about-title-lg"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease }}
        >
          A Decade of <em>Building.</em>
        </motion.h2>
        <motion.p
          className="about-body"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
        >
          From a single roller gate workshop to a diversified industrial group.
        </motion.p>
      </div>

      <div className="about-timeline-container">
        {/* Track — only visible once section is in view */}
        <motion.div
          className="about-timeline-track"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease }}
        />
        <motion.div
          className="about-timeline-track-fill"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3, ease }}
          style={{ height: isInView ? progressHeight : '0%' }}
        />

        {milestones.map((m, i) => (
          <Milestone key={m.year} milestone={m} index={i} />
        ))}
      </div>
    </section>
  );
}
