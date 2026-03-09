import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Scene3D from './Scene3D';
import heroImg1 from '../assets/hero_engineering.png';
import heroImg2 from '../assets/hero_solar_field.png';
import heroImg3 from '../assets/hero_luxury_hotel.png';
import heroImg4 from '../assets/company_automotive.png';
import heroImg5 from '../assets/company_battery.png';
import './Hero.css';

const heroSlides = [
  { img: heroImg1, subtitle: 'Engineering Excellence' },
  { img: heroImg2, subtitle: 'Renewable Energy' },
  { img: heroImg3, subtitle: 'Luxury Hospitality' },
  { img: heroImg4, subtitle: 'Automotive Innovation' },
  { img: heroImg5, subtitle: 'Battery Technology' },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const sectionRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const scrollY = window.scrollY;
      const content = sectionRef.current.querySelector('.hero-content-inner');
      if (content) {
        content.style.transform = `translateY(${scrollY * 0.25}px)`;
        content.style.opacity = Math.max(0, 1 - scrollY / 600);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', scale: 1.1, opacity: 0 }),
    center: { x: 0, scale: 1, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? '-30%' : '30%', scale: 1.05, opacity: 0 }),
  };

  return (
    <section id="hero" className="hero" ref={sectionRef}>
      {/* Background image slideshow */}
      <div className="hero-slideshow">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current}
            className="hero-slide"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          >
            <img
              src={heroSlides[current].img}
              alt={heroSlides[current].subtitle}
              className="hero-slide-img"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="hero-gradient-overlay" />
      <div className="hero-noise" />
      <div className="hero-3d-overlay">
        <Scene3D />
      </div>
      <div className="hero-bg-text">ELCARDO</div>

      <div className="hero-content">
        <div className="hero-content-inner">
          <motion.div
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="hero-eyebrow-line" />
            <span>Sri Lanka's Industrial Group — Est. 2013</span>
          </motion.div>

          <motion.h1
            className="hero-headline display-xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Engineering<br />
            <span className="text-italic">Tomorrow's</span><br />
            Industries.
          </motion.h1>

          <motion.p
            className="hero-sub body-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            A diversified group delivering engineering, renewable energy,
            automotive innovation, and hospitality solutions across Sri Lanka.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <a href="#companies" className="btn-primary" data-cursor="expand">
              Explore Our Companies
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#projects" className="btn-ghost" data-cursor="expand">
              View Our Projects <span className="arrow">→</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="hero-slide-indicators">
        {heroSlides.map((slide, i) => (
          <button
            key={i}
            className={`slide-indicator ${i === current ? 'active' : ''}`}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            aria-label={slide.subtitle}
          >
            <span className="slide-indicator-label">{slide.subtitle}</span>
            <span className="slide-indicator-bar">
              <span className={`slide-indicator-fill ${i === current ? 'filling' : ''}`} />
            </span>
          </button>
        ))}
      </div>

      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <div className="scroll-bar" />
        <span className="scroll-label">Scroll</span>
      </motion.div>
    </section>
  );
}
