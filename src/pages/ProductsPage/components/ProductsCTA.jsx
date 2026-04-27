import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './ProductsCTA.css';

const ease = [0.16, 1, 0.3, 1];

const ProductsCTA = () => {
  return (
    <section className="pcta-section">
      <div className="pcta-inner">
        <motion.div
          className="pcta-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="pcta-label-line" />
          <span className="pcta-label-text">Ready to Build</span>
          <span className="pcta-label-line" />
        </motion.div>
        <motion.h2
          className="pcta-title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease }}
        >
          Specify Elcardo for <em className="pcta-title-em">your next project.</em>
        </motion.h2>
        <motion.p
          className="pcta-body"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
        >
          Contact our technical team to discuss requirements, request samples, or schedule a site consultation.
        </motion.p>
        <motion.div
          className="pcta-actions"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
        >
          <Link to="/projects" className="pcta-btn-primary">View Projects</Link>
          <Link to="/contact" className="pcta-btn-outline">Contact Sales</Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsCTA;
