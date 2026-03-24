import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import './About.css';

function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

const stats = [
  { value: 10, suffix: '+', label: 'Years of industry\nexperience' },
  { value: 5, suffix: '', label: 'Distinct business\ndivisions' },
  { value: 200, suffix: '+', label: 'Projects\ndelivered' },
  { value: 500, suffix: '+', label: 'Satisfied\nclients' },
];

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="about" className="about section-padding" ref={ref}>
      <div className="about-grid">
        <motion.div
          className="about-text"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-label">
            <span className="label-line" />
            <span className="label-text">Who We Are</span>
          </div>
          <h2 className="about-headline display-md">
            We build companies that<br />
            power industries — and&nbsp;the<br />
            people behind them.
          </h2>
          <p className="about-body body-lg">
            Elcardo Industries is a Sri Lankan conglomerate operating across five
            distinct sectors: industrial engineering, renewable solar energy,
            advanced battery technology, luxury hospitality, and specialized
            automotive solutions. Each division is a market leader, unified
            under one strategic vision.
          </p>
        </motion.div>

        <motion.div
          className="about-stats"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {stats.map((stat, i) => (
            <div className="stat-card" key={i}>
              <div className="stat-number">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="stat-label-text">
                {stat.label.split('\n').map((line, j) => (
                  <span key={j}>{line}<br /></span>
                ))}
              </div>
              <div className="stat-glow" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
