import React, { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Points, PointMaterial, View } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/* ─── Floating Particles ─── */
function Particles() {
  const pointsRef = useRef();
  const count = 200;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    const posArray = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] += Math.sin(t * 0.3 + i * 0.1) * 0.002;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial transparent color="#ffffff" size={0.03} sizeAttenuation depthWrite={false} opacity={0.4} />
    </Points>
  );
}

function ParticleScene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
      <Particles />
    </>
  );
}

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

export default function StatsSection() {
  return (
    <section className="rg-stats-3d">
      <View className="rg-stats-canvas-bg">
        <Suspense fallback={null}><ParticleScene /></Suspense>
      </View>
      <div className="rg-stats-content">
        <div className="rg-stats-grid">
          <StatCard target={100000} suffix="+" prefix="" label="Open / close cycles" delay={0} />
          <StatCard target={120} suffix=" km/h" prefix="" label="Wind resistance" delay={0.15} />
          <StatCard target={99} suffix=".9%" prefix="" label="Uptime reliability" delay={0.3} />
          <StatCard target={24} suffix="/7" prefix="" label="Remote monitoring" delay={0.45} />
        </div>
      </div>
    </section>
  );
}
