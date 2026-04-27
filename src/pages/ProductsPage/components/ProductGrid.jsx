import React from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { PRODUCTS, DIVISIONS } from '../../../data/productsData';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ease = [0.16, 1, 0.3, 1];

const ProductGrid = React.forwardRef(({ activeFilter }, ref) => {
  const filteredProducts = activeFilter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.division === activeFilter);

  const activeDivision = DIVISIONS.find((d) => d.id === activeFilter);

  return (
    <section className="pg-section" id="product-grid" ref={ref}>
      <div className="pg-header">
        <motion.div
          className="pg-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="pg-label-line" />
          <span className="pg-label-text">
            {activeFilter === 'all' ? 'All Products' : activeDivision?.name}
          </span>
          <span className="pg-label-line" />
        </motion.div>
        <motion.h2
          className="pg-title"
          key={activeFilter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          {activeFilter === 'all'
            ? <>Product <em className="pg-title-em">Catalog</em></>
            : <>{activeDivision?.name} <em className="pg-title-em">Products</em></>}
        </motion.h2>
        <motion.span
          className="pg-count"
          key={`count-${activeFilter}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
        </motion.span>
      </div>

      <LayoutGroup>
        <motion.div className="pg-grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </section>
  );
});

ProductGrid.displayName = 'ProductGrid';

export default ProductGrid;
