import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './ProductCard.css';

const ease = [0.16, 1, 0.3, 1];

const ProductCard = ({ product, index }) => {
  const [expanded, setExpanded] = useState(false);
  const detailRef = useRef(null);

  useEffect(() => {
    if (expanded && detailRef.current) {
      setTimeout(() => {
        detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }, [expanded]);

  const systems = product.types || [];
  const advantages = product.features || [];
  const applications = product.useCases || [];
  const img = product.image;
  const tag = product.category || product.division;

  // Format big title (split into 2 lines roughly)
  const words = product.title.split(' ');
  let bigTitleLines = [product.title];
  if (words.length > 1) {
    if (words.length === 2) {
      bigTitleLines = words;
    } else {
      const half = Math.ceil(words.length / 2);
      bigTitleLines = [
        words.slice(0, half).join(' '),
        words.slice(half).join(' ')
      ];
    }
  }

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
        <span className="pc-tag">{tag}</span>

        <div className="pc-big-title">
          {bigTitleLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < bigTitleLines.length - 1 && <br />}
            </span>
          ))}
        </div>

        {/* Product image */}
        <div className="pc-image-wrap">
          <img
            className="pc-image"
            src={img}
            alt={product.title}
            loading="lazy"
            decoding="async"
          />
          <div className="pc-ground-shadow" />
        </div>

        <div className="pc-info-row">
          <span className="pc-name">{product.title}</span>
          <span className="pc-badge">
            <span className="pc-badge-dot" />
            {systems.length > 0 ? `${systems.length} Types` : 'Datasheet · PDF'}
          </span>
          <div
            className="pc-download"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            aria-label={`View ${product.title}`}
          >
            <svg viewBox="0 0 20 20" fill="none">
              <path d="M5 10h10M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

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
              <button
                className="pc-detail-close"
                onClick={(e) => { e.stopPropagation(); setExpanded(false); }}
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>

              {systems.length > 0 && (
                <div className="pc-detail-block">
                  <span className="pc-detail-label">Types & Variants</span>
                  <div className="pc-detail-chips">
                    {systems.map((s, i) => (
                      <span key={i} className="pc-chip">{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {advantages.length > 0 && (
                <div className="pc-detail-block">
                  <span className="pc-detail-label">Key Features</span>
                  <ul className="pc-detail-features">
                    {advantages.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </div>
              )}

              {applications.length > 0 && (
                <div className="pc-detail-block">
                  <span className="pc-detail-label">Applications</span>
                  <div className="pc-detail-chips">
                    {applications.map((u, i) => (
                      <span key={i} className="pc-chip pc-chip--muted">{u}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pc-detail-cta">
                <Link
                  to={`/products/${product.id}`}
                  className="pc-cta-primary"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  View Product
                </Link>
                <Link to="/contact" className="pc-cta-secondary" onClick={(e) => e.stopPropagation()}>
                  Request Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

export default ProductCard;
