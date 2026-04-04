import React from 'react';
import { motion } from 'framer-motion';
import './ProductGrid.css';

import imgRollerGate from '../../../assets/product_roller_gate.png';
import imgSolar from '../../../assets/product_solar.png';
import imgBattery from '../../../assets/product_battery.png';
import imgSteel from '../../../assets/product_steel.png';
import imgRoofing from '../../../assets/product_roofing.png';
import imgWood from '../../../assets/product_wood.png';

const ease = [0.16, 1, 0.3, 1];

const PRODUCTS = [
  { id: 1, name: 'Roller Gates', image: imgRollerGate },
  { id: 2, name: 'Solar Panels', image: imgSolar },
  { id: 3, name: 'Battery Systems', image: imgBattery },
  { id: 4, name: 'Steel Fabrication', image: imgSteel },
  { id: 5, name: 'Metal Roofing', image: imgRoofing },
  { id: 6, name: 'Wood Decking', image: imgWood },
];

const ProductGrid = () => {
  return (
    <section className="pg-section">
      <div className="pg-header">
        <motion.p
          className="products-kicker"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          Quick Overview
        </motion.p>
        <motion.h2
          className="products-title-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease }}
        >
          All Products
        </motion.h2>
      </div>

      <div className="pg-grid">
        {PRODUCTS.map((p, i) => (
          <motion.div
            key={p.id}
            className="pg-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: i * 0.1, ease }}
            whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
          >
            <div className="pg-card-img-wrap">
              <img src={p.image} alt={p.name} loading="lazy" />
            </div>
            <h3 className="pg-card-name">{p.name}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
