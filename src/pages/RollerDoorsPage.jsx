import React, { useState, useEffect, useRef, useCallback, Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import SmoothScroll from '../components/SmoothScroll';
import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { RollerDoorScene, SceneLights, colorOptions } from '../components/RollerDoors3D/RollerDoorModel';
import './RollerDoorsPage.css';
import './RollerGatesPage.css'; // Import for shared Apple-style hero classes

/* ─── Lazy canvas — only mounts when element scrolls into view ─── */
function LazyCanvas({ children, ...props }) {
  const wrapRef = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!wrapRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
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

/* ─── Reveal hook ─── */
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



/* ─── Hero Section (Cinematic Apple-style match) ─── */
function HeroSection() {
  const base = import.meta.env.BASE_URL;
  return (
    <section className="rg-hero rg-hero--apple" id="hero">
      {/* Very subtle background gradient (nearly black) */}
      <div className="rg-hero-bg-apple" />
      
      {/* Premium Apple-style faded background image */}
      <motion.div 
        className="rg-hero-bg-image"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.2 }}
      >
        <img src={`${base}images/doors/rd_hero.png`} alt="Elcardo Roller Doors Facility" decoding="async" />
      </motion.div>
      <div className="rg-hero-bg-gradient" />

      {/* Content overlay, centered, minimalist */}
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
          Roller Doors.
          <br />
          <span className="rg-hero-headline-dim-apple">Secure access. Smooth motion.</span>
        </motion.h1>

        <motion.p
          className="rg-hero-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2, ease: 'easeInOut' }}
        >
          Built for modern spaces. Engineered for durability and architectural integration.
        </motion.p>

        <motion.div
          className="rg-hero-actions-apple"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.8, ease: 'easeInOut' }}
        >
          <a href="#quote" className="rg-btn-apple-primary">
            Get a Quote
          </a>
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
function OverviewSection() {
  const ref = useReveal();
  const base = import.meta.env.BASE_URL;
  const cards = [
    { title: 'Residential', desc: 'Modern access for garages and boundary walls. Designed to complement contemporary architecture.', link: 'Explore residential', img: `${base}images/doors/rd_residential.png`, stat: '35+', statLbl: 'Finish Options' },
    { title: 'Commercial', desc: 'Reliable protection for shops and business entrances. High-cycle rated for daily demands.', link: 'Explore commercial', img: `${base}images/doors/rd_commercial.png`, stat: '10k+', statLbl: 'Daily Cycles' },
    { title: 'Industrial', desc: 'Durable solutions for warehouses and facilities. Built to withstand heavy environments.', link: 'Explore industrial', img: `${base}images/doors/rd_industrial.png`, stat: '6m', statLbl: 'Max Width' },
  ];
  return (
    <section id="overview" className="rdp-overview" ref={ref} style={{ background: '#fff', padding: '120px 48px' }}>
      <div className="section-label reveal" style={{ textAlign: 'center' }}>Product Applications</div>
      <h2 className="section-title reveal reveal-delay-1" style={{ textAlign: 'center' }}>Built for every space.</h2>
      <p className="section-body reveal reveal-delay-2" style={{ margin: '0 auto 64px auto', textAlign: 'center' }}>From modern homes to industrial facilities, Elcardo roller doors combine engineering precision with architectural design.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', maxWidth: '1400px', margin: '0 auto' }}>
        {cards.map((c, i) => (
          <div key={i} className={`reveal reveal-delay-${i + 1}`} style={{
            position: 'relative', borderRadius: '24px', overflow: 'hidden', height: '560px',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '40px',
            color: 'white', cursor: 'pointer', group: 'true'
          }}>
            {/* Background Image */}
            <img src={c.img} alt={c.title} style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover',
              zIndex: 0, transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
            }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
            
            {/* Dark Gradient Overlay */}
            <div style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)',
              zIndex: 1, pointerEvents: 'none'
            }} />
            
            {/* Content */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', borderRadius: '100px', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>
                {c.title}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display, "Playfair Display")', fontSize: '28px', marginBottom: '12px', fontWeight: '500' }}>{c.title} Access</h3>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', marginBottom: '24px', maxWidth: '90%' }}>{c.desc}</p>
              
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                <span style={{ fontFamily: 'var(--font-display, "Playfair Display")', fontSize: '32px', fontWeight: '500' }}>{c.stat}</span>
                <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.6)' }}>{c.statLbl}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Studio Section ─── */
