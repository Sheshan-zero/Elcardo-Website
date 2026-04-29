import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

import './Navbar.css';

const base = import.meta.env.BASE_URL;

const PRODUCTS = [
  { id: 'roller-gates', name: 'Roller Doors', image: `${base}gate.png` },
  { id: 'solar', name: 'Solar Systems', image: `${base}solar.png` },
  { id: 'batteries', name: 'Battery Solutions', image: `${base}battery.png` },
  { id: 'steel', name: 'Steel & Fabrication', image: `${base}steel.png` },
  { id: 'roofing', name: 'Roofing Systems', image: `${base}roofing.png` },
  { id: 'wood', name: 'Wood Decking', image: `${base}wood.png` },
];

const QUICK_LINKS = [
  { label: 'Materials & Engineering', hash: '#materials' },
  { label: 'All Products', hash: '' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(PRODUCTS[0]);
  const megaTimeout = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  /* Close mega on route change */
  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = useMemo(() => [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products', hasMega: true },
    { label: 'About', href: '/about' },
    { label: 'Companies', href: '/companies' },
    { label: 'Projects', href: '/projects' },
  ], []);

  const handleNavClick = (e, href) => {
    setMobileOpen(false);
    if (href.startsWith('/#') && location.pathname === '/') {
      e.preventDefault();
      const targetId = href.replace('/#', '#');
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const isActive = (href) => {
    if (href === '/' && location.pathname === '/') return true;
    if (href !== '/' && location.pathname.startsWith(href)) return true;
    return false;
  };

  const handleMegaEnter = () => {
    clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  };

  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 250);
  };

  const isLight = scrolled || megaOpen;

  return (
    <>
      <nav className={`navbar ${isLight ? 'scrolled' : ''}`} id="navbar">
        <Link to="/" className="navbar-logo" data-cursor="expand" onClick={() => setMobileOpen(false)}>
          <img src={logo} alt="Elcardo" className="navbar-logo-img" />
          <span className="navbar-logo-text">ELCARDO</span>
        </Link>

        <ul className="navbar-links">
          {navLinks.map((link) => (
            <li
              key={link.label}
              className={link.hasMega ? 'nav-mega-trigger' : ''}
              onMouseEnter={link.hasMega ? handleMegaEnter : undefined}
              onMouseLeave={link.hasMega ? handleMegaLeave : undefined}
            >
              <Link
                to={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={isActive(link.href) ? 'active' : ''}
              >
                {link.label}
                {link.hasMega && (
                  <svg className="nav-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/contact"
              className="navbar-cta"
              onClick={() => setMobileOpen(false)}
            >
              Contact Us
            </Link>
          </li>
        </ul>

        <button
          className="navbar-hamburger"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* ─── Mega Dropdown ─── */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            className={`mega-dropdown ${isLight ? 'mega-scrolled' : ''}`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={handleMegaEnter}
            onMouseLeave={handleMegaLeave}
          >
            <div className="mega-inner">
              <div className="mega-products-grid">
                {PRODUCTS.map((p, i) => (
                  <Link
                    key={p.id}
                    to={`/products#${p.id}`}
                    className="mega-product-card"
                    data-cursor="expand"
                    onMouseEnter={() => setHoveredProduct(p)}
                  >
                    <motion.div
                      className="mega-product-3d"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="mega-product-img-wrap">
                        <img src={p.image} alt={p.name} />
                      </div>
                      <span className="mega-product-name">{p.name}</span>
                    </motion.div>
                  </Link>
                ))}
              </div>

              <div className="mega-sidebar">
                {/* 1. Featured Category (Dynamic) */}
                <div className="mega-sidebar-section">
                  <span className="mega-sidebar-label">Featured Insight</span>
                  <div className="mega-featured-card">
                    <div className="mega-featured-img-box">
                      <img key={hoveredProduct.id} src={hoveredProduct.image} alt={hoveredProduct.name} className="mega-featured-img fade-in-up" />
                    </div>
                    <div className="mega-featured-text">
                      <h4>{hoveredProduct.name}</h4>
                      <p>Precision-built quality and engineering excellence.</p>
                    </div>
                  </div>
                </div>

                {/* 2. Product Highlights */}
                <div className="mega-sidebar-section">
                  <span className="mega-sidebar-label">Deep Expertise</span>
                  <ul className="mega-highlight-list">
                    {[
                      { l: 'Roller Gates', hash: 'roller-gates' },
                      { l: 'Solar & Energy Solutions', hash: 'solar' },
                      { l: 'Steel & Fabrication', hash: 'steel' },
                      { l: 'Wood & Architectural Finishes', hash: 'wood' }
                    ].map((item, idx) => (
                      <li key={item.l} className="mega-highlight-item" style={{ animationDelay: `${idx * 0.08}s` }}>
                        <Link to={`/products#${item.hash}`} onClick={(e) => handleNavClick(e, `/products#${item.hash}`)}>
                          <span>{item.l}</span>
                          <span className="mega-arrow">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Quick Actions */}
                <div className="mega-sidebar-actions">
                  <Link to="/products#materials" onClick={(e) => handleNavClick(e, '/products#materials')} className="mega-action-link">Materials & Engineering</Link>
                  <Link to="/products" onClick={(e) => handleNavClick(e, '/products')} className="mega-action-link">Explore Full Catalog</Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Mobile Nav ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="mobile-nav-close"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="mobile-nav-content">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                >
                  <Link
                    to={link.href}
                    className={`mobile-nav-link ${isActive(link.href) ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <Link
                  to="/contact"
                  className="mobile-nav-cta"
                  onClick={() => setMobileOpen(false)}
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
