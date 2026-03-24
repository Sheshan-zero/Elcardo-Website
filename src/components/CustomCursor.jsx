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

    const onEnter = () => ringRef.current?.classList.add('expand');
    const onLeave = () => ringRef.current?.classList.remove('expand');

    document.addEventListener('mousemove', onMove);

    const addHoverListeners = () => {
      document.querySelectorAll('a, button, [data-cursor="expand"]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    // Re-attach on DOM changes
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    addHoverListeners();

    let raf;
    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.left = mouse.current.x + 'px';
        dotRef.current.style.top = mouse.current.y + 'px';
      }
      ring.current.x += (mouse.current.x - ring.current.x) * 0.1;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px';
        ringRef.current.style.top = ring.current.y + 'px';
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
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
          z-index: 99999;
          pointer-events: none;
          transform: translate(-50%, -50%);
          mix-blend-mode: difference;
        }
        .custom-cursor-ring {
          width: 40px;
          height: 40px;
          border: 1.5px solid rgba(218, 18, 18, 0.35);
          border-radius: 50%;
          position: fixed;
          z-index: 99998;
          pointer-events: none;
          transform: translate(-50%, -50%);
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
