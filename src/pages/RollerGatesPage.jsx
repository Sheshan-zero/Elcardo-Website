import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Html } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import SmoothScroll from '../components/SmoothScroll';
import CustomCursor from '../components/CustomCursor';
import Footer from '../components/Footer';

import heroImg from '../assets/rg_hero.png';
import warehouseImg from '../assets/rg_warehouse.png';
import smartImg from '../assets/rg_smart_control.png';
import securityImg from '../assets/rg_security.png';
import installFactory from '../assets/rg_install_factory.png';
import installGarage from '../assets/rg_install_garage.png';
import installCommercial from '../assets/rg_install_commercial.png';
import installWarehouse from '../assets/rg_install_warehouse.png';

import './RollerGatesPage.css';

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   ANIMATED COUNTER
   ============================================================ */
function AnimatedCounter({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

/* ============================================================
   3D ROLLER DOOR MODEL
   ============================================================ */
function DoorSlat({ y, index }) {
  return (
    <mesh position={[0, y, 0]}>
      <boxGeometry args={[3, 0.12, 0.08]} />
      <meshStandardMaterial
        color="#8a8a8a"
        metalness={0.85}
        roughness={0.25}
      />
    </mesh>
  );
}

function DoorFrame() {
  return (
    <group>
      {/* Left rail */}
      <mesh position={[-1.6, 0, 0]}>
        <boxGeometry args={[0.1, 4, 0.15]} />
        <meshStandardMaterial color="#4a4a4a" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Right rail */}
      <mesh position={[1.6, 0, 0]}>
        <boxGeometry args={[0.1, 4, 0.15]} />
        <meshStandardMaterial color="#4a4a4a" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Top header */}
      <mesh position={[0, 2.05, 0]}>
        <boxGeometry args={[3.3, 0.15, 0.18]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

function MotorHousing() {
  return (
    <group position={[1.2, 2.35, 0]}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.8, 16]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.3} />
      </mesh>
      {/* Motor cap */}
      <mesh position={[0.45, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 0.05, 16]} />
        <meshStandardMaterial color="#DA1212" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}

function RollerDoor3D({ activeHotspot, setActiveHotspot }) {
  const groupRef = useRef();
  const slats = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 25; i++) {
      arr.push({ y: -1.8 + i * 0.148, index: i });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.05;
    }
  });

  const hotspots = [
    { position: [1.2, 2.35, 0.3], label: 'Motor System', desc: 'High-torque electric motor with smooth, quiet operation' },
    { position: [0, 0, 0.2], label: 'Steel Panels', desc: 'Reinforced galvanized steel slats for maximum durability' },
    { position: [1.2, 1.2, 0.3], label: 'Smart Automation', desc: 'IoT-enabled control with remote access capability' },
    { position: [-1.6, -0.5, 0.2], label: 'Safety Lock', desc: 'Anti-lift locking mechanism with tamper detection' },
  ];

  return (
    <group ref={groupRef}>
      <DoorFrame />
      <MotorHousing />
      <group>
        {slats.map((slat) => (
          <DoorSlat key={slat.index} y={slat.y} index={slat.index} />
        ))}
      </group>
      {hotspots.map((spot, i) => (
        <group key={i} position={spot.position}>
          <Html center distanceFactor={8}>
            <button
              className={`rg-hotspot ${activeHotspot === i ? 'active' : ''}`}
              onClick={() => setActiveHotspot(activeHotspot === i ? null : i)}
            >
              <span className="rg-hotspot-dot" />
              {activeHotspot === i && (
                <div className="rg-hotspot-tooltip">
                  <strong>{spot.label}</strong>
                  <p>{spot.desc}</p>
                </div>
              )}
            </button>
          </Html>
        </group>
      ))}
    </group>
  );
}

/* ============================================================
   MAIN PAGE COMPONENT
   ============================================================ */
