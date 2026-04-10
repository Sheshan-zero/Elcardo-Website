import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current = 'ontouchstart' in window;
    if (isTouchDevice.current) return;

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    document.addEventListener('mousemove', onMove, { passive: true });

    // Use event delegation instead of MutationObserver — one listener, zero DOM queries
    const onOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor="expand"]');
      if (target) ringRef.current?.classList.add('expand');
    };
    const onOut = (e) => {
      const target = e.target.closest('a, button, [data-cursor="expand"]');
      if (target) {
        const related = e.relatedTarget?.closest?.('a, button, [data-cursor="expand"]');
        if (!related || related !== target) {
          ringRef.current?.classList.remove('expand');
        }
      }
    };

    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout', onOut, { passive: true });

    let raf;
    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x - 3}px, ${mouse.current.y - 3}px, 0)`;
      }
      ring.current.x += (mouse.current.x - ring.current.x) * 0.1;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x - 20}px, ${ring.current.y - 20}px, 0)`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className="custom-cursor-ring" />
      <style>{`
        .custom-cursor-dot {
          width: 6px;
          height: 6px;
          background: var(--accent-red);
          border-radius: 50%;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 99999;
          pointer-events: none;
          will-change: transform;
          mix-blend-mode: difference;
        }
        .custom-cursor-ring {
          width: 40px;
          height: 40px;
          border: 1.5px solid rgba(218, 18, 18, 0.35);
          border-radius: 50%;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 99998;
          pointer-events: none;
          will-change: transform;
          transition: width 0.4s var(--ease-out-expo),
                      height 0.4s var(--ease-out-expo),
                      border-color 0.3s,
                      background 0.3s;
        }
        .custom-cursor-ring.expand {
          width: 64px;
          height: 64px;
          border-color: var(--accent-red);
          background: rgba(218, 18, 18, 0.06);
        }
        @media (max-width: 768px) {
          .custom-cursor-dot,
          .custom-cursor-ring { display: none; }
        }
        @media (pointer: coarse) {
          .custom-cursor-dot,
          .custom-cursor-ring { display: none; }
        }
      `}</style>
    </>
  );
}
