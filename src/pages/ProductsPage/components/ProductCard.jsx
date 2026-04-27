import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProductCard.css';

const ease = [0.16, 1, 0.3, 1];

const ProductCard = ({ product, index }) => {
  const [expanded, setExpanded] = useState(false);
  const detailRef = useRef(null);

  // Scroll expanded detail into view
  useEffect(() => {
    if (expanded && detailRef.current) {
      setTimeout(() => {
        detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }, [expanded]);

  return (
    <motion.article
      className="pc-card"
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.6, delay: index * 0.05, ease }}
    >
      {/* ── Main card face ── */}
      <div className="pc-front" onClick={() => setExpanded(!expanded)}>
        {/* Division tag */}
        <span className="pc-tag">{product.division}</span>

        {/* Oversized hover name */}
        <span className="pc-big-title">{product.title}</span>

        {/* Product image */}
        <div className="pc-image-wrap">
          <img src={product.image} alt={product.title} loading="lazy" className="pc-image" />
          <div className="pc-ground-shadow" />
        </div>

        {/* Info row */}
        <div className="pc-info-row">
          <span className="pc-name">{product.title}</span>
          <span className="pc-badge">
            <span className="pc-badge-dot" />
            {product.types.length} Variants
          </span>
          {/* Download icon */}
          <a
            href={product.brochureLink}
            className="pc-download"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label="Download brochure"
          >
            <svg viewBox="0 0 20 20" fill="none">
              <path d="M10 3v10M6 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </a>
        </div>

        {/* Short description */}
        <p className="pc-description">{product.description}</p>
      </div>

      {/* ── Expanded detail ── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            ref={detailRef}
            className="pc-detail"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <div className="pc-detail-inner">
              {/* Close button */}
              <button
                className="pc-detail-close"
                onClick={(e) => { e.stopPropagation(); setExpanded(false); }}
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Types */}
              <div className="pc-detail-block">
                <span className="pc-detail-label">Types & Variants</span>
                <div className="pc-detail-chips">
                  {product.types.map((t) => (
                    <span key={t} className="pc-chip">{t}</span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="pc-detail-block">
                <span className="pc-detail-label">Features</span>
                <ul className="pc-detail-features">
                  {product.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>

              {/* Use Cases */}
              <div className="pc-detail-block">
                <span className="pc-detail-label">Applications</span>
                <div className="pc-detail-chips">
                  {product.useCases.map((u) => (
                    <span key={u} className="pc-chip pc-chip--muted">{u}</span>
                  ))}
                </div>
              </div>

              {/* CTA row */}
              <div className="pc-detail-cta">
                <a
                  href={product.brochureLink}
                  className="pc-cta-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2v9M4 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Download Brochure
                </a>
                <a href="/contact" className="pc-cta-secondary" onClick={(e) => e.stopPropagation()}>
                  Request Quote →
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

export default ProductCard;
