import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './FloatingMosaic.css';

/* ─── Mosaic images ─── */
import imgGate from '../../assets/project_commercial_gate.png';
import imgSolar from '../../assets/project_solar_install.png';
import imgSteel from '../../assets/project_steel_fabrication.png';
import imgDecking from '../../assets/project_luxury_decking.png';
import imgRoller from '../../assets/project_industrial_roller.png';
import imgResGate from '../../assets/project_residential_gate.png';
import imgHotel from '../../assets/company_hotel.png';
import imgAuto from '../../assets/company_automotive.png';

const EASE = [0.16, 1, 0.3, 1];

const MOSAIC_ITEMS = [
  { img: imgGate, label: 'Commercial Access', size: 'large', parallaxSpeed: 0.15 },
  { img: imgSolar, label: 'Solar Infrastructure', size: 'medium', parallaxSpeed: -0.1 },
  { img: imgSteel, label: 'Steel Fabrication', size: 'small', parallaxSpeed: 0.2 },
  { img: imgHotel, label: 'Boutique Hospitality', size: 'large', parallaxSpeed: -0.12 },
  { img: imgDecking, label: 'Luxury Surfaces', size: 'medium', parallaxSpeed: 0.18 },
  { img: imgRoller, label: 'Industrial Systems', size: 'small', parallaxSpeed: -0.08 },
  { img: imgAuto, label: 'Automotive Engineering', size: 'medium', parallaxSpeed: 0.14 },
  { img: imgResGate, label: 'Residential Solutions', size: 'small', parallaxSpeed: -0.16 },
];

export default function FloatingMosaic() {
  const sectionRef = useRef(null);
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true, threshold: 0.2,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section className="fmo" ref={sectionRef} id="floating-mosaic">
      {/* Header */}
      <motion.div
        className="fmo__header"
        ref={headerRef}
        initial="hidden"
        animate={headerInView ? 'visible' : 'hidden'}
        transition={{ staggerChildren: 0.1 }}
      >
        <motion.span
          className="fmo__kicker"
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="fmo__kicker-line" />
          Our Work
        </motion.span>
        <motion.h2
          className="fmo__title"
          variants={{
            hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
            visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 1, ease: EASE }}
        >
          Built With <em>Precision.</em>
        </motion.h2>
      </motion.div>

      {/* Mosaic Grid */}
      <div className="fmo__grid">
        {MOSAIC_ITEMS.map((item, i) => (
          <MosaicCard
            key={i}
            item={item}
            index={i}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}

function MosaicCard({ item, index, scrollYProgress }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
  const yOffset = useTransform(
    scrollYProgress,
    [0, 1],
    [item.parallaxSpeed * 200, item.parallaxSpeed * -200]
  );

  return (
    <motion.div
      className={`fmo__card fmo__card--${item.size} fmo__card--pos${index}`}
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.96, filter: 'blur(4px)' }}
      animate={inView ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : {}}
      transition={{ duration: 1.0, ease: EASE, delay: index * 0.08 }}
      style={{ y: yOffset }}
    >
      <div className="fmo__card-image-wrap">
        <img src={item.img} alt={item.label} className="fmo__card-image" loading="lazy" />
        <div className="fmo__card-overlay" />
        <span className="fmo__card-label">{item.label}</span>
      </div>
    </motion.div>
  );
}