function StudioSection() {
  const ref = useReveal();
  const [activeColor, setActiveColor] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isExploded, setIsExploded] = useState(false);
  const [rotY, setRotY] = useState(0);
  const [rotX, setRotX] = useState(0.05);
  const [customHex, setCustomHex] = useState('#C21E1E');
  const dragging = useRef(false);
  const prev = useRef({ x: 0, y: 0 });
  
  const c = { ...colorOptions[activeColor] };
  if (c.name === 'Custom Color') c.hex = customHex;

  const onPointerDown = useCallback(e => { dragging.current = true; prev.current = { x: e.clientX, y: e.clientY }; }, []);
  const onPointerUp = useCallback(() => { dragging.current = false; }, []);
  const onPointerMove = useCallback(e => {
    if (!dragging.current) return;
    setRotY(r => r + (e.clientX - prev.current.x) * 0.008);
    setRotX(r => Math.max(-0.5, Math.min(0.5, r + (e.clientY - prev.current.y) * 0.005)));
    prev.current = { x: e.clientX, y: e.clientY };
  }, []);

  return (
    <section id="studio" className="rdp-studio" ref={ref}>
      <div className="section-label reveal">3D Product Studio</div>
      <h2 className="section-title reveal reveal-delay-1">Explore every angle.</h2>
      <p className="section-body reveal reveal-delay-2">Drag to rotate, zoom to inspect. Select a finish to see it applied instantly.</p>
      <div className="rdp-studio-layout reveal reveal-delay-2">
        <div className="rdp-studio-canvas-wrap" onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerMove={onPointerMove} onPointerLeave={onPointerUp}>
          <LazyCanvas gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]} shadows camera={{ position: [0, 0.8, 7.5], fov: 40 }}>
            <SceneLights />
            <RollerDoorScene colorHex={c.hex} roughness={c.rough} metalness={c.metal} openAmount={isOpen ? 1 : 0} rotationY={rotY} rotationX={rotX} exploded={isExploded} />
          </LazyCanvas>
          <div className="rdp-view-hint">Drag to rotate · Scroll to zoom</div>
        </div>
        <div className="rdp-studio-controls">
          <div className="rdp-ctrl-section">
            <div className="rdp-ctrl-label">Finish</div>
            <div className="rdp-color-swatches" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {colorOptions.map((co, i) => (
                <div key={i} className={`rdp-color-swatch${activeColor === i ? ' active' : ''}`}
                  style={{ background: co.name === 'Custom Color' ? customHex : co.hex }} title={co.name} onClick={() => setActiveColor(i)} />
              ))}
              {c.name === 'Custom Color' && (
                <input type="color" value={customHex} onChange={e => setCustomHex(e.target.value)} 
                  style={{ width: '36px', height: '36px', border: 'none', padding: 0, cursor: 'pointer', borderRadius: '50%', overflow: 'hidden', background: 'transparent' }} 
                  title="Pick a custom color" />
              )}
            </div>
            <div className="rdp-finish-label">{c.name}</div>
          </div>
          <div className="rdp-ctrl-section">
            <div className="rdp-ctrl-label">Controls</div>
            <div className="rdp-ctrl-buttons">
              <button className={`rdp-ctrl-btn${isOpen ? ' active-btn' : ''}`} onClick={() => { setIsOpen(!isOpen); if (isExploded) setIsExploded(false); }}>
                {isOpen ? 'Close Door' : 'Open Door'}
              </button>
              <button className={`rdp-ctrl-btn${isExploded ? ' active-btn' : ''}`} onClick={() => { setIsExploded(!isExploded); if (isOpen) setIsOpen(false); }}>
                {isExploded ? 'Collapse Parts' : 'Exploded View'}
              </button>
              <button className="rdp-ctrl-btn" onClick={() => { setRotY(0); setRotX(0.05); }}>Reset View</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Finishes Section (Rich Technical Layout) ─── */
