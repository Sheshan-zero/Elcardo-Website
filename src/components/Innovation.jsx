import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import './Innovation.css';

const pillars = [
  {
    icon: '⚡',
    title: 'Engineering Precision',
    text: 'Every installation, gate system, and manufactured component is engineered to exact tolerances, built to last, and backed by a decade of technical mastery.',
  },
  {
    icon: '☀️',
    title: 'Sustainable Energy',
    text: "We are leading Sri Lanka's energy transition — from rooftop solar to industrial storage systems — helping businesses and homes reduce costs and carbon.",
  },
  {
    icon: '🚗',
    title: 'Automotive Innovation',
    text: 'Custom vehicle engineering at a level rarely seen locally — combining craftsmanship, performance, and specialized commercial fleet solutions.',
  },
];

export default function Innovation() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="innovation" className="innovation" ref={ref}>
      <div className="innovation-orb" />
      <div className="innovation-inner section-padding">
        <div className="innovation-header">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-label">
              <span className="label-line" style={{ background: 'var(--accent-red)' }} />
              <span className="label-text" style={{ color: 'var(--accent-red)' }}>What Drives Us</span>
            </div>
            <h2 className="display-lg" style={{ color: 'var(--white)' }}>
              Innovation<br />
              <span style={{ fontStyle: 'italic', opacity: 0.3 }}>at our core.</span>
            </h2>
          </motion.div>
          <motion.p
            className="innovation-blurb body-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            Every company in the Elcardo group is built around a core
            competency — deep technical expertise, continuous R&D, and an
            uncompromising standard of quality.
          </motion.p>
        </div>

        <div className="innovation-pillars">
          {pillars.map((pillar, i) => (
            <motion.div
              className="pillar-card"
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.3 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="pillar-accent-line" />
              <div className="pillar-icon">{pillar.icon}</div>
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-text">{pillar.text}</p>
              <div className="pillar-glass" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
