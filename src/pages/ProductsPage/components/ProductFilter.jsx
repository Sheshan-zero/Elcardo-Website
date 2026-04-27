import React from 'react';
import { motion } from 'framer-motion';
import { FILTER_TABS } from '../../../data/productsData';
import './ProductFilter.css';

const ease = [0.16, 1, 0.3, 1];

const ProductFilter = ({ activeFilter, onFilterChange }) => {
  return (
    <motion.div
      className="pf-bar"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease }}
    >
      <div className="pf-inner">
        <span className="pf-prefix">Filter</span>
        <div className="pf-tabs">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              className={`pf-tab ${activeFilter === tab.id ? 'pf-tab--active' : ''}`}
              onClick={() => onFilterChange(tab.id)}
            >
              {tab.label}
              {activeFilter === tab.id && (
                <motion.div
                  className="pf-tab-underline"
                  layoutId="filterUnderline"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductFilter;