function FinishesSection() {
  const ref = useReveal();
  const [active, setActive] = useState(0);
  const [customHex, setCustomHex] = useState('#C21E1E');
  
  const c = { ...colorOptions[active] };
  if (c.name === 'Custom Color') c.hex = customHex;
  
  // Enriched metadata for finishes
  const finishData = {
    'Arctic White': { texture: 'Smooth Matte', uv: 'High', scratch: 'Standard', desc: 'A clean, architectural white. Perfect for modern, minimalist facades wanting to reflect heat and light.' },
    'Graphite Grey': { texture: 'Fine Sand', uv: 'Extreme', scratch: 'High', desc: 'Deep charcoal grey with a sophisticated fine-sand texture. Hides dust and resists marking.' },
    'Gloss Black': { texture: 'High Gloss', uv: 'Standard', scratch: 'Standard', desc: 'A deep, reflective black finish that makes a bold architectural statement. Ideal for sharp, modern contrasts.' },
    'Metallic Silver': { texture: 'Brushed', uv: 'High', scratch: 'Standard', desc: 'Premium aluminium finish that reflects ambient light dynamically. Ideal for commercial and industrial chic.' },
    'Wood Look': { texture: 'Woodgrain', uv: 'Standard', scratch: 'High', desc: 'The warmth of timber with the strength of steel. A laminated woodgrain film that requires zero maintenance.' },
    'Custom Color': { texture: 'Variable', uv: 'Custom', scratch: 'Variable', desc: 'Match your brand or existing architecture precisely with our custom RAL color-matching service.' }
  };
  const activeData = finishData[c.name] || finishData['Arctic White'];

  const bg = c.name === 'Metallic Silver' ? 'linear-gradient(135deg,#D0D0CC,#A8A8A4,#C8C8C4,#E0E0DC)' :
    c.name === 'Wood Look' ? `repeating-linear-gradient(90deg,${c.hex} 0px,${c.hex} 20px,#7A6245 20px,#7A6245 22px)` :
    c.name === 'Custom Color' ? `linear-gradient(135deg, ${customHex}, #1A1A1A)` : c.hex;

  return (
    <section id="finishes" className="rdp-finishes" ref={ref} style={{ padding: '120px 48px', background: 'var(--white)' }}>
      <div className="section-label reveal" style={{ textAlign: 'center' }}>Materials & Finishes</div>
      <h2 className="section-title reveal reveal-delay-1" style={{ textAlign: 'center' }}>Architectural grade.</h2>
      <p className="section-body reveal reveal-delay-2" style={{ margin: '0 auto 64px auto', textAlign: 'center' }}>
        Engineered coatings designed to withstand harsh environments while maintaining absolute color fidelity.
      </p>

      <div className="reveal reveal-delay-3" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '64px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Swatch Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {colorOptions.map((co, i) => (
            <div key={i} onClick={() => setActive(i)} style={{
              display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', borderRadius: '12px',
              border: active === i ? '1px solid var(--navy)' : '1px solid var(--border)',
              background: active === i ? 'var(--off-white)' : 'transparent',
              cursor: 'pointer', transition: 'all 0.2s ease'
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: co.name === 'Metallic Silver' ? 'linear-gradient(135deg,#E0E0DC,#A8A8A4,#D0D0CC)' : (co.name === 'Custom Color' ? customHex : co.hex),
                border: '1px solid rgba(0,0,0,0.1)'
              }} />
              <div style={{ fontWeight: active === i ? '600' : '400', fontSize: '15px' }}>{co.name}</div>
              {co.name === 'Custom Color' && active === i && (
                <input type="color" value={customHex} onChange={e => setCustomHex(e.target.value)} onClick={e => e.stopPropagation()}
                  style={{ marginLeft: 'auto', width: '32px', height: '32px', border: 'none', padding: 0, cursor: 'pointer', background: 'transparent' }} 
                  title="Pick Custom Color" />
              )}
            </div>
          ))}
        </div>

        {/* Finish Details */}
        <div style={{ background: 'var(--off-white)', borderRadius: '24px', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          {/* Visual Presentation (3D Close-up) */}
          <div style={{ background: 'linear-gradient(135deg, #F0F0F0 0%, #DCDCDC 100%)', minHeight: '400px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
              <LazyCanvas gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]} shadows camera={{ position: [0, 0.2, 1.6], fov: 35 }}>
                <SceneLights />
                <RollerDoorScene colorHex={c.hex} roughness={c.rough} metalness={c.metal} openAmount={0.2} autoRotate={true} />
              </LazyCanvas>
            </div>
            <div style={{ position: 'absolute', bottom: '32px', left: '32px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', padding: '12px 24px', borderRadius: '100px', fontSize: '12px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', zIndex: 1, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              {c.name}
            </div>
          </div>
          {/* Tech Specs */}
          <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-display, "Playfair Display")', fontSize: '32px', marginBottom: '16px', color: 'var(--navy)' }}>{c.name}</h3>
            <p style={{ color: 'var(--mid-grey)', lineHeight: '1.7', marginBottom: '32px' }}>{activeData.desc}</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', borderTop: '1px solid var(--border)', paddingTop: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--mid-grey)' }}>Texture</span>
                <span style={{ fontWeight: '500' }}>{activeData.texture}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--mid-grey)' }}>UV Stability</span>
                <span style={{ fontWeight: '500' }}>{activeData.uv}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--mid-grey)' }}>Scratch Resistance</span>
                <span style={{ fontWeight: '500' }}>{activeData.scratch}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ─── Variants Section (rg-variants style, with images & stats) ─── */
