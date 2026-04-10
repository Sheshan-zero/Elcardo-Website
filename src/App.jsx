import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import './App.css';

/* ─── Lazy load ALL below-fold homepage sections ─── */
const About = lazy(() => import('./components/About'));
const Companies = lazy(() => import('./components/Companies'));
const Marquee = lazy(() => import('./components/Marquee'));
const Innovation = lazy(() => import('./components/Innovation'));
const FeaturedProducts = lazy(() => import('./components/FeaturedProducts'));
const Projects = lazy(() => import('./components/Projects'));
const Clients = lazy(() => import('./components/Clients'));
const CTA = lazy(() => import('./components/CTA'));
const Footer = lazy(() => import('./components/Footer'));

/* ─── Lazy load sub-pages ─── */
const RollerGatesPage = lazy(() => import('./pages/RollerGatesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage/AboutPage'));
const CompaniesPage = lazy(() => import('./pages/CompaniesPage/CompaniesPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage/ProductsPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage/ProjectsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage/ContactPage'));

/* ─── Minimal loading fallback for below-fold sections ─── */
function SectionFallback() {
  return <div style={{ minHeight: '200px' }} />;
}

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // slight delay ensures the page renders and lenis is ready
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
      }
    }
  }, [location.hash]);

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
          <FeaturedProducts />
          <Companies />
          <Marquee />
          <Innovation />
          <Projects />
          <Clients />
          <CTA />
        </Suspense>
      </main>
      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
    </SmoothScroll>
  );
}

function App() {
  const location = useLocation();

  useEffect(() => {
    // If the browser tab is stuck with a duplicated path from an older broken link,
    // force it back to the correct base path while preserving the HashRouter hash.
    if (window.location.pathname.includes('/Elcardo-Website/Elcardo-Website')) {
      const correctPath = window.location.pathname.replace('/Elcardo-Website/Elcardo-Website', '/Elcardo-Website');
      window.location.replace(correctPath + window.location.hash);
    }
  }, [location.pathname]);

  return (
    <Suspense fallback={
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
        color: '#fff',
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        letterSpacing: '3px',
        textTransform: 'uppercase',
      }}>
        Loading...
      </div>
    }>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/roller-gates" element={<RollerGatesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
