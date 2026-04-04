import { motion } from 'framer-motion';
import { fadeUp, defaultViewport } from '../../utils/motionVariantsNew';
import { Link } from 'react-router-dom';
import './CompaniesCTA.css';

export default function CompaniesCTA() {
  return (
    <section className="cp-cta">
      <motion.div 
        className="cp-cta__inner"
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={fadeUp}
      >
        <h2 className="display-md cp-cta__title">
          Ready to Build the Future?
        </h2>
        <p className="body-lg cp-cta__desc">
          Partner with Elcardo Industries for advanced engineering, renewable energy, and enterprise-scale solutions.
        </p>
        <div className="cp-cta__actions">
          <Link to="/contact" className="cp-btn cp-btn--primary">
            Contact Our Team
          </Link>
          <Link to="/about" className="cp-btn cp-btn--secondary">
            Discover Our Story
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
