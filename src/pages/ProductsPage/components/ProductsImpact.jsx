import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './ProductsImpact.css';

const STATS = [
  { value: '45+', label: 'Years of Engineering' },
  { value: '3M+', label: 'Components Forged' },
  { value: '25', label: 'Global Markets' },
  { value: '0.1%', label: 'Defect Rate (ISO 9001)' }
];

const ProductsImpact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: 'spring', stiffness: 60 } 
    }
  };

  return (
    <section className="products-impact-section" id="impact">
      <motion.div 
        ref={ref}
        className="products-impact-grid"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {STATS.map((stat, i) => (
          <motion.div key={i} className="products-impact-stat" variants={itemVariants}>
            <div className={`products-impact-number ${isInView ? 'pulse' : ''}`}>
              {stat.value}
            </div>
            <div className="products-impact-label">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ProductsImpact;
