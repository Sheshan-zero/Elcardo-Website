import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Companies from './components/Companies';
import Marquee from './components/Marquee';
import Innovation from './components/Innovation';
import Projects from './components/Projects';
import Clients from './components/Clients';
import CTA from './components/CTA';
import Footer from './components/Footer';const RollerGatesPage = lazy(() => import('./pages/RollerGatesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage/AboutPage'));

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
        <About />
        <Companies />
        <Marquee />
        <Innovation />
        <Projects />
        <Clients />
        <CTA />
      </main>
      <Footer />
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
        <Route path="/roller-gates" element={<RollerGatesPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
