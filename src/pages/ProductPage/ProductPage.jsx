import { useState, useEffect, useRef, Suspense, useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei';
import SmoothScroll from '../../components/SmoothScroll';
import CustomCursor from '../../components/CustomCursor';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SuperhouseModel, { GATE_COLORS } from '../../components/RollerDoors3D/SuperhouseViewer';
import { getLocalProductBySlug } from '../../data/localProductApiData';
import productsHeroBg from '../../assets/products_hero_bg.png';
import '../RollerDoorsPage.css';
import '../RollerGatesPage.css';
import './ProductPage.css';

function resolveImageSrc(img, base = import.meta.env.BASE_URL) {
  if (!img) return '';
  if (typeof img !== 'string') return img;
  if (img.startsWith('http') || img.startsWith('data:') || img.startsWith('/')) return img;
  return `${base}${img}`;
}

function useReveal() {
  const ref = useRef();
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    ref.current.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return ref;
}

function LazyCanvas({ children, ...props }) {
  const wrapRef = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!wrapRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { setVisible(e.isIntersecting); },
      { rootMargin: '200px' }
    );
    obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={wrapRef} style={{ width: '100%', height: '100%' }}>
      {visible ? <Canvas {...props}>{children}</Canvas> : null}
    </div>
  );
}

