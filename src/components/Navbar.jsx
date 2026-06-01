import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

import './Navbar.css';

const PRODUCT_CATEGORIES = [
  {
    id: 'doors',
    label: 'Doors & Shutters',
    items: [
      { label: 'Roller Doors',           slug: 'roller-doors' },
      { label: 'Roller Shutters',        slug: 'roller-shutters' },
      { label: 'Sectional / Overhead Doors', slug: 'sectional-doors' },
      { label: 'High-Speed Doors',       slug: 'high-speed-roller-doors' },
      { label: 'Polycarbonate Doors',    slug: 'polycarbonate-doors' },
      { label: 'Fire Doors',             slug: 'fire-doors' },
    ],
  },
  {
    id: 'gates',
    label: 'Gates & Access Control',
    items: [
      { label: 'Sliding Gates',          slug: 'sliding-gates' },
      { label: 'Swing Gates',            slug: 'swing-gates' },
      { label: 'Barrier Gates',          slug: 'barrier-gates' },
      { label: 'Retractable Gates',      slug: 'retractable-gates' },
      { label: 'Stainless Steel Gates',  slug: 'stainless-steel-gates' },
    ],
  },
  {
    id: 'roofing',
    label: 'Roofing & Exterior',
    items: [
      { label: 'Roofing Sheets',          slug: 'roofing' },
      { label: 'Roofing Accessories',    slug: 'roofing-accessories' },
      { label: 'Gutters',                slug: 'gutters' },
      { label: 'WPC Decking',            slug: 'wpc' },
      { label: 'WPC Cladding',           slug: 'wpc-cladding' },
      { label: 'WPC Fencing',            slug: 'wpc-fencing' },
      { label: 'WPC Louvers',            slug: 'wpc-louvers' },
      { label: 'WPC Railings',           slug: 'wpc-railings' },
    ],
  },
  {
    id: 'steel',
    label: 'Steel, Wire & Security',
    items: [
      { label: 'GI Pipes',               slug: 'gi-pipes' },
      { label: 'Box Bars & Hollow Sections', slug: 'box-bar' },
      { label: 'Purlins',               slug: 'purlins' },
      { label: 'PVC Mesh',              slug: 'pvc-mesh' },
      { label: 'Barbed Wire',           slug: 'barbed-wire' },
      { label: 'Fencing Systems',       slug: 'fencing-systems' },
    ],
  },
  {
    id: 'interior',
    label: 'Interior & Stainless',
    items: [
      { label: 'Stainless Steel Pantry Systems', slug: 'pantry' },
      { label: 'NueStone Pantry Tops',   slug: 'nuestone' },
      { label: 'ECO Board',              slug: 'eco-board' },
      { label: 'SS Railings',            slug: 'stainless-steel-railings' },
      { label: 'SS Hotel Supplies',      slug: 'stainless-steel-hotel-supplies' },
    ],
  },
  {
    id: 'solar',
    label: 'Solar & Automobile',
    items: [
      { label: 'Solar Power Systems',    slug: 'solar-power-systems' },
      { label: 'Solar Panels',           slug: 'solar-panels' },
      { label: 'Solar Inverters',        slug: 'solar-inverters' },
      { label: 'Bull Bars',              slug: 'bull-bars' },
      { label: 'Side Steps',             slug: 'side-steps' },
      { label: 'Chrome Accessories',     slug: 'chrome-accessories' },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen]     = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const megaTimeout = useRef(null);
  const location    = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
    setMobileProductsOpen(false);
  }, [location.pathname]);

  const navLinks = useMemo(() => [
    { label: 'Home',      href: '/' },
    { label: 'Products',  href: '/products', hasMega: true },
    { label: 'About',     href: '/about' },
    { label: 'Companies', href: '/companies' },
    { label: 'Projects',  href: '/projects' },
  ], []);

  const handleNavClick = (e, href) => {
    setMobileOpen(false);
    if (href.startsWith('/#') && location.pathname === '/') {
      e.preventDefault();
      const target = document.querySelector(href.replace('/#', '#'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            <Link to="/contact" className="navbar-cta" onClick={() => setMobileOpen(false)}>
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

      {/* ─── Mega Dropdown — 6 Category Columns ─── */}
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
              <div className="mega-cat-grid">
                {PRODUCT_CATEGORIES.map((cat, ci) => (
                  <motion.div
                    key={cat.id}
                    className="mega-cat-col"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: ci * 0.04, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={`/products?category=${cat.id}`}
                      className="mega-cat-title"
                    >
                      {cat.label}
                    </Link>
                    <ul className="mega-cat-links">
                      {cat.items.map((item) => (
                        <li key={item.slug}>
                          <Link
                            to={`/products/${item.slug}`}
                            className="mega-cat-link"
                          >
                            <span className="mega-cat-link-dot" />
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              <div className="mega-footer">
                <Link to="/products" className="mega-view-all">
                  View All Products
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
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
                  {link.hasMega ? (
                    <div>
                      <button
                        className={`mobile-nav-link mobile-nav-link--btn ${isActive(link.href) ? 'active' : ''}`}
                        onClick={() => setMobileProductsOpen((o) => !o)}
                      >
                        {link.label}
                        <svg
                          className={`mobile-nav-chevron ${mobileProductsOpen ? 'open' : ''}`}
                          width="14" height="8" viewBox="0 0 14 8" fill="none"
                        >
                          <path d="M1 1l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <AnimatePresence>
                        {mobileProductsOpen && (
                          <motion.div
                            className="mobile-products-panel"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {PRODUCT_CATEGORIES.map((cat) => (
                              <div key={cat.id} className="mobile-cat-group">
                                <span className="mobile-cat-label">{cat.label}</span>
                                <div className="mobile-cat-items">
                                  {cat.items.map((item) => (
                                    <Link
                                      key={item.slug}
                                      to={`/products/${item.slug}`}
                                      className="mobile-cat-item"
                                      onClick={() => setMobileOpen(false)}
                                    >
                                      {item.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                            <Link
                              to="/products"
                              className="mobile-view-all"
                              onClick={() => setMobileOpen(false)}
                            >
                              View All Products →
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={link.href}
                      className={`mobile-nav-link ${isActive(link.href) ? 'active' : ''}`}
                      onClick={(e) => handleNavClick(e, link.href)}
                    >
                      {link.label}
                    </Link>
                  )}
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
