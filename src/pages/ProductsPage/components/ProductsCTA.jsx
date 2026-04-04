import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './ProductsCTA.css';

const ease = [0.16, 1, 0.3, 1];

const ProductsCTA = () => {
  return (
    <section className="pcta-section">
      <div className="pcta-inner">
        <motion.p
          className="products-kicker"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          Ready to Begin
        </motion.p>
        <motion.h2
          className="products-title-lg"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease }}
        >
          Build with <em style={{ color: 'var(--accent-red, #DA1212)', fontStyle: 'italic' }}>Elcardo.</em>
        </motion.h2>
        <motion.p
          className="products-body"
          style={{ textAlign: 'center', margin: '24px auto 48px' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
        >
          Contact our technical team to specify Elcardo systems for your next project.
        </motion.p>
        <motion.div
          className="pcta-actions"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
        >
          <Link to="/" className="products-btn-primary">View Projects</Link>
          <Link to="/" className="products-btn-outline">Contact Sales</Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsCTA;
