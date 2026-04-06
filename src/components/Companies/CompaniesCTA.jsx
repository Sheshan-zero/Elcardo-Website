import { motion } from 'framer-motion';
import { fadeUp, defaultViewport } from '../../utils/motionVariantsNew';
import { Link } from 'react-router-dom';
import './CompaniesCTA.css';

export default function CompaniesCTA() {
  return (
    <section className="cpc">
      <motion.div className="cpc-inner"
        initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeUp}
      >
        <span className="cpc-kicker">The Elcardo Group</span>
        <h2 className="cpc-title">
          Built Beyond<br /><em>One Industry.</em>
        </h2>
        <p className="cpc-desc">
          Explore our portfolio, discover partnership opportunities,
          or connect with our divisions.
        </p>
        <div className="cpc-actions">
          <Link to="/products" className="cpc-btn cpc-btn--primary">Explore Products</Link>
          <Link to="/contact" className="cpc-btn cpc-btn--secondary">Contact Elcardo</Link>
        </div>
      </motion.div>
    </section>
  );
}
