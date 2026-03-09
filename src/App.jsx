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

function App() {
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

export default App;