/* ─── Hero Section ─── */
function HeroSection({ product }) {
  return (
    <section className="rg-hero rg-hero--apple" id="hero">
      <div className="rg-hero-bg-apple" />
      <motion.div
        className="rg-hero-bg-image"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.2 }}
      >
        <img src={productsHeroBg} alt={product.name} decoding="async" />
      </motion.div>
      <div className="rg-hero-bg-gradient" />
      <div className="rg-hero-content-apple">
        <motion.p
          className="rg-hero-kicker-apple"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
          Elcardo Industries
        </motion.p>
        <motion.h1
          className="rg-hero-headline-apple"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          {product.hero_title}.
          <br />
          <span className="rg-hero-headline-dim-apple">{product.hero_subtitle}</span>
        </motion.h1>
        <motion.p
          className="rg-hero-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
        >
          {product.hero_description}
        </motion.p>
        <motion.div
          className="rg-hero-actions-apple"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.8 }}
        >
          <a href="#quote" className="rg-btn-apple-primary">Get a Quote</a>
          <a href="#overview" className="rg-btn-apple-link" style={{ color: 'var(--accent-red, #DA1212)' }}>
            Explore Product
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Overview Section (Cinematic Image Cards) ─── */
function OverviewSection({ data }) {
  const ref = useReveal();
  if (!data || data.length === 0) return null;
  
  return (
    <section id="overview" className="rdp-overview" ref={ref} style={{ background: '#fff', padding: '120px 48px' }}>
      <div className="section-label reveal" style={{ textAlign: 'center' }}>Product Applications</div>
      <h2 className="section-title reveal reveal-delay-1" style={{ textAlign: 'center' }}>Built for every space.</h2>
      <p className="section-body reveal reveal-delay-2" style={{ margin: '0 auto 64px auto', textAlign: 'center' }}>
        Designed to integrate seamlessly into diverse architectural and functional environments.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', maxWidth: '1400px', margin: '0 auto' }}>
        {data.map((c, i) => (
          <div key={i} className={`reveal reveal-delay-${i + 1}`} style={{
            position: 'relative', borderRadius: '24px', overflow: 'hidden', height: '560px',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '40px',
            color: 'white', cursor: 'pointer', group: 'true'
          }}>
            <img src={resolveImageSrc(c.img)} alt={c.title} style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover',
              zIndex: 0, transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
            }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
            <div style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)',
              zIndex: 1, pointerEvents: 'none'
            }} />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', borderRadius: '100px', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>
                {c.title}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display, "Playfair Display")', fontSize: '28px', marginBottom: '12px', fontWeight: '500' }}>{c.title}</h3>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', marginBottom: '24px', maxWidth: '90%' }}>{c.desc}</p>
              
              {c.stat && (
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                  <span style={{ fontFamily: 'var(--font-display, "Playfair Display")', fontSize: '32px', fontWeight: '500' }}>{c.stat}</span>
                  <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.6)' }}>{c.statLbl}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Showcase Section ─── */
function ShowcaseSection({ product }) {
  const ref = useReveal();
  const [activeColor, setActiveColor] = useState(0);
  const [customHex, setCustomHex] = useState('#cc2929');

  const isDoorOrGate = product.category === 'Roller Door' || product.category === 'Gate';
  const base = import.meta.env.BASE_URL;

  if (isDoorOrGate) {
    const gc = GATE_COLORS[activeColor];
    const gateHex = gc.id === 'custom' ? customHex : gc.hex;

    return (
      <section id="showcase" className="rdp-house-model" ref={ref}>
        <div className="rdp-studio-header">
          <div className="section-label reveal">3D Visualiser</div>
          <h2 className="section-title reveal reveal-delay-1">See it installed.</h2>
          <p className="section-body reveal reveal-delay-2">
            Explore a premium residential facade with your chosen finish. Orbit freely and change the colour in real time.
          </p>
        </div>
        <div className="rdp-house-viewport reveal reveal-delay-2">
          <LazyCanvas gl={{ antialias: true, alpha: false, toneMappingExposure: 1.1 }} dpr={[1, 1.5]} shadows camera={{ position: [8, 5, 14], fov: 44 }}>
            <ambientLight intensity={0.5} color="#d6e4f7" />
            <directionalLight position={[10, 18, 10]} intensity={2.6} color="#fff4e0" castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} shadow-bias={-0.0005} />
            <directionalLight position={[-6, 4, 6]} intensity={0.6} color="#ffffff" />
            <hemisphereLight args={[0x87ceeb, 0x8a7a6a, 0.4]} />
            <ContactShadows position={[0, -0.01, 0]} opacity={0.35} scale={30} blur={2.5} far={10} />
            <Suspense fallback={null}>
              <SuperhouseModel gateColorHex={gateHex} roughness={gc.roughness} metalness={gc.metalness} />
            </Suspense>
            <OrbitControls target={[0, 2, 0]} enablePan={false} maxPolarAngle={Math.PI / 2.1} minPolarAngle={0.1} minDistance={5} maxDistance={28} />
          </LazyCanvas>
        </div>
        <div className="rdp-configurator reveal reveal-delay-3">
          <div className="rdp-cfg-panel">
            <div className="rdp-cfg-label">Finish Colour</div>
            <div className="rdp-cfg-swatches">
              {GATE_COLORS.map((c, i) => (
                <button key={c.id} className={`rdp-cfg-swatch${activeColor === i ? ' active' : ''}`} style={{ background: c.id === 'custom' ? customHex : c.hex, border: c.hex === '#f0ede8' ? '1px solid #ccc' : undefined }} title={c.name} onClick={() => setActiveColor(i)} />
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={gc.id} className="rdp-cfg-name" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.25 }}>
                {gc.name}
              </motion.div>
            </AnimatePresence>
            {gc.id === 'custom' && (
              <div className="rdp-cfg-picker-row">
                <input type="color" value={customHex} onChange={e => setCustomHex(e.target.value)} className="rdp-cfg-color-input" title="Pick custom colour" />
                <span className="rdp-cfg-picker-hint">Pick colour</span>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Non-door fallback premium showcase
  return (
    <section id="showcase" className="rdp-overview" ref={ref} style={{ background: '#f5f5f7', padding: '120px 48px' }}>
      <div className="section-label reveal" style={{ textAlign: 'center' }}>Architectural Quality</div>
      <h2 className="section-title reveal reveal-delay-1" style={{ textAlign: 'center' }}>Engineered for excellence.</h2>
      <div className="reveal reveal-delay-2" style={{
        marginTop: 64, position: 'relative', borderRadius: 24, overflow: 'hidden', height: 600, maxWidth: 1200, margin: '64px auto 0 auto',
        background: `url(${base}images/doors/solid_roller.png) center/cover`
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
        <div style={{ position: 'absolute', bottom: 48, left: 48, color: '#fff' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 42, marginBottom: 16 }}>Premium Construction</h3>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', maxWidth: 600 }}>Every component is manufactured to strict tolerances ensuring a perfect fit and long-term durability in demanding environments.</p>
        </div>
      </div>
    </section>
  );
}

/* ─── Variants Section ─── */
function VariantsSection({ data }) {
  const ref = useReveal();
  if (!data || data.length === 0) return null;
  const gridStyle = data.length < 4
    ? { gridTemplateColumns: `repeat(${data.length}, minmax(260px, 320px))`, justifyContent: 'center' }
    : {};
  return (
    <section id="variants" className="rd-variants" ref={ref}>
      <div className="rd-variants-inner">
        <div className="rd-variants-header reveal">
          <div className="rd-label"><span>Product Range</span></div>
          <h2 className="rd-section-heading">Available<br /><span className="rd-heading-italic">types.</span></h2>
        </div>
        <div className="rd-variants-grid rd-variants-grid--auto" style={gridStyle}>
          {data.map((v, i) => (
            <div key={i} className={`rd-variant-card reveal reveal-delay-${(i % 4) + 1}`}>
              <div className="rd-variant-preview">
                <img src={resolveImageSrc(v.img)} alt={v.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="rd-variant-body">
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
                {v.tag && <span className="rd-variant-specs">{v.tag}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Features Section ─── */
function FeaturesSection({ data }) {
  const ref = useReveal();
  if (!data || data.length === 0) return null;
  return (
    <section id="features" className="rd-features" ref={ref}>
      {data.map((f, i) => (
        <div key={i} className={`rd-feat-block${i % 2 === 1 ? ' rd-feat-block--reverse' : ''}`}>
          <div className="rd-feat-text reveal">
            <div className="rd-label"><span>{f.label}</span></div>
            <h2 className="rd-feat-title">{f.title.split('\n').map((l, j) => <span key={j}>{l}<br/></span>)}</h2>
            <p className="rd-feat-desc">{f.desc}</p>
            {f.stat1 && (
              <div className="rd-feat-stats" style={{ display: 'flex', gap: '32px', marginTop: '32px' }}>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: '600', color: 'var(--near-black)', fontFamily: 'var(--font-display)' }}>{f.stat1}</div>
                  <div style={{ fontSize: '12px', color: 'var(--mid-gray)', textTransform: 'uppercase', letterSpacing: '1px' }}>{f.stat1Label}</div>
                </div>
                {f.stat2 && (
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: '600', color: 'var(--near-black)', fontFamily: 'var(--font-display)' }}>{f.stat2}</div>
                    <div style={{ fontSize: '12px', color: 'var(--mid-gray)', textTransform: 'uppercase', letterSpacing: '1px' }}>{f.stat2Label}</div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="rd-feat-visual reveal reveal-delay-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <img src={resolveImageSrc(f.img)} alt={f.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      ))}
    </section>
  );
}

/* ─── Colors Section ─── */
function ColorsSection({ data }) {
  const ref = useReveal();
  if (!data) return null;
  const tabKeys = Object.keys(data);
  if (tabKeys.length === 0) return null;
  
  const [activeTab, setActiveTab] = useState(tabKeys[0]);
  const [selectedColor, setSelectedColor] = useState(null);

  const active = data[activeTab];
  const sel = selectedColor || active.colors[0];

  return (
    <section id="colours" className="rd-colors" ref={ref}>
      <div className="rd-colors-inner">
        <div className="rd-colors-left reveal">
          <div className="rd-label"><span>Finish Options</span></div>
          <h2 className="rd-section-heading">Choose your<br /><span className="rd-heading-italic">colour.</span></h2>
          <p className="rd-colors-body">
            Available in multiple finish options designed for long-term stability and aesthetic integration.
          </p>
          <div className="rd-colors-tabs">
            {Object.entries(data).map(([k, v]) => (
              <button key={k} className={`rd-colors-tab${activeTab === k ? ' active' : ''}`} onClick={() => { setActiveTab(k); setSelectedColor(null); }}>
                {v.label}
                <span className="rd-colors-tab-count">{v.count}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="rd-colors-right reveal reveal-delay-2">
          <div className="rd-colors-swatches">
            {active.colors.map((c, i) => (
              <button key={i} className={`rd-colors-swatch${sel.name === c.name ? ' active' : ''}`} onClick={() => setSelectedColor(c)} aria-label={c.name}>
                <div className="rd-colors-swatch-dot" style={{ background: c.hex, boxShadow: c.light ? 'inset 0 0 0 1px rgba(0,0,0,0.12)' : undefined }} />
              </button>
            ))}
          </div>
          {sel && (
            <AnimatePresence mode="wait">
              <motion.div key={sel.name} className="rd-colors-selected" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
                <div className="rd-colors-preview-bar" style={{ background: sel.hex, boxShadow: sel.light ? 'inset 0 0 0 1px rgba(0,0,0,0.08)' : undefined }} />
                <div className="rd-colors-selected-meta">
                  <span className="rd-colors-name">{sel.name}</span>
                  <span className="rd-colors-cat">{active.label}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── Materials & Finishes — product-specific 3D meshes ─── */

/* Shared lerp pattern used by all four mesh components */
function usePanelLerp(colorHex, roughness, metalness, meshRefs) {
  const tColor = useRef(new THREE.Color(colorHex));
  const tR = useRef(roughness);
  const tM = useRef(metalness);
  useEffect(() => { tColor.current.set(colorHex); }, [colorHex]);
  useEffect(() => { tR.current = roughness; }, [roughness]);
  useEffect(() => { tM.current = metalness; }, [metalness]);
  useEffect(() => {
    meshRefs.current.forEach(m => {
      if (!m?.material) return;
      m.material.color.set(colorHex);
      m.material.roughness = roughness;
      m.material.metalness = metalness;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useFrame(() => {
    meshRefs.current.forEach(m => {
      if (!m?.material) return;
      m.material.color.lerp(tColor.current, 0.08);
      m.material.roughness += (tR.current - m.material.roughness) * 0.08;
      m.material.metalness += (tM.current - m.material.metalness) * 0.08;
    });
  });
}

/* Roller Doors / Roller Shutters — horizontal slatted panel */
function DoorSlatMesh({ colorHex, roughness, metalness }) {
  const groupRef = useRef();
  const meshRefs = useRef([]);
  usePanelLerp(colorHex, roughness, metalness, meshRefs);
  useFrame((_, dt) => { if (groupRef.current) groupRef.current.rotation.y += dt * 0.18; });
  return (
    <group ref={groupRef} rotation={[0.06, 0.3, 0]}>
      {Array.from({ length: 9 }, (_, i) => (
        <mesh key={i} ref={el => { meshRefs.current[i] = el; }} position={[0, (i - 4) * 0.32, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.4, 0.28, 0.07]} />
          <meshPhysicalMaterial clearcoat={0.6} clearcoatRoughness={0.12} />
        </mesh>
      ))}
      <mesh position={[-1.78, 0, -0.04]}><boxGeometry args={[0.06, 3.0, 0.05]} /><meshStandardMaterial color="#7a7a7a" roughness={0.5} metalness={0.5} /></mesh>
      <mesh position={[1.78, 0, -0.04]}><boxGeometry args={[0.06, 3.0, 0.05]} /><meshStandardMaterial color="#7a7a7a" roughness={0.5} metalness={0.5} /></mesh>
    </group>
  );
}

/* Sliding / Swing Gates — vertical bar panel with top, mid, bottom rails */
function GateBarMesh({ colorHex, roughness, metalness }) {
  const groupRef = useRef();
  const meshRefs = useRef([]);
  usePanelLerp(colorHex, roughness, metalness, meshRefs);
  useFrame((_, dt) => { if (groupRef.current) groupRef.current.rotation.y += dt * 0.15; });
  const bars = 7, spacing = 0.44, span = (bars - 1) * spacing;
  return (
    <group ref={groupRef} rotation={[0, 0.25, 0]}>
      {Array.from({ length: bars }, (_, i) => (
        <mesh key={i} ref={el => { meshRefs.current[i] = el; }} position={[i * spacing - span / 2, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.10, 2.6, 0.10]} />
          <meshPhysicalMaterial clearcoat={0.5} clearcoatRoughness={0.14} />
        </mesh>
      ))}
      {[[1.35], [0], [-1.35]].map(([y], i) => (
        <mesh key={`rail-${i}`} ref={el => { meshRefs.current[bars + i] = el; }} position={[0, y, 0]} castShadow receiveShadow>
          <boxGeometry args={[span + 0.18, i === 1 ? 0.08 : 0.14, 0.12]} />
          <meshPhysicalMaterial clearcoat={0.5} clearcoatRoughness={0.14} />
        </mesh>
      ))}
    </group>
  );
}

/* Roofing Sheets — trapezoidal corrugated profile */
function RoofingMesh({ colorHex, roughness, metalness }) {
  const groupRef = useRef();
  const meshRef = useRef();
  const meshRefs = useRef([]);
  const tColor = useRef(new THREE.Color(colorHex));
  const tR = useRef(roughness), tM = useRef(metalness);
  useEffect(() => { tColor.current.set(colorHex); }, [colorHex]);
  useEffect(() => { tR.current = roughness; }, [roughness]);
  useEffect(() => { tM.current = metalness; }, [metalness]);
  useEffect(() => {
    if (!meshRef.current?.material) return;
    meshRef.current.material.color.set(colorHex);
    meshRef.current.material.roughness = roughness;
    meshRef.current.material.metalness = metalness;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const corrGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(4.2, 2.8, 120, 1);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const t = (((x / 4.2) * 5.5 + 0.5) % 1.0 + 1.0) % 1.0;
      let z = 0;
      if (t > 0.18 && t < 0.42) z = ((t - 0.18) / 0.24) * 0.26;
      else if (t >= 0.42 && t <= 0.58) z = 0.26;
      else if (t > 0.58 && t < 0.82) z = ((0.82 - t) / 0.24) * 0.26;
      pos.setZ(i, z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);
  useFrame((_, dt) => {
    if (groupRef.current) groupRef.current.rotation.y += dt * 0.15;
    if (!meshRef.current?.material) return;
    meshRef.current.material.color.lerp(tColor.current, 0.08);
    meshRef.current.material.roughness += (tR.current - meshRef.current.material.roughness) * 0.08;
    meshRef.current.material.metalness += (tM.current - meshRef.current.material.metalness) * 0.08;
  });
  // eslint-disable-next-line no-unused-vars
  void meshRefs;
  return (
    <group ref={groupRef} rotation={[-0.18, 0.32, 0]}>
      <mesh ref={meshRef} geometry={corrGeo} castShadow receiveShadow>
        <meshPhysicalMaterial side={THREE.DoubleSide} clearcoat={0.35} clearcoatRoughness={0.18} />
      </mesh>
    </group>
  );
}

/* WPC Decking — wide horizontal planks */
function DeckingMesh({ colorHex, roughness, metalness }) {
  const groupRef = useRef();
  const meshRefs = useRef([]);
  usePanelLerp(colorHex, roughness, metalness, meshRefs);
  useFrame((_, dt) => { if (groupRef.current) groupRef.current.rotation.y += dt * 0.16; });
  return (
    <group ref={groupRef} rotation={[-0.14, 0.35, 0]}>
      {Array.from({ length: 5 }, (_, i) => (
        <mesh key={i} ref={el => { meshRefs.current[i] = el; }} position={[0, (i - 2) * 0.46, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.6, 0.38, 0.12]} />
          <meshPhysicalMaterial clearcoat={0.25} clearcoatRoughness={0.40} />
        </mesh>
      ))}
      <mesh position={[-1.84, 0, -0.12]}><boxGeometry args={[0.06, 2.1, 0.08]} /><meshStandardMaterial color="#4a3a2a" roughness={0.85} metalness={0.0} /></mesh>
      <mesh position={[1.84, 0, -0.12]}><boxGeometry args={[0.06, 2.1, 0.08]} /><meshStandardMaterial color="#4a3a2a" roughness={0.85} metalness={0.0} /></mesh>
    </group>
  );
}

/* Per-product mesh + camera + material config */
const MESH_CONFIG = {
  'roller-doors':  { Mesh: DoorSlatMesh, camera: [0, 0, 7],     fov: 36, roughness: 0.40, metalness: 0.25 },
  'sliding-gates': { Mesh: GateBarMesh,  camera: [0, 0, 8],     fov: 38, roughness: 0.38, metalness: 0.35 },
  'roofing':       { Mesh: RoofingMesh,  camera: [0, 1.2, 6.5], fov: 40, roughness: 0.28, metalness: 0.55 },
  'wpc':           { Mesh: DeckingMesh,  camera: [0, 1.0, 7],   fov: 38, roughness: 0.68, metalness: 0.04 },
};
const DEFAULT_MESH_CFG = { Mesh: DoorSlatMesh, camera: [0, 0, 7], fov: 36, roughness: 0.40, metalness: 0.25 };

/* Only renders for products with `data.architectural` (ARCH_COLORS products) */
function MaterialsFinishesSection({ data, animationType }) {
  const ref = useReveal();
  if (!data?.architectural) return null;
  const tabKeys = Object.keys(data);

  const [activeTab, setActiveTab] = useState(tabKeys[0]);
  const [selectedColor, setSelectedColor] = useState(null);

  const active = data[activeTab];
  const sel = selectedColor || active.colors[0];
  const cfg = MESH_CONFIG[animationType] || DEFAULT_MESH_CFG;
  const { Mesh: PanelMesh, roughness, metalness } = cfg;

  return (
    <section id="colours" className="pp-mf-section" ref={ref}>
      <div className="pp-mf-inner">
        <div className="pp-mf-header reveal">
          <div className="rd-label"><span style={{ color: 'rgba(255,255,255,0.45)' }}>Materials & Finishes</span></div>
          <h2 className="rd-section-heading" style={{ color: '#fff' }}>
            Architectural<br />
            <span className="rd-heading-italic" style={{ color: 'rgba(255,255,255,0.25)' }}>grade.</span>
          </h2>
          <p className="pp-mf-body">
            Engineered coatings designed to withstand harsh environments while maintaining absolute colour fidelity.
          </p>
        </div>

        <div className="pp-mf-content">
          <div className="pp-mf-canvas-wrap reveal reveal-delay-1">
            <LazyCanvas
              gl={{ antialias: true, alpha: false, toneMappingExposure: 1.15 }}
              dpr={[1, 1.5]}
              shadows
              camera={{ position: cfg.camera, fov: cfg.fov }}
            >
              <ambientLight intensity={0.55} color="#dce8ff" />
              <directionalLight position={[6, 10, 6]} intensity={2.2} color="#fff6e8" castShadow shadow-mapSize={[1024, 1024]} />
              <directionalLight position={[-4, 2, 4]} intensity={0.6} color="#ffffff" />
              <hemisphereLight args={[0x6688cc, 0x402020, 0.35]} />
              <Suspense fallback={null}>
                <PanelMesh colorHex={sel.hex} roughness={roughness} metalness={metalness} />
              </Suspense>
              <ContactShadows position={[0, -1.68, 0]} opacity={0.35} scale={10} blur={2.5} far={4} />
              <Environment preset="city" />
              <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 3.5} maxPolarAngle={Math.PI / 1.9} />
            </LazyCanvas>
            <div className="pp-mf-hint">Drag to orbit</div>
          </div>

          <div className="pp-mf-controls reveal reveal-delay-2">
            {tabKeys.length > 1 && (
              <div className="pp-mf-tabs">
                {Object.entries(data).map(([k, v]) => (
                  <button key={k} className={`pp-mf-tab${activeTab === k ? ' active' : ''}`}
                    onClick={() => { setActiveTab(k); setSelectedColor(null); }}>
                    {v.label}
                    <span className="pp-mf-tab-count">{v.count}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="pp-mf-ctrl-label">Select Finish Colour</div>

            <div className="pp-mf-swatches">
              {active.colors.map((c, i) => (
                <button key={i}
                  className={`pp-mf-swatch${sel.name === c.name ? ' active' : ''}`}
                  style={{ background: c.hex, boxShadow: c.light ? 'inset 0 0 0 1px rgba(255,255,255,0.3)' : undefined }}
                  title={c.name}
                  onClick={() => setSelectedColor(c)}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={sel.name} className="pp-mf-selected"
                initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.22 }}>
                <div className="pp-mf-sel-bar" style={{ background: sel.hex, boxShadow: sel.light ? 'inset 0 0 0 1px rgba(255,255,255,0.25)' : undefined }} />
                <div className="pp-mf-sel-meta">
                  <span className="pp-mf-sel-name">{sel.name}</span>
                  <span className="pp-mf-sel-hex">{sel.hex.toUpperCase()}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="pp-mf-badges">
              {[
                { label: 'Architectural Grade', sub: 'Premium specification' },
                { label: 'UV Resistant', sub: 'Colour stable outdoors' },
                { label: 'Powder Coated', sub: 'Hard-wearing surface' },
              ].map((b, i) => (
                <div key={i} className="pp-mf-badge">
                  <div className="pp-mf-badge-dot" />
                  <div>
                    <div className="pp-mf-badge-name">{b.label}</div>
                    <div className="pp-mf-badge-sub">{b.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Components Section ─── */
function ComponentsSection({ data }) {
  const ref = useReveal();
  if (!data || data.length === 0) return null;
  return (
    <section id="components" className="rd-components" ref={ref}>
      <div className="rd-components-inner">
        <div className="rd-components-header reveal">
          <div className="rd-label"><span>Engineering</span></div>
          <h2 className="rd-section-heading">Built from<br /><span className="rd-heading-italic">precision parts.</span></h2>
          <p style={{ fontSize: '16px', color: 'var(--mid-gray, #8A8F98)', marginTop: '20px', maxWidth: '520px', lineHeight: 1.65 }}>
            Manufactured with strict quality control to ensure flawless operation and durability over its lifecycle.
          </p>
        </div>
        <div className="rd-components-grid">
          {data.map((c, i) => (
            <div key={i} className={`rd-component-item reveal reveal-delay-${(i % 4) + 1}`}>
              <span className="rd-component-num">{c.num}</span>
              <div>
                <div className="rd-component-name">{c.name}</div>
                <div className="rd-component-desc">{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Performance / Automation Section ─── */
function PerformanceSection({ data }) {
  const ref = useReveal();
  const base = import.meta.env.BASE_URL;
  if (!data) return null;
  return (
    <section id="performance" className="rdp-automation" ref={ref} style={{ background: '#0a0a0a', color: '#fff', padding: '160px 48px', overflow: 'hidden', position: 'relative' }}>
      <div className="rdp-auto-bg reveal reveal-delay-2" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: '30%', backgroundImage: `url(${base}images/doors/slatted_roller.png)`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.5, WebkitMaskImage: 'linear-gradient(to right, transparent, black 40%)' }} />
      
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '80px' }}>
        <div style={{ maxWidth: '600px' }}>
          <div className="section-label reveal" style={{ color: 'rgba(255,255,255,0.6)', borderColor: 'rgba(255,255,255,0.2)' }}>Performance</div>
          <h2 className="section-title reveal reveal-delay-1" style={{ color: '#fff' }}>{data.title.split('.')[0]}.<br/><em style={{ opacity: 0.35 }}>Optimized.</em></h2>
          <p className="section-body reveal reveal-delay-2" style={{ color: 'rgba(255,255,255,0.7)' }}>{data.desc}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', maxWidth: '1000px' }}>
          {data.features.map((f, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 1}`} style={{ borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '24px' }}>
              <div style={{ fontSize: '24px', fontFamily: 'var(--font-display)', marginBottom: '12px' }}>{f.title}</div>
              <div style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Stats Section ─── */
function StatsSection({ data }) {
  const ref = useReveal();
  if (!data || data.length === 0) return null;
  return (
    <section className="rd-stats" ref={ref}>
      <div className="rd-stats-grid">
        {data.map((s, i) => (
          <div key={i} className={`rd-stat-card reveal reveal-delay-${i + 1}`}>
            <span className="rd-stat-num">{s.num}</span>
            <span className="rd-stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Specs Section ─── */
function SpecsSection({ data }) {
  const ref = useReveal();
  if (!data) return null;
  const tabKeys = Object.keys(data);
  const [tab, setTab] = useState(tabKeys[0]);
  if (tabKeys.length === 0) return null;

  return (
    <section id="specs" className="rd-specs" ref={ref}>
      <div className="rd-specs-inner">
        <div className="rd-specs-header reveal">
          <div className="rd-label"><span>Technical Specifications</span></div>
          <h2 className="rd-section-heading">Built to<br /><span className="rd-heading-italic">spec.</span></h2>
        </div>
        <div className="rd-specs-card reveal reveal-delay-2">
          <div className="rd-specs-tabs">
            {tabKeys.map(k => (
              <button key={k} className={`rd-spec-tab${tab === k ? ' active' : ''}`} onClick={() => setTab(k)} style={{ textTransform: 'capitalize' }}>
                {k}
              </button>
            ))}
          </div>
          {tabKeys.map(k => (
            <div key={k} className={`rd-spec-panel${tab === k ? ' active' : ''}`}>
              <table className="rd-spec-table"><tbody>
                {data[k]?.map(([l, r], i) => <tr key={i}><td>{l}</td><td>{r}</td></tr>)}
              </tbody></table>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Section ─── */
function CtaSection({ product }) {
  const ref = useReveal();
  return (
    <section id="quote" className="rd-cta" ref={ref}>
      <div className="rd-cta-bg" />
      <div className="rd-cta-content">
        <div className="rd-label reveal" style={{ justifyContent: 'center' }}>
          <span style={{ color: 'var(--accent-red, #DA1212)' }}>Get Started</span>
        </div>
        <h2 className="rd-cta-headline reveal reveal-delay-1">
          Get your<br /><span className="rd-heading-italic" style={{ color: 'rgba(245,245,247,0.3)' }}>{product.name?.toLowerCase()}.</span>
        </h2>
        <p className="rd-cta-sub reveal reveal-delay-2">
          Tell us your requirements and our team will specify the right solution for your project.
        </p>
        <div className="rd-cta-buttons reveal reveal-delay-3">
          <a href="mailto:info@elcardo.com" className="rd-btn-primary">
            Request a Quote
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
          <Link to="/contact" className="rd-btn-outline">Contact Us</Link>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════ */
export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setNotFound(false);
    const localProduct = getLocalProductBySlug(slug);
    if (localProduct) {
      setProduct(localProduct);
    } else {
      setNotFound(true);
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#0a0a0f', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)',
        fontSize: 12, letterSpacing: '3px', textTransform: 'uppercase' }}>
        Loading...
      </div>
    );
  }
  if (notFound) return <Navigate to="/products" replace />;

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <div className="rdp">
        <HeroSection product={product} />
        <OverviewSection data={product.overview} />
        <ShowcaseSection product={product} />
        <VariantsSection data={product.variants} />
        <FeaturesSection data={product.features} />
        {product.colors?.architectural
          ? <MaterialsFinishesSection data={product.colors} animationType={product.animation_type} />
          : <ColorsSection data={product.colors} />
        }
        <ComponentsSection data={product.components} />
        <StatsSection data={product.stats} />
        <PerformanceSection data={product.performance} />
        <SpecsSection data={product.specs} />
        <CtaSection product={product} />
      </div>
      <Footer />
    </SmoothScroll>
  );
}
