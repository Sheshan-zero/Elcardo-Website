import { motion } from 'framer-motion';
import { companies } from '../../data/companiesData';
import { defaultViewport, fadeUp, staggerContainer } from '../../utils/motionVariantsNew';
import { Link } from 'react-router-dom';
import './SignatureStatement.css';

const cardReveal = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function SignatureStatement() {
  return (
    <section className="cpg">
      <motion.div className="cpg-header"
        variants={staggerContainer} initial="hidden" whileInView="visible" viewport={defaultViewport}
      >
        <motion.span className="cpg-kicker" variants={fadeUp}>All Companies</motion.span>
        <motion.h2 className="cpg-title" variants={fadeUp}>
          The Group at a <em>Glance</em>
        </motion.h2>
      </motion.div>

      <div className="cpg-grid">
        {companies.map((co, i) => (
          <motion.div key={co.id} className="cpg-card"
            custom={i} variants={cardReveal} initial="hidden" whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="cpg-card-img">
              <img src={co.image} alt={co.name} loading="lazy" />
            </div>
            <div className="cpg-card-body">
              <span className="cpg-card-sector">{co.sector}</span>
              <h3 className="cpg-card-name">{co.name}</h3>
              <Link to={co.ctaLink} className="cpg-card-link">
                View Details →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
