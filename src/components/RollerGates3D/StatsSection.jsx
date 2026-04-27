import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/* ─── Animated Counter ─── */
function useAnimatedCounter(target, inView) {
  const [count, setCount] = useState(0);
  const frameRef = useRef(null);
  const startTimeRef = useRef(null);

  const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

  useEffect(() => {
    if (!inView) return;
    startTimeRef.current = null;
    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / 2000, 1);
      setCount(Math.floor(easeOutExpo(progress) * target));
      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
      else setCount(target);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [inView, target]);

  return count;
}

function StatCard({ target, suffix, prefix, label, delay }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const count = useAnimatedCounter(target, inView);

  return (
    <motion.div ref={ref} className="rg-stat-card"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="rg-stat-num">{prefix}{count.toLocaleString()}{suffix}</div>
      <div className="rg-stat-label">{label}</div>
    </motion.div>
  );
}

/* ─── Spec Row ─── */
function SpecRow({ label, value, delay }) {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <td style={{ padding: '16px 20px', fontWeight: 500, color: 'var(--near-black, #0a0a0f)', borderBottom: '1px solid var(--border-light, rgba(0,0,0,0.06))' }}>{label}</td>
      <td style={{ padding: '16px 20px', color: 'var(--mid-gray, #8A8F98)', borderBottom: '1px solid var(--border-light, rgba(0,0,0,0.06))' }}>{value}</td>
    </motion.tr>
  );
}

export default function StatsSection() {
  return (
    <section className="rg-stats-3d">
      <div className="rg-stats-content">
        {/* Animated counters */}
        <div className="rg-stats-grid">
          <StatCard target={100000} suffix="+" prefix="" label="Open / close cycles" delay={0} />
          <StatCard target={120} suffix=" km/h" prefix="" label="Wind resistance" delay={0.15} />
          <StatCard target={99} suffix=".9%" prefix="" label="Uptime reliability" delay={0.3} />
          <StatCard target={24} suffix="/7" prefix="" label="Remote monitoring" delay={0.45} />
        </div>

        {/* Technical Specifications Table */}
        <motion.div
          style={{ maxWidth: 800, margin: '80px auto 0', background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid var(--border-light, rgba(0,0,0,0.06))' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ padding: '28px 24px 16px', borderBottom: '1px solid var(--border-light, rgba(0,0,0,0.06))' }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--accent-red, #DA1212)' }}>Technical Specifications</span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
            <tbody>
              <SpecRow label="Operation Type" value="Manual / Motorized" delay={0.1} />
              <SpecRow label="Material Options" value="Steel / Aluminum / Color-bond" delay={0.15} />
              <SpecRow label="Applications" value="Residential / Commercial / Industrial" delay={0.2} />
              <SpecRow label="Finish Options" value="Custom colors, wood-look, metallic" delay={0.25} />
              <SpecRow label="Opening Style" value="Vertical rolling (space-saving)" delay={0.3} />
              <SpecRow label="Maintenance" value="Low maintenance — annual service" delay={0.35} />
              <SpecRow label="Safety" value="Infrared sensors, manual override" delay={0.4} />
              <SpecRow label="Warranty" value="Up to 10 years structural warranty" delay={0.45} />
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