export default function RollerGatesPage() {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const storyRef = useRef(null);
  const xrayRef = useRef(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // GSAP scroll storytelling
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Door storytelling animation
      if (storyRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top top',
            end: '+=300%',
            pin: true,
            scrub: 1,
          },
        });
        tl.to('.rg-story-door', { y: '-70%', duration: 1, ease: 'none' })
          .to('.rg-story-caption-1', { opacity: 0, y: -30, duration: 0.3 }, 0)
          .to('.rg-story-caption-2', { opacity: 1, y: 0, duration: 0.3 }, 0.3)
          .to('.rg-story-caption-2', { opacity: 0, y: -30, duration: 0.3 }, 0.6)
          .to('.rg-story-caption-3', { opacity: 1, y: 0, duration: 0.3 }, 0.7);
      }

      // X-Ray section animation
      if (xrayRef.current) {
        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: xrayRef.current,
            start: 'top top',
            end: '+=200%',
            pin: true,
            scrub: 1,
          },
        });
        tl2.to('.rg-xray-overlay', { opacity: 1, duration: 1 })
           .to('.rg-xray-label-motor', { opacity: 1, x: 0, duration: 0.3 }, 0.2)
           .to('.rg-xray-label-springs', { opacity: 1, x: 0, duration: 0.3 }, 0.4)
           .to('.rg-xray-label-tracks', { opacity: 1, x: 0, duration: 0.3 }, 0.6)
           .to('.rg-xray-label-material', { opacity: 1, x: 0, duration: 0.3 }, 0.8);
      }
    });

    return () => ctx.revert();
  }, []);

  // InView hooks
  const [introRef, introInView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [featRef, featInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [variantsRef, variantsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [galleryRef, galleryInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [materialsRef, materialsInView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.15 });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <SmoothScroll>
      <CustomCursor />
      <div className="rg-page">

        {/* ===== STICKY NAV BAR ===== */}
        <nav className="rg-nav">
          <Link to="/" className="rg-nav-back" data-cursor="expand">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Elcardo</span>
          </Link>
          <span className="rg-nav-title">Roller Gates</span>
          <a href="#rg-cta" className="rg-nav-cta" data-cursor="expand">Get a Quote</a>
        </nav>

        {/* ===== 1. HERO ===== */}
        <section className="rg-hero">
          <div className="rg-hero-bg">
            <img src={heroImg} alt="Elcardo Roller Gate" className="rg-hero-img" />
            <div className="rg-hero-overlay" />
          </div>
          <div className="rg-hero-content">
            <motion.div
              className="rg-hero-eyebrow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Elcardo Industries
            </motion.div>
            <motion.h1
              className="rg-hero-headline"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Precision Engineered<br />
              <span className="rg-hero-italic">Roller Gates</span>
            </motion.h1>
            <motion.p
              className="rg-hero-sub"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Security. Automation. Reliability.
            </motion.p>
            <motion.div
              className="rg-hero-scroll-cue"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <div className="rg-scroll-line" />
              <span>Scroll to explore</span>
            </motion.div>
          </div>
        </section>

        {/* ===== 2. PRODUCT INTRO ===== */}
        <section className="rg-intro section-padding" ref={introRef}>
          <motion.div
            className="rg-intro-content"
            {...fadeUp()}
            animate={introInView ? fadeUp().animate : {}}
          >
            <div className="rg-section-label">
              <span className="rg-label-line" />
              <span>The Product</span>
            </div>
            <h2 className="rg-intro-headline">
              Built to protect<br />
              what matters most.
            </h2>
            <p className="rg-intro-body">
              Elcardo Roller Gates are engineered for commercial, industrial, and
              residential applications — delivering unmatched security,
              automation, and durability in every installation.
            </p>
          </motion.div>
        </section>

        {/* ===== 3. 3D INTERACTIVE MODEL ===== */}
        <section className="rg-3d-section">
          <div className="rg-3d-header">
            <div className="rg-section-label">
              <span className="rg-label-line" />
              <span>Interactive</span>
            </div>
            <h2 className="rg-3d-title">Explore every detail.</h2>
            <p className="rg-3d-sub">Rotate and zoom to examine the engineering.</p>
          </div>
          <div className="rg-3d-canvas-wrap">
            <Canvas
              camera={{ position: [0, 0.5, 6], fov: 45 }}
              dpr={[1, 1.5]}
              gl={{ alpha: true, antialias: true }}
              style={{ background: 'transparent' }}
            >
              <ambientLight intensity={0.4} />
              <pointLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
              <pointLight position={[-5, 3, 3]} intensity={0.3} color="#DA1212" />
              <directionalLight position={[0, 8, 5]} intensity={0.5} />
              <Float speed={0.3} rotationIntensity={0.02} floatIntensity={0.1}>
                <RollerDoor3D activeHotspot={activeHotspot} setActiveHotspot={setActiveHotspot} />
              </Float>
              <OrbitControls
                enablePan={false}
                enableZoom={true}
                minDistance={3.5}
                maxDistance={10}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.8}
                autoRotate
                autoRotateSpeed={0.5}
              />
            </Canvas>
          </div>
          {activeHotspot !== null && (
            <div className="rg-3d-info-panel">
              <div className="rg-3d-info-close" onClick={() => setActiveHotspot(null)}>✕</div>
              <h4>{['Motor System', 'Steel Panels', 'Smart Automation', 'Safety Lock'][activeHotspot]}</h4>
              <p>{[
                'High-torque electric motor delivers smooth, quiet operation with 100,000+ cycle reliability.',
                'Reinforced galvanized steel slats engineered for maximum impact resistance and longevity.',
                'IoT-enabled control system with smartphone app, remote access, and scheduled operation.',
                'Anti-lift locking mechanism with tamper detection and automatic engagement on close.',
              ][activeHotspot]}</p>
            </div>
          )}
        </section>

        {/* ===== 4. SCROLL STORYTELLING ===== */}
        <section className="rg-story" ref={storyRef}>
          <div className="rg-story-visual">
            <img src={heroImg} alt="Roller door" className="rg-story-door" />
            <div className="rg-story-behind">
              <div className="rg-story-mechanism">
                <div className="rg-mech-line" />
                <div className="rg-mech-line" />
                <div className="rg-mech-line" />
                <span>Internal Mechanism</span>
              </div>
            </div>
          </div>
          <div className="rg-story-captions">
            <div className="rg-story-caption rg-story-caption-1">
              <h3>Watch it perform.</h3>
              <p>Smooth, controlled movement engineered for reliability.</p>
            </div>
            <div className="rg-story-caption rg-story-caption-2" style={{ opacity: 0, transform: 'translateY(30px)' }}>
              <h3>Revealing the engineering.</h3>
              <p>Every component designed for 100,000+ cycles.</p>
            </div>
            <div className="rg-story-caption rg-story-caption-3" style={{ opacity: 0, transform: 'translateY(30px)' }}>
              <h3>Built to last.</h3>
              <p>Industrial-grade materials. Commercial-grade performance.</p>
            </div>
          </div>
        </section>

        {/* ===== 5. X-RAY SECTION ===== */}
        <section className="rg-xray" ref={xrayRef}>
          <div className="rg-xray-visual">
            <img src={heroImg} alt="Roller door x-ray" className="rg-xray-base" />
            <div className="rg-xray-overlay">
              <div className="rg-xray-grid">
                <div className="rg-xray-label rg-xray-label-motor" style={{ opacity: 0, transform: 'translateX(-30px)' }}>
                  <div className="rg-xray-dot" />
                  <div className="rg-xray-line" />
                  <div className="rg-xray-text">
                    <strong>Motor</strong>
                    <span>High-torque drive unit</span>
                  </div>
                </div>
                <div className="rg-xray-label rg-xray-label-springs" style={{ opacity: 0, transform: 'translateX(30px)' }}>
                  <div className="rg-xray-dot" />
                  <div className="rg-xray-line" />
                  <div className="rg-xray-text">
                    <strong>Springs</strong>
                    <span>Counterbalance system</span>
                  </div>
                </div>
                <div className="rg-xray-label rg-xray-label-tracks" style={{ opacity: 0, transform: 'translateX(-30px)' }}>
                  <div className="rg-xray-dot" />
                  <div className="rg-xray-line" />
                  <div className="rg-xray-text">
                    <strong>Tracks</strong>
                    <span>Precision guide rails</span>
                  </div>
                </div>
                <div className="rg-xray-label rg-xray-label-material" style={{ opacity: 0, transform: 'translateX(30px)' }}>
                  <div className="rg-xray-dot" />
                  <div className="rg-xray-line" />
                  <div className="rg-xray-text">
                    <strong>Material</strong>
                    <span>Galvanized steel</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rg-xray-header">
            <h2>See what's<br /><span className="rg-hero-italic">inside.</span></h2>
          </div>
        </section>

        {/* ===== 6. MATERIALS ===== */}
        <section className="rg-materials section-padding" ref={materialsRef}>
          <motion.div
            className="rg-materials-content"
            {...fadeUp()}
            animate={materialsInView ? fadeUp().animate : {}}
          >
            <div className="rg-section-label">
              <span className="rg-label-line" />
              <span>Materials</span>
            </div>
            <h2 className="rg-materials-headline">
              Built from<br />industrial grade steel.
            </h2>
          </motion.div>
          <div className="rg-materials-grid">
            <motion.div
              className="rg-material-card"
              initial={{ opacity: 0, y: 40 }}
              animate={materialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="rg-material-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="12" y1="3" x2="12" y2="21" />
                </svg>
              </div>
              <h4>Reinforced Panels</h4>
              <p>Double-walled galvanized steel with foam insulation core</p>
            </motion.div>
            <motion.div
              className="rg-material-card"
              initial={{ opacity: 0, y: 40 }}
              animate={materialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              <div className="rg-material-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h4>Corrosion Resistant</h4>
              <p>Multi-layer powder coat finish rated for tropical climates</p>
            </motion.div>
            <motion.div
              className="rg-material-card"
              initial={{ opacity: 0, y: 40 }}
              animate={materialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="rg-material-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h4>Impact Grade</h4>
              <p>Engineered to withstand heavy industrial use and impacts</p>
            </motion.div>
          </div>
        </section>

        {/* ===== 7. PRODUCT FEATURES ===== */}
        <section className="rg-features" ref={featRef}>
          {/* Feature 1 */}
          <div className="rg-feature-block rg-feature-dark">
            <motion.div
              className="rg-feature-text"
              initial={{ opacity: 0, y: 60 }}
              animate={featInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="rg-feature-label">Industrial Strength</span>
              <h2 className="rg-feature-headline">
                Engineered for<br />the toughest<br />environments.
              </h2>
            </motion.div>
            <motion.div
              className="rg-feature-img-wrap"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={featInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <img src={warehouseImg} alt="Industrial roller door" />
            </motion.div>
          </div>

          {/* Feature 2 */}
          <div className="rg-feature-block rg-feature-light rg-feature-reverse">
            <motion.div
              className="rg-feature-text"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className="rg-feature-label">Smart Automation</span>
              <h2 className="rg-feature-headline rg-feature-headline-dark">
                Control from<br />anywhere.
              </h2>
              <p className="rg-feature-desc">
                Smartphone app control, scheduled operations, and real-time status monitoring.
              </p>
            </motion.div>
            <motion.div
              className="rg-feature-img-wrap"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <img src={smartImg} alt="Smart automation" />
            </motion.div>
          </div>

          {/* Feature 3 */}
          <div className="rg-feature-block rg-feature-dark">
            <motion.div
              className="rg-feature-text"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className="rg-feature-label">Engineered Security</span>
              <h2 className="rg-feature-headline">
                Reinforced.<br />Tamper-proof.<br />Reliable.
              </h2>
            </motion.div>
            <motion.div
              className="rg-feature-img-wrap"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <img src={securityImg} alt="Security mechanism" />
            </motion.div>
          </div>
        </section>

        {/* ===== 8. PRODUCT VARIANTS ===== */}
        <section className="rg-variants section-padding" ref={variantsRef}>
          <motion.div
            className="rg-variants-header"
            {...fadeUp()}
            animate={variantsInView ? fadeUp().animate : {}}
          >
            <div className="rg-section-label">
              <span className="rg-label-line" />
              <span>Product Line</span>
            </div>
            <h2 className="rg-variants-title">Choose your solution.</h2>
          </motion.div>
          <div className="rg-variants-grid">
            {[
              {
                name: 'Industrial',
                desc: 'Heavy-duty roller doors for factories, warehouses, and large-scale facilities.',
                specs: 'Up to 12m wide • Insulated panels • Wind-rated',
              },
              {
                name: 'Commercial',
                desc: 'Professional-grade doors for retail, offices, and commercial buildings.',
                specs: 'Up to 8m wide • Quick-open • Low maintenance',
              },
              {
                name: 'Residential',
                desc: 'Sleek automated doors for homes, garages, and private properties.',
                specs: 'Up to 5m wide • Ultra-quiet • Smart home ready',
              },
            ].map((variant, i) => (
              <motion.div
                className="rg-variant-card"
                key={variant.name}
                initial={{ opacity: 0, y: 50 }}
                animate={variantsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.15 * i }}
              >
                <div className="rg-variant-number">0{i + 1}</div>
                <h3 className="rg-variant-name">{variant.name}</h3>
                <p className="rg-variant-desc">{variant.desc}</p>
                <span className="rg-variant-specs">{variant.specs}</span>
                <div className="rg-variant-cta">
                  Learn more
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===== 9. INSTALLATION SHOWCASE ===== */}
        <section className="rg-gallery section-padding" ref={galleryRef}>
          <motion.div
            className="rg-gallery-header"
            {...fadeUp()}
            animate={galleryInView ? fadeUp().animate : {}}
          >
            <div className="rg-section-label">
              <span className="rg-label-line" />
              <span>Installations</span>
            </div>
            <h2 className="rg-gallery-title">Trusted across<br />Sri Lanka.</h2>
          </motion.div>
          <div className="rg-gallery-grid">
            {[
              { img: installFactory, label: 'Factory', location: 'Colombo' },
              { img: installGarage, label: 'Residence', location: 'Kandy' },
              { img: installCommercial, label: 'Commercial', location: 'Galle' },
              { img: installWarehouse, label: 'Warehouse', location: 'Katunayake' },
            ].map((item, i) => (
              <motion.div
                className="rg-gallery-item"
                key={item.label}
                initial={{ opacity: 0, y: 40 }}
                animate={galleryInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 * i }}
              >
                <div className="rg-gallery-img-wrap">
                  <img src={item.img} alt={item.label} />
                </div>
                <div className="rg-gallery-info">
                  <span className="rg-gallery-label">{item.label}</span>
                  <span className="rg-gallery-location">{item.location}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===== 10. PERFORMANCE STATS ===== */}
        <section className="rg-stats section-padding" ref={statsRef}>
          <motion.div
            className="rg-stats-header"
            {...fadeUp()}
            animate={statsInView ? fadeUp().animate : {}}
          >
            <h2 className="rg-stats-title">Performance<br />you can count on.</h2>
          </motion.div>
          <div className="rg-stats-grid">
            {[
              { value: 100000, suffix: '+', label: 'Open/close cycles', prefix: '' },
              { value: 120, suffix: ' km/h', label: 'Wind resistance rating', prefix: '' },
              { value: 99, suffix: '%', label: 'Uptime reliability', prefix: '' },
              { value: 24, suffix: '/7', label: 'Remote monitoring', prefix: '' },
            ].map((stat, i) => (
              <motion.div
                className="rg-stat-card"
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.12 * i }}
              >
                <div className="rg-stat-number">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </div>
                <div className="rg-stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===== 11. CTA ===== */}
        <section className="rg-cta" id="rg-cta" ref={ctaRef}>
          <motion.div
            className="rg-cta-content"
            {...fadeUp()}
            animate={ctaInView ? fadeUp().animate : {}}
          >
            <h2 className="rg-cta-headline">
              Built for Performance.<br />
              <span className="rg-hero-italic">Designed for Security.</span>
            </h2>
            <p className="rg-cta-sub">
              Let's discuss how Elcardo Roller Gates can protect your business.
            </p>
            <div className="rg-cta-buttons">
              <a href="#" className="rg-btn-primary" data-cursor="expand">
                Request a Quote
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#" className="rg-btn-outline" data-cursor="expand">Contact Sales</a>
            </div>
          </motion.div>
        </section>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
