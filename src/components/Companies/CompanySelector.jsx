import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { companies } from '../../data/companiesData';
import './CompanySelector.css';

const statements = [
  { company: 'Elcardo Industries', word: 'Precision' },
  { company: 'Elme Battery', word: 'Power' },
  { company: 'Anilad Hotels', word: 'Hospitality' },
  { company: 'Pantry Cupboards', word: 'Function' },
  { company: 'Vehicle Modification', word: 'Motion' },
];

function StatementSlide({ item, index, total, scrollYProgress }) {
  const step = 1 / total;
  const start = index * step;
  const end = (index + 1) * step;

  const opacity = useTransform(scrollYProgress, [
    start, start + step * 0.15,
    start + step * 0.5,
    end - step * 0.15, end,
  ], [0, 1, 1, 1, 0]);

  const y = useTransform(scrollYProgress, [start, start + step * 0.2], [40, 0]);
  const blurVal = useTransform(scrollYProgress, [start, start + step * 0.15], [6, 0]);
  const filterStr = useTransform(blurVal, (v) => `blur(${v}px)`);

  return (
    <motion.div className="cpds-slide" style={{ opacity, y, filter: filterStr }}>
      <p className="cpds-company">{item.company}</p>
      <h2 className="cpds-word">{item.word}</h2>
      <div className="cpds-line" />
    </motion.div>
  );
}

export default function CompanySelector() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  return (
    <section className="cpds" ref={ref} style={{ height: `${(statements.length + 1) * 100}vh` }}>
      <div className="cpds-sticky">
        {/* Subtle animated background lines */}
        <div className="cpds-bg-lines" aria-hidden="true">
          {[...Array(5)].map((_, i) => (
            <motion.div key={i} className="cpds-bg-line"
              style={{
                top: `${20 + i * 15}%`,
                opacity: useTransform(scrollYProgress, [0, 1], [0.02, 0.05]),
              }}
            />
          ))}
        </div>

        {statements.map((item, i) => (
          <StatementSlide
            key={item.word}
            item={item}
            index={i}
            total={statements.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