function VariantsSection() {
  const ref = useReveal();
  const base = import.meta.env.BASE_URL;
  const variants = [
    { title: 'Solid Roller', desc: 'Full privacy and maximum insulation. Complete light blockout with interlocked steel curtain.', specs: 'STEEL · RESIDENTIAL', img: `${base}images/doors/solid_roller.png`, strength: 'High Impact', rating: '9/10' },
    { title: 'Slatted Roller', desc: 'Precision-formed aluminium slats with controlled airflow gaps. Visibility maintained through ventilation.', specs: 'ALUMINIUM · COMMERCIAL', img: `${base}images/doors/slatted_roller.png`, strength: 'Medium Impact', rating: '7/10' },
    { title: 'Perforated Roller', desc: 'Micro-perforated steel panels balancing security with natural light and ventilation passage.', specs: 'STEEL · SHOWROOMS', img: `${base}images/doors/perforated_roller.png`, strength: 'High Impact', rating: '8/10' },
  ];
  return (
    <section id="variants" className="rd-variants" ref={ref}>
      <div className="rd-variants-inner">
        <div className="rd-variants-header reveal">
          <div className="rd-label"><span>Product Range</span></div>
          <h2 className="rd-section-heading">Choose your<br /><span className="rd-heading-italic">configuration.</span></h2>
        </div>
        <div className="rd-variants-grid">
          {variants.map((v, i) => (
            <div key={i} className={`rd-variant-card reveal reveal-delay-${i + 1}`}>
              <div className="rd-variant-preview">
                <img src={v.img} alt={v.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="rd-variant-body">
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
                <div className="rd-variant-stats" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '12px', color: 'var(--near-black)', fontWeight: '500' }}>
                  <span>Strength: {v.strength}</span>
                  <span>Rating: {v.rating}</span>
                </div>
                <span className="rd-variant-specs">{v.specs}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Features (rg-feat-block alternating style, with images & data) ─── */
function FeaturesSection() {
  const ref = useReveal();
  const base = import.meta.env.BASE_URL;
  const features = [
    { label: 'Design', title: 'Space\nSaving.', desc: 'Vertical operation means no swing clearance. The curtain rolls cleanly into the compact drum housing above the opening — freeing every inch of your space.', img: `${base}images/doors/solid_roller.png`, stat1: '0mm', stat1Label: 'Swing Clearance', stat2: '100%', stat2Label: 'Space Utilized' },
    { label: 'Security', title: 'Secure\nby Design.', desc: 'Interlocked steel slats and reinforced guide rails resist forced entry. Each door is engineered to meet commercial security requirements — as standard.', img: `${base}images/doors/perforated_roller.png`, stat1: 'Class 3', stat1Label: 'Burglar Resistance', stat2: '2mm', stat2Label: 'Steel Thickness' },
    { label: 'Personalisation', title: 'Made\nto Match.', desc: '35+ finish options. From architectural whites to wood-look laminates — every Elcardo door is tailored to fit the aesthetic of your space.', img: `${base}images/doors/slatted_roller.png`, stat1: '35+', stat1Label: 'Color Options', stat2: 'UV', stat2Label: 'Fade Resistant' },
  ];
  return (
    <section id="features" className="rd-features" ref={ref}>
      {features.map((f, i) => (
        <div key={i} className={`rd-feat-block${i % 2 === 1 ? ' rd-feat-block--reverse' : ''}`}>
          <div className="rd-feat-text reveal">
            <div className="rd-label"><span>{f.label}</span></div>
            <h2 className="rd-feat-title">{f.title.split('\n').map((l, j) => <React.Fragment key={j}>{l}{j === 0 && <br />}</React.Fragment>)}</h2>
            <p className="rd-feat-desc">{f.desc}</p>
            <div className="rd-feat-stats" style={{ display: 'flex', gap: '32px', marginTop: '32px' }}>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '600', color: 'var(--near-black)', fontFamily: 'var(--font-display)' }}>{f.stat1}</div>
                <div style={{ fontSize: '12px', color: 'var(--mid-gray)', textTransform: 'uppercase', letterSpacing: '1px' }}>{f.stat1Label}</div>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '600', color: 'var(--near-black)', fontFamily: 'var(--font-display)' }}>{f.stat2}</div>
                <div style={{ fontSize: '12px', color: 'var(--mid-gray)', textTransform: 'uppercase', letterSpacing: '1px' }}>{f.stat2Label}</div>
              </div>
            </div>
          </div>
          <div className="rd-feat-visual reveal reveal-delay-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <img src={f.img} alt={f.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      ))}
    </section>
  );
}

/* ─── Stats Strip (rg-stats style) ─── */
function StatsSection() {
  const ref = useReveal();
  const stats = [
    { num: '35+', label: 'Finish Options' },
    { num: '10k+', label: 'Cycle Rating / Year' },
    { num: '6m', label: 'Max Opening Width' },
    { num: '15+', label: 'Years Warranty' },
  ];
  return (
    <section className="rd-stats" ref={ref}>
      <div className="rd-stats-grid">
        {stats.map((s, i) => (
          <div key={i} className={`rd-stat-card reveal reveal-delay-${i + 1}`}>
            <span className="rd-stat-num">{s.num}</span>
            <span className="rd-stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Specs Section (clean light theme) ─── */
function AutomationSection() {
  const ref = useReveal();
  const base = import.meta.env.BASE_URL;
  return (
    <section id="automation" className="rdp-automation" ref={ref} style={{ background: '#0a0a0a', color: '#fff', padding: '160px 48px', overflow: 'hidden', position: 'relative' }}>
      <div className="rdp-auto-bg reveal reveal-delay-2" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: '30%', backgroundImage: `url(${base}images/doors/slatted_roller.png)`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.5, WebkitMaskImage: 'linear-gradient(to right, transparent, black 40%)' }} />
      
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '80px' }}>
        <div style={{ maxWidth: '600px' }}>
          <div className="section-label reveal" style={{ color: 'rgba(255,255,255,0.6)', borderColor: 'rgba(255,255,255,0.2)' }}>Intelligent Automation</div>
          <h2 className="section-title reveal reveal-delay-1" style={{ color: '#fff' }}>Power meets precision.</h2>
          <p className="section-body reveal reveal-delay-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Experience whisper-quiet operation driven by our advanced DC motor technology. Equipped with obstacle detection, battery backup, and seamless smart home integration.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', maxWidth: '1000px' }}>
          <div className="reveal reveal-delay-1" style={{ borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '24px' }}>
            <div style={{ fontSize: '24px', fontFamily: 'var(--font-display)', marginBottom: '12px' }}>Whisper Quiet</div>
            <div style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>Direct-drive DC motors engineered to eliminate vibration and operational noise, making it perfect for attached garages and residential boundaries.</div>
          </div>
          <div className="reveal reveal-delay-2" style={{ borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '24px' }}>
            <div style={{ fontSize: '24px', fontFamily: 'var(--font-display)', marginBottom: '12px' }}>Smart Integration</div>
            <div style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>Control and monitor your door from anywhere using our dedicated mobile app. Fully compatible with major smart home ecosystems.</div>
          </div>
          <div className="reveal reveal-delay-3" style={{ borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '24px' }}>
            <div style={{ fontSize: '24px', fontFamily: 'var(--font-display)', marginBottom: '12px' }}>Auto Reverse</div>
            <div style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>Advanced optical sensors and strict force detection algorithms instantly halt and reverse the door upon detecting any physical obstruction.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SpecsSection() {
  const ref = useReveal();
  const [tab, setTab] = useState('overview');
  const tabs = { overview: 'Overview', automation: 'Automation', dimensions: 'Dimensions' };
  const data = {
    overview: [['Operation Type', 'Manual / Motorized'], ['Opening Style', 'Vertical Rolling'], ['Materials', 'Steel, Aluminium, Colorbond'], ['Design Options', 'Solid, Slatted, Perforated'], ['Applications', 'Residential, Commercial, Industrial'], ['Finish Options', 'Custom Colours (35+)'], ['Maintenance', 'Low Maintenance'], ['Automation', 'Remote Control Compatible']],
    automation: [['Motor Type', 'AC / DC Options Available'], ['Operating Speed', '0.1 – 0.2 m/s'], ['Power Supply', '240V AC / 24V DC'], ['Remote Control', 'Multi-channel RF'], ['Safety System', 'Obstacle auto-reverse'], ['Battery Backup', 'Optional module'], ['Cycle Rating', '10,000+ cycles/year'], ['Smart Integration', 'Home automation compatible']],
    dimensions: [['Standard Widths', '1,500 – 6,000 mm'], ['Standard Heights', '1,800 – 4,500 mm'], ['Custom Sizes', 'Available on request'], ['Headroom Required', '300 – 450 mm'], ['Sideroom Required', '75 – 100 mm each side'], ['Slat Height', '77 mm standard'], ['Drum Diameter', '160 – 250 mm'], ['Rail Depth', '60 – 80 mm']],
  };
  return (
    <section id="specs" className="rd-specs" ref={ref}>
      <div className="rd-specs-inner">
        <div className="rd-specs-header reveal">
          <div className="rd-label"><span>Technical Specifications</span></div>
          <h2 className="rd-section-heading">Built to<br /><span className="rd-heading-italic">spec.</span></h2>
        </div>
        <div className="rd-specs-card reveal reveal-delay-2">
          <div className="rd-specs-tabs">
            {Object.entries(tabs).map(([k, v]) => (
              <button key={k} className={`rd-spec-tab${tab === k ? ' active' : ''}`} onClick={() => setTab(k)}>{v}</button>
            ))}
          </div>
          {Object.entries(data).map(([k, rows]) => (
            <div key={k} className={`rd-spec-panel${tab === k ? ' active' : ''}`}>
              <table className="rd-spec-table"><tbody>
                {rows.map(([l, r], i) => <tr key={i}><td>{l}</td><td>{r}</td></tr>)}
              </tbody></table>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Section (rg-cta style) ─── */
function CtaSection() {
  const ref = useReveal();
  return (
    <section id="quote" className="rd-cta" ref={ref}>
      <div className="rd-cta-bg" />
      <div className="rd-cta-content">
        <div className="rd-label reveal" style={{ justifyContent: 'center' }}><span style={{ color: 'var(--accent-red, #DA1212)' }}>Get Started</span></div>
        <h2 className="rd-cta-headline reveal reveal-delay-1">
          Build your<br /><span className="rd-heading-italic">roller door.</span>
        </h2>
        <p className="rd-cta-sub reveal reveal-delay-2">
          Choose your finish, application, and automation system.<br />Our team will design the right solution for your space.
        </p>
        <div className="rd-cta-buttons reveal reveal-delay-3">
          <a href="#" className="rd-btn-primary">
            Request a Quote
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
          <a href="#" className="rd-btn-outline">Download Brochure</a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════ */
export default function RollerDoorsPage() {
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    window.scrollTo(0, 0);
    const sections = ['overview', 'studio', 'finishes', 'variants', 'features', 'automation', 'specs', 'quote'];
    const onScroll = () => {
      let current = '';
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 180) current = id;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <div className="rdp">
        <HeroSection />
        <OverviewSection />
        <StudioSection />
        <FinishesSection />
        <VariantsSection />
        <FeaturesSection />
        <StatsSection />
        <AutomationSection />
        <SpecsSection />
        <CtaSection />
        <Footer />
      </div>
    </SmoothScroll>
  );
}
