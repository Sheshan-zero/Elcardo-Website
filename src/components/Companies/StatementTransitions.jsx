import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './StatementTransitions.css';

const EASE = [0.16, 1, 0.3, 1];
const SECTION_HEIGHT_VH = 400;

const STATEMENTS = [
  { text: 'Built to Expand.', theme: 'light' },
  { text: 'Across Industries.', theme: 'dark' },
  { text: 'Driven by Precision.', theme: 'light' },
  { text: 'One Group.\nMany Disciplines.', theme: 'dark' },
];

export default function StatementTransitions() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [localProgress, setLocalProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!sectionRef.current) { ticking = false; return; }
          const rect = sectionRef.current.getBoundingClientRect();
          const sectionH = sectionRef.current.scrollHeight;
          const viewH = window.innerHeight;
          const scrolled = -rect.top;
          const totalScrollable = sectionH - viewH;
          const p = Math.max(0, Math.min(1, scrolled / totalScrollable));

          const count = STATEMENTS.length;
          const idx = Math.min(Math.floor(p * count), count - 1);
          const lp = (p * count) - idx;
          setActiveIndex(idx);
          setLocalProgress(lp);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const statement = STATEMENTS[activeIndex];
  const isDark = statement.theme === 'dark';

  return (
    <section
      className="stt"
      ref={sectionRef}
      style={{ height: `${SECTION_HEIGHT_VH}vh` }}
      id="statement-transitions"
    >
      <div className={`stt__sticky ${isDark ? 'stt__sticky--dark' : ''}`}>
        {/* Decorative lines */}
        <div className="stt__deco-lines">
          <motion.div
            className="stt__deco-line stt__deco-line--top"
            animate={{ scaleX: localProgress > 0.1 ? 1 : 0 }}
            transition={{ duration: 1.2, ease: EASE }}
            style={{ transformOrigin: 'left' }}
          />
          <motion.div
            className="stt__deco-line stt__deco-line--bottom"
            animate={{ scaleX: localProgress > 0.2 ? 1 : 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
            style={{ transformOrigin: 'right' }}
          />
        </div>

        {/* Statement */}
        <div className="stt__content">
          <AnimatePresence mode="wait">
            <motion.div
              key={`stmt-${activeIndex}`}
              className="stt__text-wrap"
              initial={{ opacity: 0, y: 30, scale: 0.97, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, scale: 0.98, filter: 'blur(4px)' }}
              transition={{ duration: 1.0, ease: EASE }}
            >
              <h2 className="stt__statement">
                {statement.text.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < statement.text.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </h2>
            </motion.div>
          </AnimatePresence>

          {/* Step dots */}
          <div className="stt__dots">
            {STATEMENTS.map((_, i) => (
              <div
                key={i}
                className={`stt__dot ${i === activeIndex ? 'stt__dot--active' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Subtle center accent mark */}
        <motion.div
          className="stt__accent-mark"
          animate={{ opacity: localProgress > 0.15 ? 0.15 : 0 }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </section>
  );
}
