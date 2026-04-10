import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './VisualProofRail.css';

/* ─── Rail images (existing assets) ─── */
import imgGate from '../../assets/project_commercial_gate.png';
import imgSolarInstall from '../../assets/project_solar_install.png';
import imgSolarRoof from '../../assets/project_solar_roof.png';
import imgSteel from '../../assets/project_steel_fabrication.png';
import imgDecking from '../../assets/project_luxury_decking.png';
import imgRoller from '../../assets/project_industrial_roller.png';
import imgResGate from '../../assets/project_residential_gate.png';
import imgHotel from '../../assets/company_hotel.png';
import imgBattery from '../../assets/company_battery.png';
import imgAuto from '../../assets/company_automotive.png';

const EASE = [0.16, 1, 0.3, 1];

const RAIL_IMAGES = [
  { img: imgGate, label: 'Commercial Gate System' },
  { img: imgSolarInstall, label: 'Solar Farm Installation' },
  { img: imgSteel, label: 'Steel Fabrication' },
  { img: imgHotel, label: 'Boutique Hotel Interior' },
  { img: imgDecking, label: 'Luxury Decking' },
  { img: imgBattery, label: 'Energy Storage' },
  { img: imgRoller, label: 'Industrial Roller Gate' },
  { img: imgAuto, label: 'Vehicle Engineering' },
  { img: imgResGate, label: 'Residential Access' },
  { img: imgSolarRoof, label: 'Rooftop Solar' },
];

const GRID_ITEMS = [
  { img: imgGate, label: 'Precision Access', desc: 'Engineered for scale.' },
  { img: imgSolarInstall, label: 'Clean Energy', desc: 'Powering infrastructure.' },
  { img: imgSteel, label: 'Steel & Structure', desc: 'Built to last.' },
  { img: imgHotel, label: 'Refined Spaces', desc: 'Crafted for experience.' },
  { img: imgAuto, label: 'Modern Motion', desc: 'Performance engineered.' },
  { img: imgDecking, label: 'Surface Quality', desc: 'Premium finishes.' },
];

export default function VisualProofRail() {
  const sectionRef = useRef(null);
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true, threshold: 0.2,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const railX = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  return (
    <section className="vpr" ref={sectionRef} id="visual-proof-rail">
      {/* Header */}
      <motion.div
        className="vpr__header"
        ref={headerRef}
        initial="hidden"
        animate={headerInView ? 'visible' : 'hidden'}
        transition={{ staggerChildren: 0.1 }}
      >
        <motion.span
          className="vpr__kicker"
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="vpr__kicker-line" />
          Visual Proof
        </motion.span>
        <motion.h2
          className="vpr__title"
          variants={{
            hidden: { opacity: 0, y: 28 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 1, ease: EASE }}
        >
          Real Projects, <em>Real Impact.</em>
        </motion.h2>
      </motion.div>

      {/* Scrolling rail */}
      <div className="vpr__rail-viewport">
        <motion.div className="vpr__rail-track" style={{ x: railX }}>
          {[...RAIL_IMAGES, ...RAIL_IMAGES].map((item, i) => (
            <div className="vpr__rail-card" key={`rail-${i}`}>
              <div className="vpr__rail-image-wrap">
                <img src={item.img} alt={item.label} className="vpr__rail-image" loading="lazy" decoding="async" />
                <div className="vpr__rail-overlay" />
                <span className="vpr__rail-label">{item.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Editorial grid below */}
      <div className="vpr__grid">
        {GRID_ITEMS.map((item, i) => (
          <GridCard key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

function GridCard({ item, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      className="vpr__grid-card"
      ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.9, ease: EASE, delay: index * 0.08 }}
    >
      <div className="vpr__grid-image-wrap">
        <img src={item.img} alt={item.label} className="vpr__grid-image" loading="lazy" decoding="async" />
        <div className="vpr__grid-overlay" />
      </div>
      <div className="vpr__grid-content">
        <h4 className="vpr__grid-label">{item.label}</h4>
        <p className="vpr__grid-desc">{item.desc}</p>
      </div>
    </motion.div>
  );
}
