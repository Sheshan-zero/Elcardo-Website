import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
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
import Footer from './components/Footer';

const RollerGatesPage = lazy(() => import('./pages/RollerGatesPage'));

function HomePage() {
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
        <Route path="/roller-gates" element={<RollerGatesPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
