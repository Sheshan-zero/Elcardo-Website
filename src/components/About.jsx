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
  { value: 35, suffix: '+', label: 'Years of industry\nexperience' },
  { value: 7, suffix: '', label: 'Distinct business\ndivisions' },
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
            One of Sri Lanka's premier<br />
            engineering companies — building<br />
            every possible item locally.
          </h2>
          <p className="about-body body-lg">
            Elcardo Industries is a diversified Sri Lankan industrial group registered in 1985 and ISO 9001:2015 certified. We operate across roller doors, shutters, gates, solar energy, stainless steel, pantry cupboards, WPC decking, automobile accessories, and hospitality — unified by local manufacturing, quality, and island-wide service.
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
